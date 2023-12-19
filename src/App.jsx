import { useState } from 'react'
import './App.css'
import Code3 from './components/Code3'

function NewCode(props) {
  return(
    <div>
    <div className='cursor-pointer border border-dashed border-blue-200 bg-white m-auto px-4 pb-4 pt-4 rounded-b-md max-w-fit font-extrabold text-lg hover:bg-blue-100 text-blue-800'><button onClick={props.onClick}>+Code 3</button></div>
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
