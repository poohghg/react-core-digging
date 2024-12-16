import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [tsconfigPaths()],
	esbuild: {
		jsx: 'transform',
		jsxDev: false,
		jsxInject: `import { createElement } from '@/libs/myReact'`,
		jsxFactory: 'createElement',
	},
})