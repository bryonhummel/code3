import React, { useState } from 'react';

// https://flowbite.com/docs/components/timeline/

function BlueSquare() {
    return ( <span className='text-blue-800'>■</span>  );
}
function BlackDiamond() {
    return ( <span className='text-black text-lg'>◆</span>  );
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
            <button onClick={handleClick} className='border w-full text-left px-3 py-1 rounded-md hover:bg-blue-100'>{symb} {props.name}</button>
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
        <ol className="m-10 relative border-s border-gray-200 dark:border-gray-700 text-left">                  
            <li className="mb-7 ms-7">            
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                    <RunSymbol difficulty={props.runInfo.difficulty}/>
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">{props.runInfo.name}</h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{props.runInfo.timestamp}</time>
                <div className="">
                    {props.firstOn.map((name) => (
                    <div key={name} onClick={(e) => props.handleFirstOnToggle(name)} className="inline-flex bg-blue-100 text-blue-800 text-sm my-0.5 font-medium  px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 me-3 hover:bg-white border border-blue-100 hover:border hover:border-dashed hover:border-blue-100 cursor-pointer">{name}</div>
                    ))}
                    { 
                        displayTeamListToggle &&
                        <div onClick={(e) => handleShowTeamList()} className='inline-flex border rounded text-sm px-2.5 py-0.5 text-gray-400 hover:bg-blue-100 hover:text-blue-900 cursor-pointer'>{showTeamList? '-': '+'}</div>
                    }
                    {
                        <div></div>
                    }
                    {
                        displayTeamList &&
                            filteredTeamList.map((name) => (
                                <div key={name} onClick={(e) => {props.handleFirstOnToggle(name); setShowTeamList(false)}} className="inline-flex bg-white border border-dashed my-0.5 border-blue-100 text-blue-800 text-sm font-medium me-3 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-100 cursor-pointer">{name}</div>
                            ))
                    }
                </div>
            </li>
            <li className="ml-5 p-4 rounded-md cursor-pointer hover:bg-blue-100" onClick={props.handleOnSceneClick}>
                <span className={`absolute flex items-center justify-center w-6 h-6 ${ props.onSceneTs ? 'bg-blue-100' : 'bg-white'} border rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900`}>
                <span className='text-blue-800'>⏲</span>
                </span>
                <h4 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">On Scene</h4>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{props.onSceneTs !== null ? props.onSceneTs : '--:--'}</time>
            </li>

            <li className="ml-5 p-4 rounded-md cursor-pointer hover:bg-blue-100" onClick={props.handleSceneClearClick}>
                <span className={`absolute flex items-center justify-center w-6 h-6 ${ props.sceneClearTs ? 'bg-blue-100' : 'bg-white'} border rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900`}>
                    <span className='text-blue-800'>⏲</span>
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">Scene Clear</h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{props.sceneClearTs !== null ? props.sceneClearTs : '--:--'}</time>
                
            </li>
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
    const [run, setRun] = useState(null);
    const [onSceneTs, setOnSceneTs] = useState(null);
    const [sceneClearTs, setSceneClearTs] = useState(null);
    const [firstOn, setFirstOn] = useState([])

    function handleRunClick(name, difficulty) {
        setRun({name: name, difficulty: difficulty, timestamp: getTimestamp()})
    }

    function handleOnSceneClick(){
        if (onSceneTs === null) {
            setOnSceneTs(getTimestamp())
        }
    }

    function handleSceneClearClick(){
        if (sceneClearTs === null) {
            setSceneClearTs(getTimestamp())
        }
    }

    function handleFirstOnToggle(name) {
        var filteredArray = []
        if (firstOn.includes(name)) {
            filteredArray = firstOn.filter(function(e) { return e !== name })
        } else {
            console.log(name)
            filteredArray = [...firstOn]
            filteredArray.push(name)
            
        }
        console.log(filteredArray)
        console.log(`setFirstOn ${firstOn} ${name} ${filteredArray}`)
        setFirstOn(filteredArray)
    }

    return ( 
        <div className='border border-dashed mt-4 rounded-md bg-white'>
            { run == null && <TimelineToolbar handleRunClick={handleRunClick}/> }
            { run !== null && <Timeline runInfo={run} 
                onSceneTs={onSceneTs}
                sceneClearTs={sceneClearTs}
                firstOn={firstOn}
                handleOnSceneClick={handleOnSceneClick}
                handleSceneClearClick={handleSceneClearClick}
                handleFirstOnToggle={handleFirstOnToggle} /> }
            <button className='bg-white border border-gray-300 text-gray-300 hover:text-red-600 hover:border-red-600 px-3 py-1 mb-4 rounded-md' onClick={props.handleDelete}>Delete</button>
        </div>
     );
}

export default Code3;
