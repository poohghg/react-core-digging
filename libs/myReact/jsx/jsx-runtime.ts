import ELEMENT_TYPE from '../constant/ELEMENT_TYPE'
import type {ElementType, Props, ReactElement, ReactElementProps,} from '../model/type.ts'

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
		return this.children.length === 1
			? this.makeChild(this.children[0])
			: this.children.map((child) => this.makeChild(child))
	}

	private makeChild(child: any) {
		if (child === null || child === undefined) return null

		if (typeof child === 'object' || Array.isArray(child)) {
			return child
		}

		return this.createTextElement(child)
	}

	private createTextElement(text: string | number) {
		return {
			type: ELEMENT_TYPE.TEXT_ELEMENT,
			props: {
				nodeValue: text.toString(),
			},
		}
	}
}

export function createElement<P extends Props>(
	type: ElementType,
	config?: P | null,
	...children: any[]
): ReactElement<ReactElementProps<P>> {
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
