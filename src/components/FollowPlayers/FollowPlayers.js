import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query'
import { useStore } from '../../../store/useStore';
import { useRouter } from 'next/router';
import axios from 'axios';
const FollowPlayers = () => {
    const socket = useStore(state => state.socket)
    const router = useRouter()
    const id = router.query.room

    if (router) {
        socket.emit('join_room', id, router.query.type)
    }

    const [showQuestion, setShowQuestion] = useState(false)
    const [typeId, setTypeId] = useState(1)
    const [userName, setUserName] = useState('')

    // Call api
    const fetchDataQuiz = useStore(state => state.fetchDataQuiz)
    const fetchPlayerZoom = useStore(state => state.fetchPlayerZoom)
    const dataPlayer = useStore(state => state.dataPlayer)

    const { data } = useQuery(['quiz'], fetchDataQuiz)
    const { refetch } = useQuery(['player'], fetchPlayerZoom)

    const checkQuizRoom = data?.data.find(quiz => quiz.id == id)

    // Chuyển thành object
    const question = checkQuizRoom && JSON.parse(checkQuizRoom?.questionList)
    const checkPlayer = dataPlayer?.filter(user => user.roomId == id && user.type === router.query.type)




    // Tab
    const texts = [
        {
            id: 1,
            text: "Bảng xếp hạng"
        },
        {
            id: 2,
            text: "Câu hỏi"
        },
    ]

    const handleShowQues = (id) => {
        setTypeId(id)
        if (id === 2) {
            setShowQuestion(true)
        } else {
            setShowQuestion(false)
        }
    }

    const [score, setScore] = useState([])
    const [questionResult, setQuestionResult] = useState([])
    const [correctAnswer, setCorrectAnswer] = useState()


    useEffect(() => {
        const local = localStorage.getItem('username')
        if (local !== null) {
            setUserName(local)
        }
        socket.on('sendQuestionResult', data => {
            setQuestionResult(data)
        })
        socket.on('sendAnswer', (data, correctAnswer) => {
            setScore(data)
            setCorrectAnswer(correctAnswer)


        })
        return () => socket.off('sendAnswer')

    }, [socket])

    // xóa người chơi
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


    return (
        <>
            <div className='py-[16px] px-[8px] flex items-center justify-between fixed z-[99] h-[72px] bg-[rgba(0,0,0,0.5)] top-0 left-0 w-full transition-all ease-in-out'>
                <span className=' inline-flex  scale-100 bg-[rgba(255,255,255,0.15)] py-[8px] px-[16px] rounded-[8px] h-[40px] cursor-pointer'>
                    <img src='https://cf.quizizz.com/img/quizizz_logos/white-brandmark-600x164.png' className='h-[24px]' />
                </span>
                <div className='text-[#fff] absolute left-[44%] mt-2 w-[160px] text-[12px] flex flex-col items-center'>
                    <span> MÃ THAM GIA  </span>
                    <span className='text-[32px] font-semibold'>735  164</span>
                </div>
                <div className='flex '>
                    <div className='inline-flex'>
                        <button className='bg-[rgba(255,255,255,0.32)] flex rounded-[8px] p-[8px] text-[18px] text-white items-center font-medium h-[40px]'>
                            <i className="fa-solid fa-palette mr-2 text-[16px]"></i>
                            <div className=''>
                                Chủ đề
                            </div>
                        </button>
                    </div>
                    <div className='w-[40px] h-[40px] hover:bg-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.32)] rounded-[8px] ml-[8px] flex items-center justify-center'>
                        <button className='w-[42px] text-white '>
                            <i className="fa-solid fa-volume-low"></i>
                        </button>
                    </div>
                    <div className='w-[40px] h-[40px] hover:bg-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.32)] rounded-[8px] ml-[8px] flex items-center justify-center'>
                        <button className='w-[42px] text-white '>
                            <i className="fa-solid fa-expand"></i>
                        </button>
                    </div>
                    <div className='w-[1px] h-[40px] mr-2 bg-[rgba(255,255,255,0.2)] ml-[8px]'>
                    </div>
                    <button className='font-bold mr-2 hover:bg-[#f2f2f2] bg-white text-[#000] pr-[22px] pl-[18px] leading-[12px] inline-flex justify-center items-center gap-[8px] rounded-[8px] h-[40px]'>
                        <span className='w-[16px] h-[16px] bg-[#fffaf2]  border border-[#ffa402] rounded-[4px]'>
                            <i className="fa-solid fa-bolt-lightning text-[#ffa402] font-black text-[10px] leading-[16px]"></i>
                        </span>
                        <span>Tạm ngừng</span>
                    </button>
                    <button className='font-bold hover:bg-[#f2f2f2] bg-white text-[#000] pr-[22px] pl-[18px] leading-[12px] flex justify-center items-center gap-[8px] rounded-[8px] h-[40px]'>

                        <span>Kết thúc</span>
                    </button>
                </div>
            </div>
            <div className='w-[1080px] h-[64px] p-[12px] bg-[rgba(0,0,0,0.7)] rounded-[16px] m-auto mt-[120px] mb-[80px] relative'>
                <div className='w-full h-full relative'>
                    <div className='w-[80px] h-[80px] rounded-[50%] bg-white text-center absolute top-0 bottom-0 m-auto ml-[2px] z-10  left-[calc(52px+((100%-86px)*0)+((100%-86px)*0.5)-51px)]'>
                        <div className='bg-white w-full h-full rounded-full outline-[3.5px] outline-[rgba(255,255,255,0.33)]'>
                            <div className='pt-4 h-[55px] flex flex-col items-center justify-center'>
                                <div className='text-[24px] text-[#000] font-semibold'>{correctAnswer ? Math.round((correctAnswer / question?.length) * 100) : "0"}%</div>
                                <div className='w-[64px] text-center text-[10px] leading-[11px] font-bold text-[#000]'>
                                    Độ chính xác của lớp học
                                </div>
                            </div>
                        </div>
                    </div>

                    <div

                        style={{ width: `${Math.round((correctAnswer / question?.length) * 100)}%` }}
                        className={` bg-[#4ed190] pl-[8px] leading-[56px] absolute h-full left-0 rounded-full`}>

                    </div>

                    {/* {score.map(item => (
                        <div
                            key={item}
                            style={item.wrongAnswer ? { width: `${Math.round((item.wrongAnswer / question?.length) * 100)}%` } : {  }}
                            className={` bg-[#e5446d] pl-[8px] leading-[56px] absolute h-full right-0 rounded-full`}>

                        </div>
                    ))} */}

                </div>
            </div>

            <div className='mt-[48px] min-h-[400px]  bg-[rgba(0,0,0,0.2)] py-[16px]'>
                <div className='max-w-[1040px] mx-auto'>
                    <div >
                        <div className='flex items-center justify-center'>
                            <div className='flex justify-center rounded-t-[16px] overflow-hidden'>
                                {texts.map(text => (
                                    <button type='button' onClick={() => handleShowQues(text.id)} key={text.id} className='text-white w-[160px]  h-[48px] bg-[rgba(0,0,0,0.8)] text-[18px] flex justify-center items-center relative backdrop-blur-[4px]'>
                                        {text.text}
                                        {typeId === text.id && <div className='bg-white w-[calc(100%-32px)] h-[2px] absolute bottom-0 left-[50%] translate-x-[-50%] rounded-[2px]'></div>}
                                    </button>

                                ))}

                            </div>
                        </div>
                        {!showQuestion ?
                            <div className='rounded-t-[16px] flex justify-between py-[16px] px-[40px] bg-[rgba(0,0,0,0.5)] backdrop-blur-[4px]'>
                                <div className='text-[16px] text-white'>
                                    <i className="fa-solid fa-users mr-2"></i>
                                    1 người chơi
                                </div>
                            </div>
                            :
                            <div className='rounded-t-[16px] flex justify-between py-[16px] px-[40px] bg-[rgba(0,0,0,0.5)] backdrop-blur-[4px]'>
                                <div className='text-[16px] text-white'>
                                    <i className="fa-solid fa-list-ul mr-2"></i>
                                    {question?.length} câu hỏi
                                </div>
                                <div className=''>
                                    <label className='text-[14px] select-none mr-[8px] flex justify-center items-center cursor-pointer text-white'>
                                        Sắp xếp theo độ chính xác
                                        <input onChange={(e) => console.log(e.target.checked)} type='checkbox' className='ml-2 checked:bg-[#8854C0] cursor-pointer' />
                                    </label>
                                </div>
                            </div>
                        }

                    </div>
                    <div className='bg-[rgba(0,0,0,0.3)] rounded-b-[16px]'>
                        {!showQuestion ?
                            <>
                                <div className='text-white flex py-[16px] px-[56px]'>
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

                                        <div className='flex justify-center items-center h-[56px] bg-[rgba(0,0,0,0.5)] border border-[#000] text-white rounded-[8px] absolute w-[calc(100%-80px)] left-[40px] transition-all duration-200 ease-in-out py-[3px]'>
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
                                                {score?.map(item => (
                                                    item.username === user.username && item.score

                                                ))}
                                                {score?.length <= 0 && "0"}


                                            </div>
                                            <div className='w-[calc(100%-548px)] ml-[48px] pr-[16px]'>
                                                <div className='h-[28px] bg-[#000] rounded-[6px] leading-[12px] relative'>
                                                    <div className='rounded-[6px] overflow-hidden w-[101%]'>
                                                        {score?.map(item => (
                                                            item.username === user.username
                                                            &&
                                                            <div
                                                                style={
                                                                    { width: `${Math.round((item.correctAnswer / question?.length) * 100)}%` }}
                                                                className={`bg-[#4ed190] h-[28px] inline-block transition duration-200 ease-in-out`}>

                                                            </div>
                                                        ))}

                                                    </div>
                                                </div>
                                            </div>
                                            <button onClick={() => handleRemovePlayer(user.id, user.username)} type='button' className='inline-block ml-auto mr-[20px] transition-all duration-200 ease-in-out text-white text-[13px]'>
                                                <i className="fa-solid fa-xmark"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </>
                            :
                            <div className=' px-[40px]'>
                                <div className='text-center  p-[24px]'>
                                    {question?.map((ques, i) => (
                                        <div className='inline-block'>
                                            <button key={i} className={`                                   
                                        
                                        shadow-[0_0_0_2px_#fff] relative  w-[32px] h-[32px] text-white text-center leading-[32px] text-[14px] my-[2px] mx-[4px] rounded-[8px] bg-[rgba(255,255,255,0.2)] transition-all duration-200 ease-in-out`}>
                                                {i + 1}
                                                {questionResult?.map((res, index) => (
                                                    <div className={`w-full z-20 absolute rounded-[8px]  top-0  h-full ${res.currentQuestion === i ? "bg-green-600" : ""}`}>
                                                        {res.currentQuestion == i && res.currentQuestion + 1}
                                                    </div>
                                                ))}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {question?.map((item, index) => (

                                    <div key={index} className={` border-l-[7px] relative rounded-[8px] bg-[rgba(0,0,0,0.5)] my-[24px]`}>
                                        <div className='text-[16px] py-[16px] px-[18px] border-b border-[rgba(255,255,255,0.2)] relative min-h-[60px] flex justify-between'>
                                            <div className='h-[48px] p-[12px] inline-flex items-center bg-[rgba(255,255,255,0.1)] rounded-[4px]'>
                                                <div className='text-white text-[24px]'>
                                                    <i className="fa-regular fa-circle-dot"></i>
                                                </div>
                                                <div className='ml-[16px] text-[14px] text-white font-medium'> Nhiều lựa chọn </div>
                                            </div>
                                            <div className='w-[318px] inline-block'>
                                                <div className=' py-[8px] inline-block px-[12px] bg-[rgba(255,255,255,0.1)] rounded-[8px] mr-[8px]'>
                                                    <div className='text-[11px]  text-[rgba(255,255,255,0.5)] mb-[6px]'>
                                                        Thời gian trả lời TB
                                                    </div>
                                                    <div className='text-[16px] text-white'>
                                                        0 giây
                                                    </div>
                                                </div>
                                                <div className='p-[8px] inline-block w-[188px] bg-[rgba(255,255,255,0.1)] rounded-[8px]'>
                                                    <div className={`h-[10px]  rounded-[10px] overflow-hidden mb-[8px] relative`}></div>
                                                    <div className='text-white'> 0 Chính xác, 0 Không chính xác </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className='py-[16px] px-[18px]'>
                                            <div className='mb-[24px] flex justify-between'>
                                                <div className='flex text-white gap-1'>
                                                    <span className='font-semibold'>{index + 1}.</span>

                                                    <p>{item.questionTitle}</p>
                                                </div>
                                                <button className='bg-[rgba(255,164,2,0.2)] hover:bg-[rgba(239,169,41,0.7)] text-[#EFA929] flex justify-center items-center p-[8px] text-[14px] border border-[rgba(255,255,255,0.05)] rounded-[4px] font-semibold ml-[4px]'>
                                                    <i className="fa-solid fa-bolt-lightning mr-[4px]"></i>
                                                    CHỈNH SỬA
                                                </button>
                                            </div>
                                            <div className='w-[calc(100%-240px)] flex flex-col flex-wrap justify-between overflow-auto'>
                                                {item.question.map((ques, i) => (
                                                    <div key={i} className='py-[8px] leading-[24px] flex items-center'>

                                                        <div className={
                                                            `
                                                            
                                                            bg-[rgba(255,255,255,0.2)]
                                                            text-[14px] w-[24px] h-[24px] leading-[24px] text-center rounded-[50%] mr-[16px] `
                                                        }
                                                        ></div>

                                                        <span className='inline-block text-white'>{ques}</span>
                                                    </div>
                                                ))}

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            </div >
        </>
    );
}

export default FollowPlayers;
