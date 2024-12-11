import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [tsconfigPaths()],
	// 바벨 에서 처리하도록 설정
	// esbuild: {
	// 	jsxFactory: 'React.createElement',
	// 	jsxFragment: 'Fragment',
	// },
})