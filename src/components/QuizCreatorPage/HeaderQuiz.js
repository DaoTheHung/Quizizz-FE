import Link from 'next/link'
import React, { useState } from 'react'

export default function HeaderQuiz() {
    const [showModal, setShowModal] = useState(false)
    return (
        <div className=''>
            {/*Modal xuất bản*/}
            {showModal && <div className='fixed top-0 z-10 left-0 w-screen flex flex-auto min-h-screen min-w-screen overflow-y-auto flex-col overscroll-contain bg-[#090909cc]'>
                <div className='flex bg-white flex-col gap-6 relative p-6 h-fit  md:min-h-0 md:mx-auto mt-[127px] md:w-1/4 md:rounded-lg'>
                    <div className='flex '>
                        <div className='flex items-center justify-center mr-3 rounded-full w-10 h-10 bg-lilac-faded text-lilac'>
                            <i className="fa-solid fa-triangle-exclamation text-[16px]"></i>
                        </div>
                        <div className='flex items-center font-sans font-semibold text-base text-dark-6 '>
                            Quiz chưa hoàn tất
                        </div>

                    </div>
                    <div className='flex w-full h-auto min-h-0'>
                        <div className='text-sm text-dark-4'>
                            A quiz needs to have at least one question to save.
                        </div>
                    </div>
                    <div className='flex flex-grow gap-2 justify-end'>
                        <button onClick={() => setShowModal(false)} className='ease-in-out duration-200 h-8 px-4 py-1 text-sm font-semibold rounded bg-lilac text-white hover:bg-light '>Thêm câu hỏi</button>
                    </div>
                </div>
            </div>}
            {/**/}
            <header className='w-full top-0 bg-white shadow flex items-center p-3 sticky'>
                <Link href='/admin'>
                    <img className='mr-1 w-[87px]' src='https://cf.quizizz.com/img/quizizz_logos/purple-brandmark-600x164.png' />
                </Link>
                <div className='inline-block h-7 w-0.5 bg-dark-5 mx-3'>
                </div>
                <button className='min-w-52 w-fit px-2 py-1 h-full text-sm hover:bg-[#0909090d] font-semibold text-dark-6 text-left rounded whitespace-nowrap' type='button'>Bài Quiz không có tiêu đề</button>
                <div className='ml-auto flex items-center gap-2'>
                    <button type='button' className='ease-in-out duration-200 hover:bg-[#0909090d] transition-colors text-dark-6 bg-white border-solid rounded border justify-center flex items-center min-w-max w-7 h-7 relative'>
                        <i className="fa-solid fa-gear text-[11px]"></i>
                    </button>
                    <button type='button' className=' cursor-not-allowed ease-in-out duration-200 bg-light-2 transition-colors text-[#09090933]  border-solid rounded border justify-center flex items-center min-w-max w-7 h-7 relative'>
                        <i className="fa-solid fa-play text-[11px]"></i>
                    </button>
                    <button onClick={() => setShowModal(true)} type='button' className='flex items-center justify-center px-4 py-1.5 text-xs font-semibold h-8  bg-lilac text-white hover:bg-light  rounded  transition-colors duration-200 ease-in-out relative min-w-max '>
                        <i className="fa-solid fa-floppy-disk text-[11px] mr-[8px]"></i>
                        <div>
                            Xuất bản
                        </div>
                    </button>
                </div>
            </header>
        </div>
    )
}
