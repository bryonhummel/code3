import { useState } from 'react'
import './App.css'
import Code3 from './components/Code3'

function NewCode(props) {
  return(
    <div className='fixed bottom-4 right-4'>
      <div className='rounded-full cursor-pointer bg-red-600 w-10 h-10 pb-0.5 flex items-center justify-center text-4xl hover:bg-red-500 text-white'><button onClick={props.onClick}>+</button></div>
    </div>
  )
}

function App() {
  const [codes, setCodes] = useState([])

  function handleNewCode() {
    var updatedCodes = [ new Date(), ...codes]
    setCodes(updatedCodes)
  }

  function handleDeleteCode(codeKey) {
    console.log(`handleDelete ${codeKey}`)
    var filteredCodes = codes.filter(function(c) { return c !== codeKey })
    setCodes(filteredCodes)
  }

  return (
    <div className='max-w-3xl m-auto'>
      <NewCode onClick={handleNewCode}/>
      {
        codes.map((code) => (
          <Code3 key={code} handleDelete={(e) => handleDeleteCode(code)} />
        ))
      }
    </div>
  )
}

export default App
