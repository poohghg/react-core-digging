import { ReactElement } from './type'
import ELEMENT_TYPE from './constant/ELEMENT_TYPE'

export default function render(element: ReactElement, container: HTMLElement) {
	const dom = new DomNode(element).createDomNode()
	container.appendChild(dom)
}

class DomNode {
	constructor(private element: ReactElement) {}

	createDomNode(): Node {
		if (this.element.type === ELEMENT_TYPE.TEXT_ELEMENT) {
			return document.createTextNode(this.element.props.nodeValue as string)
		}

		const dom = document.createElement(this.element.type as string)
		this.updateDomProperties(dom)

		if (this.element.props.children) {
			this.createChildNode(dom)
		}

		return dom
	}

	private createChildNode(dom: HTMLElement) {
		const children = Array.isArray(this.element.props.children)
			? this.element.props.children
			: [this.element.props.children]

		children.forEach((child: any) => {
			if (child) {
				const childNode = new DomNode(child).createDomNode()
				dom.appendChild(childNode)
			}
		})
	}

	private updateDomProperties(dom: HTMLElement) {
		for (const [key, value] of Object.entries<any>(this.element.props)) {
			if (key === 'children') continue

			if (this.isEventFunction(key, value)) {
				const eventType = this.removeReactEventPrefix(key)
				dom.addEventListener(eventType, value)
			} else if (key in dom) {
				;(dom as any)[key] = value
			} else {
				dom.setAttribute(key, value)
			}
		}
	}

	private isEventFunction(key: string, value: any) {
		return key.startsWith('on') && typeof value === 'function'
	}

	private removeReactEventPrefix(key: string) {
		return key.slice(2).toLowerCase()
	}
}