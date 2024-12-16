import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [tsconfigPaths()],
	esbuild: {
		jsx: 'transform',
		jsxDev: false,
		jsxImportSource: 'lib/myReact/jsx',
		jsxInject: `import { createElement } from '@/libs/myReact/jsx/jsx-runtime'`,
		jsxFactory: 'createElement',
	},
})