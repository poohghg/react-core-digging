import { getContainer, render } from '@/libs/myReact/index'
import App from '@/src/app'

export default function rerender() {
	const root = getContainer()
	root.innerHTML = ''
	render(<App />, root)
}