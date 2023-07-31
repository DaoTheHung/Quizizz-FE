import React from 'react'

export default function SearchQuiz() {
    return (
        <div>
            <div className='flex w-[63%] mx-auto transition-all duration-200 flex-col justify-center gap-2 h-auto border border-light-2 bg-white p-4 rounded-b-md shadow-sm '>
                <div>
                    Dịch chuyển tức thời từ thư viện Quizizz
                </div>
                <div className='relative w-full'>
                    <div className='w-full'>
                        <div className='w-6 h-6 flex items-center justify-center absolute left-2 top-2 pt-0.5 text-dark-4'>
                            <i className="text-[12px] fa-solid fa-magnifying-glass"></i>
                        </div>
                        <input placeholder='Tìm kiếm từ hàng triệu câu hỏi' className='focus:outline-none h-10 w-full py-2 text-sm pl-9 border border-solid rounded focus:ring-2 focus:ring-lilac focus:ring-offset-0 bg-light-3 text-dark-2  border-light-2 placeholder-dark-5 ' />
                        <div className='absolute inline-table top-1 right-1'>
                            <button className='flex items-center justify-center px-4 py-1 text-sm font-semibold h-8 base bg-lilac-faded text-lilac hover:text-lilac-light active:text-lilac-dark rounded secondary transition-colors duration-200 ease-in-out  relative min-w-max w-full '>
                                Tìm kiếm
                            </button>
                        </div>

                    </div>
                </div>
            </div>


        </div>

    )
}
