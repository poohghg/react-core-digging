import { ReactElement } from './model/type.ts'
import diff from '@/libs/myReact/diff.ts'
import App from '@/src/app.tsx'
import { runEffects } from '@/libs/myReact/useEffect.ts'

let oldElement: ReactElement | null = null
let rootContainer: HTMLElement | null = null
export default function render(element: ReactElement, container: HTMLElement) {
	diff(container, element, oldElement)
	oldElement = element
	rootContainer = container
	runEffects()
}

export function rerender() {
	const newElement = App()
	diff(rootContainer!, newElement, oldElement)
	oldElement = newElement
	runEffects()
}