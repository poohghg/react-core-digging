declare module 'myReact' {
	type Element = string | ((props: Props) => ReactElement)

	interface Props {
		[key: string]: any
	}

	interface ReactElement<T extends Element, P = any> {
		type: T
		props: P
		key: string | null
	}

	type ReactElementProps<T extends Props> = Omit<T, 'key'> & {
		children?: ReactElement[]
	}

	// function createElement<T extends Element, P extends Props>(
	// 	type: Element,
	// 	props: P | null,
	// 	...children: any[]
	// ): ReactElement<T, Omit<P, 'key'>>
}
