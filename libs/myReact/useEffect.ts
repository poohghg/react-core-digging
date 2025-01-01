type EffectCallback = () => void | (() => void)

type EffectCallbacks = {
	callback: EffectCallback
	isRuned?: boolean
}

const effectsDeps: { deps?: any[] }[] = []

const effectsArrayAfterRender: EffectCallbacks[] = []

let effectsIdx = 0

function isDifferentDeps(prevDeps: any[], currDeps: any[]): boolean {
	return prevDeps.some((item, i) => !Object.is(item, currDeps[i]))
}

export default function useEffect(
	callback: EffectCallback,
	deps?: any[],
): void {
	const prevEffectDpes = effectsDeps[effectsIdx]

	if (effectsDeps.length === effectsIdx) {
		effectsDeps.push({ deps })
		effectsArrayAfterRender.push({ callback })
	} else if (
		!deps ||
		(prevEffectDpes &&
			Array.isArray(prevEffectDpes.deps) &&
			isDifferentDeps(prevEffectDpes.deps, deps))
	) {
		effectsArrayAfterRender.push({ callback })
		effectsDeps[effectsIdx] = { deps }
	}

	effectsIdx++
}

// 기본 렌더링 루프에서 cleanup과 effect 실행
export function runEffects(): void {
	effectsArrayAfterRender.forEach(({ callback, isRuned }) => {
		if (!isRuned) {
			callback()?.()
			callback()
			isRuned = true
		}
	})
	effectsDeps.length = 0
}
