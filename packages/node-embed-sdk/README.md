# Sigma Node.js Embed SDK

This package provides Node.js utilities for working with Sigma Computing's Embed API.

## Getting Started

To use the node-embed-sdk in your project, you can install it using your node package manager.

**Using npm:**

```code
npm install @sigmacomputing/node-embed-sdk
```

**yarn:**

```code
yarn add @sigmacomputing/node-embed-sdk
```

**pnpm:**

```code
pnpm add @sigmacomputing/node-embed-sdk
```

## Features

### Token Encryption and Decryption

The SDK provides utilities for encrypting and decrypting OAuth tokens using AES-256-GCM encryption:

```typescript
import { encrypt, decrypt } from '@sigmacomputing/node-embed-sdk';

// Encrypt an OAuth token
const encryptedToken = encrypt(
  'your-embed-secret',
  'your-oauth-token'
);

// Decrypt an encrypted token
const decryptedToken = decrypt(
  'your-embed-secret',
  encryptedToken
);
```
