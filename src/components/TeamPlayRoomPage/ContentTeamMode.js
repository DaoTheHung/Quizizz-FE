import { useRouter } from 'next/router'
import React from 'react'

export default function ContentTeamMode({checkPlayerRoom}) {
    const router = useRouter()
    const { id } = router.query
    const { type } = router.query
    return (
        <div style={checkPlayerRoom?.length >0 ? {opacity:"0",visibility:"hidden"} : {}} className='flex flex-col opacity-100  justify-center items-center mt-[20px]'>
            <div className='flex flex-col justify-center items-cente'>
                <div className='bg-[rgba(46_238_249/0.1)] mb-[28px] rounded-[4px] py-[4px] w-[225px] m-auto px-[16px]'>
                    <span className='text-white text-[16px] font-medium'>Để bắt đầu trò chơi này</span>
                </div>
                <div className=' flex flex-col mb-[24px]'>
                    <span className='text-[16px] text-white text-center font-medium mb-[8px]'>1. Sử dụng bất kỳ thiết nào để mở</span>
                    <div className=' rounded-[8px] bg-[#ffffff] py-[12px] px-[40px] '>
                        <a href={`/join/pre-game/running/${id}?type=${type}`} className='text-[32px] font-bold text-[#292a3a] tracking-[1px] cursor-pointer' target='_blank' >
                            join
                            <span className='px-[2px]'>my</span>
                            quiz.com
                        </a>
                    </div>
                </div>
                <div className=' flex flex-col mb-[9px] w-[305px] m-auto'>
                    <span className='text-[16px] text-white text-center font-medium mb-[8px]'>2. Nhập mã trò chơi</span>
                    <div className=' rounded-[8px] bg-[#ffffff]  px-[60px]'>
                        <span className='text-[56px] text-[#292a3a] font-bold flex justify-center'> 473748 </span>
                    </div>
                </div>
                <div className='bg-[rgba(46_238_249/0.1)] rounded-[4px] py-[4px] px-[16px] w-[225px] m-auto'>
                    <div className='text-[16px] font-medium text-white underline'>hoặc chia sẻ thông qua ...</div>
                </div>
            </div>
        </div>
    )
}
