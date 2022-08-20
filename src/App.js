import React, {useState, useRef, useEffect} from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid'; // generates random id
import './App.css';


// {
//   id:1,name:'Todo 1',complete:false
// },
// {
//   id:2,name:'Todo 2',complete:true
// },
// {
//   id:3,name:'Todo 3',complete:true
// }

const LOCAL_STORAGE_KEY = 'todoAp.todos'

function App() {

  const [todos, setTodos] =  useState([])
  const todoNameRef = useRef();

  useEffect(() =>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos);
  },[])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo=>todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

    function handleAddTodo(e){
      const name = todoNameRef.current.value
      if (name === '') return
      setTodos(prevTodos =>{
        return [...prevTodos, {id:uuidv4(),name:name, complete:false}]
      })
      todoNameRef.current.value = null
    }

    function handleClearTodos(){
      const newTodos = todos.filter(todo => !todo.complete)
      setTodos(newTodos)
    }


  return (
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef} type="text"/>
    <button  onClick={handleAddTodo}>Add Todo</button>
    <button  onClick={handleClearTodos}>Clear Completed Todos</button>
    <div><h1>{todos.filter(todo => !todo.complete).length} left to do</h1></div>
    </>
  );
}

export default App;
