import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	base: '/',
	build: {
		outDir: 'dist',
	},
	plugins: [react(), mkcert()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	server: {
		https: true,
	},
});
