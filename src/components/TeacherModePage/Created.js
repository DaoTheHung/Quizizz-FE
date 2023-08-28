import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useStore } from '../../../store/useStore'
import { useQuery } from '@tanstack/react-query'
import DateGameMode from '../common/GameMode/DateGameMode'
export default function Created() {
    const router = useRouter()
    const id = router.query.id

    const [checked, setChecked] = useState(false)


    useEffect(() => {
        if (router.pathname === `/admin/quiz/tp/[id]`) {
            document.title = `test | Live Game Settings - Quizizz`
        }
    }, [router])
   
    

    // store
    const fetchDataQuiz = useStore(state => state.fetchDataQuiz)
    const socket = useStore(state => state.socket)

    const { data } = useQuery(['quizizz'], fetchDataQuiz)
    const quizDetail = data?.data.find(item => item.id == id)
    const questionLength = data && JSON.parse(quizDetail?.questionList)

    const handleCreateZoom = () => {
        router.push(`/admin/presentation/${quizDetail?.id}?type=${router.query.type}`)

    }


    return (
        <div className=' ml-[12rem] h-full p-8  '>
            <div className='relative flex justify-center w-full pb-20 md:pb-6'>
                <button type='button' onClick={() => router.push(`/admin/quiz/${quizDetail.id}`)} className='absolute md:flex items-center text-dark-4 -left-4 -top-4 md:left-0 text-xs'>
                    <i className="text-[10px] p-1 fa-solid fa-chevron-left"></i>
                    Quay lại
                </button>
                <div className='px-4 w-[30rem] max-w-full md:px-0 flex flex-col items-center mb-15 md:mb-0'>

                    <div className='px-4 w-[31rem] max-w-full md:px-0 flex flex-col items-center mb-15 md:mb-0'>

                        <div className='flex w-full flex-col gap-3 justify-between items-center'>
                            <div className='text-dark-3 text-xl font-semibold overflow-hidden text-ellipsis flex-1 text-left'>
                                {quizDetail?.nameQuiz}
                            </div>
                            <div className='text-sm font-semibold text-dark-4'>
                                {questionLength?.length} câu hỏi
                            </div>
                        </div>
                    </div>


                    <div className='w-full border border-light-2 bg-white rounded-b-lg rounded-t-lg mt-6'>
                        <div className='flex items-center p-4 text-base font-semibold rounded-t-lg text-dark-6 bg-bd-ft'>
                            Thiết lập bài kiểm tra của bạn
                        </div>
                        <div className='p-4 bg-white relative border-t border-light-2'>

                            <div className='flex items-center justify-between'>
                                <div className='flex items-center'>
                                    <h4 className='text-sm font-semibold'>Đặt thời gian bắt đầu cho hoạt động</h4>
                                </div>
                                <div className='ml-4'>
                                    <div className='h-fit'>
                                        <div className='switch block relative md'>
                                            <label className={`switch__label rounded-full w-[42px] h-[20px] flex items-center whitespace-nowrap relative select-none default cursor-pointer ${checked ? "bg-[#00c9a5]" : "bg-[rgba(9_9_9/0.1)]"}`}>
                                                <div className={`absolute w-[16px] h-[16px] top-[2px] ${checked ? "left-[24px]" : "left-[2px]"}  rounded-full bg-white transition-allCheck`}></div>
                                                <input type='checkbox' onChange={(e) => setChecked(e.target.checked)} className='absolute mr-2 w-px h-px overflow-hidden cursor-pointer' />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {checked && <DateGameMode />}

                        </div>
                    </div>
                    <button type='button' onClick={handleCreateZoom} className=' items-center justify-center px-7.5 py-2.5 text-lg font-semibold shadow-[0_4px_#6c4298] mb-1 h-10 base bg-lilac text-white hover:bg-light  rounded-lg primary transition-colors duration-200 ease-in-out flex relative min-w-max w-full mt-5'>
                        Tiếp tục
                    </button>
                </div>
            </div>
        </div>
    )
}
