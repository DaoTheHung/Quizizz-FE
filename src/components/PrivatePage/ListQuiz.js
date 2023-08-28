import React, { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useStore } from '../../../store/useStore'
import { useRouter } from 'next/router'
import axios from 'axios'
export default function ListQuiz({ setShow, show }) {
    const router = useRouter()
    const [type, setType] = useState('')

    // store
    const fetchDataQuiz = useStore(state => state.fetchDataQuiz)
    const dataQuiz = useStore(state => state.dataQuiz)

    // Call api
    const { refetch } = useQuery(['quizizz'], fetchDataQuiz, {
        staleTime: 5000,
        refetchOnWindowFocus: false,
    })


    const removeQuiz = useMutation(async (id) => {
        const res = await axios.delete(`http://localhost:3080/api/quizizz/delete/${id}`)
        return res.data
    });

    // Get detail
    const handleDetailPage = (id) => {
        router.query = id
        router.push(`/admin/quiz/${id}`)
    }


    const handleShowModal = (id) => {
        setType(id)
        if (type == id) {
            setShow(!show)
        } else {
            setShow(false)
        }

    }

    const handleRemoveQuiz = (id, idQs) => {
        removeQuiz.mutate(id, {
            onSuccess: (response) => {
                if (response) {
                    refetch()
                }
            }
        })
     
    }

    return (
        <div onClick={(e) => e.stopPropagation()} className='px-[0.5rem]  ml-[193px] pt-[3rem] mt-[1rem] '>
            <div className='flex flex-grow  '>
                <div className='my-library w-[80rem] m-auto flex flex-col items-center z-[9999] relative '>
                    <div className='flex px-8 pt-8 w-full justify-between'>

                        <div className='flex flex-col w-[18rem]  navigation-drawer gap-y-4 z-1 max-h-[calc(100vh-100px)]  top-8 sticky'>
                            <div className='flex px-3 pb-1 justify-left items-center font-bold text-dark-3 text-base md:text-xl md:p-0 md:h-8'>
                                <span>Thư viện của tôi</span>
                            </div>
                            <div className='flex flex-col divide-y divide-dark-10%'>
                                <ul className='flex flex-row flex-wrap text-xs p-3 gap-2 md:text-sm md:flex-col md:p-0 md:pb-4 md:gap-y-1'>
                                    <div className='md:w-full'>
                                        <li className='flex mb-1 justify-between border border-light-2rounded text-dark-4 hover:bg-white hover:shadow-sm hover:text-dark-6 cursor-pointer h-6 items-center md:border-0 md:mb-0 md:w-full md:h-8 p-0 bg-white shadow-sm'>
                                            <div className='flex justify-between items-center'>
                                                <button className='flex flex-row flex-grow items-center justify-between h-full'>
                                                    <div className='flex flex-row items-center border-r border-[#0909091a] md:border-0 w-8 h-full justify-center'>
                                                        <i className="text-[12px] text-lilac  px-2 fa-solid fa-user"></i>
                                                    </div>
                                                </button>
                                                <div className='flex flex-grow px-2 items-center'>
                                                    <span className='font-semibold truncate text-dark-6'>Được tạo bởi tôi</span>
                                                </div>
                                            </div>
                                            <div className='flex px-2 items-center text-xs'>
                                                {dataQuiz?.length}
                                            </div>
                                        </li>
                                    </div>

                                </ul>
                                <div className='border-t border-[#0909091a]'>
                                    <ul className='flex flex-col text-xs p-3 gap-2 md:text-sm md:p-0 md:py-4 md:gap-y-1'>
                                        <div>
                                            <li className='flex justify-start md:block mb-2'>
                                                <div className='mb-2 flex'>
                                                    <span className='text-dark-3 text-sm font-bold flex-1'>
                                                        Bộ sưu tập của tôi
                                                    </span>
                                                </div>
                                            </li>
                                        </div>
                                        <div className='flex items-center justify-center bg-white border border-light-2 rounded cursor-pointer hover:bg-bd-ft   hover:text-dark-3 px-2 h-6 md:p-0'>
                                            <i className="text-[12px] fa-solid fa-folder-plus"></i>
                                            <span className='ml-2.5 justify-left text-xs font-semibold'>
                                                Bộ sưu tập mới
                                            </span>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className='flex w-[54rem] flex-col  navigation-drawer gap-y-4 z-1 max-h-[calc(100vh-100px)]  top-8 sticky'>
                            <div className=' ml-auto gap-[6px]  flex px-3 pb-1 justify-left items-center font-bold text-dark-3 text-base md:text-xl md:p-0 md:h-8'>
                                <div className='field relative rounded text-sm text-dark-4 bg-white h-6 border border-light-2'>
                                    <div className='rounded flex '>
                                        <button className='py-1 pl-2 pr-1 text-xs h-6 cursor-pointer w-full flex rounded font-semibold items-center whitespace-nowrap'>
                                            <i className="text-[12px] fa-solid fa-filter mr-2"></i>
                                            <span>Lọc theo: Tất cả</span>
                                            <div className='w-4 h-4 items-center justify-center flex relative ml-auto'>
                                                <i className="text-[12px] fa-solid fa-caret-down"></i>

                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div className='field relative rounded text-sm text-dark-4 bg-white h-6 border border-light-2'>
                                    <div className='rounded flex '>
                                        <button className='py-1 pl-2 pr-1 text-xs h-6 cursor-pointer w-full flex rounded font-semibold items-center whitespace-nowrap'>
                                            <i className="text-[12px] mr-2 fa-solid fa-sort"></i>
                                            <span>Sắp xếp theo: Gần đây nhất</span>
                                            <div className='w-4 h-4 items-center justify-center flex relative ml-auto'>
                                                <i className="text-[12px] fa-solid fa-caret-down"></i>

                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/*List quiz */}
                            {dataQuiz?.length > 0 &&
                                dataQuiz?.map((quiz) => (

                                    <div onClick={() => handleDetailPage(quiz.id)} key={quiz.id} className='flex flex-col'>
                                        <div className='flex flex-col gap-y-1'>
                                            <div className='w-full'>
                                                <div className='quiz-card cursor-pointer relative flex flex-col items-start min-w-[20.5rem] md:h-auto md:min-w-initial md:border md:border-[#0909091a] bg-white p-2 rounded hover:bg-bd-ft'>
                                                    <div className='flex w-full'>
                                                        <div className=' md:w-[7.5rem] md:[7.5rem] relative rounded-sm overflow-hidden bg-lilac'>
                                                            <div className='w-full h-full'>
                                                                <img src='https://cf.quizizz.com/img/logos/new/logo_placeholder_sm.png?w=200&h=200' />
                                                            </div>
                                                        </div>
                                                        <div className='flex w-full'>
                                                            <div className='flex flex-col w-full ml-3 content-container relative md:gap-1.5'>
                                                                <div className='flex items-center font-semibold text-dark-4 gap-2 text-[.6875rem]'>
                                                                    <span>QUIZ</span>
                                                                    <div className='absolute top-2 right-2'>
                                                                        <div className='field relative'>
                                                                            <div className='dropdown flex relative rounded '>
                                                                                <button
                                                                                    onClick={(e) => (e.stopPropagation(), handleShowModal(quiz.id))}
                                                                                    className='text-sm 0 cursor-pointer  h-6 flex justify-center items-center hover:bg-[#0909090d] w-full rounded font-semibold whitespace-nowrap'>
                                                                                    <div className='w-4 h-4 items-center justify-center flex relative'>
                                                                                        <i className="text-[12px] fa-solid fa-ellipsis-vertical"></i>
                                                                                    </div>
                                                                                </button>
                                                                            </div>
                                                                            {!show && type === quiz.id && <div onClick={(e) => e.stopPropagation()} className='list absolute  bg-white h-fit shadow-sortHig transform rounded transition-transform z-on-overlay mt-2 scale-y-100  w-45 top-full origin-top right-[17px] z-[10003]'>
                                                                                <ul className='text-dark w-[11.25rem] text-sm'>
                                                                                    <button type='button' className='w-full text-left border-b border-light-2 hover:bg-bd-ft p-2 hover:cursor-pointer'>
                                                                                        <i className="text-[12px] w-4 h-4 mr-1 fa-regular fa-heart"></i>
                                                                                        <span>Thích</span>
                                                                                    </button>
                                                                                    <button type='button' className='w-full text-left border-b border-light-2 hover:bg-bd-ft p-2 hover:cursor-pointer'>
                                                                                        <i className="text-[12px] w-4 h-4 mr-1 fa-regular fa-folder"></i>
                                                                                        <span>Lưu</span>
                                                                                    </button>
                                                                                    <button onClick={() => handleRemoveQuiz(quiz.id)} type='button' className='w-full text-left border-b border-light-2 hover:bg-bd-ft p-2 hover:cursor-pointer'>
                                                                                        <i className="text-[12px] w-4 h-4 fa-regular fa-trash-can"></i>
                                                                                        <span>Xóa</span>
                                                                                    </button>
                                                                                </ul>
                                                                            </div>}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='name font-bold w-full flex flex-row justify-between text-base'>
                                                                    <div className='w-full flex justify-between'>
                                                                        <div className='name overflow-hidden md:h-6 text-left'>
                                                                            {quiz.nameQuiz}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='text-dark-3 flex flex-row justify-between items-center text-xs'>
                                                                    <div className='flex flex-row items-center'>
                                                                        <div className='mr-3.5'>
                                                                            <i className="text-[12] mr-0.5 fa-solid fa-list"></i>
                                                                            {JSON.parse(quiz.questionList)?.length} Câu hỏi
                                                                        </div>
                                                                        <div className='mr-3.5'>
                                                                            <i className="text-[12] mr-0.5 fa-solid fa-graduation-cap"></i>
                                                                            KG
                                                                        </div>
                                                                        <div className='mr-3.5'>
                                                                            <i className="text-[12] mr-0.5 fa-solid fa-book"></i>
                                                                            Mathematics
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='flex items-center justify-between mt-1.5'>
                                                                    <div className='flex items-center pr-2 text-[.625rem]'>
                                                                        <img className='rounded-full w-6 h-6 mr-2' src='https://lh3.googleusercontent.com/a/AAcHTteBCXNDNnJ2PQ2WrEB_epMS3XuQDusSgayYHaTycHnq=s96-c' />
                                                                        <div className='flex items-center font-normal text-dark-4'>
                                                                            <div className='mr-2 hover:underline max-w-[5rem] userName'>hung dao</div>
                                                                            <div className='mr-2 h-0.5 w-0.5 flex justify-center items-center rounded-full bg-dark-4 max-w-20'></div>
                                                                            <div>
                                                                                21 giờ  <span>trước</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='flex text-dark-6 gap-2'>
                                                                        <button className='flex items-center justify-center px-3 py-1 text-xs font-semibold h-6 bg-[#0909090d]  text-dark-6 hover:text-dark-3  rounded other transition-colors duration-200 ease-in-out  relative min-w-max'>
                                                                            Chia sẻ
                                                                            <i className="ml-2 text-[11px] fa-solid fa-share"></i>
                                                                        </button>
                                                                        <button className='flex items-center justify-center px-3 py-1 text-xs font-semibold h-6 bg-lilac  text-white  rounded other transition-colors duration-200 ease-in-out  relative min-w-max'>
                                                                            Chơi
                                                                            <i className="ml-2 text-[11px] fa-solid fa-caret-down"></i>
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
                                ))
                            }
                            {dataQuiz?.length === 0 &&
                                <div className='flex flex-col items-center'>
                                    <div className='px-5 flex flex-col items-center w-full'>
                                        <div className='w-32 h-32 md:w-60 md:h-60 my-2'>
                                            <img className='w-full h-full' src='https://cf.quizizz.com/image/emptystate-letscreate.png' />
                                        </div>
                                        <div className='mt-2 text-sm md:text-md text-dark-6 font-semibold'>
                                            Tạo quiz hoặc bài học đầu tiên của bạn
                                        </div>
                                        <div className='my-2 text-xs md:text-sm text-center px-4'>
                                            Pull in questions from the Quizizz library or make your own.
                                            It's quick and easy
                                        </div>
                                        <div className='flex my-4 md:my-6'>
                                            <button onClick={() => router.push('/admin/quiz/creator')} className=' items-center justify-center px-6 py-2 text-lg font-semibold h-9 base bg-lilac text-white hover:bg-light active:bg-lilac-dark rounded-lg primary transition-colors duration-200 ease-in-out flex relative min-w-max mx-2 btn-static btn-static'>
                                                Tạo một bài quiz
                                            </button>
                                            <button className=' items-center justify-center px-6 py-2 text-lg font-semibold h-9 base bg-white text-dark-6 hover:bg-bd-ft rounded-lg primary transition-colors duration-200 ease-in-out flex relative min-w-max mx-2 btn-static btn-static'>
                                                Tạo một bài quiz
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            }


                            {/* */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
