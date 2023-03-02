// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				destination: resolve(__dirname, "destination.html"),
			},
		},
	},
});
