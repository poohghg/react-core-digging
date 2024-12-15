declare module 'myReact' {
	type Component = (props: Props) => ReactElement

	type ElementType = string | Component

	interface Props {
		[key: string]: any
	}

	interface ReactElement<T extends ElementType, P = any> {
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
