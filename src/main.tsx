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
	<div>
		<App />
		<div>2</div>
	</div>,
)
