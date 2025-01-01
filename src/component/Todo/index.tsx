import './todo.css'
import useTodo from '@/src/component/Todo/todo.hooks.tsx'

export default function Index() {
	const { inputTodo, todos, handleChange, handleClick, handleDelete } =
		useTodo()

	return (
		<div>
			<div>현재 카운트는 {todos.length} 입니다.</div>
			<TodoForm
				input={inputTodo}
				onChange={handleChange}
				onClick={handleClick}
			/>
			<TodoList todos={todos} handleDelete={handleDelete} />
		</div>
	)
}

interface TodoFormProps {
	input: string
	onChange: (e: any) => void
	onClick: () => void
}

function TodoForm({ input, onChange, onClick }: TodoFormProps) {
	return (
		<form
			action=""
			onclick={(e: any) => {
				e.preventDefault()
			}}
		>
			<input
				type="text"
				onchange={onChange}
				value={input}
				placeholder="할 일을 입력해주세요."
			/>
			<button type="submit" onclick={onClick}>
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