import plugin from './index.js';

document.addEventListener('alpine:init', () => {
    window.Alpine.plugin(plugin());
});