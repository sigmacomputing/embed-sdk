<p align="center">
  <a href="https://github.com/sigmacomputing/embed-sdk">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./assets/sigma-logo-dark.svg">
      <img alt="Sigma Logo" src="./assets/sigma-logo-light.svg" width="400px">
    </picture>
  </a>
</p>

# Sigma Embed-SDK for React

Sigma provides several methods to allow users and developers to interact with its systems including web-ui, REST API, Javascript Embed API and an SDK for the React framework.

The Embed-SDK for React offers a higher-level, developer-friendly interface that simplifies integration into applications, in contrast to Sigma’s lower-level JavaScript Embed-API, which provides more granular control but may require additional coding

If the basic instructions below are not sufficient, please review the [QuickStart here.](https://quickstarts.sigmacomputing.com/guide/embedding_15_embed_sdk/index.html?index=..%2F..index#0)

## Using in Project

To use the embed-sdk in your project, you can install it using your node package manager.

### For react-embed-sdk:

For each package manager, use the following command:

**npm:**

```code
npm install @sigmacomputing/react-embed-sdk
```

**yarn:**

```code
yarn add @sigmacomputing/react-embed-sdk
```

**pnpm:**

```code
pnpm add @sigmacomputing/react-embed-sdk
```

### For embed-sdk:

For each package manager, use the following command:

**Using npm:**

```code
npm install @sigmacomputing/embed-sdk
```

**yarn:**

```code
yarn add @sigmacomputing/embed-sdk
```

**pnpm:**

```code
pnpm add @sigmacomputing/embed-sdk
```

## Building

The repo uses turbo for its build system. It currently has 3 packages:

- embed-sdk: "barebones" wrappers over postMessages
- react-embed-sdk: React hooks to easily use the embed-sdk
- docs: Some barebone documentation / examples.

**To build:**

```code
pnpm run build
```

## Release and Publish flow:

We follow [semantic versioning](https://semver.org/). We MAY make breaking changes while in 0.y.z releases, but the
maintainers do not plan for any substantial breaking changes until 1.0.0.

Publishes are handled by changesets. To add a changeset, in your PR run:

```code
pnpm changeset
```

This will prompt you to add a changeset. Once merged, a PR will be opened to bump the version and publish the package.

## Adding iframe events

- [Example](https://github.com/sigmacomputing/embed-sdk/pull/31) for adding an inbound event
- Add a changeset for both the embed-sdk and react-embed-sdk.
