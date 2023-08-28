import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useStore } from '../../../store/useStore'
import { useQuery, useMutation } from '@tanstack/react-query'
export default function HeaderQuizDetail() {
    const [dataQuizDetail, setDataQuizDetail] = useState([])

    const router = useRouter()
    const id = router.query.id



    // Store
    const fetchDataQuiz = useStore(state => state.fetchDataQuiz)
    const dataQuiz = useStore(state => state.dataQuiz)

    // Call api
    const { data } = useQuery(['quizizz'], fetchDataQuiz,)

    const detailData = data?.data?.find(item => item.id == id)
   

    return (
        <div className='px-[3rem] pt-[3rem] mt-[1rem] ml-[193px]  h-full flex bg-bd '>
            <div className='relative mx-auto w-[50rem] my-4 hidden md:block'>
                <div className='relative border rounded p-4 h-54 bg-white border-light-2'>
                    <div className='flex'>

                        <div className='w-32 h-32 relative flex justify-center items-center overflow-hidden'>
                            <div className='rounded-sm bg-bd flex items-center justify-center shrink-0 w-full h-full'>
                                <div className='flex items-center w-full h-full image-preview'>
                                    <div className='w-full h-full'>
                                        <img className='lazy-img rounded-inherit object-contain w-full h-full' src='https://cf.quizizz.com/img/logos/new/logo_placeholder_sm.png?w=200&h=200' />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col w-10/12 ml-3'>
                            <div className='flex text-[.6875rem] text-dark-4 font-semibold h-4 mb-0.5 gap-1'>
                                QUIZ
                            </div>
                            <div className='flex w-3/5 my-1 quiz-name text-xl min-h-12 text-dark-6'>
                                <button className='flex w-full'>
                                    <h1 className='text-lg font-semibold inline-block text-left align-middle break-custom'>
                                        {detailData?.nameQuiz}
                                        <i className="text-[11px] fa-solid fa-pen p-1.5 relative bottom-0.5 ml-1  rounded"></i>
                                    </h1>
                                </button>
                            </div>
                            <div className='flex flex-col gap-[8px] mt-6'>
                                <div className='flex gap-[66px]'>
                                    <h2 className='items-center flex gap-2'>
                                        <i className="text-[12px] fa-solid fa-graduation-cap text-dark-4"></i>
                                        <div className='flex text-dark-3 text-xs'>
                                            Lớp
                                        </div>
                                    </h2>
                                    <h2 className='items-center flex '>
                                        <div className='items-center mx-2 flex'>
                                            <div className='w-1 h-1 rounded-full bg-dark-5'>
                                            </div>
                                        </div>
                                        <i className="text-[12px] fa-solid fa-book text-dark-4 mr-1"></i>
                                        <div className='flex text-dark-3 text-xs'>
                                            Toán
                                        </div>
                                    </h2>
                                </div>
                                <div className='flex '>
                                    <h2 className='items-center flex gap-2'>
                                        <i className="text-[12px] fa-solid fa-bullseye text-dark-4"></i>
                                        <div className='flex text-dark-3 text-xs'>
                                            0% độ chính xác
                                        </div>
                                    </h2>
                                    <h2 className='items-center flex  text-dark-4'>
                                        <div className='items-center mx-2 flex'>
                                            <div className='w-1 h-1 rounded-full bg-dark-5'>
                                            </div>
                                        </div>
                                        <i className="text-[12px] fa-solid fa-play mr-1"></i>
                                        <div className='flex text-dark-3 text-xs'>
                                            Toán
                                        </div>
                                    </h2>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* */}
                    <div className='flex mt-4 flex-row justify-between items-center'>

                        <div className='flex'>
                            <div className='flex items-start'>
                                <img className='class="w-8 h-8 mr-2 rounded-full cursor-pointer min-w-8 min-h-8 v-popper--has-tooltip"' src='https://lh3.googleusercontent.com/a/AAcHTteBCXNDNnJ2PQ2WrEB_epMS3XuQDusSgayYHaTycHnq=s96-c' />
                            </div>
                            <div className='flex flex-col items-start'>
                                <div className='text-xs truncate cursor-pointer text-dark-6  hover:underline max-w-28 v-popper--has-tooltip'>
                                    <span>hung dao</span>
                                </div>
                                <div className='text-dark-4 text-[.6875rem]'>
                                    2 giờ
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-between space-x-1'>
                            <button className='flex items-center justify-center px-4 py-1 text-sm font-semibold h-8 bg-[#0909090d] text-dark-6 hover:text-dark-3  rounded other transition-colors duration-200 ease-in-out  relative min-w-max shrink-0 '>
                                <i className="text-[12px] mr-2 fa-solid fa-download"></i>
                                <span>bảng tính</span>
                            </button>
                            <button className='flex items-center justify-center px-3 py-1 text-sm font-semibold h-8 bg-[#0909090d] text-dark-6 hover:text-dark-3  rounded other transition-colors duration-200 ease-in-out  relative min-w-max shrink-0 '>
                                <i className="text-[12px] fa-regular fa-heart"></i>
                            </button>
                            <button className='flex items-center justify-center px-4 py-1 text-sm font-semibold h-8 bg-[#0909090d] text-dark-6 hover:text-dark-3  rounded other transition-colors duration-200 ease-in-out  relative min-w-max shrink-0 '>
                                <i className="text-[12px] mr-2 fa-regular fa-folder"></i>
                                <span>Lưu</span>
                            </button>
                            <button className='flex items-center justify-center px-4 py-1 text-sm font-semibold h-8 bg-[#0909090d] text-dark-6 hover:text-dark-3  rounded other transition-colors duration-200 ease-in-out  relative min-w-max shrink-0 '>
                                <i className="text-[12px] mr-2 fa-solid fa-share"></i>
                                <span>Chia sẻ</span>
                            </button>
                            <button className='flex items-center justify-center px-4 py-1 text-sm font-semibold h-8 bg-[#0909090d] text-dark-6 hover:text-dark-3  rounded other transition-colors duration-200 ease-in-out  relative min-w-max shrink-0 '>
                                <i className="text-[12px] mr-2 fa-regular fa-pen-to-square"></i>
                                <span>Chỉnh sửa</span>
                            </button>
                        </div>


                    </div>
                    <div className='absolute top-4 right-4 flex gap-1'>
                        <button className='flex items-center justify-center px-3 py-1 text-xs font-semibold h-6 bg-white border border-solid border-light-2 text-dark-6 hover:bg-bd-ft rounded white transition-colors duration-200 ease-in-out relative min-w-max '>
                            <i className="text-[11px] mr-2 fa-solid fa-code"></i>
                            <span>Nhúng</span>
                        </button>
                        <button className='flex items-center justify-center px-3 py-1 text-xs font-semibold h-6 bg-white border border-solid border-light-2 text-dark-6 hover:bg-bd-ft rounded white transition-colors duration-200 ease-in-out relative min-w-max '>
                            <i className="text-[11px] fa-solid fa-copy"></i>

                        </button>
                        <button className='flex items-center justify-center px-3 py-1 text-xs font-semibold h-6 bg-white border border-solid border-light-2 text-dark-6 hover:bg-bd-ft rounded white transition-colors duration-200 ease-in-out relative min-w-max '>
                            <i className="text-[11px] fa-regular fa-trash-can"></i>

                        </button>
                        <button className='flex items-center justify-center px-3 py-1 text-xs font-semibold h-6 bg-white border border-solid border-light-2 text-dark-6 hover:bg-bd-ft rounded white transition-colors duration-200 ease-in-out relative min-w-max '>
                            <i className="text-[11px] fa-solid fa-print"></i>

                        </button>
                        <button className='flex items-center justify-center px-3 py-1 text-xs font-semibold h-6 bg-white border border-solid border-light-2 text-dark-6 hover:bg-bd-ft rounded white transition-colors duration-200 ease-in-out relative min-w-max '>
                            <i className="text-[11px] fa-solid fa-gear"></i>
                        </button>
                    </div>

                </div>
            </div>

        </div>
    )
}
