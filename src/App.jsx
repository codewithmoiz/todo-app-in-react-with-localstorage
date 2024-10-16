import React, { useEffect, useState } from 'react'
import TodoItem from './assets/TodoItem'

const App = () => {
  const [count, setCount] = useState(1)
  const [todoItems, setTodoItems] = useState([])

  useEffect(() => {
    let localTodos = JSON.parse(localStorage.getItem("Todo")) || []
    setTodoItems(localTodos);
    setCount(localTodos.length + 1)
  }, [])

  const [input, setInput] = useState("")

  const handleAddTodo = (e) => {
    e.preventDefault()
    if(input.trim() !== "") {
      const newTodo = { id: count, text: input, completed: false }
      const updatedTodos = [...todoItems, newTodo]
      setTodoItems(updatedTodos)
      setCount(count + 1)
      localStorage.setItem("Todo", JSON.stringify(updatedTodos))
      setInput("")
    }
  }

  const handleRemoveTodo = (id) => {
    const updatedTodos = todoItems.filter(item => item.id !== id)
    setTodoItems(updatedTodos)
    localStorage.setItem("Todo", JSON.stringify(updatedTodos))
  }

  const handleToggleTodo = (id) => {
    const updatedTodos = todoItems.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    setTodoItems(updatedTodos)
    localStorage.setItem("Todo", JSON.stringify(updatedTodos))
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo(e)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-extrabold text-center">Todo List</h1>
                <div className="flex mt-4">
                  <input
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    value={input}
                    className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Add Todo"
                  />
                  <button onClick={handleAddTodo}
                    className="flex-no-shrink p-2 border-2 rounded text-teal-500 border-teal-500 hover:text-white hover:bg-teal-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                <ul className="space-y-2">
                  {todoItems.length > 0 ? (
                    todoItems.map(todo => (
                      <TodoItem 
                        key={todo.id} 
                        todo={todo} 
                        onRemove={handleRemoveTodo} 
                        onToggle={handleToggleTodo}
                      />
                    ))
                  ) : (
                    <p className="text-center text-gray-500">No todos found</p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App