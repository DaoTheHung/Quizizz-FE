import React from 'react'

export default function HeaderRoom() {
    return (
        <>
            <div className='py-[16px] px-[8px] text-center fixed z-[99] h-[72px] bg-[rgba(0_0_0/0.5)] box-border left-0 top-0 w-full transition-all'>
                <span className='bg-[rgba(255_255_255/0.15)] float-left py-[8px] px-[16px] rounded-[8px] h-[40px] cursor-pointer'>
                    <img className='h-[24px]' src='https://cf.quizizz.com/img/quizizz_logos/white-brandmark-600x164.png' />
                </span>
                <div className='float-right relative flex'>
                    <div className='inline-flex relative items-center'>
                        <button className='bg-[rgba(255_255_255/0.32)] rounded-[8px] p-[8px] text-[18px] text-white flex items-center font-medium cursor-pointer min-h-[40px]'>
                            <span> Chọn một chủ đề </span>
                            <i className='text-[16px] ml-2 fas fa-caret-down down-icon mr-0'></i>
                        </button>

                        <button className='w-[40px] h-[40px] items-center text-[18px] text-white bg-[rgba(255_255_255/0.33)] leading-[40px] text-center rounded-[8px] ml-[8px] align-top cursor-pointer'>
                            <i className="fa-solid fa-expand"></i>
                        </button>
                        <div className='w-[1px] h-[40px] bg-[rgba(255_255_255/0.2)] align-top ml-[8px]'>
                        </div>
                        <button className='w-[112px] font-bold bg-white text-[#000] transition-all h-[40px] text-[18px] leading-[40px] text-center rounded-[8px] ml-[8px] cursor-pointer'> Kết thúc </button>
                    </div>
                </div>
            </div>
          
        </>
    )
}
