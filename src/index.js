export default function templatePlugin(options = { name: "World" }) {
    return (Alpine) => {
        Alpine.directive("say-hi", (el, { expression }, { evaluate }) => {
            el.textContent = `Hello, ${options.name}!`;
        });
    }
}