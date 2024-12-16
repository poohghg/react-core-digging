export type ElementType = string | Component

export type Component = (props: Props) => ReactElement

export interface Props {
	[key: string]: any
}

export interface ReactElement<P = any> {
	type: ElementType
	props: P
	key: string | null
}

export type ReactElementProps<T extends Props> = Omit<T, 'key'> & {
	children?: ReactElement[]
}
