type Callback = () => void | (() => void)

const effects: { deps?: any[] }[] = []
const effectsArrayAfterRender: { callback: Callback; isRuned?: boolean }[] = []
let effectsIdx = 0

function isDifferentDeps(prevDeps: any[], currDeps: any[]): boolean {
	return prevDeps.some((item, i) => !Object.is(item, currDeps[i]))
}

export default function useEffect(
	callback: () => void | (() => void),
	deps?: any[],
): void {
	const prevEffect = effects[effectsIdx]

	if (effects.length === effectsIdx) {
		effects.push({ deps })
		effectsArrayAfterRender.push({ callback })
	} else if (
		!deps ||
		(prevEffect &&
			Array.isArray(prevEffect.deps) &&
			isDifferentDeps(prevEffect.deps, deps))
	) {
		effectsArrayAfterRender.push({ callback })
		effects[effectsIdx] = { deps }
	}

	effectsIdx++
}

// 기본 렌더링 루프에서 cleanup과 effect 실행
export function runEffects(): void {
	effectsArrayAfterRender.forEach(({ callback, isRuned }) => {
		if (!isRuned) {
			// cleanup이 먼저 실행되어야함.
			// if (typeof callback === 'void') {
			// 	callback()?.()
			// }
			callback()
			isRuned = true
		}
	})
	effects.length = 0
}

// function callEffect(callback: Callback): void {
// 	if (typeof callback === 'void') {
// 		callback()?.()
// 	}
// 	callback()
// }
