import { Router } from "router";
import { ROUTE } from "./constants";
import { getHandler } from "./handler";
import {
  CheckIsLockedMsg,
  CheckPasswordMsg,
  LockVaultMsg,
  ResetPasswordMsg,
  UnlockVaultMsg,
} from "./messages";
import { VaultService } from "./service";

export function init(router: Router, service: VaultService): void {
  router.registerMessage(CheckIsLockedMsg);
  router.registerMessage(LockVaultMsg);
  router.registerMessage(CheckPasswordMsg);
  router.registerMessage(ResetPasswordMsg);
  router.registerMessage(UnlockVaultMsg);
  router.addHandler(ROUTE, getHandler(service));
}
