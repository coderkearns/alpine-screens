(function() {


//#region src/index.js
/**
	* @typedef {Object} ScreensPluginOptions
	* @property {string} [storeName="screen"] - Alpine store name used by the plugin.
	* @property {string | null} [initialScreen=null] - Initial active screen, null if none.
	*/
	/**
	* Alpine plugin for simple screen-based UIs.
	* @param {ScreensPluginOptions} [options]
	* @returns {(Alpine: import('alpinejs').Alpine) => void}
	*/
	function screensPlugin({ storeName = "screen", initialScreen = null } = {}) {
		return (Alpine) => {
			Alpine.store(storeName, {
				currentScreen: initialScreen,
				changeScreen(screenName) {
					if (this.currentScreen === screenName) return;
					if (this.currentScreen && this.screenElements[this.currentScreen]) this.screenElements[this.currentScreen].forEach((el) => el.dispatchEvent(new CustomEvent("screen-exit", { detail: { newScreen: screenName } })));
					const oldScreen = this.currentScreen;
					this.currentScreen = screenName;
					if (this.screenElements[this.currentScreen]) this.screenElements[this.currentScreen].forEach((el) => el.dispatchEvent(new CustomEvent("screen-enter", { detail: { oldScreen } })));
				},
				screenElements: {}
			});
			Alpine.magic("changeScreen", () => (screenName) => Alpine.store(storeName).changeScreen(screenName));
			Alpine.directive("screen", (el, { expression: screenName }, { effect, cleanup, Alpine }) => {
				const store = Alpine.store(storeName);
				store.screenElements[screenName] = store.screenElements[screenName] || [];
				store.screenElements[screenName].push(el);
				cleanup(() => {
					store.screenElements[screenName] = store.screenElements[screenName].filter((element) => element !== el);
					if (store.screenElements[screenName].length === 0) delete store.screenElements[screenName];
				});
				effect(() => {
					const currentScreen = Alpine.store(storeName).currentScreen;
					el.style.display = currentScreen === screenName ? "" : "none";
				});
			});
		};
	}

//#endregion
//#region src/cdn.js
	document.addEventListener("alpine:init", () => {
		window.Alpine.plugin(screensPlugin());
	});

//#endregion
})();
//# sourceMappingURL=cdn.js.map