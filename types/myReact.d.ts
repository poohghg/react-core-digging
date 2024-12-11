declare module 'myReact' {
	type Element = string | ((props: Props) => ReactElement)

	interface Props {
		key?: string

		[key: string]: any
	}

	interface ReactElement<T extends string = string, P = any> {
		type: T
		props?: P
		children?: any[]
		key?: string
	}

	// function createElement<T extends Element, P extends Props>(
	// 	type: Element,
	// 	props: P | null,
	// 	...children: any[]
	// ): ReactElement<T, Omit<P, 'key'>>
}
