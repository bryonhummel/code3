import React, { useState } from 'react';

// https://flowbite.com/docs/components/timeline/

function BlueSquare() {
    return ( <span className='text-blue-800'>■</span>  );
}
function BlackDiamond() {
    return ( <span className='text-black text-xl pb-0.5'>◆</span>  );
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

    var symb = NoneRun()
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
            <button onClick={handleClick} className='border w-full text-left px-3 py-1 rounded-md md:hover:bg-gray-100 active:bg-gray-100'><span className='w-5 inline-block'>{symb}</span>{props.name}</button>
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
    const handleOnClick = timestamp != null ? null : props.handleOnClick

    return(
    <li className={`ml-5 mb-2 p-2 rounded-md ${timestamp == null ? 'cursor-pointer md:hover:bg-gray-100 border active:bg-gray-100 border-gray-200':'border border-white'}`} onClick={handleOnClick}>
        <span className={`absolute flex items-center justify-center w-6 h-6 ${ timestamp ? 'bg-gray-200' : 'bg-white'} border rounded-full -start-3 ring-8 ring-white`}>
        <span className='text-gray-800'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" data-slot="icon" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </span>
        </span>
        <h4 className="flex items-center mb-1 text-md font-semibold text-gray-900">{text}</h4>
        <time className="block mb-2 text-sm font-normal leading-none text-gray-700">{timestamp != null ? PrintableTimestamp(timestamp) : '--:--'}</time>
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
    return( <button className='border border-white rounded-md ml-0.5 px-2 py-1.5 text-gray-200 sm:hover:bg-gray-100 active:bg-gray-100' onClick={props.handleClick}>
        <svg className='w-4 h-4 fill-gray-400 text-gray-200' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z"/>
        </svg>
        </button>)
}

function EmsButton(props) {
    return( <button className=' fill-red-700 sm:hover:fill-white active:fill-white flex items-center border border-red-700 rounded-md px-2 py-0.5 text-red-700 sm:hover:bg-red-600 sm:hover:border-red-600 sm:hover:text-white active:text-white active:bg-red-600 active:border-red-600 text-base' onClick={props.handleClick}>
    <svg className='w-5 h-5  fill-inherit' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.5562 14.5477L15.1007 15.0272C15.1007 15.0272 14.0181 16.167 11.0631 13.0559C8.10812 9.94484 9.1907 8.80507 9.1907 8.80507L9.47752 8.50311C10.1841 7.75924 10.2507 6.56497 9.63424 5.6931L8.37326 3.90961C7.61028 2.8305 6.13596 2.68795 5.26145 3.60864L3.69185 5.26114C3.25823 5.71766 2.96765 6.30945 3.00289 6.96594C3.09304 8.64546 3.81071 12.259 7.81536 16.4752C12.0621 20.9462 16.0468 21.1239 17.6763 20.9631C18.1917 20.9122 18.6399 20.6343 19.0011 20.254L20.4217 18.7584C21.3806 17.7489 21.1102 16.0182 19.8833 15.312L17.9728 14.2123C17.1672 13.7486 16.1858 13.8848 15.5562 14.5477Z" ></path> <path d="M13.2595 1.87983C13.3257 1.47094 13.7122 1.19357 14.1211 1.25976C14.1464 1.26461 14.2279 1.27983 14.2705 1.28933C14.3559 1.30834 14.4749 1.33759 14.6233 1.38082C14.9201 1.46726 15.3347 1.60967 15.8323 1.8378C16.8286 2.29456 18.1544 3.09356 19.5302 4.46936C20.906 5.84516 21.705 7.17097 22.1617 8.16725C22.3899 8.66487 22.5323 9.07947 22.6187 9.37625C22.6619 9.52466 22.6912 9.64369 22.7102 9.72901C22.7197 9.77168 22.7267 9.80594 22.7315 9.83125L22.7373 9.86245C22.8034 10.2713 22.5286 10.6739 22.1197 10.7401C21.712 10.8061 21.3279 10.53 21.2601 10.1231C21.258 10.1121 21.2522 10.0828 21.2461 10.0551C21.2337 9.9997 21.2124 9.91188 21.1786 9.79572C21.1109 9.56339 20.9934 9.21806 20.7982 8.79238C20.4084 7.94207 19.7074 6.76789 18.4695 5.53002C17.2317 4.29216 16.0575 3.59117 15.2072 3.20134C14.7815 3.00618 14.4362 2.88865 14.2038 2.82097C14.0877 2.78714 13.9417 2.75363 13.8863 2.7413C13.4793 2.67347 13.1935 2.28755 13.2595 1.87983Z"></path> <path fillRule="evenodd" clipRule="evenodd" d="M13.4857 5.3293C13.5995 4.93102 14.0146 4.7004 14.4129 4.81419L14.2069 5.53534C14.4129 4.81419 14.4129 4.81419 14.4129 4.81419L14.4144 4.81461L14.4159 4.81505L14.4192 4.81602L14.427 4.81834L14.4468 4.8245C14.4618 4.82932 14.4807 4.8356 14.5031 4.84357C14.548 4.85951 14.6074 4.88217 14.6802 4.91337C14.8259 4.97581 15.0249 5.07223 15.2695 5.21694C15.7589 5.50662 16.4271 5.9878 17.2121 6.77277C17.9971 7.55775 18.4782 8.22593 18.7679 8.7154C18.9126 8.95991 19.009 9.15897 19.0715 9.30466C19.1027 9.37746 19.1254 9.43682 19.1413 9.48173C19.1493 9.50418 19.1555 9.52301 19.1604 9.53809L19.1665 9.55788L19.1688 9.56563L19.1698 9.56896L19.1702 9.5705C19.1702 9.5705 19.1707 9.57194 18.4495 9.77798L19.1707 9.57194C19.2845 9.97021 19.0538 10.3853 18.6556 10.4991C18.2607 10.6119 17.8492 10.3862 17.7313 9.99413L17.7276 9.98335C17.7223 9.96832 17.7113 9.93874 17.6928 9.89554C17.6558 9.8092 17.5887 9.66797 17.4771 9.47938C17.2541 9.10264 16.8514 8.53339 16.1514 7.83343C15.4515 7.13348 14.8822 6.73078 14.5055 6.50781C14.3169 6.39619 14.1757 6.32909 14.0893 6.29209C14.0461 6.27358 14.0165 6.26254 14.0015 6.25721L13.9907 6.25352C13.5987 6.13564 13.3729 5.72419 13.4857 5.3293Z"></path> </g></svg>
    &nbsp;EMS
    </button>)
}

function PrintableTimestamp(timestampString) {
    var splitTimestamp = timestampString.split(":")
    // only print the hours and minutes (omit any trailing :00 seconds if it exists)
    return `${splitTimestamp[0]}:${splitTimestamp[1]}`
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

    var timelineEntryData = {
        "onSceneTs": {
            timestamp: props.onSceneTs,
            text: "On Scene",
            handleOnClick: props.handleOnSceneClick,
        },
        "sceneClearTs": {
            timestamp: props.sceneClearTs,
            text: "Scene Clear",
            handleOnClick: props.handleSceneClearClick,
        },
        "emsCalledTs": {
            timestamp: props.emsCalledTs,
            text: "EMS Called",
            handleOnClick: props.handleEmsCalledClick,
        },
        "emsArrivedTs": {
            timestamp: props.emsArrivedTs,
            text: "EMS Arrived",
            handleOnClick: props.handleEmsArrivedClick,
        }
    }

    // gather and sort the timeline entries we want to display (either ones which have timestamps or those which need clicked still)
    // those with timestamps set will be at the top of the list (in time sorted order) and those null remaining will be at the bottom
    // in the priority order indicated by the default value
    var entries = {
        "onSceneTs": props?.onSceneTs ? props.onSceneTs.replaceAll(':',"") : 10000001,
        "sceneClearTs": props?.sceneClearTs ? props.sceneClearTs.replaceAll(':',"") : 10000002,
    }
    if (props?.emsCalledTs) {
        entries["emsCalledTs"] = props?.emsCalledTs ? props.emsCalledTs.replaceAll(':',"") : 10000003
        entries["emsArrivedTs"] = props?.emsArrivedTs ? props.emsArrivedTs.replaceAll(':',"") : 10000004
    }
    console.log(`Entries: ${JSON.stringify(entries)}`)
    var orderedEntries = Object.entries(entries).sort((a,b) => a[1] - b[1]).map(el=>el[0])
    console.log(`Sorted: ${orderedEntries}`)

    return(
    <div>
        <ol className="m-10 relative border-s border-gray-200 text-left">                  
            <li className="mb-7 ms-7">            
                <span className=" absolute flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full -start-3 inset-1 ring-8 ring-white ">
                    <RunSymbol difficulty={props.runInfo.difficulty}/>
                </span>
                <div className='flex items-center justify-between mb-2 text-lg font-semibold text-gray-900'>
                    <h3 className="">{props.runInfo.name}<EditButton handleClick={props.handleEditRunClick}/></h3>
                    {!(props?.emsCalledTs) && <EmsButton handleClick={props.handleEmsCalledClick}/>}
                </div>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-700">{PrintableTimestamp(props.runInfo.timestamp)}</time>
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
            {
                orderedEntries.map((key) => (
                    <TimelineEntry key={key} handleOnClick={timelineEntryData[key].handleOnClick} text={timelineEntryData[key].text} timestamp={timelineEntryData[key].timestamp} />        
                ))
            }
        </ol>
    </div>
    )
}

function getTimestamp() {
    var ts = new Date()
    ts = `${ts.getHours()}:${ts.getMinutes().toString().padStart(2,'0')}:${ts.getSeconds().toString().padStart(2,'0')}`
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

    function handleEmsCalledClick(){
        const persistedState = window.localStorage.getItem("code3_"+props.codeId)
        var newState = persistedState != null ? JSON.parse(persistedState) : {}
        newState.emsCalledTs = getTimestamp()
        window.localStorage.setItem("code3_"+props.codeId, JSON.stringify(newState))
        setCode3State(newState)
    }

    function handleEmsArrivedClick(){
        const persistedState = window.localStorage.getItem("code3_"+props.codeId)
        var newState = persistedState != null ? JSON.parse(persistedState) : {}
        newState.emsArrivedTs = getTimestamp()
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
                emsCalledTs={code3State?.emsCalledTs}
                emsArrivedTs={code3State?.emsArrivedTs}
                handleOnSceneClick={handleOnSceneClick}
                handleSceneClearClick={handleSceneClearClick}
                handleTagListToggle={handleTagListToggle}
                handleEditRunClick={handleEditRunClick}
                handleEmsCalledClick={handleEmsCalledClick}
                handleEmsArrivedClick={handleEmsArrivedClick} /> }
        </div>
     );
}

export default Code3;
