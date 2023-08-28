import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useRouter } from "next/router";
import { useStore } from '../../../../store/useStore'
import { useQuery, useMutation } from '@tanstack/react-query'
import { dataScore, dataTimer, dataCheckAs } from '../../common/Datafill/Data'
import { v4 as uuid } from 'uuid'
import axios from 'axios'

export default function ContentCreateQs({ typeQuiz }) {
    const router = useRouter()
    
    const [isData, setIsData] = useState(false)
    const [showCheck, setShowCheck] = useState(false)
    const [typeId, setTypeId] = useState()
    const [value, setValue] = useState('')
    const [question, setQuestion] = useState([])

    const handleCheckAnsware = (id, valueQs) => {
        setTypeId(id)
        if (typeId === id) {
            setShowCheck(!showCheck)
        } else {
            setShowCheck(false)
        }
        setValue(watch(valueQs))
    }

    // Timer
    const [timeQs, setTimeQs] = useState(30)
    const [showTimeQs, setShowTimeQs] = useState(false)
    //Score
    const [scoreQs, setScoreQs] = useState(1)
    const [showScoreQs, setShowScoreQs] = useState(false)

    useEffect(() => {

        const local = JSON.parse(localStorage.getItem('question'))
        if (local !== null) {
            setQuestion(local)
        }
    }, [isData])


    // Thêm câu hỏi
    const createQuestion = useMutation(async (data) => {
        const res = await axios.post('http://localhost:3080/api/question/add', data)
        return res.data
    });
    const fakeData = [...question]
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm({ mode: "onSubmit" });
    const onSubmit = (data) => {

        const newQuestion = {
            id: uuid(),
            questionTitle: data.questionTitle,
            questionType: typeQuiz,
            question: [data.question_a, data.question_b, data.question_c, data.question_d],

            answare: [value],
            timer: timeQs,
            score: scoreQs,
        }
        fakeData.push(newQuestion)
        setQuestion(fakeData)
        localStorage.setItem('question', JSON.stringify(fakeData))
        router.push('/admin/quiz/creator?at=64ca3d23528db700079f5291')
        createQuestion.mutate(newQuestion, {
            onSuccess: (response) => {
                if (response) {
                }
            }
        })

    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className='h-auto'>
            <div className='q-container flex justify-center items-center'>
                <div className='w-[83%] mx-auto mt-4 h-full bg-purple-1 md:rounded-2xl question-editor-desktop'>
                    <div className='p-4 h-full'>
                        <div className='query-editor relative text-center flex flex-col gap-4 justify-center items-center flex-grow  mb-4'>
                            <div className='rounded-lg text-[20px] font-semibold h-[22rem]  border text-light-3 relative flex flex-col border-[#fff3] w-full'>
                                <div className='flex p-2 justify-between relative z-20 '>
                                    <div className='query-action-center flex gap-2'>
                                        <button type='button' className='flex items-center justify-center w-8 h-8 transparent bg-[#fff3] text-white hover:bg-[#ffffff54] rounded transition-colors duration-200 ease-in-out relative min-w-max '>
                                            <i className="text-[12px] fa-solid fa-image"></i>
                                        </button>
                                        <button type='button' className='flex items-center justify-center w-8 h-8 transparent bg-[#fff3] text-white hover:bg-[#ffffff54] rounded transition-colors duration-200 ease-in-out relative min-w-max '>
                                            <i className="text-[12px] fa-solid fa-microphone-lines"></i>
                                        </button>
                                        <button type='button' className='flex items-center justify-center w-8 h-8 transparent bg-[#fff3] text-white hover:bg-[#ffffff54] rounded transition-colors duration-200 ease-in-out relative min-w-max '>
                                            <i className="text-[12px] fa-solid fa-video"></i>
                                        </button>
                                    </div>

                                </div>
                                <input
                                    autoComplete='off'
                                    placeholder='Nhập câu hỏi của bạn ở đây...'
                                    className='tiptap-mini focus:bg-[#09090980] text-white placeholder:text-light-1 bg-purple-1 rounded-[9px] text-center outline-none flex flex-col justify-center absolute z-10 h-full max-h-full overflow-y-auto w-full break-all'
                                    {...register("questionTitle", {
                                        required: true,
                                    })}
                                />


                            </div>
                        </div>

                        <div className='options-container flex flex-col md:flex-row w-full h-full gap-2'>
                            <div className='grid h-[22rem] md:grid-flow-col md:auto-cols-fr w-full  gap-2'>
                                {dataCheckAs.map(item => (

                                    <div key={item.id} className={`question-option relative rounded-lg h-full max-h-full overflow-y-auto overflow-x-hidden flex flex-row-reverse md:flex-col gap-2 p-1 ${item.bg}`}>
                                        <div className='action-center flex flex-col md:flex-row gap-2'>
                                            <button type='button' className='flex items-center justify-center w-6 h-6 transparent bg-[#fff3] text-white hover:bg-[#ffffff54]  rounded transition-colors duration-200 ease-in-out relative min-w-max flex-shrink-0 v-popper--has-tooltip'>
                                                <i className="text-[11px] fa-solid fa-trash-can"></i>
                                            </button>
                                            <button type='button' className='flex items-center justify-center w-6 h-6 transparent bg-[#fff3] text-white hover:bg-[#ffffff54]  rounded transition-colors duration-200 ease-in-out relative min-w-max flex-shrink-0 v-popper--has-tooltip'>
                                                <i className="text-[11px] fa-solid fa-image"></i>
                                            </button>

                                            <div onClick={() => (handleCheckAnsware(item.id, item.value))} className={`${!showCheck && typeId === item.id ? "bg-green-500" : "bg-[#09090980] hover:bg-[#09090999]"} ml-auto  cursor-pointer flex items-center justify-center w-6 h-6  transition-colors duration-200 ease-in-out relative min-w-max border-2 text-[#ffffff80]  rounded-full`}>
                                                <i className="text-[11px] fa-solid fa-check"></i>
                                            </div>

                                        </div>
                                        <input
                                            type='text'
                                            autoComplete='off'
                                            placeholder='Enter option text'
                                            className={`tiptap-mini focus:bg-[#09090980] text-[20px] text-white placeholder:text-light-1 ${item.bg} rounded-[9px] text-center outline-none flex flex-col justify-center  h-full  overflow-y-auto w-full break-all`}
                                            {...register(item.value, {
                                                required: true,
                                            })}
                                        />
                                    </div>
                                ))}
                                {/* */}
                            </div>
                        </div>
                        {/* */}
                        <div className='bg-[#09090980] p-0.5 text-[#ffffffa8] flex md:w-fit rounded gap-0.5 w-full my-2'>
                            <button type='button' className='flex items-center justify-center px-3 py-1 text-xs font-semibold h-6 transparent bg-[#fff3] text-white hover:bg-[#ffffff54] a rounded transparent transition-colors duration-200 ease-in-out relative min-w-max  transform flex-1'>
                                <div>
                                    Single correct answer
                                </div>

                            </button>
                            <button type='button' className='flex items-center justify-center px-3 py-1 text-xs font-semibold h-6 transparent  text-white hover:bg-[#ffffff54] rounded transparent transition-colors duration-200 ease-in-out relative min-w-max  transform flex-1'>
                                <div>
                                    Multiple correct answers
                                </div>

                            </button>
                        </div>
                        {/* */}
                    </div>
                </div>
            </div>
            <div className='h-full mt-[23px]'>
                <div className='p-2 flex w-full bg-dark-6 gap-2'>
                    <button type='button' className='flex gap-2 items-center justify-center px-4 py-1.5 text-xs font-semibold h-8 bg-[#09090980] text-white hover:bg-[#09090999] rounded dark transition-colors duration-200 ease-in-out  relative min-w-max'>
                        <i className="text-[11px] fa-solid fa-lightbulb"></i>
                        <div >Add answer explanation</div>
                    </button>

                    <div className='h-8 border border-[#ffffff1a]'></div>

                    <div className='dropdown flex relative rounded'>

                        <button onClick={() => setShowTimeQs(true)} type='button' className='py-2 w-[69px] gap-2 pl-2 pr-1 text-xs h-8 cursor-pointer bg-[#09090980] text-white hover:bg-[#09090999]  flex rounded font-semibold items-center whitespace-nowrap'>
                            <i className="text-[11px] fa-regular fa-clock"></i>
                            <div>{timeQs}s</div>
                            <div className='w-4 h-4 items-center justify-center flex relative ml-auto'>
                                <i className="text-[11px] fa-solid fa-caret-up"></i>
                            </div>
                        </button>
                        {showTimeQs && <div className='list absolute bg-white h-fit shadow-sortHig transform rounded transition-transform z-on-overlay mt-2 scale-y-100 left-0 w-full bottom-full mb-1 origin-bottom '>
                            <ul className='w-full max-h-screen overflow-y-auto'>
                                {dataTimer.map((times) => (
                                    <li onClick={() => (setTimeQs(times.time), setShowTimeQs(false))} key={times.id} className='w-full text-sm text-dark-6 hover:bg-[#0909091a] font-semibold'>
                                        <button type="button" className='w-full px-2 py-1 focus:outline-none focus:bg-dark-10%'>
                                            {times.time}s
                                        </button>
                                    </li>
                                ))}

                            </ul>
                        </div>}
                    </div>

                    <div className='dropdown flex relative rounded w-[91px]'>
                        <button onClick={() => setShowScoreQs(true)} type='button' className='py-2  gap-2 pl-2 pr-1 text-xs h-8 cursor-pointer bg-[#09090980] text-white hover:bg-[#09090999] w-full flex rounded font-semibold items-center whitespace-nowrap'>
                            <i className="text-[11px] fa-solid fa-check"></i>
                            <div>{scoreQs} Điểm</div>
                            <div className='w-4 h-4 items-center justify-center flex relative ml-auto'>
                                <i className="text-[11px] fa-solid fa-caret-up"></i>
                            </div>

                        </button>
                        {showScoreQs && <div className='list absolute bg-white h-fit shadow-sortHig transform rounded transition-transform z-on-overlay mt-2 scale-y-100 left-0 w-full bottom-full mb-1 origin-bottom '>
                            <ul className='w-full max-h-screen overflow-y-auto'>
                                {dataScore.map((score) => (
                                    <li onClick={() => (setScoreQs(score.score), setShowScoreQs(false))} key={score.id} className='w-full text-sm text-dark-6 hover:bg-[#0909091a] font-semibold'>
                                        <button type="button" className='w-full px-2 py-1 focus:outline-none focus:bg-dark-10%'>
                                            {score.score} điểm
                                        </button>
                                    </li>
                                ))}

                            </ul>
                        </div>}
                    </div>

                    <div className='h-8 border border-[#ffffff1a]'></div>

                    <div className='dropdown flex relative rounded'>
                        <button type='button' className='py-2 gap-2 pl-4 pr-1 text-xs h-8 cursor-pointer bg-[#09090980] text-white hover:bg-[#09090999] w-full flex rounded font-semibold items-center whitespace-nowrap'>
                            <i className="text-[11px] fa-solid fa-tags"></i>
                            <div className='pr-4'>Thẻ</div>

                        </button>
                    </div>

                    <div className='flex gap-x-2 ml-auto'>
                        <button type='button' className='flex gap-2 items-center justify-center px-4 py-1 text-sm font-semibold h-8 transparent bg-[#fff3] text-white hover:bg-[#09090999]  rounded transparent transition-colors duration-200 ease-in-out  relative min-w-max'>
                            <i className="text-[11px] fa-solid fa-users"></i>
                            <div>
                                quan điểm của người tham gia
                            </div>
                        </button>
                    </div>

                    <div className='h-8 border border-[#ffffff1a]'></div>

                    <div className='dropdown flex relative rounded'>
                        <button type='button' className='py-2 gap-2 pl-4 pr-1 text-sm h-8 cursor-pointer bg-[#09090980] text-white hover:bg-[#09090999] w-full flex rounded font-semibold items-center whitespace-nowrap'>
                            <div className='pr-4'>Hủy</div>

                        </button>
                    </div>

                    <div className='dropdown flex relative rounded'>
                        <button type='submit' className='py-2 font-semibold gap-2 pl-4 pr-1 text-sm h-8 cursor-pointer bg-white text-dark-6  w-full flex rounded  items-center whitespace-nowrap'>
                            <i className="text-[11px] fa-solid fa-floppy-disk"></i>
                            <div className='pr-4'>Lưu</div>

                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
