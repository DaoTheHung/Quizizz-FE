import { useRouter } from 'next/router'
import React from 'react'

export default function JoinRoom({ socket }) {
    const router = useRouter()
    const id = router.query.room

    return (
        <div>
            <div className='flex justify-center relative top-[5rem] '>
                <div className='text-center  block w-[500px] mx-[16px] rounded-[16px] relative p-[12px] bg-join'>
                    <div className='text-center'>
                        <div className='rounded-[4px] text-[#fff] py-[4px] px-[8px]'>
                            Để làm quiz này
                        </div>
                    </div>
                    <div className='mt-[20px] text-white'>
                        <div className='text-[16px] mb-[6px]'>1. Sử dụng bất kỳ thiết bị nào để mở</div>
                        <a target='_blank' href={`/join/pre-game/running/${id}?type=${router.query.type}`} className='flex justify-between mx-auto items-center bg-white rounded-[8px] text-[28px] font-semibold text-[#242a3e] pl-[12px] pr-[6px] w-[320px] h-[60px] leading-[60px] shadow-join'>
                            <div className='text-[#242a3e] pb-[4px] pl-[8px] tracking-[1px] hover:underline cursor-pointer'>
                                join
                                <span className='px-[2px]'>my</span>
                                quiz.com
                            </div>
                            <div className='cursor-pointer text-[18px] flex justify-center items-center h-[50px] w-[50px] rounded-[4px] bg-[rgba(9_9_9/0.1)] text-[#222222]'>
                                <i className="fa-regular fa-clone"></i>
                            </div>
                        </a>
                    </div>
                    <div className='mt-[20px] text-white'>
                        <div className='text-[16px] mb-[6px]'>2. Nhập Mã tham gia</div>
                        <div className='flex mx-auto justify-between items-center bg-white rounded-[8px] text-[28px] font-semibold text-[#242a3e] pl-[12px] pr-[6px] w-[320px] h-[60px] leading-[60px] shadow-join'>
                            <span className='text-[40px] min-w-[calc(100%-50px)] h-[56px] leading-[56px] tracking-[8px]'>735164</span>
                            <div className='cursor-pointer text-[18px] flex justify-center items-center h-[50px] w-[50px] rounded-[4px] bg-[rgba(9_9_9/0.1)] text-[#222222]'>
                                <i className="fa-regular fa-clone"></i>
                            </div>
                        </div>
                    </div>
                    <div className='w-[320px] mx-auto mt-[12px] pb-[12px]'>
                        <span className='overflow-hidden text-center text-[rgba(255_255_255/0.66)] flex items-center'>
                            <div className='relative w-1/2 h-[1px]  right-[0.5rem]  bg-[rgba(255_255_255/0.33)]'></div>
                            or
                            <div className='relative w-1/2 h-[1px]  left-[0.5rem]  bg-[rgba(255_255_255/0.33)]'></div>
                        </span>
                    </div>
                    <div className='bg-[rgba(136_84_192/0.2)] border border-[rgba(255_255_255/0.66)] rounded-[8px] flex justify-center items-center w-fit max-w-[272px] mx-auto p-[12px] cursor-pointer'>
                        <div className='w-full flex gap-[10px]'>
                            <img className='w-[32px]' src='https://cf.quizizz.com/image/QRCODE.png' />
                            <span className='text-[20px] leading-[32px] text-center tracking-[-0.015em] font-medium text-white whitespace-normal overflow-hidden text-ellipsis'>Tham gia qua mã QR</span>
                        </div>
                    </div>
                    <div className='mx-auto rounded-[4px] text-white py-[4px] px-[8px] mt-[14px]'>
                        <button className='text-[16px] text-[rgba(255,255,255,0.66)]'>hoặc chia sẻ thông qua ...</button>
                    </div>
                    <div className='flex justify-center items-center mt-[6px] mb-[8px] gap-3'>
                        <button className='border-none text-[13px] p-[14px] rounded-full bg-[rgba(255,255,255,0.2)] flex justify-center items-center text-white w-[44px] h-[44px] relative'>
                            <i className="fa-solid fa-link"></i>
                        </button>
                        <button className='border-none text-[13px] p-[14px] rounded-full bg-[rgba(255,255,255,0.2)] flex justify-center items-center text-white w-[44px] h-[44px] relative'>
                            <img className='max-w-[18px] max-h-[18px]' src='https://edu.google.com/images/classroom/classroom-icon/hero_logo.png' />
                        </button>
                        <button className='border-none text-[13px] p-[14px] rounded-full bg-[rgba(255,255,255,0.2)] flex justify-center items-center text-white w-[44px] h-[44px] relative'>
                            <img className='max-w-[18px] max-h-[18px]' src='https://cf.quizizz.com/img/icons/msteams_logo.png' />
                        </button>
                        <button className='border-none text-[13px] p-[14px] rounded-full bg-[rgba(255,255,255,0.2)] flex justify-center items-center text-white w-[44px] h-[44px] relative'>
                            <img className='max-w-[18px] max-h-[18px]' src='https://cf.quizizz.com/img/groups/canvas_logo.png' />
                            <i className="fa-solid fa-lock absolute bottom-0 right-0"></i>
                        </button>
                        <button className='border-none text-[13px] p-[14px] rounded-full bg-[rgba(255,255,255,0.2)] flex justify-center items-center text-white w-[44px] h-[44px] relative'>
                            <img className='max-w-[18px] max-h-[18px]' src='https://cf.quizizz.com/img/groups/schoology_logo.png' />
                            <i className="fa-solid fa-lock absolute bottom-0 right-0"></i>
                        </button>
                        <button className='border-none text-[13px] p-[14px] rounded-full bg-[rgba(255,255,255,0.2)] flex justify-center items-center text-white w-[44px] h-[44px] relative'>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
