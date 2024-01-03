import { useEffect, useState } from 'react'
import './App.css'
import Code3 from './components/Code3'

function NewCode(props) {
  return(
    <div className='fixed bottom-4 right-4 z-50'>
      <div onClick={props.onClick} className='rounded-full cursor-pointer bg-red-700 w-12 h-12 pb-0.5 flex items-center justify-center text-4xl md:hover:bg-red-600 active:bg-red-600 text-white '><span>+</span></div>
    </div>
  )
}

function NoCodes(props) {
  return(
    <div className='flex absolute inset-0'>
      <div className='m-auto '>
        <div className='p-4 px-12 max-w-xs text-4xl font-extrabold'><img className="rounded-3xl" src="./favicon.ico"></img><h1 className='mt-3'>CODE 3</h1></div>
        <div className='mt-12 text-gray-500 text-lg'>Click <span className='border border-gray-500 rounded-full w-6 h-6 text-2xl translate-y-0.5 tracking-tighter justify-center items-center inline-flex'>+</span> to Start</div>
      </div>
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
    console.log('Code added')
  }

  function handleDeleteCode(codeKey) {
    var filteredCodes = codes.filter(function(c) { return c !== codeKey })
    window.localStorage.removeItem("code3_"+codeKey)
    window.localStorage.setItem("code3List", JSON.stringify(filteredCodes))
    setCodes(filteredCodes)
    console.log('Code deleted')
  }

  // when we initially load, scroll to the top to 'undo' any scrolling that the
  // creation of each of the <code3>'s below did by themselves
  useEffect( () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [])

  if (codes.length === 0) {
    return(
      <div>
        <NoCodes />
        <NewCode onClick={handleNewCode}/>
      </div>
    )
  } else {
    return (
      <div className='grid lg:grid-cols-2 py-6 gap-6'>
        <NewCode onClick={handleNewCode}/>
        {
          codes.map((code) => (
            <div key={code} className='w-full flex flex-col items-stretch'>
              <Code3 id={"code-"+code.toString()} codeId={code} handleDelete={(e) => handleDeleteCode(code)} />
              <button className='bg-white border border-gray-200 text-gray-300 active:text-white md:hover:border-red-700 md:hover:bg-red-700 md:hover:text-white active:border-red-700 active:bg-red-700 px-3 py-2 rounded-b-2xl w-full' onClick={(e) => handleDeleteCode(code)}>Delete</button>
            </div>
          ))
        }
      </div>
    )
  }
}

export default App
