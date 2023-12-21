import { useState } from 'react'
import './App.css'
import Code3 from './components/Code3'

function NewCode(props) {
  return(
    <div className='fixed bottom-4 right-4'>
      <div className='rounded-full cursor-pointer bg-red-600 w-12 h-12 pb-0.5 flex items-center justify-center text-4xl md:hover:bg-red-500 active:bg-red-500 text-white'><button onClick={props.onClick}>+</button></div>
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
  const [codes, setCodes] = useState(() => {
    const persistedState = window.localStorage.getItem("code3List")
    return persistedState !== null
      ? JSON.parse(persistedState)
      : []
  })

  function handleNewCode() {
    const d = new Date()
    const id = d.getTime()
    var updatedCodes = [ id, ...codes]
    window.localStorage.setItem("code3List", JSON.stringify(updatedCodes))
    setCodes(updatedCodes)
  }

  function handleDeleteCode(codeKey) {
    console.log(`handleDelete ${codeKey}`)
    var filteredCodes = codes.filter(function(c) { return c !== codeKey })
    window.localStorage.removeItem("code3_"+codeKey)
    window.localStorage.setItem("code3List", JSON.stringify(filteredCodes))
    setCodes(filteredCodes)
  }

  if (codes.length === 0) {
    return(
      <div>
        <NoCodes />
        <NewCode onClick={handleNewCode}/>
      </div>
    )
  } else {
    return (
      <div className='grid lg:grid-cols-2 gap-6 mt-6'>
        <NewCode onClick={handleNewCode}/>
        {
          codes.map((code) => (
            <div key={code} className='w-full flex flex-col items-stretch'>
              <Code3 codeId={code} handleDelete={(e) => handleDeleteCode(code)} />
              <button className='bg-white border border-gray-200 text-gray-300 active:text-white md:hover:border-red-600 md:hover:bg-red-600 md:hover:text-white active:border-red-600 active:bg-red-600 px-3 py-2 mb-4 rounded-b-2xl w-full' onClick={(e) => handleDeleteCode(code)}>Delete</button>
            </div>
          ))
        }
      </div>
    )
  }
}

export default App
