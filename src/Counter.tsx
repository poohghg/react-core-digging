import { useState } from '@/libs/myReact'

export default function Counter() {
	const [count, setCount] = useState(0)

	const handleClick = () => {
		setCount(count + 1)
	}

	return (
		<div>
			<div>현재 카운트는 {count} 입니다.</div>
			<button onclick={handleClick}>증가</button>
		</div>
	)
}