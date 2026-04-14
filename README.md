# Alpine JS Plugin Template

Starter structure for an Alpine JS plugin built with rolldown.

## Features

- Alpine-friendly plugin entry point
- rolldown-powered builds for ESM and CDN output
- Minified and unminified artifacts from the same source
- Simple npm release scripts for versioning and publishing

## Why Use This Template?

Use this as the starting point for a small Alpine JS plugin package. It keeps the source surface minimal while still setting up the bundle, release, and packaging conventions you typically need once the plugin is ready to ship.

## Install

### CDN

```html
<script defer src="https://unpkg.com/alpinejs@latest/dist/cdn.min.js"></script>
<script defer src="https://unpkg.com/alpinejs-plugin-template@latest/dist/cdn.min.js"></script>
```

### Package

```sh
npm install
```

```js
import Alpine from 'alpinejs';
import plugin from 'alpinejs-plugin-template';

Alpine.plugin(plugin);
Alpine.start();
```

## Example

Replace this section with your plugin-specific example once the implementation is in place.

## Options

Document plugin options here when the implementation defines them.

## Template Syntax Options

Document any syntax variations or plugin modes here if your plugin exposes them.

## Release

```sh
npm run release:patch
npm run release:minor
npm run release:major
npm run release:publish
npm run release:push
```

Run one of the versioned release scripts to create the git tag, build, publish, and push in one flow.

## Template Notes

- The entry file is intentionally blank for now.
- Build outputs are written to `dist/`.
- The CDN build imports the plugin entry and auto-registers it on `alpine:init`.
- `npm version` creates the release tag before the publish step runs.