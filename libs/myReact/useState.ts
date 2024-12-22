let currentStateIndex = 0
const states: any[] = []

export default function useState<T>(
	initialState: T,
): [T, (newState: T | ((prevState: T) => T)) => void] {
	const stateIndex = currentStateIndex
	currentStateIndex++

	if (states[stateIndex] === undefined) {
		states[stateIndex] = initialState
	}

	const setState = (newState: T | ((prevState: T) => T)) => {
		if (typeof newState === 'function') {
			states[stateIndex] = (newState as (prevState: T) => T)(states[stateIndex])
		} else {
			states[stateIndex] = newState
		}
		rerender()
	}

	return [states[stateIndex], setState]
}

function rerender() {
	currentStateIndex = 0
	console.log('Component re-rendered!')
}
