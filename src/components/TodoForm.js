import {React , useState}from 'react'
import shortid from 'shortid'

const TodoForm = (props) => {
    const [text, settext] = useState("")
    const handleSubmit=(e)=>{
        e.preventDefault()
        props.onSubmit({
            id: shortid.generate(),
            text:text,
            complete:false,
        })
        settext("")
    }
    const handleChange=(e)=>{
        settext(e.target.value)
    }
  return (
    <form onSubmit={handleSubmit}>
          <input className="input-field" type="text"  onChange={handleChange} value={text}/>
          <button className="btn" onClick={handleSubmit}>Add</button>
          </form>
  )
}

export default TodoForm
