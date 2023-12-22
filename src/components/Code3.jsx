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
            <button onClick={handleClick} className='border w-full text-left px-3 py-1 rounded-md md:hover:bg-gray-100 active:bg-gray-100'>{symb} {props.name}</button>
        </div>
    )
}

function TimelineToolbar(props) {

    return(
        <div className='p-7 grid sm:grid-cols-2 gap-6'>
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
                    <li><RunButton onClick={props.handleRunClick} difficulty="blue" name="Easy Rider"/></li>
                    <li><RunButton onClick={props.handleRunClick} difficulty="blue" name="North"/></li>
                    <li><RunButton onClick={props.handleRunClick} difficulty="blue" name="Mic Mac"/></li>
                </ul>
            </div>
            <div className='flex'>
                <div className='w-8 flex items-center justify-center bg-gray-200 font-bold text-gray-500 mr-2 my-1 rounded-md'>
                    <span className='rotate-90'>Apple&nbsp;Bowl</span>
                </div>
                <ul className="text-left flex-1 flex-col">
                    <li><RunButton onClick={props.handleRunClick} difficulty="blue" name="Chicane"/></li>
                    <li><RunButton onClick={props.handleRunClick} difficulty="black" name="Terrain Park"/></li>
                    <li><RunButton onClick={props.handleRunClick} difficulty="black" name="Roughshod"/></li>
                    <li><RunButton onClick={props.handleRunClick} difficulty="blue" name="Apple Bowl"/></li>
                    <li><RunButton onClick={props.handleRunClick} difficulty="black" name="Racer's Alley"/></li>
                </ul>
            </div>
            <div className=''>
                <ul className="text-left">
                    <li><RunButton onClick={props.handleRunClick} difficulty="na" name="Chalet"/></li>
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
    <li className={`ml-5 mb-2 p-2 rounded-md ${timestamp == null ? 'cursor-pointer md:hover:bg-gray-100 border active:bg-gray-100 border-gray-200':'border border-white'}`} onClick={handleOnClick}>
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

const tagLists = {
    "default" : ['top', 'middle', 'bottom', 'left', 'right', 'glades' ],
    "Kids Zone" : ['top', 'middle', 'bottom', 'left', 'right', 'carpet' ],
    "Littlefoot" : ['top', 'middle', 'bottom', 'left', 'right', 'carpet' ],
    "Rabbitsfoot" : ['top', 'middle', 'bottom', 'left', 'right', 'carpet' ],
    "Bearsfoot" : ['top', 'middle', 'bottom', 'left', 'right', 'carpet' ],
    "Tenderfoot" : ['top', 'middle', 'bottom', 'left', 'right', 'glades', 'chairlift' ],
    "North" : ['top', 'middle', 'bottom', 'left', 'right', 'glades', 'chairlift' ],
    "Roughshod" : ['top', 'middle', 'bottom', 'left', 'right', 'moguls' ],
    "Apple Bowl" : ['top', 'middle', 'bottom', 'left', 'right', 'chairlift' ],
    "Terrain Park": ['top', 'bottom', 'middle', 'large jump', 'small jump', 'rail', 'box', 'other'],
    "Chalet": ['lobby', 'rentals', 'cafeteria', 'silvertip', 'kitchen', 'offices', 'other' ],
    "Other": ['out of bounds', 'lot 1', 'lot 2', 'maintenance shop', 'other'],
}

function EditButton(props) {
    return( <button className='border border-white rounded-md px-2 py-1.5 text-gray-200 sm:hover:bg-gray-100 active:bg-gray-100' onClick={props.handleClick}>
        <svg className='w-4 h-4 stroke-current text-gray-200' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z" fill="#000000"/>
        </svg>
        </button>)
}

function Timeline(props) {

    const [showTagList, setShowTagList] = useState(false)

    const tagList = tagLists?.[props.runInfo.name] || tagLists.default
    var filteredTagList = tagList.filter(function(e) { return !props.tagList.includes(e) })

    function handleShowTagList() {
        setShowTagList(!showTagList===true)
    }

    var displayTagList = showTagList || props.tagList.length === 0
    var displayTagListToggle = props.tagList.length > 0

    return(
    <div>
        <ol className="m-10 relative border-s border-gray-200 text-left">                  
            <li className="mb-7 ms-7">            
                <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full -start-3 ring-8 ring-white ">
                    <RunSymbol difficulty={props.runInfo.difficulty}/>
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">{props.runInfo.name}&nbsp;<EditButton handleClick={props.handleEditRunClick}/></h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-700">{props.runInfo.timestamp}</time>
                <div className="">
                    {
                        props.tagList.map((name) => (
                            <div key={name} onClick={(e) => props.handleTagListToggle(name)} className="inline-flex bg-gray-100 text-gray-800 text-sm my-2 font-medium  px-4 py-1.5 rounded-full me-3 md:hover:bg-gray-50 active:bg-gray-50 border border-gray-200 cursor-pointer">{name}</div>
                        ))
                    }
                    { 
                        displayTagListToggle &&
                        <div onClick={(e) => handleShowTagList()} className='inline-flex border rounded-full text-sm px-4 py-1.5 text-gray-800 md:hover:bg-gray-100 active:bg-gray-100 cursor-pointer'>{showTagList? '-': '+'}</div>
                    }
                    {
                        <div></div>
                    }
                    {
                        displayTagList &&
                            filteredTagList.map((name) => (
                                <div key={name} onClick={(e) => {props.handleTagListToggle(name); setShowTagList(false)}} className="inline-flex bg-white border border-dashed my-2 border-gray-200 text-gray-800 text-sm font-medium me-3 px-4 py-1.5 rounded-full md:hover:bg-gray-100 active:bg-gray-100 cursor-pointer">{name}</div>
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
        newCode3State.run = {name: name, difficulty: difficulty, timestamp: code3State?.run?.timestamp || getTimestamp()}
        window.localStorage.setItem("code3_"+props.codeId, JSON.stringify(newCode3State))
        setCode3State(newCode3State)
    }

    function handleEditRunClick() {
        var newCode3State = JSON.parse(JSON.stringify(code3State));
        newCode3State.run = {timestamp: code3State.run.timestamp}
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

    function handleTagListToggle(name) {
        var filteredArray = []
        if (code3State?.tagList && code3State.tagList.includes(name)) {
            filteredArray = code3State.tagList.filter(function(e) { return e !== name })
        } else {
            filteredArray = code3State?.tagList != null ? [...code3State.tagList] : []
            filteredArray.push(name)
        }
        const persistedState = window.localStorage.getItem("code3_"+props.codeId)
        var newState = persistedState != null ? JSON.parse(persistedState) : {}
        newState.tagList = filteredArray
        window.localStorage.setItem("code3_"+props.codeId, JSON.stringify(newState))
        setCode3State(newState)
    }

    return ( 
        <div className='flex-1 border-t border-x border-gray-200 rounded-t-2xl bg-white pb-1'>
            { code3State?.run?.name == null && <TimelineToolbar handleRunClick={handleRunClick}/> }
            { code3State?.run?.name != null && <Timeline runInfo={code3State?.run} 
                onSceneTs={code3State?.onSceneTs}
                sceneClearTs={code3State?.sceneClearTs}
                tagList={code3State?.tagList != null ? code3State?.tagList : [] }
                handleOnSceneClick={handleOnSceneClick}
                handleSceneClearClick={handleSceneClearClick}
                handleTagListToggle={handleTagListToggle}
                handleEditRunClick={handleEditRunClick} /> }
                {/* <button className='bg-white border border-gray-300 text-gray-300 md:hover:text-red-600 active:text-red-600 md:hover:border-red-600 active:border-red-600 px-3 py-1 mb-4 rounded-md' onClick={props.handleDelete}>Delete</button> */}
        </div>
     );
}

export default Code3;
