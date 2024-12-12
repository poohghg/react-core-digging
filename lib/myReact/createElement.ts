// lib/myReact/createElement.ts
import {Element, Props, ReactElement, ReactElementProps} from 'myReact' //https://github.com/facebook/react/blob/main/packages/react/src/jsx/ReactJSXElement.js#L161

//https://github.com/facebook/react/blob/main/packages/react/src/jsx/ReactJSXElement.js#L161
export default function createElement<T extends Element, P extends Props>(
	type: T,
	config?: P | null,
	...children: any[]
): ReactElement<T, ReactElementProps<P>> {
	// config 의 key 를 제거한 새로운 props 를 만든다.
	const key = config?.key
	delete config?.key

	const newProps = {
		...((config || {}) as P),
		children: children.length === 1 ? children[0] : children,
	}

	// type 이 function 이면 type 을 실행한 결과를 반환한다.
	if (typeof type === 'function') {
		return type(newProps)
	}

	return {
		type: type,
		props: newProps,
		key: key,
	}
}
