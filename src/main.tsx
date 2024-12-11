import React from 'myReact'

const App = () => {
	const testClickHandler = () => {
		console.log('test')
	}

	return (
		<div>
			<button onclick={testClickHandler}>1</button>
			<button>2</button>
		</div>
	)
}

console.log(
	<div key={'test'} test={1}>
		<App />
	</div>,
)