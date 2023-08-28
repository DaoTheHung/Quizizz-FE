import React from 'react'
import { useRouter } from 'next/router'

export default function HeaderTeamMode({ checkPlayerRoom }) {
    const router = useRouter()
    const { id } = router.query
    const { type } = router.query


    return (
        <div className='mt-[20px] items-start flex'>
            <div className='flex flex-[0_0_33%] mt-[15px]'>
                <a href='/admin' >
                    <img className='w-[120px] min-w-[42px] h-[30px]' src='https://cf.quizizz.com/img/logos/logo_sm_signup.png' />
                </a>

                {checkPlayerRoom?.length > 0 && <div className='mx-[24px] flex items-center'>
                    <span className='mr-[4px] text-white font-medium text-[10px]'>join <br /> link</span>
                    <div className='bg-[rgba(46_238_249/0.1)] py-[3px] px-[8px] rounded-[4px]'>
                        <a href={`/join/pre-game/running/${id}?type=${type}`} className='text-[20px] font-bold text-white tracking-[1px] cursor-pointer' target='_blank' >
                            join
                            <span className='px-[2px]'>my</span>
                            quiz.com
                        </a>
                    </div>

                </div>}


            </div>

            {checkPlayerRoom?.length > 0 && 
            <div style={checkPlayerRoom?.length > 0 ? {opacity :"1", visibility:"visible"} : {}} className='ml-[13px] flex flex-col transition-all duration-300 ease-in-out invisible opacity-0 items-center justify-center flex-[0_0_33%]'>
                <span className='text-[16px] font-medium text-white mb-[4px]'>  Mã trò chơi  </span>
                <div className='flex items-center ml-[35px]'>
                    <div className=' rounded-[8px] bg-[#ffffff] px-[12px]'>
                        <span className='text-[56px] text-[#292a3a] font-bold flex justify-center'> 473748 </span>
                    </div>
                    <div className='ml-[8px] p-[7px] rounded-[8px] flex justify-center items-center bg-[rgba(46,238,249,0.1)]'>
                        <img className='h-[17px] w-[20px]' src='https://edu.google.com/images/classroom/classroom-icon/hero_logo.png' />
                    </div>
                </div>
            </div>}

            <div className='mt-[15px] flex ml-auto flex-[0_0_33%] justify-end'>
                <div className='text-[14px] text-[#2eeef9] p-[9px] flex justify-center items-center mr-[24px] rounded-[8px] bg-[rgba(46_238_249/0.1)] min-w-[53px]'>
                    <i className='fas fa-volume-up text-[#2eeef9] text-[14px]'></i>
                </div>
                <button className='text-[16px] py-[6px] px-[12px] text-[#ec0b43] rounded-[8px] bg-[rgba(236,11,67,0.2)] font-semibold'>Kết thúc Trò chơi</button>
            </div>
        </div>
    )
}
