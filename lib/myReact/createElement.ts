// lib/myReact/createElement.ts
import {Element, Props, ReactElement} from 'myReact'

//https://github.com/facebook/react/blob/main/packages/react/src/jsx/ReactJSXElement.js#L161
export default function createElement<T extends Element, P extends Props>(
	type: T,
	config?: P | null,
	...children: any[]
): ReactElement {
	if (typeof type === 'function') {
		return type({
			...((config || {}) as P),
			children: children.length === 1 ? children[0] : children,
		})
	}

	const newProps: P = {
		...((config || {}) as P),
		children: children.length === 1 ? children[0] : children,
	}

	return {
		type: type,
		props: newProps,
		key: config?.key,
	}
}
