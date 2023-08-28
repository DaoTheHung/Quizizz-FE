import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useStore } from '../../../store/useStore'
import { useQuery } from '@tanstack/react-query'

export default function HeaderPresentation() {
    
    return (
        <div className='w-[calc(100%-512px)] bg-[#222222] shadow-[0px_2px_8px_rgba(0,0,0,0.16)] text-white relative bottom-0 left-0 h-[72px] z-[9999] py-[12px] px-[16px] flex items-center justify-between transition-all duration-[400ms] ease-out'>
            <div className='flex items-center'>
                <div className='inline-flex items-center rounded-[8px] w-[120px] h-[48px] p-[8px] transition-all duration-200 ease-in-out'>
                    <img src='https://cf.quizizz.com/img/quizizz_logos/white-brandmark-600x164.png' className='w-[90%] object-contain' />
                </div>
            </div>
            <div className='flex items-center '>
                <div className='w-[calc(100%)] flex items-center'>
                    <div className='px-[13px] h-[43px] mx-[6px] min-w-[36px] inline-flex justify-center items-center font-bold text-[18px] cursor-pointer bg-[rgba(9,9,9,0.5)] text-white rounded-[8px]'>
                        <i className="text-[16px] fa-solid fa-expand"></i>
                    </div>
                    <div className='px-[13px] h-[43px] mx-[6px] min-w-[36px] inline-flex justify-center items-center font-bold text-[18px] cursor-pointer bg-[rgba(9,9,9,0.5)] text-white rounded-[8px]'>
                        <i className="text-[16px] fa-solid fa-volume-high"></i>
                    </div>
                    <div className='py-[10px] px-[20px] h-[43px] mx-[6px] inline-flex justify-center items-center font-bold text-[18px] cursor-pointer bg-[rgba(9,9,9,0.5)] text-white rounded-[8px]'>
                        <i className="text-[16px] fa-solid fa-arrow-right-from-bracket mr-[8px]"></i>
                        Kết thúc trò chơi
                    </div>
                </div>
            </div>
        </div>
    )
}
