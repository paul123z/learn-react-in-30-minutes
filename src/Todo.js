import React from 'react'
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Todo({todo,toggleTodo}) {
function handleTodoClick(){
    toggleTodo(todo.id)
}

  return (
    <label>
        <input type="checkbox" checked={todo.complete} onChange ={handleTodoClick} />
        {todo.name}
    </label>

  )
}
