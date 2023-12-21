import React, { useState } from 'react';

// https://flowbite.com/docs/components/timeline/

function BlueSquare() {
    return ( <span className='text-blue-800'>■</span>  );
}
function BlackDiamond() {
    return ( <span className='text-black pb-0.5'>◆</span>  );
}
function GreenCircle() {
    return ( <span className='text-green-600'>●</span>  );
}
function NoneRun() {
    return ( <span className='text-black'>-</span>  );
}


function RunSymbol(props){
    var symb = NoneRun()
    if (props.difficulty === "green") {
        symb = GreenCircle()
    } else if (props.difficulty === "blue") {
        symb = BlueSquare()
    } else if (props.difficulty === "black") {
        symb = BlackDiamond()
    }
    return symb
}

function RunButton(props){

    var symb = '--'
    if (props.difficulty === "green") {
        symb = GreenCircle()
    } else if (props.difficulty === "blue") {
        symb = BlueSquare()
    } else if (props.difficulty === "black") {
        symb = BlackDiamond()
    }

    function handleClick() {
        props.onClick(props.name, props.difficulty)
    }

    return(
        <div className='py-1'>
            <button onClick={handleClick} className='border w-full text-left px-3 py-1 rounded-md hover:bg-gray-100'>{symb} {props.name}</button>
        </div>
    )
}

function TimelineToolbar(props) {

    return(
        <div className='p-7 grid sm:grid-cols-2 md:grid-cols-3 gap-6'>
            <div className='flex'>
                <div className='w-8 flex items-center justify-center bg-gray-200 font-bold text-gray-500 mr-2 my-1 rounded-md'>
                    <span className='rotate-90'>Tenderfoot</span>
                </div>
                <ul className="text-left flex-1 flex-col">
                    <li><RunButton onClick={props.handleRunClick} difficulty="green" name="Kids Zone"/></li>
                    <li><RunButton onClick={props.handleRunClick} difficulty="green" name="Littlefoot"/></li>
                    <li><RunButton onClick={props.handleRunClick} difficulty="green" name="Tenderfoot"/></li>
                    <li><RunButton onClick={props.handleRunClick} difficulty="green" name="Rabbitsfoot"/></li>
                    <li><RunButton onClick={props.handleRunClick} difficulty="green" name="Bearsfoot"/></li>
                </ul>
            </div>
            <div className='flex'>
                <div className='w-8 flex items-center justify-center bg-gray-200 font-bold text-gray-500 mr-2 my-1 rounded-md'>
                    <span className='rotate-90'>North</span>
                </div>
                <ul className="text-left flex-1 flex-col">
                    <li><RunButton onClick={props.handleRunClick} difficulty="black" name="Camels Hump"/></li>
                    <li><RunButton onClick={props.handleRunClick} difficulty="blue" name="Easyrider"/></li>
                    <li><RunButton onClick={props.handleRunClick} difficulty="blue" name="North"/></li>
                    <li><RunButton onClick={props.handleRunClick} difficulty="blue" name="Mic Mac"/></li>
                </ul>
            </div>
            <div className='flex'>
                <div className='w-8 flex items-center justify-center bg-gray-200 font-bold text-gray-500 mr-2 my-1 rounded-md'>
                    <span className='rotate-90'>Applebowl</span>
                </div>
                <ul className="text-left flex-1 flex-col">

                    <li><RunButton onClick={props.handleRunClick} difficulty="blue" name="Chicane"/></li>
                    <li><RunButton onClick={props.handleRunClick} difficulty="blue" name="Roughshod"/></li>
                    <li><RunButton onClick={props.handleRunClick} difficulty="blue" name="Applebowl"/></li>
                    <li><RunButton onClick={props.handleRunClick} difficulty="black" name="Racers Alley"/></li>
                </ul>
            </div>
            <div className=''>
                <ul className="text-left">
                    <li><RunButton onClick={props.handleRunClick} difficulty="na" name="Chalet"/></li>
                </ul>
            </div>
            <div className=''>
                <ul className="text-left">
                    <li><RunButton onClick={props.handleRunClick} difficulty="na" name="Other"/></li>
                </ul>
            </div>
        </div>
    )
}

function TimelineEntry(props) {
    const timestamp = props.timestamp
    const text = props.text
    const handleOnClick = props.handleOnClick

    return(
    <li className={`ml-5 mb-2 p-2 rounded-md ${timestamp == null ? 'cursor-pointer hover:bg-gray-100 border border-gray-200':'border border-white'}`} onClick={handleOnClick}>
        <span className={`absolute flex items-center justify-center w-6 h-6 ${ timestamp ? 'bg-gray-200' : 'bg-white'} border rounded-full -start-3 ring-8 ring-white`}>
        <span className='text-gray-800'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" data-slot="icon" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </span>
        </span>
        <h4 className="flex items-center mb-1 text-lg font-semibold text-gray-900">{text}</h4>
        <time className="block mb-2 text-sm font-normal leading-none text-gray-700">{timestamp != null ? timestamp : '--:--'}</time>
    </li>
    )
}

function Timeline(props) {

    const [showTeamList, setShowTeamList] = useState(false)
    const teamList = ['Mike', 'Bryon', 'Brigitte', 'Scott', 'JP', 'Chris', 'Kim', 'Bill', 'Jenna']
    var filteredTeamList = teamList.filter(function(e) { return !props.firstOn.includes(e) })

    function handleShowTeamList() {
        console.log(`toggling: ${showTeamList}`)
        setShowTeamList(!showTeamList===true)
    }

    var displayTeamList = showTeamList || props.firstOn.length === 0
    var displayTeamListToggle = props.firstOn.length > 0

    return(
    <div>
        <ol className="m-10 relative border-s border-gray-200 text-left">                  
            <li className="mb-7 ms-7">            
                <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full -start-3 ring-8 ring-white ">
                    <RunSymbol difficulty={props.runInfo.difficulty}/>
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">{props.runInfo.name}</h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-700">{props.runInfo.timestamp}</time>
                <div className="">
                    {
                        props.firstOn.map((name) => (
                            <div key={name} onClick={(e) => props.handleFirstOnToggle(name)} className="inline-flex bg-gray-200 text-gray-800 text-sm my-0.5 font-medium  px-2.5 py-0.5 rounded me-3 hover:bg-gray-100 border border-gray-200 cursor-pointer">{name}</div>
                        ))
                    }
                    { 
                        displayTeamListToggle &&
                        <div onClick={(e) => handleShowTeamList()} className='inline-flex border rounded text-sm px-2.5 py-0.5 text-gray-800 hover:bg-gray-100 hover:text-gray-800 cursor-pointer'>{showTeamList? '-': '+'}</div>
                    }
                    {
                        <div></div>
                    }
                    {
                        displayTeamList &&
                            filteredTeamList.map((name) => (
                                <div key={name} onClick={(e) => {props.handleFirstOnToggle(name); setShowTeamList(false)}} className="inline-flex bg-white border border-dashed my-0.5 border-gray-200 text-gray-800 text-sm font-medium me-3 px-2.5 py-0.5 rounded hover:bg-gray-100 cursor-pointer">{name}</div>
                            ))
                    }
                </div>
            </li>
            <TimelineEntry handleOnClick={props.handleOnSceneClick} text='On Scene' timestamp={props?.onSceneTs} />
            <TimelineEntry handleOnClick={props.handleSceneClearClick} text='Scene Clear' timestamp={props?.sceneClearTs} />
        </ol>
    </div>
    )
}

function getTimestamp() {
    var ts = new Date()
    ts = `${ts.getHours()}:${ts.getMinutes().toString().padStart(2,'0')}`
    return ts
}

function Code3(props) {
    const [code3State, setCode3State] = useState(() => {
        const persistedState = window.localStorage.getItem("code3_"+props.codeId)
        return persistedState !== null ? JSON.parse(persistedState) : {}
    })

    function handleRunClick(name, difficulty) {
        var newCode3State = JSON.parse(JSON.stringify(code3State));
        newCode3State.run = {name: name, difficulty: difficulty, timestamp: getTimestamp()}
        window.localStorage.setItem("code3_"+props.codeId, JSON.stringify(newCode3State))
        setCode3State(newCode3State)
    }

    function handleOnSceneClick(){
        const persistedState = window.localStorage.getItem("code3_"+props.codeId)
        var newState = persistedState != null ? JSON.parse(persistedState) : {}
        newState.onSceneTs = getTimestamp()
        window.localStorage.setItem("code3_"+props.codeId, JSON.stringify(newState))
        setCode3State(newState)
    }

    function handleSceneClearClick(){
        const persistedState = window.localStorage.getItem("code3_"+props.codeId)
        var newState = persistedState != null ? JSON.parse(persistedState) : {}
        newState.sceneClearTs = getTimestamp()
        window.localStorage.setItem("code3_"+props.codeId, JSON.stringify(newState))
        setCode3State(newState)
    }

    function handleFirstOnToggle(name) {
        var filteredArray = []
        if (code3State?.firstOn && code3State.firstOn.includes(name)) {
            filteredArray = code3State.firstOn.filter(function(e) { return e !== name })
        } else {
            filteredArray = code3State?.firstOn != null ? [...code3State.firstOn] : []
            filteredArray.push(name)
        }
        const persistedState = window.localStorage.getItem("code3_"+props.codeId)
        var newState = persistedState != null ? JSON.parse(persistedState) : {}
        newState.firstOn = filteredArray
        window.localStorage.setItem("code3_"+props.codeId, JSON.stringify(newState))
        setCode3State(newState)
    }

    return ( 
        <div className='border border-gray-200 my-4 rounded-md bg-white'>
            { code3State?.run == null && <TimelineToolbar handleRunClick={handleRunClick}/> }
            { code3State?.run != null && <Timeline runInfo={code3State?.run} 
                onSceneTs={code3State?.onSceneTs}
                sceneClearTs={code3State?.sceneClearTs}
                firstOn={code3State?.firstOn != null ? code3State?.firstOn : [] }
                handleOnSceneClick={handleOnSceneClick}
                handleSceneClearClick={handleSceneClearClick}
                handleFirstOnToggle={handleFirstOnToggle} /> }
            <button className='bg-white border border-gray-300 text-gray-300 hover:text-red-600 hover:border-red-600 px-3 py-1 mb-4 rounded-md' onClick={props.handleDelete}>Delete</button>
        </div>
     );
}

export default Code3;
