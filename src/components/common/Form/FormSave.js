import React from 'react'
import { useForm } from "react-hook-form"
import { useQuery, useMutation } from '@tanstack/react-query'
import { useStore } from '../../../../store/useStore'
import { useRouter } from 'next/router'
import { getDates } from '../DateFormat/getDates'
import axios from 'axios'

export default function FormSave({ setShowModal, data, dataQuestion }) {

    const router = useRouter()
    // store
    const fetchDataQuiz = useStore(state => state.fetchDataQuiz)

    // Date
    const date = new Date()
    const newDate = getDates(date)


    // Mutation
    const createQuiz = useMutation(async (data) => {
        const res = await axios.post('http://localhost:3080/api/quizizz/add', data)
        return res.data
    });

    const createQuestion = useMutation(async (data) => {
        const res = await axios.post('http://localhost:3080/api/question/add', data)
        return res.data
    });



    // useQuery(['quizizz'], fetchDataQuiz)


    //Form
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm({ mode: "onSubmit" });

    const question = dataQuestion.map((item) => ({
        id: item.id,
        answare: item.answare,
        question: item.question,
        questionType: item.questionType,
        questionTitle: item.questionTitle,
        score: item.score,
        timer: item.timer
    }))




    const onSubmit = (dataQuiz) => {

        // Quiz
        const newQuiz = {
            nameQuiz: dataQuiz.quizName,
            createAt: newDate,
            updateAt: newDate,
            questionList: question
        }
        createQuiz.mutate(newQuiz, {
            onSuccess: (response) => {
                if (response) {
                    localStorage.removeItem('question')
                    router.push(`/admin/private`)
                }
            }
        })


    }
    return (
        <div className='flex w-screen h-screen overflow-auto'>
            <div className='flex bg-white mt-[127px] flex-col gap-6 relative p-6 h-fit w-full min-h-full md:min-h-0 md:mx-auto md:my-30 md:w-1/2 md:rounded-lg'>
                <header className='flex w-full'>
                    <div className='flex items-center justify-center mr-3 rounded-full min-w-[2.5rem] min-h-[2.5rem] max-h-10 max-w-10 bg-lilac-faded text-lilac'>
                        <i className="text-[16px] fa-solid fa-hand-sparkles"></i>
                    </div>
                    <div className='flex justify-center flex-col'>
                        <span className='font-sans font-semibold text-base text-dark-6 flex'>
                            Great, you're almost done
                        </span>
                        <span className='font-sans font-normal text-sm text-dark-4 flex items-center'>
                            Xem lại cài đặt bài quiz và bạn sẵn sàng tiếp tục
                        </span>
                    </div>
                </header>
                <div onClick={() => setShowModal(false)} className='absolute top-0 right-0 m-2'>
                    <button className='flex items-center justify-center w-8 h-8 bg-transparent text-dark-4 hover:bg-[#0909091a]  rounded  transition-colors duration-200 ease-in-out  relative min-w-max font-normal '>
                        <i className="text-[12px] fa-solid fa-xmark"></i>
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex w-full h-auto min-h-0'>
                        <section className='flex mr-4 flex-col-reverse w-full gap-4 h-fit'>
                            <div className='flex flex-col gap-4'>
                                <div className='relative w-full'>
                                    <div className='font-semibold text-xs mb-1 ml-1 text-dark-4'>Tên</div>
                                    <div className='relative'>
                                        <input
                                            placeholder='Bài Quiz không có tiêu đề'
                                            type='text'
                                            className='focus:outline-none h-10 w-full py-2 text-sm font-normal remove-number-selector pl-3 border border-solid border-light-2 rounded focus:ring-2 focus:ring-lilac focus:ring-offset-0 bg-white text-dark-6   placeholder-[#bbb6b6fc]  pr-3 '
                                            {...register("quizName", {
                                                required: true,
                                                minLength: 4,
                                            })}
                                        />
                                        {errors.quizTitle?.type == "minLength" &&
                                            <div className='flex pt-1 text-xs font-semibold text-red-600'>
                                                <span className='w-4 h-4 flex items-center justify-center mr-0.5'>
                                                    <i className="text-[11px] fa-solid fa-circle-exclamation"></i>
                                                </span>
                                                <span>
                                                    Quiz name should be at least 4 characters long
                                                </span>
                                            </div>
                                        }
                                    </div>

                                </div>
                                <div className='relative w-full'>
                                    <div className='font-semibold text-xs mb-1 ml-1 text-dark-4'>Chủ thể</div>
                                    <div className='relative'>
                                        <button type='button' className='listbox-button flex items-center cursor-pointer box-border text-left rounded font-semibold text-sm text-dark-3 p-4 border border-light-2 text-dark-2 pl-2 pr-1 py-2 h-10 w-full'>
                                            <div className='flex items-center justify-center mr-2 w-6 h-6'>
                                                <i className="text-[12px] fa-solid fa-book"></i>
                                            </div>
                                            <div className='title w-full truncate text-sm'>
                                                Toán
                                            </div>
                                            <div className='ml-auto flex items-center justify-center w-6 h-6'>
                                                <i className="text-[12px] fa-solid fa-caret-down"></i>
                                            </div>
                                        </button>
                                    </div>

                                </div>
                                <div className='relative w-full'>
                                    <div className='font-semibold text-xs mb-1 ml-1 text-dark-4'>Lớp</div>
                                    <div className='relative'>
                                        <button type='button' className='listbox-button flex items-center cursor-pointer box-border text-left rounded font-semibold text-sm text-dark-3 p-4 border border-light-2 text-dark-2 pl-2 pr-1 py-2 h-10 w-full'>
                                            <div className='flex items-center justify-center mr-2 w-6 h-6'>
                                                <i className="text-[12px] fa-solid fa-graduation-cap"></i>
                                            </div>
                                            <div className='title w-full truncate text-sm'>
                                                KG
                                            </div>
                                            <div className='ml-auto flex items-center justify-center w-6 h-6'>
                                                <i className="text-[12px] fa-solid fa-caret-down"></i>
                                            </div>
                                        </button>
                                    </div>

                                </div>
                                <div className='relative w-full'>
                                    <div className='font-semibold text-xs mb-1 ml-1 text-dark-4'>Ngôn ngữ</div>
                                    <div className='relative'>
                                        <button type='button' className='listbox-button flex items-center cursor-pointer box-border text-left rounded font-semibold text-sm text-dark-3 p-4 border border-light-2 text-dark-2 pl-2 pr-1 py-2 h-10 w-full'>
                                            <div className='flex items-center justify-center mr-2 w-6 h-6'>
                                                <i className="text-[12px] fa-solid fa-language"></i>
                                            </div>
                                            <div className='title w-full truncate text-sm'>
                                                KG
                                            </div>
                                            <div className='ml-auto flex items-center justify-center w-6 h-6'>
                                                <i className="text-[12px] fa-solid fa-caret-down"></i>
                                            </div>
                                        </button>
                                    </div>

                                </div>
                                <div className='relative w-full'>
                                    <div className='font-semibold text-xs mb-1 ml-1 text-dark-4'>Ngôn ngữ</div>
                                    <div className='relative'>
                                        <button type='button' className='listbox-button flex items-center cursor-pointer box-border text-left rounded font-semibold text-sm text-dark-3 p-4 border border-light-2 text-dark-2 pl-2 pr-1 py-2 h-10 w-full'>
                                            <div className='flex items-center justify-center mr-2 w-6 h-6'>
                                                <i className="text-[12px] fa-regular fa-eye"></i>
                                            </div>
                                            <div className='title w-full truncate text-sm'>
                                                Công khai, hiển thị với mọi người
                                            </div>
                                            <div className='ml-auto flex items-center justify-center w-6 h-6'>
                                                <i className="text-[12px] fa-solid fa-caret-down"></i>
                                            </div>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </section>

                        <section className='h-auto w-full flex items-center justify-center'>
                            <div className='aspect-square flex flex-auto'>
                                <div className='flex h-full w-full justify-center group'>
                                    <div className='flex h-full w-full bg-bd-ft rounded border-light-2 border-2 border-dashed flex-col items-center justify-center gap-2'>
                                        <button className='flex items-center justify-center w-9 h-9 bg-[#09090980] text-white hover:bg-[#09090999]     rounded dark transition-colors duration-200 ease-in-out relative min-w-max v-popper--has-tooltip'>
                                            <i className="text-[14px] fa-solid fa-plus"></i>
                                        </button>
                                        <span className='open-sans text-xs text-dark-4'>
                                            Thêm ảnh bìa
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <footer className='w-full flex mt-[25px]'>
                        <div className='flex flex-grow gap-2 justify-end'>
                            <button type='submit' className='flex items-center justify-center px-4 py-1 text-sm font-semibold h-8 base bg-lilac text-white hover:bg-light  rounded primary transition-colors duration-200 ease-in-out relative min-w-max'>
                                <span>Xuất bản</span>
                            </button>
                        </div>
                    </footer>
                </form>
            </div>
        </div>
    )
}
