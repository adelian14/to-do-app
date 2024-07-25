import React, { useEffect, useRef, useState } from 'react';
import { data } from '../logic/data';
import Task from './Task';
import Completion from './Completion';

export default function Home() {
    let dataObj = new data();
    dataObj.init();
    let [toDoList, setToDoList] = useState([...dataObj.toDoList]);
    let [cats, setCats] = useState([...dataObj.getCats()]);
    let [currentCat, setCurrentCat] = useState('');
    let [inputRows, setInputRows] = useState(1);
    let [status, setStatus] = useState(dataObj.getCompletedTasksByCat());
    let taskInput = useRef();
    let catInput = useRef();
    let filterByCat = useRef();
    let mainDisplayStyle = {
        display: toDoList.length==0?'none':'block'
    }
    let emptyDisplayStyle = {
        display: toDoList.length > 0?'none':'block'
    }
    useEffect(() => {
        setCurrentCat(filterByCat.current.value);
    }, [cats]);
    useEffect(() => {
        setStatus(dataObj.getCompletedTasksByCat());
    }, [toDoList]);
    function expandInput(e) {
        let s = e.target.value;
        let arr = s.split('\n');
        setInputRows(Math.min(5, arr.length));
    }
    function addItem() {
        dataObj.addToDoItem(taskInput.current.value, catInput.current.value);
        setToDoList([...dataObj.toDoList]);
        setCats([...dataObj.getCats()]);
        taskInput.current.value = '';
        catInput.current.value = '';
    }
    function changeCat(e) {
        setCurrentCat(e.target.value);
        setToDoList([...dataObj.filterByCat(e.target.value)]);
    }
    return (
        <>
            <div className='flex items-baseline xl:px-36 lg:px-24 md:px-16 px-8 pt-20 pb-2 flex-wrap'>
                <div className='lg:w-2/3 w-full px-3 py-2 m-auto'>
                    <textarea ref={taskInput} aria-expanded={true} rows={inputRows} onChange={expandInput} className='resize-none outline-0 border-2 border-gray-800 focus-visible:border-blue-600 w-full py-2 px-3' placeholder='Task Description'></textarea>
                </div>
                <div className='xl:w-1/4 lg:w-1/6 md:w-2/3 w-full px-3 py-2'>
                    <input ref={catInput} type="text" className='outline-0 border-2 border-gray-800 focus-visible:border-blue-600 w-full py-2 px-3' placeholder='Task Category (optional)' />
                </div>
                <div className='xl:w-1/12 lg:w-1/6 md:w-1/3 w-full px-3 py-2'>
                    <button onClick={addItem} className='outline-0 border-2 border-blue-600 w-full py-2 px-3 bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 duration-150 text-white font-medium' placeholder='Category (optional)'>
                        Add
                    </button>
                </div>
            </div>
            <div className='xl:px-36 lg:px-24 md:px-16 px-6 py-5'>
                <div className='flex items-baseline bg-slate-200 flex-wrap rounded-md py-2'>
                    <div className='lg:w-2/3 w-full px-6 py-2 m-auto'>
                        <p className='font-medium text-lg'>Your Tasks<span className='font-normal text-gray-600'> / {currentCat}</span></p>
                    </div>
                    <div className='lg:w-1/3 w-full px-6 py-2'>
                        <select onChange={changeCat} ref={filterByCat} className='rounded-md bg-inherit outline-0 border-2 border-gray-800 focus-visible:border-blue-600 w-full py-2 px-3'>
                            {cats.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                </div>
            </div>
            <div className='xl:px-36 lg:px-24 md:px-16 px-6 pb-5 flex-wrap' style={mainDisplayStyle}>
                <div className='bg-slate-200 rounded-md py-2 overflow-x-auto'>
                    <div className={'min-w-[720px] flex flex-wrap px-4 py-2 border-b font-medium border-opacity-50 border-gray-500'}>
                        <p className='px-2 w-[2.5%]'>#</p>
                        <p className='px-2 w-[55%]'>Task description</p>
                        <p className='px-2 w-[13.5%]'>Category</p>
                        <p className='px-2 w-[13.5%] text-center'>Date</p>
                        <p className='px-2 w-[7.5%] text-center'>Status</p>
                        <p className='px-2 w-[7.5%] text-center'>Delete</p>
                    </div>
                    {toDoList.map((task, index) => <Task key={task.id} cat={currentCat} taskId={task.id} index={index + 1} isEnd={index + 1 == toDoList.length} setToDoList={setToDoList} setCats={setCats} />)}
                </div>
            </div>
            <div className='xl:px-36 lg:px-24 md:px-16 px-6 flex-wrap overflow-x-auto mb-24' style={mainDisplayStyle}>
                <div className='bg-slate-200 rounded-md py-2 overflow-x-auto'>
                    <div className='w-full px-6 pt-2 pb-8 m-auto'>
                        <p className='font-medium text-lg'>Your Progress</p>
                    </div>
                    {status.map((item, i)=>
                        <Completion key={i} data={item}/>
                    )}
                </div>
            </div>
            <div className='xl:px-36 lg:px-24 md:px-16 px-6 flex-wrap overflow-x-auto mb-24' style={emptyDisplayStyle}>
                <div className='bg-slate-200 rounded-md py-2 overflow-x-auto'>
                    <div className='w-full px-6 pt-2 pb-2 m-auto flex items-center justify-center'>
                        <p className='font-medium text-lg'>Your tasks will be shown here</p>
                    </div>
                </div>
            </div>
        </>
    )
}
