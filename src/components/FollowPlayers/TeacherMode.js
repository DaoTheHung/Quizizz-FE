import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useStore } from '../../../store/useStore'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'

export default function TeacherMode() {
    const socket = useStore(state => state.socket)
    const router = useRouter()
    const id = router.query.id

    const [tableUser, setTableUser] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answer, setAnswer] = useState([])
    const [userName, setUserName] = useState('')
    const [countdown, setCountdown] = useState(10)

    const [allDone, setAllDone] = useState(false)
    const [showRank, setShowRank] = useState(false)
    const [showCountdown, setShowCountdown] = useState(false)


    // check người chơi trả lời câu hỏi
    const [answered, setAnswered] = useState(0)
    const [userCheck, setUserCheck] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)

    //
    const dataTitle = ['Xem câu hỏi đầy đủ', 'Xem biểu đồ.', 'Quan điểm người tham gia']
    const [titles, setTitles] = useState('Quan điểm người tham gia')

    // store
    const fetchDataQuiz = useStore(state => state.fetchDataQuiz)
    const fetchPlayerZoom = useStore(state => state.fetchPlayerZoom)
    const dataPlayer = useStore(state => state.dataPlayer)

    const { data } = useQuery(['quiz'], fetchDataQuiz)
    const { refetch } = useQuery(['player'], fetchPlayerZoom)

    // check bài quiz
    const dataQuiz = data?.data.find(quiz => quiz.id == id)
    const question = dataQuiz && JSON.parse(dataQuiz?.questionList)

    // chuyển đổi mảng thành chuỗi 
    const answerQuestion = question && question[currentQuestion]?.answare.map(item => item)
    const stringAnswer = answerQuestion?.toString()

    // bỏ dấu chữ cái
    const stringWithoutPunctuation = stringAnswer?.normalize('NFD').replace(/[\u0300-\u036f]/g, '')


    // check người chơi trong phòng
    const checkPlayer = dataPlayer?.filter(user => user.roomId == router.query.id && user.type === router.query.type)

    // đếm ngược thời gian trả lời câu hỏi
    useEffect(() => {
        let timer = setInterval(() => {
            if (countdown > 0) {
                setCountdown(prev => prev - 1)

            }
            if (countdown <= 0) {
                setShowCountdown(true)
                clearTimeout(timer)
                setTimeout(() => setAllDone(true), 1000)
                setTimeout(() => {
                    setAllDone(false)
                    setShowRank(true)
                    setTitles('Xem biểu đồ.')
                }, 3000)

                setTimeout(() => {
                    setAllDone(false)
                    setShowRank(false)

                }, 6000)

                socket.emit('timeOut', { timer: countdown, room: router.query.id, type: router.query.type })


            }
        }, 1000)
        return () => clearTimeout(timer)

    }, [countdown])


    useEffect(() => {

        const local = localStorage.getItem('username')
        if (local !== null) {
            setUserName(local)
        }

        // Người chơi trả lời câu hỏi
        socket.on('sendAnswerTeacher', (data, user1, countAnswer) => {
            setIsCorrect(true)
            if (data) {
                setAnswered(prev => prev + 1)
                setUserCheck(prev => [...prev, user1])
            }
            if (answered + 1 === countAnswer || answered + 1 === checkPlayer?.length) {
                setShowCountdown(true)
                setCountdown('')
                setAnswer(data)
                setTimeout(() => setAllDone(true), 1000)
                setTimeout(() => {
                    setAllDone(false)
                    setShowRank(true)
                    setTitles('Xem biểu đồ.')
                }, 4000)

                setTimeout(() => {
                    setAllDone(false)
                    setShowRank(false)
                }, 7000)


                setTimeout(() => {
                    socket?.emit("answered", { answered: answered + 1, room: router.query.id, type: router.query.type })
                }, 1000)
            }
        })




        return () => socket.off('sendAnswerTeacher')

    }, [socket, answered, countdown])



    // next câu hỏi tiếp theo
    const handleNextQuestion = () => {
        if (answered === checkPlayer?.length && currentQuestion + 1 <= question?.length - 1) {
            setIsCorrect(false)
            setCurrentQuestion(prev => prev + 1)
            socket.emit('nextQuestion', { currentQuestion: currentQuestion + 1, room: router.query.id, type: router.query.type })
            setAnswer(null)
            setTitles('Quan điểm người tham gia')
            setAnswered(0)
            setUserCheck([])
            setCountdown(10)
            setShowCountdown(false)
        }
    }

    // next câu hỏi tiếp theo khi hết giờ
    const handleNextQuestionTimeout = () => {
        if (currentQuestion + 1 <= question?.length - 1) {
            setIsCorrect(false)
            setCurrentQuestion(prev => prev + 1)
            socket.emit('nextQuestion', { currentQuestion: currentQuestion + 1, room: router.query.id, type: router.query.type })
            setAnswer(null)
            setTitles('Quan điểm người tham gia')
            setAnswered(0)
            setUserCheck([])
            setCountdown(10)
            setShowCountdown(false)
        }

    }


    // kick người chơi
    const removePlayer = useMutation(async (id) => {
        const res = await axios.delete(`http://localhost:3080/api/zoom/delete/${id}`)
        return res.data
    });

    const handleRemovePlayer = (id, username) => {
        removePlayer.mutate(id, {
            onSuccess: (response) => {
                if (response) {
                    socket.emit("kick", username, router.query.room, router.query.type)
                    refetch()
                    localStorage.removeItem('username')
                }
            }
        })
    }
    const arr = []
    const checkAns = answer?.map(item => item.result)
    const stringCheckAnsCorrect = checkAns?.join('').split(',').join('') === stringWithoutPunctuation
    const stringCheckAnsWrong = checkAns?.join('').split(',').join('') !== stringWithoutPunctuation
    arr.push(stringCheckAnsCorrect, stringCheckAnsWrong)
    // console.log(arr)




    return (
        <div className='flex flex-col-reverse fixed left-0 top-0 right-0 bottom-0 h-full w-full '>
            <div className='bg-[#222222] shadow-[0px_2px_8px_rgba(0,0,0,0.16)]  text-[#fff] relative bottom-0 left-0 h-[72px] z-[99999] py-[12px] px-[16px] flex items-center justify-between'>
                <div className='flex items-center'>
                    <div className='items-center inline-flex rounded-[8px] w-[120px] h-[48px] p-[8px]'>
                        <img className='w-[90%] object-contain' src='https://cf.quizizz.com/img/quizizz_logos/white-brandmark-600x164.png' />
                    </div>
                    <div className='text-[20px] font-bold text-[rgba(255,255,255,0.5)] cursor-none p-[13px] h-[43px] mx-[6px] min-w-[36px] inline-flex justify-center items-center bg-[rgba(9,9,9,0.5)] rounded-[8px]'>
                        <div className=''>
                            Đi đến
                            <a target='_blank' className='text-[#ffffff] mx-1' href={`http://localhost:3000/join/pre-game/running/${router.query.type}?type=teacher`}>joinmyquiz.com</a>
                            và nhập
                        </div>
                        <p className='text-white mx-1'>
                            <span className='mr-[7px]'>459</span>
                            <span>466</span>
                        </p>
                        <button className='w-[35px] flex  h-full text-white rounded-tr-[8px] rounded-br-[8px] items-center'>
                            <i className='fas fa-copy m-auto text-[14px]'></i>
                        </button>
                    </div>
                </div>
                <div className='flex items-center '>
                    <div className='w-calc(100%)] flex items-center'>
                        <div className='flex items-center'>
                            <div className='flex'>
                                <div className='relative flex'>
                                    <button className='w-[56px] flex justify-center items-center h-[32px] bg-bgTeacher rounded-[24px]'>
                                        <div className='w-[24px] flex justify-center items-center  h-[24px] relative '>
                                            <img src='https://cf.quizizz.com/img/RaiseHands/hand-icon.svg' />
                                        </div>
                                    </button>
                                    <button className='w-[48px] inline-flex font-bold text-[18px] justify-center items-center h-[32px] px-[13px] mx-[6px] bg-bgTeacher1 rounded-[24px]'>
                                        <div className='w-[24px] flex justify-center items-center  h-[24px] relative '>
                                            <i className='fas fa-chalkboard text-[14px]'></i>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div className='mx-[6px] rounded-[2px] w-[2px] bg-[rgba(255,255,255,0.1)] h-[43px]'></div>
                            <button onClick={() => setTableUser(!tableUser)} type='button' className='px-[13px] h-[43px] mx-[6px] min-w-[36px] inline-flex justify-center items-center font-bold text-[18px] cursor-pointer bg-[rgba(9,9,9,0.5)] text-white rounded-[8px]'>
                                <i className='fas fa-users icon text-[16px] mr-[8px]'></i>
                                <div>{checkPlayer?.length}</div>
                                {
                                    tableUser &&

                                    <table onClick={(e) => e.stopPropagation()} className='absolute w-[24rem] right-[144px] bottom-[72px] z-[999] bg-[#222222] shadow-[0px_2px_8px_rgba(0,0,0,0.16)] rounded-t-[4px] overflow-auto  py-[12px] px-[8px] leading-[24px]'>
                                        <thead >
                                            <tr className='py-[12px]'>
                                                <th className='border-b-[1.5px] border-[#ffffff19] mb-[6px] py-[6px]'>Thứ hạng</th>
                                                <th className='text-left border-b-[1.5px] border-[#ffffff19] mb-[6px] py-[6px]'>Tên</th>
                                                <th className='text-center border-b-[1.5px] border-[#ffffff19] mb-[6px] py-[6px] pr-0'>Điểm số</th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {checkPlayer?.map(user => (
                                                <tr key={user.id} className='px-[12px] py-[16px] relative group hover:bg-[rgba(255,255,255,0.05)]'>
                                                    <td className='text-center rounded-tl-[8px] rounded-bl-[8px] relative py-[12px] text-[16px] leading-[20px] font-bold'>1</td>
                                                    <td className='relative ml-[-33px] flex items-center py-[12px] text-[16px] leading-[20px] font-bold'>
                                                        <img className='w-[25px] h-[25px] ' src='https://cf.quizizz.com/join/img/avatars/tablet_sm/monster10.png' />
                                                        <td className='text-left pl-[8px] relative py-[12px] text-[16px] leading-[20px] font-bold'>
                                                            {user.username}
                                                        </td>
                                                    </td>

                                                    <td className='text-center visible group-hover:hidden rounded-tr-[8px] rounded-br-[8px] pl-[8px] relative py-[12px] text-[16px] leading-[20px] font-bold'>
                                                        {answer?.map(item => (
                                                            item.username === user.username && item.score

                                                        ))}
                                                        {answer?.length <= 0 && "0"}
                                                    </td>


                                                    <td className='flex absolute right-[3px] bottom-[49px] ]'>
                                                        <div className='text-white hidden hover:scale-[1.2] hover:bg-[rgba(255,255,255,0.1)] group-hover:flex  right-[58px] w-[32px] h-[32px] justify-center items-center z-10 transition-all duration-200 ease-in-out cursor-pointer rounded-[50%] absolute'>
                                                            <i className='far text-[12px] fa-eye-slash'></i>

                                                        </div>
                                                        <div onClick={() => handleRemovePlayer(user.id, user.username)} className='text-white hidden hover:scale-[1.2] hover:bg-[rgba(255,255,255,0.1)] group-hover:flex right-[16px] w-[32px] h-[32px] justify-center items-center z-10 transition-all text-[12px] duration-200 ease-in-out cursor-pointer rounded-[50%] absolute'>
                                                            <i className="text-[12px]  fa-regular fa-trash-can"></i>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>

                                }

                            </button>
                            <button className='px-[13px] h-[43px] mx-[6px] min-w-[36px] inline-flex justify-center items-center font-bold text-[18px] cursor-pointer bg-[rgba(9,9,9,0.5)] text-white rounded-[8px]'>
                                <i className='fa-solid fa-person-chalkboard text-[16px] mr-[8px]'></i>
                                <div>{currentQuestion + 1}/{question?.length}</div>
                            </button>
                            <button className='px-[13px] h-[43px] mx-[6px] min-w-[36px] inline-flex justify-center items-center font-bold text-[18px] cursor-pointer bg-[rgba(9,9,9,0.5)] text-white rounded-[8px]'>
                                <i className='fa-solid fa-volume-low text-[16px] '></i>
                            </button>
                            <button className='px-[13px] h-[43px] mx-[6px] min-w-[36px] inline-flex justify-center items-center font-bold text-[18px] cursor-pointer bg-[rgba(9,9,9,0.5)] text-white rounded-[8px]'>
                                <i className='fas fa-cog text-[16px]'></i>

                            </button>
                            <div className='mx-[6px] rounded-[2px] w-[2px] bg-[rgba(255,255,255,0.1)] h-[43px]'></div>
                            <div className='w-[64px] h-[43px] bg-[rgba(255,255,255,0.1)] px-[13px] mx-[6px] min-w-[36px] inline-flex justify-center items-center font-bold text-[18px] cursor-pointer text-white rounded-[8px]'>
                                <i className='fas fa-caret-left'></i>
                            </div>
                            <div onClick={handleNextQuestion} className='w-[64px] h-[43px] bg-[rgba(255,255,255,0.1)] px-[13px] mx-[6px] min-w-[36px] inline-flex justify-center items-center font-bold text-[18px] cursor-pointer text-white rounded-[8px]'>
                                <i className='fas fa-caret-right'></i>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            {/* Thoi gian tra loi */}
            <div className='scale-[0.425] right-[-100px] bottom-[-15px] h-[400px] absolute w-[400px] bg-[rgba(24,24,24,0.9)] backdrop-blur-[12px] rounded-[40px] flex justify-center transition-all duration-200 ease-in-out origin-center z-[999] pt-[60px]'>


                {showCountdown && <div className='w-full text-white text-[116px]  relative text-center'>
                    <div className='bg-[rgba(255,255,255,0.1)] backdrop-blur-[4px] text-white text-[40px] py-[24px] px-[40px] rounded-[16px] m-[20px] cursor-pointer text-center'>Khởi động lại</div>
                    <div onClick={handleNextQuestionTimeout} className='bg-[rgba(255,255,255,0.1)] backdrop-blur-[4px] text-white text-[40px] py-[24px] px-[40px] rounded-[16px] m-[20px] cursor-pointer text-center'>Câu hỏi tiếp theo</div>
                </div>
                }
                {!showCountdown &&
                    <div className='w-full text-white text-[116px]  relative text-center'>
                        {countdown}
                        <div className='flex text-white gap-[6.5rem] mt-10 justify-center text-[74px]'>
                            <i className="fa-regular cursor-pointer fa-circle-xmark"></i>
                            <i className="fa-solid cursor-pointer fa-forward"></i>
                        </div>
                    </div>
                }

            </div>
            <div onClick={() => setTableUser(false)} className='flex relative z-0 justify-center items-center w-[100vw] bg-[#0c0c0c74] my-[23px] h-[100vh]'>

                {showRank && <div className='absolute p-[20px] top-0 left-0 w-full bottom-0 bg-[#0a0a0ad9] z-[9999]'>
                    <div className='text-[32px] text-white font-bold text-center'>LEADERBOARD</div>
                    <>
                        <div className='text-white animate-fadein  mr-[77px] justify-center flex py-[16px] px-[56px]'>
                            <div className='w-[150px]'>
                                Thứ hạng
                            </div>
                            <div className='w-[186px]'>
                                Tên
                            </div>
                            <div className='ml-[6px] text-center'>
                                Điểm số
                            </div>
                        </div>

                        {checkPlayer?.map((user, index) => (
                            <div key={user.id} className='h-[118px] relative w-full px-[40px] rounded-b-[16px]'>

                                <div className='flex justify-center items-center animate-player-card h-[56px] bg-[#000] border border-[#000] text-white rounded-[8px] absolute w-[calc(100%-80px)] left-[40px] transition-all duration-200 ease-in-out py-[3px]'>
                                    <div className='inline-block w-[64px] text-left mr-[8px] ml-[16px] text-[16px]'>
                                        {index + 1}
                                    </div>
                                    <div className='inline-flex justify-center items-center w-[60px]'>
                                        <div className='bg-[url("https://cf.quizizz.com/join/img/avatars/tablet_sm/monster8.png")] inline-flex w-[32px] h-[32px] bg-center rounded-full bg-[rgba(0,0,0,0.1)] bg-no-repeat bg-cover border-[2px] border-white'></div>
                                    </div>
                                    <div className='pr-[6px] pl-[16px] w-[200px] overflow-hidden max-h-[40px] text-[16px]'>
                                        {user.username}
                                    </div>
                                    <div className='w-[80px] text-left mr-[16px] ml-[8px] text-[16px] '>
                                        {answer?.map(item => (
                                            item.username === user.username && item.score

                                        ))}
                                        {answer?.length <= 0 && "0"}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                </div>
                }

                {allDone && <div className='absolute flex items-center justify-center top-0 left-0 w-full h-full '>
                    <span className='text-[35px] animate-player-card  w-[290px] bg-gray-500 p-[40px]  rounded-[8px] text-center font-bold text-white'>
                        ALL DONE
                    </span>
                </div>}

                <div className='w-[100vw] h-[calc(100vw*0.5625)] pt-[calc(80px+192px)] absolute left-0 top-0 right-0 bottom-0 m-auto z-[999]'>


                    <div className='h-[calc(80px+192px)] absolute top-0 left-0 w-full'>
                        <div className='w-[calc(192px*2)] text-white text-[36px] font-bold flex items-center  absolute top-0 m-auto left-[60px] h-full cursor-pointer'>
                            <div className='ml-8 pb-[68px]'>

                                {question && question[currentQuestion]?.questionTitle}
                            </div>
                        </div>
                    </div>
                    <div className='mx-[128px] mt-[-33px] flex items-center h-[80px] border-b-[4px] border-[rgba(255,255,255,0.05)]'>
                        <div className='text-[24px] py-[8px] text-[rgba(255,255,255,0.5)]'>
                            <i className='fas fa-users mr-[16px]'></i>
                            <span>{answered} / {checkPlayer?.length}</span>
                        </div>
                        <div className='flex items-center ml-auto'>
                            {dataTitle.map(title => (

                                <button key={title} onClick={() => setTitles(title)} type='button' className={`
                                ${title === titles ? "bg-[rgba(255,255,255,0.1)]" : ""}
                                font-bold hover:bg-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.5)] rounded-[8px] mx-[8px] flex items-center justify-center py-[8px] px-[16px] text-[20px]`}>
                                    {title}
                                </button>
                            ))}

                        </div>
                    </div>
                    {titles === 'Quan điểm người tham gia' && <div className='relative h-[calc(100%-80px)]'>
                        <div className='px-[120px] w-full h-full absolute overflow-y-auto overflow-x-hidden'>
                            <div className='mx-[-28px] flex '>
                                {checkPlayer.map((user, index) => (

                                    <div key={user.id} className='m-[24px] group relative'>
                                        <img className={`w-[96px] opacity-[0.2] 
                                        ${userCheck?.length === checkPlayer?.length && "opacity-[1] animate-player-card"}
                                        ${userCheck?.map((item, i) => item === user.username && "opacity-[1]")}`} src='https://cf.quizizz.com/join/img/avatars/tablet_sm/monster6.png' />
                                        <div className='absolute hidden group-hover:block w-[144px] text-white left-[50%]  translate-x-[-50%] translate-y-full bottom-[-4px] text-center'>
                                            {user.username}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>}
                    {titles === "Xem biểu đồ." && <div className='w-full h-[61%] absolute'>
                        <div className='w-[1024px] absolute h-full left-0 right-0 m-auto'>
                            <div className='h-[74%] flex flex-col justify-between mt-[2px]'>
                                <div className='bg-transparent w-full h-[4px]'></div>
                                <div className='bg-chart-line w-full h-[4px]'></div>
                                <div className='bg-chart-line w-full h-[4px]'></div>
                                <div className='bg-chart-line w-full h-[4px]'></div>
                                <div className='bg-chart-line w-full h-[4px]'></div>
                                <div className='bg-chart-line w-full h-[4px]'></div>
                                <div className='bg-[#3a3a3a] w-full h-[4px]'></div>
                            </div>

                            <div className='absolute bottom-[80px] w-full h-[calc(100%-80px)] flex justify-around'>

                                {!question[currentQuestion].questionType &&
                                    question && question[currentQuestion]?.question.map((ques, index) => (
                                        <>
                                            <div key={index} className='w-[25%] h-[52%] pb-[28px] flex justify-end items-center flex-col transition-all duration-200 ease-in-out'>
                                                <>
                                                    <div className='text-[24px] text-white pb-[8px]'>0</div>
                                                    <div className='h-full  flex justify-end rounded-[8px] overflow-hidden'>

                                                        {question && question[currentQuestion]?.answare.map((ans, i) => (
                                                            <div key={i}
                                                                className={`
                                                   ${answer?.map((item, i) => (
                                                                    item.result === ques ? "h-[calc(100%+8px)]" : ""
                                                                ))}
                                                        ${ans === ques ? "bg-green-600" : "bg-red-600"}  h-[calc(0%+8px)] mt-auto   w-[80px]  rounded-[8px] `}></div>

                                                        ))}

                                                    </div>
                                                </>

                                            </div>
                                            <div className=' bottom-[240px] w-full flex justify-around'>
                                                {question && question[currentQuestion]?.question.map((ques, index) => (
                                                    <div key={index} className='w-[25%] text-white pt-[16px] text-center h-[60px] mb-[20px] px-[16px]'>
                                                        {ques}
                                                    </div>
                                                ))}

                                            </div>
                                        </>
                                    ))}

                                {/** */}
                                {question[currentQuestion].questionType === "Điền từ" &&
                                    <>
                                        <div className='w-[50%] h-[89%] md:pb-[28px] flex flex-end items-center flex-col transition-all duration-200 ease-in-out'>
                                            <div className='text-[24px] pb-[8px] text-white'>0</div>
                                            <div className='h-full flex items-end rounded-[8px] overflow-hidden'>
                                                <div className={`${isCorrect && stringCheckAnsCorrect ? "h-[calc(100%+8px)]" : "h-[calc(0%+8px)]"}  bg-green-600 w-[80px] rounded-[8px]`}></div>
                                            </div>

                                        </div>
                                        <div className='w-[50%] h-[89%] md:pb-[28px] flex flex-end items-center flex-col transition-all duration-200 ease-in-out'>
                                            <div className='text-[24px] pb-[8px] text-white'>1</div>
                                            <div className='h-full flex items-end rounded-[8px] overflow-hidden'>
                                                <div className={`${isCorrect && stringCheckAnsWrong ? "h-[calc(100%+8px)]" : "h-[calc(0%+8px)]"} bg-red-600 w-[80px] rounded-[8px]`}></div>
                                            </div>

                                        </div>
                                    </>
                                }


                            </div>

                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}
