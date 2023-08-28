import { useRouter } from 'next/router';
import React, { useEffect } from 'react';


const Summary = () => {
    const router = useRouter()
    useEffect(() => {
        if (router.query.page === "summary") {
            document.title = "Bản tóm tắt - Quizizz"
        }
    }, [])
    return (
        <div className='font-quick  bg-[#461a42]  top-0 left-0 right-0 bottom-0 bg-fixed bg-no-repeat bg-center bg-cover fixed'>
            <div className='py-[12px] bg-[#000] px-[8px] text-white'>
                <div className='flex justify-between items-center relative'>
                    <div className='items-center flex-1 flex '>
                        <button className='text-white bg-[#fff3] border-0  rounded-[8px]  flex-shrink-0 transition-colors duration-200'>
                            <i className="text-[24px] fa-solid fa-xmark w-[40px] h-[40px] flex items-center justify-center"></i>
                        </button>
                        <div className='w-[1px] h-[36px] bg-[#fff3] mx-[8px]'></div>
                        <button className='text-[#ffffff54] bg-[#fff3] border-0  rounded-[8px]  flex-shrink-0 transition-colors duration-200'>
                            <i className="text-[16px]  w-[40px] h-[40px] flex items-center justify-center fa-solid fa-magnifying-glass-plus"></i>
                        </button>
                    </div>
                    <div className='text-[16px] flex font-medium'>
                        <div className='rounded-[8px] flex justify-center items-center max-h-[40px] w-[104px] bg-[#ffffff1a] py-[10px]'>
                            <div className='relative'>
                                <span className='blur-[8px] bg-[#7d72ec54] rounded-[12px] w-[16px] h-[16px] absolute z-0'></span>
                                <i className="text-[#7d72ec] fa-solid fa-medal"></i>
                            </div>
                            <div className='ml-[8px] relative overflow-hidden'>
                                —
                            </div>
                        </div>
                    </div>
                    <div className='ml-[8px]'>
                        <button className='bg-[#fff3] rounded-[8px] flex items-center justify-center w-[40px] h-[40px]'>
                            <div className='bg-[url("https://cf.quizizz.com/game/img/ui/expand-wide.svg")] bg-[50%] bg-no-repeat h-[40px] w-[40px]'>

                            </div>
                        </button>
                    </div>
                </div>
            </div>
            {/* body */}
            <div className='h-[calc(100%-64px)]  w-full absolute overflow-y-auto'>
                <div className='min-h-full relative overflow-auto'>
                    <div className='bg-[#000000b3] max-w-[528px] mx-auto px-[8px] pt-[24px] relative'>
                        <div className='text-center'>
                            <p className='text-[16px] text-white font-medium'>
                                Bản tóm tắt
                            </p>
                        </div>
                        <div className='w-full text-center'>
                            <div className='bg-[#ffffff1a] rounded-[4px] inline-flex items-center h-[24px] py-[4px] px-[12px] mt-2'>
                                <i className="text-white text-[10px] font-black mr-[8px] leading-[10px] fa-solid fa-user"></i>
                                <div className='text-white text-[12px] font-medium leading-[15px]'>
                                    Đánh giá solo.
                                </div>
                            </div>
                        </div>
                        <div className='py-[16px]'>
                            <div className='max-w-[480px] mx-auto relative'>
                                <div className='pb-[16px]'>
                                    <div className='py-[12px] px-[16px] bg-[#000] border border-[#000] rounded-[16px] items-center flex relative'>
                                        <div className='animate-zoomLn w-[72px] h-[72px] mr-[16px] flex'>
                                            <img className='w-full h-full' src='https://cf.quizizz.com/join/img/avatars/tablet_lg/monster28.png' />
                                        </div>
                                        <div className='flex flex-[2.5] justify-center items-start font-medium animate-fadein flex-col'>
                                            <div className='text-white text-ellipsis mb-[12px] pt-[4px] text-[20px] overflow-hidden'>
                                                <span className='w-[320px] inline-block overflow-hidden'>hung dao</span>
                                            </div>
                                        </div>
                                        <div className='flex-[0.5] justify-end items-center flex'>
                                            <button className='bg-[#fff3] rounded-[4px] border-none px-[8px] inline-block'>
                                                <i className="text-white h-[30px] mr-[4px] text-[12px] leading-[30px] inline-block fa-solid fa-share-nodes"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Summary;
