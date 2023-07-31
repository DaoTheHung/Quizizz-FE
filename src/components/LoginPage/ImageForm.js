import React from 'react'

export default function ImageForm() {
    return (
        <div className='bg-[url("https://cf.quizizz.com/image/classroom-enjoyment.png")] h-full w-[18.75rem] items-end flex rounded-tr-[0.5rem] rounded-br-[0.5rem]'>
            <div>
                <div className='bg-[#090909cc] flex items-center w-full  backdrop-blur-[4px] p-[1rem]'>
                    <div className='flex flex-col'>
                        <div className='pb-[.5rem] text-[.875rem] leading-[1.5rem] tracking-[-.01em] font-semibold text-[#fff]'>
                            Giáo viên yêu chúng tôi  😍
                        </div>
                        <div className='pb-[.5rem] text-[.875rem] leading-[1.5rem] tracking-[-.01em] font-semibold text-[#fffc]'>
                        Tham gia cùng hơn 200 triệu nhà sư phạm và người học trên Quizizz
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
