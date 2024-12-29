import { ReactElement } from './model/type'
import DomNode from '@/libs/myReact/model/DonNde'

export default function diff(
	container: HTMLElement,
	newElement: ReactElement | null,
	oldElement: ReactElement | null,
	index: number = 0, // 자식 노드 순서 추적
) {
	const oldNode = container.childNodes[index] // 현재 실제 DOM 노드

	if (!oldElement && !newElement) {
		return
	}
	// 1. 삭제: oldElement가 존재하지만 newElement는 null인 경우
	if (!newElement) {
		container.removeChild(oldNode)
		return
	}

	// 2. 추가: newElement가 존재하지만 oldElement는 null인 경우
	if (newElement && !oldElement) {
		const newNode = new DomNode(newElement).createDomNode()
		container.appendChild(newNode)
		return
	}

	// 3. 변경: 타입이 다르거나 key가 다른 경우 노드를 교체
	if (
		oldElement &&
		newElement &&
		(oldElement.type !== newElement.type || oldElement.key !== newElement.key)
	) {
		const newNode = new DomNode(newElement).createDomNode()
		container.replaceChild(newNode, oldNode)
		return
	}

	// 4. 업데이트: 같은 타입이면 속성 및 자식 비교
	if (newElement && oldElement && newElement.type === oldElement.type) {
		// 업데이트: 속성 변경
		updateDomProperties(
			oldNode as HTMLElement,
			oldElement.props,
			newElement.props,
		)

		// 자식 비교: 재귀 호출
		const newChildren = Array.isArray(newElement.props.children)
			? newElement.props.children
			: [newElement.props.children]
		const oldChildren = Array.isArray(oldElement.props.children)
			? oldElement.props.children
			: [oldElement.props.children]

		const max = Math.max(newChildren.length, oldChildren.length)

		for (let i = 0; i < max; i++) {
			diff(oldNode as HTMLElement, newChildren[i], oldChildren[i], i)
		}
	}
}

// DOM 속성 업데이트 함수
function updateDomProperties(
	dom: HTMLElement,
	oldProps: Record<string, any>,
	newProps: Record<string, any>,
) {
	// 1. 제거: oldProps에 있고 newProps에 없는 속성 제거
	for (const key in oldProps) {
		if (key === 'children') continue

		if (!(key in newProps)) {
			if (isEventProperty(key)) {
				const eventType = key.slice(2).toLowerCase()
				dom.removeEventListener(eventType, oldProps[key])
			} else {
				dom.removeAttribute(key)
			}
		}
	}

	// 2. 추가 및 업데이트: newProps에 있는 속성 추가/업데이트
	for (const key in newProps) {
		if (key === 'children') continue
		const oldValue = oldProps[key]
		const newValue = newProps[key]

		if (oldValue !== newValue) {
			if (isEventProperty(key)) {
				const eventType = key.slice(2).toLowerCase()
				if (oldValue) dom.removeEventListener(eventType, oldValue)
				dom.addEventListener(eventType, newValue)
			} else if (key in dom) {
				;(dom as any)[key] = newValue
			} else {
				dom.setAttribute(key, newValue)
			}
		}
	}
}

// 이벤트 속성 확인
function isEventProperty(key: string) {
	return key.startsWith('on')
}