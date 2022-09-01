# Anoma Browser Extension

This is the Anoma Browser Extension project. This project is using `parcel` with `@parcel/config-webextension` for building
the extension files based on the provided `manifest.json`.

## Usage

```bash
# Clean build files
yarn clean

# Build web extension (chrome & Firefox)
yarn build
yarn build:chrome  # Build only chrome (./build/chrome)
yarn build:firefox # Build only firefox (./build/firefox)

# Run development mode
yarn start

# Run tests
yarn test
yarn test:watch

# Run eslint checks
yarn lint
yarn lint:fix
```

## Installation of extension

Once you have run `yarn build`, you can use the files in `./dist` to install a temporary extension in Chrome:

1. In Chrome, select `Manage Extensions`
2. Click the toggle to enable `Developer Mode`
3. Click `Load Unpacked` and point to the `dist` folder in this project

The extension should be installed. Currently, this is enabled for `namada.me`, so navigating to that page will call the `content` scripts,
hopefully instantiating an instance of the `Anoma()` class API for handling communication between client and key store.

## TODO

- Currently, Firefox does not support `manifest_version: 3`, and Chrome will be removing support for `V2` in 2023. We will need to maintain
  a build-pipeline that supports both of these.