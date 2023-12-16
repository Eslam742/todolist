import {React,useState} from 'react'
import TodoForm from './components/TodoForm'
import "./App.css"
import Todo from './components/Todo'

const App = () => {
  let [todos, settodos] = useState([])
  const [todoshow, settodoshow] = useState("all")
  const [toggleallcomplete, settoggleallcomplete] = useState(true)
  const addtodo = (todo) => {
    settodos([todo, ...todos])
  }
  const handleDelete = (id) => {
    settodos(todos.filter((todo) => todo.id !== id))
  }
  const updateTodoToShow = (s) => {
    settodoshow(s)
  }
  const removeallcomplete=()=>{
    settodos(todos.filter((todo)=>!todo.complete))
  }
  const removeallactive=()=>{
    settodos(todos.filter((todo)=>todo.complete))
  }
  const toggleComplete = (id) => {
    settodos(todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          complete: !todo.complete
        }
      } else {
        return todo;
      }
    }))
  }
  if (todoshow === "active") {
    todos = todos.filter((todo) => !todo.complete)
  } else if (todoshow === "complete") {
    todos = todos.filter((todo) => todo.complete)
  }
  return (
    <div className="container">
      <h1 style={{ color: "#fff", opacity: ".8", marginBottom: "80px", marginRight: "10px" }}>Todo List</h1>
      <TodoForm onSubmit={addtodo} />
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onDelete={() => handleDelete(todo.id)} toggleComplete={() => toggleComplete(todo.id)} />
      ))
      }
      <div>
        <button className="update-btn btn" onClick={() => updateTodoToShow("all")}>All</button>
        <button className="update-btn btn" onClick={() => updateTodoToShow("active")}>Active</button>
        <button className="update-btn btn" onClick={() => updateTodoToShow("complete")}>Complete</button>
      </div>

      {todos.some((todo) => todo.complete) ? (<button className="all-btn btn" onClick={removeallcomplete}>Remove All Complete</button>) : null}
      {todos.some((todo)=>!todo.complete)? (<button className="all-btn btn" onClick={removeallactive}>Remove All Active</button>):null}
      {todos.some((todo) => todo) ? (<button className="all-btn btn"  onClick={() => {
        settodos(
          todos.map((todo)=>({
            ...todo,
            complete:toggleallcomplete,
          }))
        )
        settoggleallcomplete(!toggleallcomplete)
      }}>Toggle All Complete : {`${toggleallcomplete}`}</button>) :null}
    </div>
  )
}

export default App
