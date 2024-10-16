import React from 'react'

const TodoItem = ({ todo, onRemove, onToggle }) => {
  const handleRemove = () => {
    onRemove(todo.id)
  }

  const handleToggle = () => {
    onToggle(todo.id)
  }

  return (
    <li className="flex items-center">
      <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={handleToggle}
        className="form-checkbox h-5 w-5 text-teal-500 rounded border-gray-300 focus:ring-teal-500 mr-2 cursor-pointer transition duration-150 ease-in-out" 
      />
      <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
        {todo.text}
      </span>
      <button 
        onClick={handleToggle}
        className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green-500 hover:bg-green-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        {todo.completed ? 'Undo' : 'Done'}
      </button>
      <button 
        onClick={handleRemove}
        className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        Remove
      </button>
    </li>
  )
}

export default TodoItem