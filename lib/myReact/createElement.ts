// lib/myReact/createElement.ts
import {ElementType, Props, ReactElement, ReactElementProps} from 'myReact'
import ELEMENT_TYPE from './constant/ELEMENT_TYPE.ts'

//https://github.com/facebook/react/blob/main/packages/react/src/jsx/ReactJSXElement.js#L161

class NewProps<T extends Props> {
	constructor(
		private config: T | null | undefined,
		private children: any[],
	) {}

	get props() {
		const newProps = {
			...(this.config as T),
			children: this.createChildren(),
		}

		delete newProps?.key

		return newProps
	}

	private createChildren() {
		return this.children.map((child) => {
			return typeof child === 'object' ? child : this.createTextElement(child)
		})
	}

	private createTextElement(text: string | number) {
		return {
			type: ELEMENT_TYPE.TEXT_ELEMENT,
			props: {
				nodeValue: text.toString(),
				children: [],
			},
		}
	}
}

//https://github.com/facebook/react/blob/main/packages/react/src/jsx/ReactJSXElement.js#L161
export default function createElement<P extends Props>(
	type: ElementType,
	config?: P | null,
	...children: any[]
): ReactElement<ElementType, ReactElementProps<P>> {
	if (typeof type === 'function') {
		return type({
			...config,
			children,
		})
	}

	return {
		type,
		props: new NewProps(config, children).props,
		key: config?.key,
	}
}
