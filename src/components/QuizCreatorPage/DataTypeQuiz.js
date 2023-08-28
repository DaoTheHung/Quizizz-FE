import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'


export default function DataTypeQuiz() {
    const router = useRouter()
    return (
        <>

            <div className='flex w-[723px]  mx-auto bg-white rounded-l-lg rounded-r-lg border'>
                <div className='w-[416px] px-3  py-4'>
                    <div className='mb-2 text-xs font-semibold  text-dark-4'>
                        Đánh giá
                    </div>
                    <div className='grid grid-cols-2 w-full gap-2'>
                        {/* */}
                        <div className='h-fit'>
                            <Link href='/admin/quiz/creator/createQuestion'>
                                <button type='button' className='flex items-center p-1 rounded-lg w-full text-dark-3 hover:bg-[#0909090d]'>
                                    <div className='relative w-6 h-6 mr-2 rounded'>
                                        <div className=' relative flex items-center justify-center bg-brand-b text-white rounded h-full aspect-square'>
                                            <i className="text-[11px] fa-regular fa-square-check"></i>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between w-full'>
                                        <div className='flex  text-sm font-semibold text-left truncate whitespace-normal text-dark-6 '>
                                            Đa lựa chọn
                                        </div>
                                    </div>
                                </button>
                            </Link>
                        </div>
                        {/* */}
                        <div className='h-fit'>
                            <button className='flex items-center p-1 rounded-lg w-full text-dark-3 hover:bg-[#0909090d]'>
                                <div className='relative w-6 h-6 mr-2 rounded'>
                                    <div className=' relative flex items-center justify-center bg-brand-b text-white rounded h-full aspect-square'>
                                        <i className="text-[11px] fa-solid fa-signal"></i>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between w-full'>
                                    <div className='flex  text-sm font-semibold text-left truncate whitespace-normal text-dark-6 '>
                                        Sắp xếp lại
                                    </div>
                                </div>
                            </button>
                        </div>
                        {/* */}
                        <div className='h-fit'>
                            <button className='flex items-center p-1 rounded-lg w-full text-dark-3 hover:bg-[#0909090d]'>
                                <div className='relative w-6 h-6 mr-2 rounded'>
                                    <div className=' relative flex items-center justify-center bg-brand-b text-white rounded h-full aspect-square'>
                                        <i className="text-[11px] fa-solid fa-layer-group"></i>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between w-full'>
                                    <div className='flex  text-sm font-semibold text-left truncate whitespace-normal text-dark-6 '>
                                        Ghép đôi
                                    </div>
                                </div>
                            </button>
                        </div>
                        {/* */}

                        <div className='h-fit'>
                            <Link href='/admin/quiz/creator/createQuestion?games=fillword'>
                                <button onClick={() => router.query = "Điền từ"} type='button' className='flex items-center p-1 rounded-lg w-full text-dark-3 hover:bg-[#0909090d]'>
                                    <div className='relative w-6 h-6 mr-2 rounded'>
                                        <div className=' relative flex items-center justify-center bg-brand-b text-white rounded h-full aspect-square'>
                                            <i className="text-[11px] fa-solid fa-rectangle-ad"></i>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between w-full'>
                                        <div className='flex  text-sm font-semibold text-left truncate whitespace-normal text-dark-6 '>
                                            Điền từ
                                        </div>
                                    </div>
                                </button>
                            </Link>
                        </div>
                        {/* */}
                        <div className='h-fit'>
                            <button className='flex items-center p-1 rounded-lg w-full text-dark-3 hover:bg-[#0909090d]'>
                                <div className='relative w-6 h-6 mr-2 rounded'>
                                    <div className=' relative flex items-center justify-center bg-brand-b text-white rounded h-full aspect-square'>
                                        <i className="text-[11px] fa-regular fa-hand"></i>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between w-full'>
                                    <div className='flex  text-sm font-semibold text-left truncate whitespace-normal text-dark-6 '>
                                        Kéo và thả
                                    </div>
                                </div>
                            </button>
                        </div>
                        {/* */}
                        <div className='h-fit'>
                            <button className='flex items-center p-1 rounded-lg w-full text-dark-3 hover:bg-[#0909090d]'>
                                <div className='relative w-6 h-6 mr-2 rounded'>
                                    <div className=' relative flex items-center justify-center bg-brand-b text-white rounded h-full aspect-square'>
                                        <i className="text-[11px] fa-regular fa-square-caret-down"></i>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between w-full'>
                                    <div className='flex  text-sm font-semibold text-left truncate whitespace-normal text-dark-6 '>
                                        Thả xuống
                                    </div>
                                </div>
                            </button>
                        </div>
                        {/* */}
                        <div className='h-fit'>
                            <button className='flex items-center p-1 rounded-lg w-full text-dark-3 hover:bg-[#0909090d]'>
                                <div className='relative w-6 h-6 mr-2 rounded'>
                                    <div className=' relative flex items-center justify-center bg-brand-b text-white rounded h-full aspect-square'>
                                        <i className="text-[11px] fa-solid fa-square-root-variable"></i>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between w-full'>
                                    <div className='flex  text-sm font-semibold text-left truncate whitespace-normal text-dark-6 '>
                                        đáp án toán học
                                    </div>
                                </div>
                            </button>
                        </div>
                        {/* */}
                        <div className='h-fit'>
                            <button className='flex items-center p-1 rounded-lg w-full text-dark-3 hover:bg-[#0909090d]'>
                                <div className='relative w-6 h-6 mr-2 rounded'>
                                    <div className=' relative flex items-center justify-center bg-brand-b text-white rounded h-full aspect-square'>
                                        <i className="text-[11px] fa-regular fa-image"></i>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between w-full'>
                                    <div className='flex  text-sm font-semibold text-left truncate whitespace-normal text-dark-6 '>
                                        Nhãn dán
                                    </div>
                                </div>
                            </button>
                        </div>
                        {/* */}
                        <div className='h-fit'>
                            <button className='flex items-center p-1 rounded-lg w-full text-dark-3 hover:bg-[#0909090d]'>
                                <div className='relative w-6 h-6 mr-2 rounded'>
                                    <div className=' relative flex items-center justify-center bg-brand-b text-white rounded h-full aspect-square'>
                                        <i className="text-[11px] fa-solid fa-bullseye"></i>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between w-full'>
                                    <div className='flex  text-sm font-semibold text-left truncate whitespace-normal text-dark-6 '>
                                        Điểm ngắm
                                    </div>
                                </div>
                            </button>
                        </div>
                        {/* */}
                        <div className='h-fit'>
                            <button className='flex items-center p-1 rounded-lg w-full text-dark-3 hover:bg-[#0909090d]'>
                                <div className='relative w-6 h-6 mr-2 rounded'>
                                    <div className=' relative flex items-center justify-center bg-brand-b text-white rounded h-full aspect-square'>
                                        <i className="text-[11px] fa-solid fa-chart-line"></i>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between w-full'>
                                    <div className='flex  text-sm font-semibold text-left truncate whitespace-normal text-dark-6 '>
                                        Vẽ đồ thị
                                    </div>
                                </div>
                            </button>
                        </div>
                        {/* */}
                    </div>

                    {/*Sắp diễn ra*/}
                    <div className='relative mt-4  '>
                        <div className='relative pl-[7px] pt-[7px] flex items-center mb-1 text-xs font-semibold z-10 left-[-6px] text-super'>
                            Sắp diễn ra
                        </div>
                        <div className='absolute z-0 border rounded-md w-[calc(100%+-7px)] h-[calc(100%+4px)] top-0 left-[-6px] border-super bg-super-faded'>
                        </div>
                        <div className='relative grid grid-cols-2 gap-2 z-1'>
                            {/* */}
                            <div className='h-fit'>
                                <button className='flex items-center p-1 rounded-lg w-full text-dark-3 hover:bg-[#0909090d]'>
                                    <div className='relative w-6 h-6 mr-2 rounded'>
                                        <div className=' relative flex items-center justify-center bg-brand-b text-white rounded h-full aspect-square'>
                                            <i className="text-[11px] fa-solid fa-table-columns"></i>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between w-full'>
                                        <div className='flex  text-sm font-semibold text-left truncate whitespace-normal text-dark-6 '>
                                            phân loại
                                        </div>
                                    </div>
                                </button>
                            </div>
                            {/* */}
                            <div className='h-fit'>
                                <button className='flex items-center p-1 rounded-lg w-full text-dark-3 hover:bg-[#0909090d]'>
                                    <div className='relative w-6 h-6 mr-2 rounded'>
                                        <div className=' relative flex items-center justify-center bg-brand-b text-white rounded h-full aspect-square'>
                                            <i className="text-[11px] fa-solid fa-bars-staggered"></i>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between w-full'>
                                        <div className='flex  text-sm font-semibold text-left truncate whitespace-normal text-dark-6 '>
                                            bao quát
                                        </div>
                                    </div>
                                </button>
                            </div>
                            {/* */}
                        </div>
                    </div>
                    {/* */}

                    {/*Tư duy bậc cao*/}
                    <div className='relative mt-4  '>
                        <div className='relative pl-[7px] pt-[7px] flex items-center mb-1 text-xs font-semibold z-10 left-[-6px] text-dark-4'>
                            Tư duy bậc cao
                        </div>

                        <div className='relative grid grid-cols-2 gap-2 z-1'>
                            {/* */}
                            <div className='h-fit'>
                                <button className='flex items-center p-1 rounded-lg w-full text-dark-3 hover:bg-[#0909090d]'>
                                    <div className='relative w-6 h-6 mr-2 rounded'>
                                        <div className=' relative flex items-center justify-center bg-brand-e text-white rounded h-full aspect-square'>
                                            <i className="text-[14px] fa-regular fa-pen-to-square"></i>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between w-full'>
                                        <div className='flex  text-sm font-semibold text-left truncate whitespace-normal text-dark-6 '>
                                            Vẽ
                                        </div>
                                    </div>
                                </button>
                            </div>
                            {/* */}
                            <div className='h-fit'>
                                <button className='flex items-center p-1 rounded-lg w-full text-dark-3 hover:bg-[#0909090d]'>
                                    <div className='relative w-6 h-6 mr-2 rounded'>
                                        <div className=' relative flex items-center justify-center bg-brand-e text-white rounded h-full aspect-square'>
                                            <i className="text-[11px] fa-solid fa-align-left"></i>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between w-full'>
                                        <div className='flex  text-sm font-semibold text-left truncate whitespace-normal text-dark-6 '>
                                            Tự luận
                                        </div>
                                    </div>
                                </button>
                            </div>
                            {/* */}
                            <div className='h-fit'>
                                <button className='flex items-center p-1 rounded-lg w-full text-dark-3 hover:bg-[#0909090d]'>
                                    <div className='relative w-6 h-6 mr-2 rounded'>
                                        <div className=' relative flex items-center justify-center bg-brand-e text-white rounded h-full aspect-square'>
                                            <i className="text-[11px] fa-solid fa-video"></i>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between w-full'>
                                        <div className='flex  text-sm font-semibold text-left truncate whitespace-normal text-dark-6 '>
                                            Trả lời video
                                        </div>
                                    </div>
                                </button>
                            </div>
                            {/* */}
                            <div className='h-fit'>
                                <button className='flex items-center p-1 rounded-lg w-full text-dark-3 hover:bg-[#0909090d]'>
                                    <div className='relative w-6 h-6 mr-2 rounded'>
                                        <div className=' relative flex items-center justify-center bg-brand-e text-white rounded h-full aspect-square'>
                                            <i className="text-[11px] fa-solid fa-microphone-lines"></i>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between w-full'>
                                        <div className='flex  text-sm font-semibold text-left truncate whitespace-normal text-dark-6 '>
                                            Trả lời audio
                                        </div>
                                    </div>
                                </button>
                            </div>
                            {/* */}
                        </div>
                    </div>
                    {/* */}

                    {/*Khác*/}
                    <div className='relative mt-4  '>
                        <div className='relative pl-[7px] pt-[7px] flex items-center mb-1 text-xs font-semibold z-10 left-[-6px] text-dark-4'>
                            Khác
                        </div>

                        <div className='relative grid grid-cols-2 gap-2 z-1'>
                            {/* */}
                            <div className='h-fit'>
                                <button className='flex items-center p-1 rounded-lg w-full text-dark-3 hover:bg-[#0909090d]'>
                                    <div className='relative w-6 h-6 mr-2 rounded'>
                                        <div className=' relative flex items-center justify-center bg-brand-a text-white rounded h-full aspect-square'>
                                            <i className="text-[11px] fa-solid fa-square-poll-vertical"></i>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between w-full'>
                                        <div className='flex  text-sm font-semibold text-left truncate whitespace-normal text-dark-6 '>
                                            Khảo sát
                                        </div>
                                    </div>
                                </button>
                            </div>
                            {/* */}
                            <div className='h-fit'>
                                <button className='flex items-center p-1 rounded-lg w-full text-dark-3 hover:bg-[#0909090d]'>
                                    <div className='relative w-6 h-6 mr-2 rounded'>
                                        <div className=' relative flex items-center justify-center bg-brand-f text-white rounded h-full aspect-square'>
                                            <i className="text-[11px] fa-solid fa-person-chalkboard"></i>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between w-full'>
                                        <div className='flex  text-sm font-semibold text-left truncate whitespace-normal text-dark-6 '>
                                            Trình chiếu
                                        </div>
                                    </div>
                                </button>
                            </div>
                            {/* */}

                        </div>
                    </div>
                    {/* */}

                </div>
                <div className='w-[304px] p-4 bg-bd-ft border-l-light-2 border-l rounded-tr rounded-br'>
                    <div className='relative w-full h-38 bg-dark overflow-hidden rounded-sm'>
                        <video aria-hidden="true" autoPlay src='https://cf.quizizz.com/videos/qtype/mcqmsq.min.mp4'>

                        </video>
                    </div>
                    <div className='flex-1 flex flex-col justify-between mt-10 h-[60%]'>
                        <div>
                            <div className='text-dark-2 text-sm font-semibold'>
                                Bao quát
                            </div>
                            <div className='text-dark-4 text-xs font-semibold'>
                                Đánh giá sự hiểu biết của học sinh về một đoạn văn hoặc phương tiện nhất định. Với loại câu hỏi này, bạn có thể tạo các bài tập đọc tương tác yêu cầu người tham gia xem qua một đoạn văn hoặc phương tiện và trả lời các câu hỏi dựa trên sự hiểu biết của họ.
                            </div>
                        </div>
                        <div>
                            <div className='gap-1 items-center inline-flex text-[.625rem] leading-[1rem] tracking-[+.015em] font-semibold rounded px-1 bg-super text-white mr-1'>
                                <i className="text-[9px] fa-solid fa-bolt-lightning"></i>
                                <div>SIÊU</div>
                            </div>
                            <div className=' items-center inline-flex text-[.625rem] leading-[1rem] tracking-[+.015em] font-semibold  px-1 rounded  bg-brand-b0 '>
                                <div className='text-brand-b'>
                                    Tự động phân loại
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
