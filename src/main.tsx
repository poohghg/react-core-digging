import { render, useState } from '@/libs/myReact'

const App = () => {
	const [count, setCount] = useState(0)

	const handleClick = () => {
		setCount((prev) => prev + 1)
	}

	return (
		<div>
			<button className={'test'} onclick={handleClick}>
				{count}
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