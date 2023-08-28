import React, { useEffect, useState } from 'react'
import { useStore } from '../../../store/useStore'
import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@tanstack/react-query'

export default function QuizContent() {
    const router = useRouter()
    const id = router.query.id


    //
    const [showBlock, setShowBlock] = useState(false)

    // store
    const fetchDataQs = useStore(state => state.fetchData)
    const fetchDataQuiz = useStore(state => state.fetchDataQuiz)
    const dataQuiz = useStore(state => state.dataQuiz)

    // Call api
    const { data, error, isError, isLoading, refetch } = useQuery(['question'], fetchDataQs, {
        staleTime: 5000,
        refetchOnWindowFocus: false,
    })
    useQuery(['quizizz'], fetchDataQuiz,)

    // Check id
    const detailData = dataQuiz?.find(item => item.id == id)
    const question = detailData && JSON.parse(detailData?.questionList)


    if (detailData) {
        document.title = `${detailData?.nameQuiz} | Quizizz`
    }


    const handleStart = () => {
        router.push(`/admin/quiz/start_new/${detailData?.id}?type=basic`)

    }

    // giáo viên điều khiển
    const handleStartTeacher = () => {
        router.push(`/admin/quiz/tp/${detailData?.id}?type=teacher`)
    }



    return (
        <div className='quiz-content-container absolute top-[307px] px-[3rem] bg-bd left-0 right-0 flex flex-col items-center   ml-[193px] '>
            <div className='relative w-[50rem] '>
                <div className='md:p-3 md:rounded md:bg-white'>
                    <div className='flex md:items-center space-x-2 '>

                        <div className='for-super flex-1 min-w-0'>
                            <div className='relative rounded-lg h-[60px]'>
                                <button onClick={() => setShowBlock(!showBlock)} type='button' className='flex  items-center px-4 py-2.5 text-lg font-semibold shadow-btnCreate mb-1 h-full base bg-lilac text-white hover:bg-light  rounded-lg  transition-colors duration-200 ease-in-out  relative  w-full justify-center md:justify-start'>
                                    <i className="text-[16px] mr-2 fa-solid fa-chalkboard-user"></i>
                                    <div className='flex flex-col text-left overflow-hidden'>
                                        <span className='title text-base  truncate md:w-full  text-[#ffffffa8] text-[0.6875rem] font-semibold w-full '>Giáo viên điều khiển
                                        </span>
                                        <span className='subtitle text-base md:text-lg truncate md:w-full xs:text-left'>
                                            Bắt đầu quiz trực tiếp
                                        </span>
                                    </div>
                                    <i className="text-[16px]  ml-auto fa-solid fa-caret-down"></i>
                                </button>

                                {showBlock && <div className='start-quiz-dropdown z-20 absolute overflow-hidden shadow-lg bg-white rounded-2xl z-100 my-2 top-[4rem] md:top-15'>
                                    <button onClick={handleStart} type='button' className='flex items-center p-4 hover:bg-bd-ft'>
                                        <div className='p-[19px] flex items-center justify-center mr-2 rounded-lg bg-purple-2 text-lilac'>
                                            <i className="text-[18px] fa-solid fa-users-rectangle"></i>
                                        </div>
                                        <div className="flex flex-col text-left">
                                            <div className="text-base font-semibold text-dark-6">
                                                Thông thường
                                            </div>
                                            <div className='text-[.6875rem] text-dark-4'>
                                                Học sinh trả lời theo tốc độ của riêng họ và bạn sẽ thấy kết quả trên bảng điều khiển trực tiếp
                                            </div>
                                        </div>
                                    </button>
                                    <hr className='mx-2 border-light-2' />
                                    <button onClick={handleStartTeacher} type='button' className='flex items-center  p-4 hover:bg-bd-ft'>
                                        <div className='p-[19px] flex items-center justify-center mr-2 rounded-lg bg-purple-2 text-lilac'>
                                            <i className="text-[18px] fa-solid fa-chalkboard-user"></i>
                                        </div>
                                        <div className="flex flex-col text-left">
                                            <div className="text-base font-semibold text-dark-6">
                                                Giáo viên điều khiển
                                            </div>
                                            <div className='text-[.6875rem] text-dark-4'>
                                                Kiểm soát tốc độ để mọi người cùng nhau tiến bộ qua từng câu hỏi
                                            </div>
                                        </div>
                                    </button>
                                </div>}

                            </div>
                        </div>
                        <div className='for-super flex-1 min-w-0'>
                            <div className='relative rounded-lg h-[60px] '>
                                <button type='button' className='flex items-center px-4 py-2.5 text-lg font-semibold shadow-btnCreate mb-1 h-full base bg-lilac text-white hover:bg-light  rounded-lg  transition-colors duration-200 ease-in-out  relative  w-full justify-center md:justify-start'>
                                    <i className="text-[16px] mr-2 fa-solid fa-clock"></i>
                                    <div className='flex flex-col text-left overflow-hidden'>
                                        <span className='title text-base  truncate md:w-full  text-[#ffffffa8] text-[0.6875rem] font-semibold w-full '>Học không đồng bộ
                                        </span>
                                        <span className='subtitle text-base md:text-lg truncate md:w-full xs:text-left'>
                                            Giao bài tập về nhà
                                        </span>
                                    </div>

                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className='hidden md:flex justify-between mb-4 mt-7 w-[50rem] '>
                <div className='flex items-center text-base'>
                    <i className="text-[12px] text-dark-3 fa-solid fa-list-check"></i>
                    <p className='mx-2 text-dark-6'>
                        {data?.data?.question?.length} câu hỏi
                    </p>
                </div>
                <div className='flex '>
                    <button className='flex  items-center justify-center px-3 py-1 text-xs font-semibold h-6 bg-white border border-solid border-light-2 text-dark-2 hover:bg-bd-ft rounded  transition-colors duration-200 ease-in-out  relative min-w-max  mx-1'>
                        <i className="mr-2 text-[11px] fa-regular fa-eye-slash"></i>
                        <span>Ẩn đáp án</span>
                    </button>
                    <button className='flex  items-center justify-center px-3 py-1 text-xs font-semibold h-6 bg-white border border-solid border-light-2 text-dark-2 hover:bg-bd-ft rounded  transition-colors duration-200 ease-in-out  relative min-w-max  mx-1'>
                        <i className="mr-2 text-[11px] fa-solid fa-play"></i>
                        <span>Xem trước</span>
                    </button>
                </div>
            </div>
            {/*Câu hỏi đã tạo */}
            <div className='w-[50rem] '>
                <div className='question-details-card flex flex-col gap-2 group'>
                    {question?.map((ques, index) => (
                        <div key={index} className="question-details-card  relative mb-[32px] flex flex-col border border-solid border-light-2 rounded-lg  bg-white">
                            <div className='flex items-center justify-between p-2  rounded-t-lg'>
                                <div className='relative flex items-center gap-x-2'>
                                    <i className="text-[12px] text-brand-f fa-regular fa-square-check"></i>
                                    <h2 className='text-sm text-dark-6'>
                                        <span> {ques.questionType}</span>
                                    </h2>
                                </div>

                            </div>
                            <div className='p-4 shadow-sm rounded-t-lg'>
                                <div className='question-details-card-question-text'>
                                    <div className='flex items-center mb-4'>
                                        <div className='question-wrapper text-sm flex overflow-hidden text-dark-6 items-center'>
                                            <span>{ques.questionTitle}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='h-px mb-4 bg-bd relative'>
                                    <span className='absolute px-2 text-[.625rem] leading-[1rem] tracking-[+.015em] left-4 -translate-y-1/2 transform text-dark-4 bg-white'>lựa chọn trả lời</span>
                                </div>

                                <div className='flex flex-wrap'>

                                    {ques.question.map((item, index) => (
                                        <div key={index} className='flex items-start mb-2 w-1/2'>
                                            <span className={`w-4 h-4 rounded-full my-1 mr-2 shrink-0 relative ${ques.answare.map((itemA) => itemA === item ? "bg-green-500" : "bg-red-600")}`}></span>
                                            <span className='text-sm text-dark-2'>{item}</span>
                                        </div>
                                    ))}

                                    {ques.question.length <= 0 && ques.answare.map((item, index) => (
                                        <div key={index} className='flex items-center mb-2 w-1/2'>
                                            <span className='w-4 h-4 rounded-full my-1 mr-2 shrink-0 relative bg-light-2'>
                                                <i className="flex text-[9px] items-center far fa-chevron-right absolute transform -translate-x-1/2 -translate-y-1/2 text-dark-4 top-2/4 left-2/4 fa-solid fa-chevron-right"></i>
                                            </span>
                                            <span className='text-sm text-dark-2'>{item}</span>
                                        </div>
                                    ))}

                                </div>


                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
