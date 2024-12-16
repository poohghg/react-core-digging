declare module 'react/jsx-runtime' {
	interface IntrinsicElements {
		[elemName: string]: any
	}
}

declare module JSX {
	interface IntrinsicElements {
		[elemName: string]: any
	}
}
