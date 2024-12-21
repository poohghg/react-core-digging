import { render } from '@/libs/myReact'

const App = () => {
	const testClickHandler = () => {
		console.log('test')
	}

	return (
		<div>
			<button className={'test'} onclick={testClickHandler}>
				1
			</button>
			<button>2</button>
		</div>
	)
}

const app = (() => {
	const root = document.getElementById('app')

	if (root) return root

	const div = document.createElement('div')
	div.id = 'app'

	return document.body.appendChild(div)
})()

render(<App />, app)