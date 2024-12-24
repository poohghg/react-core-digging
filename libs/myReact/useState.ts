import rerender from '@/libs/myReact/rerender.tsx'

type UpdaterFunction<T> = (prevState: T) => T

let currentStateIndex = 0
const states: unknown[] = []

export default function useState<T>(
	initialState: T,
): [T, (newState: T | UpdaterFunction<T>) => void] {
	const stateIndex = currentStateIndex
	currentStateIndex++

	if (states[stateIndex] === undefined) {
		states[stateIndex] = initialState
	}

	const setState = (newState: T | UpdaterFunction<T>) => {
		if (typeof newState === 'function') {
			const updaterFunction = newState as UpdaterFunction<T>
			states[stateIndex] = updaterFunction(states[stateIndex] as T)
		} else {
			states[stateIndex] = newState
		}

		queueMicrotask(() => {
			currentStateIndex = 0
			rerender()
		})
	}

	return [states[stateIndex] as T, setState]
}