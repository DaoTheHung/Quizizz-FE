import React, { useState } from 'react'
import { useStore } from '../../../store/useStore'
import { useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import DataTypeQuiz from './DataTypeQuiz'
import RemoveQsModal from '../common/ListQuestion/RemoveQsModal'
export default function ListQuestion() {
    const [showDataQs, setShowDataQs] = useState(false)
    const [showModalRemove, setShowModalRemove] = useState(false)
    const [type, setType] = useState()

    // store
    const fetchDataQs = useStore(state => state.fetchData)

    const { data, error, isError, isLoading, refetch } = useQuery(['question'], fetchDataQs, {
        staleTime: 5000,
        refetchOnWindowFocus: false,
    })

    // Xóa câu hỏi
    const removeQuestion = useMutation(async (id) => {
        const res = await axios.delete(`http://localhost:3080/api/question/delete/${id}`)
        return res.data
    });
    const handleRemoveQuestion = (id) => {
        setType(id)
      if(type == id) {
        setShowModalRemove(!showModalRemove)
      }else{
        setShowModalRemove(false)
      }
       
    }

    return (
        <>
            {showDataQs && <div onClick={() => setShowDataQs(false)} className='fixed top-0 z-[9999] left-0 w-screen flex flex-auto min-h-screen min-w-screen overflow-y-auto flex-col overscroll-contain bg-[#090909cc]'>
                <div onClick={(e) => e.stopPropagation()} className='flex mt-[8rem] bg-white flex-col gap-6 relative p-7 h-fit w-full min-h-full md:min-h-0 md:mx-auto md:my-30 md:w-fit md:rounded-lg'>
                    <div className="absolute top-0 right-0 m-2">
                        <button onClick={() => setShowDataQs(false)} className="flex items-center justify-center w-8 h-8 bg-transparent text-dark-4 hover:bg-dark-10%  rounded transparent-floating-dark transition-colors duration-200 ease-in-out  relative min-w-max  font-normal">
                            <i className="text-[12px] fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <DataTypeQuiz />
                </div>
            </div>}
            <div className='w-[54%] mx-auto'>
                <div className='question-banner  font-semibold w-full py-4 flex items-center  gap-2 text-left text-sm'>
                    <div className='flex items-center gap-2 w-full'>
                        <i className="text-[12px] fa-solid fa-list-check"></i>
                        <span>{data.data.question.length} Câu hỏi</span>
                    </div>
                    <button onClick={() => setShowDataQs(true)} type="button" className=' items-center justify-center px-4 py-1.5 text-xs font-semibold h-8 base bg-lilac-faded text-lilac hover:text-light  rounded secondary transition-colors duration-200 ease-in-out flex relative min-w-max  ml-auto'>
                        <i className="text-[11px] fa-solid fa-plus mr-2"></i>
                        <span >Tạo câu hỏi mới</span>
                    </button>
                </div>
                <div className='w-full'>
                    <div className='question-details-card flex flex-col gap-2 group'>
                        {data.data.question.map((ques) => (
                            <div key={ques.id} className="question-details-card  relative mb-[32px] flex flex-col border border-solid border-light-2 rounded-lg  bg-white">
                                <div className='flex items-center justify-between p-2 bg-bd-ft rounded-t-lg'>
                                    <div className='relative flex items-center gap-x-2'>
                                        <button className='flex items-center justify-center w-8 h-8 bg-[#0909090d]  text-dark-2 hover:text-dark-3 rounded other transition-colors duration-200 ease-in-out relative min-w-max text-dark-4 hover:bg-[#0909090d] my-handle cursor-grab v-popper--has-tooltip'>
                                            <i className="text-[12px] fa-solid fa-grip"></i>
                                        </button>
                                        <span className='question-type-icon relative flex items-center justify-center w-6 h-6 bg-brand-b text-white rounded-sm'>
                                            <i className="text-[12px] fa-regular fa-square-check"></i>
                                        </span>
                                        <h2 className='text-sm text-dark-6'>
                                            <span>Câu hỏi {data.data.question.length}</span>
                                            <div className='lozenge items-center inline-flex text-xs font-semibold py-0.5 rounded px-1.5 bg-yellow-2 text-bd ml-2'>
                                                <i className="text-[11px] mr-1 fa-solid fa-bolt-lightning"></i>
                                                <span>SIÊU</span>
                                            </div>
                                        </h2>
                                    </div>
                                    <div className='flex'>
                                        <button className='flex items-center justify-center px-4 py-1 text-sm font-semibold h-full bg-white border border-solid border-light-2 text-dark-6 hover:bg-bd-ft  rounded white transition-colors duration-200 ease-in-out relative min-w-max mr-2 '>
                                            <i className="text-[12px] fa-solid fa-pencil mr-2"></i>
                                            <span>Chỉnh sửa</span>
                                        </button>
                                        <button className='flex items-center justify-center w-8 h-7 bg-light-3 border border-solid border-light-2 text-dark-6 hover:bg-bd-ft bg-white rounded white transition-colors duration-200 ease-in-out relative min-w-max mr-2 v-popper--has-tooltip'>
                                            <i className="text-[12px] fa-solid fa-copy"></i>
                                        </button>
                                        <button onClick={() => handleRemoveQuestion(ques.id)} className='flex items-center justify-center w-8 h-7 bg-light-3 border border-solid border-light-2 text-dark-6 hover:bg-bd-ft bg-white rounded white transition-colors duration-200 ease-in-out relative min-w-max mr-2 v-popper--has-tooltip'>
                                            <i className="text-[12px] fa-regular fa-trash-can"></i>
                                        </button>
                                        {!showModalRemove && type == ques.id  && <RemoveQsModal id={ques.id} removeQuestion={removeQuestion} showModalRemove={showModalRemove} setShowModalRemove={setShowModalRemove} />}
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

                                        <div className='flex items-start mb-2 w-1/2'>
                                            <span className={`w-4 h-4 rounded-full my-1 mr-2 shrink-0 relative ${ques.answare === ques.question_a ? "bg-green-500" : "bg-red-600"}`}></span>
                                            <span className='text-sm text-dark-2'>{ques.question_a}</span>
                                        </div>
                                        <div className='flex items-start mb-2 w-1/2'>
                                            <span className={`w-4 h-4 rounded-full my-1 mr-2 shrink-0 relative ${ques.answare === ques.question_b ? "bg-green-500" : "bg-red-600"}`}></span>
                                            <span className='text-sm text-dark-2'>{ques.question_b}</span>
                                        </div>
                                        <div className='flex items-start mb-2 w-1/2'>
                                            <span className={`w-4 h-4 rounded-full my-1 mr-2 shrink-0 relative ${ques.answare === ques.question_c ? "bg-green-500" : "bg-red-600"}`}></span>
                                            <span className='text-sm text-dark-2'>{ques.question_c}</span>
                                        </div>
                                        <div className='flex items-start mb-2 w-1/2'>
                                            <span className={`w-4 h-4 rounded-full my-1 mr-2 shrink-0 relative ${ques.answare === ques.question_d ? "bg-green-500" : "bg-red-600"}`}></span>
                                            <span className='text-sm text-dark-2'>{ques.question_d}</span>
                                        </div>
                                    </div>


                                </div>
                                <div className='p-2 bg-bd-ft flex rounded-b-lg flex-wrap gap-2'>
                                    <div className='field relative w-32'>
                                        <div className='dropdown flex relative rounded'>
                                            <button type='button' className='py-2 pl-2 pr-1 text-xs h-8 cursor-pointer bg-white text-dark-3 border border-light-2 hover:bg-bd-ft w-full flex rounded font-semibold items-center whitespace-nowrap'>
                                                <i className="text-[11px] fa-solid fa-stopwatch mr-2"></i>
                                                <span>{ques.timer} giây</span>
                                                <div className='w-4 h-4 items-center justify-center flex relative ml-auto'>
                                                    <i className="text-[11px] fa-solid fa-caret-down"></i>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='field relative w-32'>
                                        <div className='dropdown flex relative rounded'>
                                            <button type='button' className='py-2 pl-2 pr-1 text-xs h-8 cursor-pointer bg-white text-dark-3 border border-light-2 hover:bg-bd-ft w-full flex rounded font-semibold items-center whitespace-nowrap'>
                                                <i className="text-[11px] fa-solid fa-circle-check mr-2"></i>
                                                <span>{ques.score} điểm</span>
                                                <div className='w-4 h-4 items-center justify-center flex relative ml-auto'>
                                                    <i className="text-[11px] fa-solid fa-caret-down"></i>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='flex flex-grow-0 ml-auto w-fit'>
                                        <div className='flex items-center justify-center px-2 text-xs font-semibold border border-r-0 rounded-l border-light-2 bg-light-2'>
                                            <i className="fa-solid fa-xmark mr-2"></i>
                                            <span> Không được gắn thẻ</span>
                                        </div>
                                        <button className='flex items-center justify-center px-4 py-1.5 text-xs font-semibold h-full bg-light-3 border  border-light-2 text-dark-6 hover:bg-bd-ft  ml-auto w-fit flex-grow-0 rounded-none rounded-r white transition-colors duration-200 ease-in-out  relative min-w-max' type='button'>
                                            <i className="text-[11px] mr-2 fa-solid fa-lock"></i>
                                            <span>Thẻ</span>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
