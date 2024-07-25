import React, { useState } from 'react';
import { data } from '../logic/data';

export default function Task({ taskId, index, isEnd, setToDoList, cat, setCats }) {
    let dataObj = new data();
    dataObj.init();
    let task = dataObj.getTaskById(taskId);
    function markTask() {
        dataObj.markToDoItem(taskId);
        setToDoList(dataObj.filterByCat(cat));
    }
    function deleteTask(){
        dataObj.deleteToDoItem(taskId);
        setCats(dataObj.getCats());
        setToDoList(dataObj.filterByCat(cat));
    }
    return (
        <div className={`min-w-[720px] flex flex-wrap px-4 py-2 ${!isEnd ? 'border-b border-opacity-50 border-gray-500' : ''}`}>
            <p className='px-2 w-[2.5%] font-medium'>{index}</p>
            <p className='px-2 w-[55%]'>{task.desc}</p>
            <p className='px-2 w-[13.5%] line-clamp-1'>{task.cat?task.cat:'___'}</p>
            <p className='px-2 w-[13.5%] line-clamp-1 text-center'>{task.date}</p>
            <p className='px-2 w-[7.5%] text-center'><input className='size-4' onChange={markTask} type="checkbox" checked={task.completed} /></p>
            <p className='px-2 w-[7.5%] text-center'><i className='fas fa-trash text-red-500 hover:text-red-300 cursor-pointer duration-150' onClick={deleteTask}></i></p>
        </div>
    )
}