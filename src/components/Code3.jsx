import React from 'react';

// https://flowbite.com/docs/components/timeline/

function RunButton(props){

    var symb = '--'
    if (props.scale === "green") {
        symb = '●' // green circle
    } else if (props.scale === "blue") {
        symb = '◆' // blue square
    } else if (props.scale === "black") {
        symb = '■' // black diamond
    }

    console.log(symb)

    return(
        <div className='py-1'>
            <button className='border w-full text-left px-3 py-1 rounded-md'>{symb} {props.name}</button>
        </div>
    )
}

function TimelineToolbar(props) {
    return(
        <div className='border border-dashed m-2 rounded-md bg-white grid sm:grid-cols-2 md:grid-cols-3 '>
            <div className='mx-10 my-7'>
                <ul class="text-left">
                    <li><RunButton scale="green" name="Kid Zone"/></li>
                    <li><RunButton scale="green" name="Littlefoot"/></li>
                    <li><RunButton scale="green" name="Tenderfoot"/></li>
                    <li><RunButton scale="green" name="Rabbitsfoot"/></li>
                    <li><RunButton scale="green" name="Bearsfoot"/></li>
                </ul>
            </div>
            <div className='mx-10 my-7'>
                <ul class="text-left">
                    <li><RunButton scale="black" name="Camelshump"/></li>
                    <li><RunButton scale="blue" name="Easyrider"/></li>
                    <li><RunButton scale="blue" name="North"/></li>
                    <li><RunButton scale="blue" name="Mic Mac"/></li>
                </ul>
            </div>
            <div className='mx-10 my-7'>
                <ul class="text-left">
                    <li><RunButton scale="blue" name="Chicane"/></li>
                    <li><RunButton scale="blue" name="Roughshod"/></li>
                    <li><RunButton scale="blue" name="Applebowl"/></li>
                    <li><RunButton scale="black" name="Racers Alley"/></li>
                </ul>
            </div>
            <div className='mx-10 mb-7'>
                <ul class="text-left">
                    <li><RunButton scale="na" name="Chalet"/></li>
                </ul>
            </div>
            <div className='mx-10 mb-7'>
                <ul class="text-left">
                    <li><RunButton scale="na" name="Other"/></li>
                </ul>
            </div>
        </div>
    )
}

function Timeline(props) {
    return(
    <div  className='border border-dashed m-2 rounded-md bg-white'>
    <ol class="m-10 relative border-s border-gray-200 dark:border-gray-700 text-left">                  
    <li class="mb-7 ms-6">            
        <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <span className='text-black'>■</span>
        </span>
        <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">North</h3>
        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">21:13</time>
        <div className="mb-4">
        <div class="inline-flex bg-blue-100 text-blue-800 text-sm my-0.5 font-medium  px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 me-3">Bryon</div>
        <div class="inline-flex bg-blue-100 text-blue-800 text-sm my-0.5 font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 me-3">Jenna</div>
        <div class="inline-flex text-gray-300 text-sm my-0.5 font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 me-3">⇄</div>
        </div>
        <div class="inline-flex bg-white border border-dashed my-0.5 border-blue-100 text-blue-800 text-sm font-medium me-3 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Mike</div>
        <div class="inline-flex bg-white border border-dashed my-0.5 border-blue-100 text-blue-800 text-sm font-medium me-3 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Brigitte</div>
        <div class="inline-flex bg-white border border-dashed my-0.5 border-blue-100 text-blue-800 text-sm font-medium me-3 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Scott</div>
        <div class="inline-flex bg-white border border-dashed my-0.5 border-blue-100 text-blue-800 text-sm font-medium me-3 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">JP</div>
        <div class="inline-flex bg-white border border-dashed my-0.5 border-blue-100 text-blue-800 text-sm font-medium me-3 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Chris</div>
        <div class="inline-flex bg-white border border-dashed my-0.5 border-blue-100 text-blue-800 text-sm font-medium me-3 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Kim</div>
        <div class="inline-flex bg-white border border-dashed my-0.5 border-blue-100 text-blue-800 text-sm font-medium me-3 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Bill</div>
    </li>
    <li class="mb-7 ms-6">            
        <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
        <span className='text-blue-800'>⏲</span>
        </span>
        <h4 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">On Scene</h4>
        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">21:15</time>
    </li>

    <li class="mb-7 ms-6">            
        <span class="absolute flex items-center justify-center w-6 h-6 bg-white border rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
        <span className='text-blue-800'>⏲</span>
        </span>
        <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">Scene Clear</h3>
        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">--:--</time>
        
    </li>
    </ol>
    </div>
    )
}

function Timeline2(props) {
    return(
    <div className='border border-dashed m-2 rounded-md bg-white'>
    <ol class="m-10 relative border-s border-gray-200 dark:border-gray-700 text-left">                  
    <li class="mb-7 ms-6">            
        <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
            </svg>
        </span>
        <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">North</h3>
        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">21:13</time>
        <span class="bg-blue-100 text-blue-800 text-sm font-medium  px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 me-3">Bryon</span>
        <span class="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 me-3">Jenna</span>
        <span class="me-3">&#171;</span>
        <span class="bg-white border border-blue-100 text-blue-800 text-sm font-medium me-3 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Mike</span>
        <span class="bg-white border border-blue-100 text-blue-800 text-sm font-medium me-3 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Bill</span>
    </li>
    <li class="mb-7 ms-6">            
        <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
            </svg>
        </span>
        <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">On Scene</h3>
        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">21:15</time>
        
    </li>

    <li class="mb-7 ms-6">            
        <span class="absolute flex items-center justify-center w-6 h-6 bg-white border rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
            </svg>
        </span>
        <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">Scene Clear</h3>
        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">--:--</time>
        
    </li>
    </ol>
    </div>
    )
}


function Code3() {
    return ( 
        <div>
            <TimelineToolbar/>
            <Timeline/>
            <Timeline2/>
        </div>
     );
}

export default Code3;
