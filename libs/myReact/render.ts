import { ReactElement } from './model/type'
import diff from '@/libs/myReact/diff'
import App from '@/src/app'
import { runEffects } from '@/libs/myReact/useEffect'

let oldElement: ReactElement | null = null
let rootContainer: HTMLElement | null = null
export default function render(element: ReactElement, container: HTMLElement) {
	diff(container, oldElement, element)
	oldElement = element
	rootContainer = container
	runEffects()
}

export function rerender() {
	const newElement = App()
	diff(rootContainer!, oldElement, newElement)
	oldElement = newElement
	runEffects()
}