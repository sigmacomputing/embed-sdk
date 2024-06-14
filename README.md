# embed-sdk

Experimental SDK for Sigma Embeds. They are a wrapper over postmessage APIs.

## Getting Started 
This repo uses pnpm and node18+. To get started 

```sh
corepack enable
pnpm i
```

The repo uses turbo for its managenent. It currently hass 3 packages: 
* embed-sdk: barebones wrappers over postMessages
* react-emebed-sdk: React hooks to easily use the embed-sdk
* docs: Some barebone documentation / examples.

To build: 
```
pnpm run build
```

## Publish flow: 

Merge changes to main. Checkout main locally. Then 
```
pnpm run publish
```

