import { KVStore } from "@namada/storage";
import { Crypto } from "./crypto";
import {
  CryptoRecord,
  PrimitiveType,
  ResetPasswordError,
  Vault,
  VaultStore,
  VaultStoreData,
} from "./types";
import { Result } from "@namada/utils";

export const VAULT_KEY = "vault";
const crypto = new Crypto();

export class VaultService {
  private password: string | undefined;

  public constructor(
    protected vaultStore: KVStore<VaultStore>,
    protected readonly cryptoMemory: WebAssembly.Memory
  ) {
    this.initialize();
    this.migrate();
  }

  private migrate(): void {}

  private async initialize(): Promise<void> {
    const vault = await this.vaultStore.get(VAULT_KEY);
    if (!vault) {
      await this.vaultStore.set(VAULT_KEY, {
        password: undefined,
        data: {},
      });
    }
  }

  public async passwordInitialized(): Promise<boolean> {
    const store = await this.getStoreData();
    return store?.password !== undefined;
  }

  public async getLength(): Promise<number> {
    const store = await this.getStoreData();
    return Object.keys(store?.data || {}).length;
  }

  public isLocked(): boolean {
    return this.password === undefined;
  }

  public assertIsUnlocked(): void {
    if (this.isLocked()) {
      throw new Error("Extension is locked");
    }
  }

  public async lock(): Promise<void> {
    this.setPassword(undefined);
  }

  public async unlock(password: string): Promise<boolean> {
    if (await this.checkPassword(password)) {
      this.setPassword(password);
      return true;
    }
    return false;
  }

  protected setPassword(password: string | undefined): void {
    this.password = password;
  }

  protected getPassword(): string {
    this.assertIsUnlocked();
    return this.password || "";
  }

  // TODO: I think we shouldn't expose the password like this, but it's required
  // for SDK methods. Use cautiously.
  public UNSAFE_getPassword(): string {
    this.assertIsUnlocked();
    return this.password || "";
  }

  public async checkPassword(password: string): Promise<boolean> {
    const store = await this.getStoreData();
    if (!store?.password) {
      throw new Error("Password not initialized");
    }

    try {
      crypto.decrypt(store.password, password, this.cryptoMemory);
      return true;
    } catch (error) {
      console.warn(error);
    }

    return false;
  }

  public async getStoreData(): Promise<VaultStore | undefined> {
    return this.vaultStore.get(VAULT_KEY);
  }

  public async add<P, T>(
    key: string,
    publicData: P,
    sensitiveData?: T
  ): Promise<void> {
    this.assertIsUnlocked();

    const entry = await this.createVaultEntry<P, T>(publicData, sensitiveData);
    const storedData = await this.getStoreData();

    if (!storedData) {
      throw new Error("Store data has not been initialized");
    }

    if (!Array.isArray(storedData.data[key])) {
      storedData.data[key] = [];
    }

    storedData.data[key].push(entry);
    this.vaultStore.set(VAULT_KEY, JSON.parse(JSON.stringify(storedData)));
  }

  protected async find<P>(
    key: string,
    prop: keyof P,
    value: PrimitiveType
  ): Promise<Vault<P>[]> {
    const storedData = await this.getStoreData();
    if (!storedData) {
      throw new Error("Store data has not been initialized");
    }

    if (!storedData.data.hasOwnProperty(key)) {
      return [];
    }

    const found = storedData.data[key].filter((entry) => {
      const props = entry.public as P;
      return props[prop] === value;
    }) as Vault<P>[];

    return found;
  }

  public async findOne<P>(
    key: string,
    prop: keyof P,
    value: PrimitiveType
  ): Promise<Vault<P> | null> {
    this.assertIsUnlocked();
    const result = await this.find<P>(key, prop, value);
    return result.length > 0 ? result[0] : null;
  }

  public async findAll<P>(
    key: string,
    prop: keyof P,
    value: PrimitiveType
  ): Promise<Vault<P>[]> {
    this.assertIsUnlocked();
    return await this.find<P>(key, prop, value);
  }

  public async findAllOrFail<P>(
    key: string,
    prop: keyof P,
    value: PrimitiveType
  ): Promise<Vault<P>[]> {
    this.assertIsUnlocked();
    const result = await this.findAll<P>(key, prop, value);
    if (result.length === 0)
      throw new Error("No results have been found on Vault Service");
    return result;
  }

  public async findOneOrFail<P>(
    key: string,
    prop: keyof P,
    value: PrimitiveType
  ): Promise<Vault<P>> {
    this.assertIsUnlocked();
    const result = await this.find<P>(key, prop, value);
    if (result.length === 0) {
      throw new Error("No results have been found on Vault Service");
    }
    return result[0];
  }

  public async remove<P>(
    key: string,
    prop: keyof P,
    value: PrimitiveType
  ): Promise<Vault<P>[]> {
    const storedData = await this.getStoreData();
    if (!storedData) {
      throw new Error("Store data has not been initialized");
    }

    if (!storedData.data.hasOwnProperty(key)) {
      return [];
    }

    const newStore = storedData.data[key].filter((entry) => {
      const props = entry.public as P;
      return props[prop] !== value;
    }) as Vault<P>[];

    storedData.data[key] = newStore;
    this.vaultStore.set(VAULT_KEY, JSON.parse(JSON.stringify(storedData)));
    return newStore;
  }

  public async createPassword(password: string): Promise<void> {
    if (await this.passwordInitialized()) {
      throw new Error("Password already set");
    }
    this.vaultStore.set(VAULT_KEY, {
      password: this.getEncryptedPassword(password),
      data: {},
    });
  }

  public async reveal<S>(entry: Vault): Promise<S | undefined> {
    this.assertIsUnlocked();
    if (!entry.sensitive) return;

    try {
      const decryptedJson = await crypto.decrypt(
        entry.sensitive,
        this.getPassword(),
        this.cryptoMemory
      );
      return JSON.parse(decryptedJson) as S;
    } catch (error) {
      throw new Error("An error occurred decrypting the Vault");
    }
  }

  // Reset password by re-encrypting secrets with new password.
  public async resetPassword(
    oldPassword: string,
    newPassword: string
  ): Promise<Result<null, ResetPasswordError>> {
    if (!(await this.unlock(oldPassword))) {
      return Result.err(ResetPasswordError.BadPassword);
    }

    const storedData = await this.getStoreData();
    if (!storedData) {
      throw new Error("VaultStore has not been initialized");
    }

    try {
      const newStore: VaultStoreData = {};
      for (const key in storedData.data) {
        newStore[key] = [];
        for (const vault of storedData.data[key]) {
          const sensitiveInfo = await this.reveal(vault);
          newStore[key].push(
            await this.createVaultEntry(
              vault.public,
              sensitiveInfo,
              newPassword
            )
          );
        }
      }

      await this.vaultStore.set(VAULT_KEY, {
        password: this.getEncryptedPassword(newPassword),
        data: { ...newStore },
      });
      this.setPassword(newPassword);
      return Result.ok(null);
    } catch (error) {
      throw error;
    }
  }

  protected async createVaultEntry<P, T>(
    publicData: P,
    sensitiveData?: T,
    password = this.getPassword()
  ): Promise<Vault<P>> {
    let encryptedData;
    if (sensitiveData) {
      encryptedData = crypto.encrypt(JSON.stringify(sensitiveData), password);
    }
    return {
      public: { ...publicData },
      sensitive: encryptedData,
    };
  }

  protected getEncryptedPassword(password: string): CryptoRecord {
    return crypto.encryptAuthKey(password, password);
  }
}
