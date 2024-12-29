import { useEffect, useState } from '@/libs/myReact'
import './todo.css'

export default function Index() {
	const [input, setInput] = useState<string>('')
	const [todos, setTodos] = useState<string[]>([])

	const handleChange = (e: any) => {
		setInput(e.target.value)
	}
	const handleClick = () => {
		setTodos([...todos, input])
		setInput('')
	}

	const handleDelete = (index: number) => {
		setTodos(todos.filter((_, i) => i !== index))
	}

	useEffect(() => {
		console.log('useEffect - todos:', todos)
		return () => {
			console.log('useEffect cleanup - todos:', todos)
		}
	}, [todos])

	console.log('??')

	return (
		<div>
			<div>현재 카운트는 {todos.length} 입니다.</div>
			<TodoForm
				input={input}
				handleChange={handleChange}
				handleClick={handleClick}
			/>
			<TodoList todos={todos} handleDelete={handleDelete} />
		</div>
	)
}

interface TodoFormProps {
	input: string
	handleChange: (e: any) => void
	handleClick: () => void
}

function TodoForm({ input, handleClick, handleChange }: TodoFormProps) {
	return (
		<form
			action=""
			onclick={(e: any) => {
				e.preventDefault()
			}}
		>
			<input
				type="text"
				onchange={handleChange}
				value={input}
				placeholder="할 일을 입력해주세요."
			/>
			<button type="submit" onclick={handleClick}>
				입력
			</button>
		</form>
	)
}

interface TodoListProps {
	todos: string[]
	handleDelete: (index: number) => void
}

function TodoList({ todos, handleDelete }: TodoListProps) {
	return (
		<div>
			{todos.map((todo, index) => (
				<div className="todo-row">
					<div key={todo + index}>{todo}</div>
					<button type="button" onclick={() => handleDelete(index)}>
						삭제
					</button>
				</div>
			))}
		</div>
	)
}