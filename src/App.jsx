import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Code3 from './components/Code3'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='max-w-3xl m-auto'>
      <Code3/>
    </div>
  )
}

export default App
