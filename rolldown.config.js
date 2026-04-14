import { defineConfig } from 'rolldown';

const entryFile = 'src/index.js';
const cdnEntryFile = 'src/cdn.js';
const globalName = 'AlpinePluginTemplate';

export default defineConfig([
    {
        input: entryFile,
        external: ['alpinejs'],
        output: {
            file: 'dist/index.js',
            format: 'es',
            sourcemap: true,
            minify: false
        }
    },
    {
        input: entryFile,
        external: ['alpinejs'],
        output: {
            file: 'dist/index.min.js',
            format: 'es',
            sourcemap: false,
            minify: true
        }
    },
    {
        input: cdnEntryFile,
        external: ['alpinejs'],
        output: {
            file: 'dist/cdn.js',
            format: 'iife',
            name: globalName,
            globals: {
                alpinejs: 'Alpine'
            },
            sourcemap: true,
            minify: false
        }
    },
    {
        input: cdnEntryFile,
        external: ['alpinejs'],
        output: {
            file: 'dist/cdn.min.js',
            format: 'iife',
            name: globalName,
            globals: {
                alpinejs: 'Alpine'
            },
            sourcemap: false,
            minify: true
        }
    }
]);