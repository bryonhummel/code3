import { useState } from 'react'
import './App.css'
import Code3 from './components/Code3'

function NewCode(props) {
  return(
    <div className='fixed bottom-4 right-4'>
      <div className='rounded-full cursor-pointer bg-red-600 w-12 h-12 pb-0.5 flex items-center justify-center text-4xl hover:bg-red-500 text-white'><button onClick={props.onClick}>+</button></div>
    </div>
  )
}

function NoCodes(props) {
  return(
    <div>
      <div className='m-auto p-4 px-8 mt-16 w-fit  text-white bg-red-600 font-extrabold rounded-lg'>CODE 3</div>
      <div className='mt-4 text-gray-500 text-xs'>Click <span className='border border-gray-500 rounded-full w-4 h-4  justify-center items-center inline-flex'>+</span> to Start</div>
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
      {codes.length === 0 && <NoCodes />}
      {
        codes.map((code) => (
          <Code3 key={code} handleDelete={(e) => handleDeleteCode(code)} />
        ))
      }
    </div>
  )
}

export default App
