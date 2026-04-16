# Alpine Screens Plugin

[![npm version](https://img.shields.io/npm/v/alpine-screens.svg)](https://www.npmjs.com/package/alpine-screens)

Small Alpine plugin for screen-based UI flow (title, playing, win, etc.).

## What It Adds

- A global store (default name: `screen`) with:
	- `currentScreen`
	- `changeScreen(screenName)`
- Optional startup screen via `initialScreen`.
- `x-screen="name"` directive to show only the matching screen.
- `$changeScreen('name')` magic helper.
- Custom events on screen changes:
	- `screen-exit` on the previous screen element(s)
	- `screen-enter` on the next screen element(s)

## Install

### ESM

```sh
npm install alpine-screens
```

```js
import Alpine from 'alpinejs';
import screenPlugin from 'alpine-screens';

Alpine.plugin(screenPlugin({ initialScreen: 'title' }));
Alpine.start();
```

### CDN

Load the plugin script before Alpine so it can register during Alpine init.

```html
<script defer src="https://unpkg.com/alpine-screens@latest/dist/cdn.min.js"></script>
<script defer src="https://unpkg.com/alpinejs@latest/dist/cdn.min.js"></script>
```

## Core Usage

```html
<div x-data>
	<section x-screen="title">
		<h1>Title Screen</h1>
		<button @click="$changeScreen('playing')">Start</button>
	</section>

	<section x-screen="playing">
		<h1>Playing Screen</h1>
		<button @click="$changeScreen('win')">Win</button>
	</section>

	<section x-screen="win">
		<h1>Win Screen</h1>
		<button @click="$changeScreen('title')">Back to Title</button>
	</section>
</div>
```

## Example: Title / Playing / Win with Events

This example demonstrates all features:

- `x-screen` visibility switching
- `$changeScreen()` navigation
- reading `currentScreen`
- `screen-enter` and `screen-exit` events

```html
<div x-data="gameUi()">
	<p>Current: <strong x-text="$store.screen.currentScreen || 'none'"></strong></p>
	<p>Last event: <strong x-text="lastEvent"></strong></p>

	<section
		x-screen="title"
		@screen-enter="lastEvent = 'title entered (from ' + ($event.detail.oldScreen || 'none') + ')'"
	>
		<h2>Title Screen</h2>
		<button @click="$changeScreen('playing')">Start Game</button>
	</section>

	<section
		x-screen="playing"
		@screen-enter="flashPlaying = true; setTimeout(() => flashPlaying = false, 300); lastEvent = 'playing entered'"
		:style="flashPlaying ? 'outline: 3px solid #22c55e;' : ''"
	>
		<h2>Playing Screen</h2>
		<button @click="$changeScreen('win')">Finish Level</button>
		<button @click="$changeScreen('title')">Quit</button>
	</section>

	<section
		x-screen="win"
		@screen-exit="fadeWin = true; setTimeout(() => fadeWin = false, 350); lastEvent = 'win exiting to ' + $event.detail.newScreen"
		:style="fadeWin ? 'opacity: 0.45;' : ''"
	>
		<h2>Win Screen</h2>
		<button @click="$changeScreen('title')">Play Again</button>
	</section>
</div>

<script>
	function gameUi() {
		return {
			lastEvent: 'none',
			flashPlaying: false,
			fadeWin: false,
			init() {
				this.$changeScreen('title');
			}
		};
	}
</script>
```

## Event Details

### `screen-enter`

- Fired on the newly active screen element(s).
- Event detail:

```js
{ oldScreen: 'previous-screen-name-or-null' }
```

### `screen-exit`

- Fired on the previously active screen element(s).
- Event detail:

```js
{ newScreen: 'next-screen-name' }
```

## Plugin Option

You can configure the plugin with `storeName` and `initialScreen`:

```js
import Alpine from 'alpinejs';
import screenPlugin from 'alpine-screens';

Alpine.plugin(screenPlugin({
	storeName: 'ui',
	initialScreen: 'title'
}));
Alpine.start();
```

Then access it with `$store.ui.currentScreen`.

### Options

- `storeName` (string, default: `screen`): Name of the Alpine store.
- `initialScreen` (string | null, default: `null`): The first active screen when Alpine initializes.

## Release

```sh
npm run release:patch
npm run release:minor
npm run release:major
npm run release:publish
npm run release:push
```