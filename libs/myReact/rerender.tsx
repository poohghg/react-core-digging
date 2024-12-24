import { getApp, render } from '@/libs/myReact/index.ts'
import App from '@/src/app.tsx'

export default function rerender() {
	const root = getApp()
	root.innerHTML = ''
	render(<App />, root)
}