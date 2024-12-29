export type Component = (props: Props) => ReactElement

export type ElementType = string | Component

export interface Props {
	[key: string]: any
}

export interface ReactElement<P = any> {
	key: string | null
	type: ElementType
	props: P & {
		children?: ReactElement[]
	}
}

export type ReactElementProps<T extends Props> = Omit<T, 'key'> & {
	children?: ReactElement[]
}

export type UpdaterFunction<T> = (prevState: T) => T
