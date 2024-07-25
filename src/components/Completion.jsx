import React from 'react'

export default function Completion({ data }) {
    let width = {
        width: data.completed * 100 / data.all + '%'
    }
    return (
        <div className='px-10 py-3 flex flex-wrap items-center min-w-[720px]'>
            <p className='w-2/12 text-lg font-medium'>{data.cat}</p>
            <div className="w-7/12 bg-slate-300 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full duration-500" style={width}></div>
            </div>
            <p className='w-3/12 font-medium ps-5'>{data.completed} Tasks completed out of {data.all}</p>
        </div>
    )
}
