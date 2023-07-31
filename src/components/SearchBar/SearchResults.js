import React from 'react'

export default function SearchResults({ show, showResult }) {
    return (
        <div className={`absolute left-0 right-0 bg-white rounded-lg z-[999] ${show ? "top-[47px]" : ""} ${showResult ? "top-[70px]" : ""}`}>
            <ul className='py-2'>
                <li className='text-dark font-semibold text-sm pr-4 pl-1 py-1 truncate whitespace-nowrap cursor-pointer ml-8'>
                    Những chủ đề phổ biến
                </li>
                <hr className='text-opacity-10 my-2 text-dark' />
                <li className='py-1 pl-1 pr-4 font-normal truncate cursor-pointer text-dark whitespace-nowrap'>
                    <div className='ml-8 truncate'>
                        số nguyên
                    </div>
                </li>
            </ul>
        </div>
    )
}
