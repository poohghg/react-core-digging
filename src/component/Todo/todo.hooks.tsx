import { useState } from '@/libs/myReact'

const useTodo = () => {
	const [inputTodo, setInputTodo] = useState<string>('')
	const [todos, setTodos] = useState<string[]>([])

	const handleChange = (e: any) => {
		setInputTodo(e.target.value)
	}
	const handleClick = () => {
		setTodos([...todos, inputTodo])
		setInputTodo('')
	}

	const handleDelete = (index: number) => {
		setTodos(todos.filter((_, i) => i !== index))
	}

	return {
		inputTodo,
		todos,
		handleChange,
		handleClick,
		handleDelete,
	}
}

export default useTodo