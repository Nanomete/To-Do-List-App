import { useState } from 'react'
import './App.css'
import AddList from './components/AddList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <h1>To-Do-List</h1>
        <AddList/>
      </div>
    </>
  )
}

export default App
