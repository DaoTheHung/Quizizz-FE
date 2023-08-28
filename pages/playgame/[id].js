import React, { useState, useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useStore } from '../../store/useStore'
import { useRouter } from 'next/router'
import Summary from '../../src/components/SummaryPage/Summary'
import FillWordGame from '../../src/components/PlayGames/FillWordGame'

export default function playgame() {
  const socket = useStore(state => state.socket)

  const router = useRouter()
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isShow, setIsShow] = useState(false)

  // logic trả lời đúng sai chế độ giáo viên
  const [showBanner, setShowBanner] = useState(false)
  const [showCorrect, setShowCorrect] = useState(true)
  const [showWrong, setShowWrong] = useState(false)
  const [showTimeout, setShowTimeout] = useState(false)
  const [countdown, setCountdown] = useState(10)
  const [correctAnswer, setCorrectAnswer] = useState(0)
  const [animate, setAnimate] = useState(false)


  const [nextQuestion, setNextQuestion] = useState(null)
  const [answered, setAnswered] = useState(null)


  // logic trả lời câu hỏi đúng & sai, chuyển sang câu hỏi mới - chế độ thông thường
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isWrong, setIsWrong] = useState(false)
  const [checkResult, setCheckResult] = useState('')
  const [type, setType] = useState('')
  const [score, setScore] = useState(0)
  const [wrongAnswer, setWrongAnswer] = useState(0)
  const [transform, setTransForm] = useState(0)

  // modal kick khỏi phòng
  const [show, setShow] = useState(false)

  if (router) {
    socket.emit('join_room', router.query.id, router.query.type)
  }


  // call api
  const fetchDataQuiz = useStore(state => state.fetchDataQuiz)
  const fetchPlayerZoom = useStore(state => state.fetchPlayerZoom)
  const dataPlayer = useStore(state => state.dataPlayer)
  const { data, refetch } = useQuery(['question'], fetchDataQuiz)

  useQuery(['player'], fetchPlayerZoom)

  const checkUser = dataPlayer?.find(user => user.username === username)
  const checkPlayer = dataPlayer?.filter(user => user.roomId == router.query.id && user.type === router.query.type)


  const dataQuiz = data?.data.find(quiz => quiz.id == router.query.id)
  const question = dataQuiz && JSON.parse(dataQuiz?.questionList)

  const childrenQues = question && question[currentQuestion]


  // Kick người khỏi phòng
  useEffect(() => {
    const local = localStorage.getItem('username')
    if (local !== null) {
      setUsername(local)
    }
    const key = localStorage.getItem('key')
    if (key !== null) {
      setShow(key)
    }
    // kick
    socket.on('outRoom', (dataUser) => {
      if (dataUser === local) {
        setShow(true)
        localStorage.setItem('key', true)
        localStorage.removeItem('username')
      }
    })

  }, [socket])


  // chế độ giáo viên
  useEffect(() => {

    // chuyển sang câu hỏi tiếp theo
    socket.on('sendNextQuestion', data => {
      setCurrentQuestion(data?.currentQuestion)
      setNextQuestion(data?.currentQuestion)
      setShowWrong(false)
      setShowCorrect(false)
      setAnimate(false)
      setShowBanner(false)
      setIsCorrect(false)
      setIsWrong(false)
      setShowTimeout(false)
      setIsShow(false)
      setCountdown(10)
    })

    // người chơi đã trả lời hết 
    socket.on('sendAnswered', (data) => {
      setAnswered(data.answered)
      if (data) {
        setIsLoading(false)
        setShowBanner(true)

        setTimeout(() => setAnimate(true), 1200)
      }
    })

    socket.on('sendTimeOut', (data) => {
      setShowBanner(true)
      if (!isShow) {
        setShowTimeout(true)
        setShowWrong(false)
        setShowCorrect(false)
      }
      if (isShow == true) {
        setShowTimeout(false)
        if (isCorrect) {
          setShowCorrect(true)
        }
        if (isWrong) {
          setShowWrong(true)
        }
      }
      setIsLoading(false)
      setTimeout(() => setAnimate(true), 1200)
    })

  }, [socket, isShow, isCorrect, isWrong])




  // trả lời câu hỏi
  const handleAnswareQues = async (result, index) => {
    setCountdown(0)
    setIsShow(true)
    setType(result)

    // check câu trả lời đúng & sai
    const answare = childrenQues?.answare.find(item => {
      setCheckResult(item)
      return item === result
    })

    if (answare) {
      setScore(prev => prev + 600)
      setCorrectAnswer(correctAnswer + 1)

      // chế độ thông thường
      if (router.query.type === "basic") {
        setIsCorrect(true)
      }
      setIsCorrect(true)
      // chế độ giáo viên điều khiển
      if (router.query.type === "teacher") {
        setIsLoading(true)
        setShowCorrect(true)
        setShowWrong(false)

      }

      // chế độ thông thường
      if (router.query.type === "basic") {
        setTransForm(transform + 1)

      }


    } else {
      // chế độ thông thường
      if (router.query.type === "basic") {
        setIsWrong(true)
      }
      setWrongAnswer(prev => prev + 1)

      // chế độ giáo viên điều khiển
      if (router.query.type === "teacher") {
        setIsLoading(true)
        setIsWrong(true)
        setShowWrong(true)
        setShowCorrect(false)
      }
    }


    // chế độ thông thường
    if (router.query.type === "basic") {
      socket.emit('questionResult', { result, currentQuestion, room: router.query.id })
      // Check câu hỏi cuối
      if (currentQuestion == question?.length - 1) {
        router.push(`/playgame/${router.query.id}?page=summary`)
      } else {
        setTimeout(() => {
          setCurrentQuestion(prev => prev + 1)
          setIsCorrect(false)
          setIsWrong(false)
        }, 2000)
      }

    }



    // trả lời câu hỏi - chế độ giáo viên
    if (router.query.type === "teacher") {
      socket.emit('answerTeacher', {
        userId: checkUser?.id,
        index: currentQuestion,
        score: answare ? score + 600 : score,
        username,
        result: type,
        room: router.query.id,
        type: router.query.type,
      }, username)
    }


    // trả lời câu hỏi - chế độ thông thường
    if (router.query.type === "basic") {
      socket.emit('answer',
        {
          score: answare ? score + 600 : score,
          index: currentQuestion,
          userId: checkUser?.id,
          username,
          result: type,
          correctAnswer,
          wrongAnswer,
          room: router.query.id,
          type: router.query.type,
        }
      )
    }

  }



  return (
    <>
      {
        router.query.page == "summary"
          ?
          <Summary />
          :
          <div className='font-quick w-full h-[931px] relative bg-[#000] bg-cover'>
            {show && <div className='bg-[#000000d9] fixed top-0 bottom-0 right-0 left-0  z-[9999]'>
              <div className='w-full h-full'>
                <div className='mt-[101px] h-[200px] flex w-full justify-center'>
                  <img className='w-[200px]' src='https://cf.quizizz.com/game/img/ui/invalid_game.png' />
                </div>
                <div className='mt-[32px] text-white text-center w-[92%] max-w-[520px] mx-auto text-[18px]'>
                  Bạn đã bị đuổi khỏi trò chơi
                </div>
                <div onClick={() => (router.push('/'), localStorage.removeItem('key'))} className='text-[#519900] text-center mt-[32px] text-[24px] font-bold cursor-pointer'>
                  Về Trang chủ
                </div>
              </div>
            </div>
            }

            {/* Đếm ngược thời gian trả lời câu hỏi */}
            {!isShow && <div
              style={{ animation: `countdow ${countdown}s` }}
              className={`bg-red-500 w-full  h-[6px] rounded-tr-lg rounded-br-lg absolute z-[999] transition-all`}></div>}

            {/* Header */}
            <div className='py-[12px] px-[8px] z-[101] text-white bg-[#000] text-[16px] transition-transform duration-500 ease-in-out fixed top-0 left-0 right-0'>
              <div className='flex justify-between relative'>

                <div className='flex items-center flex-1 gap-2'>
                  <button className='text-white hover:bg-[#ffffff54] bg-[#fff3] rounded-[8px] transition-colors duration-200 ease-out'>
                    <div className='w-[40px] h-[40px] flex justify-center items-center text-[16px] relative'>
                      <i className="fa-solid fa-gear"></i>
                    </div>
                  </button>
                  <div className='w-[1px] h-[36px] bg-[#fff3]'></div>
                  <button className='text-white hover:bg-[#ffffff54] bg-[#fff3] rounded-[8px] transition-colors duration-200 ease-out'>
                    <div className='w-[40px] h-[40px] flex justify-center items-center text-[16px] relative'>
                      <i className="fa-solid fa-volume-xmark"></i>
                    </div>
                  </button>
                  {router.query.type === "basic" && <div className='w-[1px] h-[36px] bg-[#fff3]'></div>}
                  {router.query.type === "basic" && <button className='text-[#ffffff54] bg-[#fff3] border-0  rounded-[8px]  flex-shrink-0 transition-colors duration-200'>
                    <i className="text-[16px]  w-[40px] h-[40px] flex items-center justify-center fa-solid fa-magnifying-glass-plus"></i>
                  </button>}
                  {router.query.type === "basic" && <div className='w-[1px] h-[36px] bg-[#fff3] '></div>}

                  {router.query.type === "basic" && <div className='flex max-w-[284px] flex-[100%]'>
                    <div className='bg-[#000] flex-1 border-[2px] border-[#ffffff26] rounded-[8px] transition-transform ease-in relative overflow-hidden scale-[1]'>
                      <div className='h-[32px] z-10 flex justify-between items-center w-full relative'>
                        <span className='ml-[8px] text-[14px] font-medium'>
                          Vệt.
                        </span>
                        <span className='mr-[8px]'>
                          <i className="text-[11px] mr-1 fa-solid fa-fire-flame-curved"></i>
                          <span className='text-[14px]'>{transform}</span>
                        </span>
                      </div>
                      <div className='h-[32px] bg-[#000] rounded-[4px] w-calc(100%-4px)] absolute top-[2px] left-[2px] right-[2px] overflow-hidden'>
                        <div className='bg-[#fff3] rounded-[1px] w-[2px] h-[12px] absolute top-[50%] z-[3] left-[33.33%] translate-y-[-50%]'>
                        </div>
                        <div className='bg-[#fff3] rounded-[1px] w-[2px] h-[12px] absolute top-[50%] z-[3] left-[66.66%] translate-y-[-50%]'>
                        </div>
                        <div className={`bg-bar rounded-[4px] w-full max-w-full h-full duration-1000 transition-transform absolute top-0 left-0 
                        ${transform == 0 && "translate-x-[-101%]"}
                        ${transform == 1 && "translate-x-[-67%]"}
                        ${transform == 2 && "translate-x-[-33%]"}
                        ${transform == 3 && "translate-x-[0%]"}
                        `}>

                        </div>
                      </div>
                    </div>
                  </div>
                  }
                  <div className='w-[1px] h-[36px] bg-[#fff3] '></div>
                  <div className='text-white font-medium bg-[#fff3] rounded-[8px] transition-colors duration-200 ease-out'>
                    <div className='w-[40px] h-[40px] flex justify-center items-center text-[16px] relative'>
                      <span className='text-[1rem] leading-[1.25rem]'>{currentQuestion + 1}</span>

                      <span className='text-[12px] leading-[17px]'>/{question?.length}</span>
                    </div>
                  </div>
                </div>

                <div className='text-[16px] flex font-medium '>
                  <div className='rounded-[8px]  h-[40px] flex justify-center overflow-hidden w-[104px] py-[10px] bg-[#ffffff1a]'>
                    <div className='relative'>
                      <span className='blur-[8px] bg-[#7d72ec54] rounded-[12px] w-[16px] h-[16px] absolute'></span>
                      <i className="fa-solid fa-medal text-[#7d72ec]"></i>

                    </div>
                    <div className='ml-[8px] relative overflow-hidden'>
                      {score <= 0 ? "—" : score}
                    </div>
                  </div>

                  <div className='ml-[8px]'>
                    <button className='bg-[#fff3] rounded-[8px] flex items-center justify-center w-[40px] h-[40px]'>
                      <div className='bg-[url("https://cf.quizizz.com/game/img/ui/expand-wide.svg")] bg-[50%] bg-no-repeat h-[40px] w-[40px]'>

                      </div>
                    </button>
                  </div>
                </div>

              </div>
            </div>
            {/* Body */}
            <div className='h-[calc(100%-152px)] mt-[64px]'>
              <div className='w-full px-[8px] pb-[8px] relative h-full'>

                {/* teacher mode */}
                {isLoading && <div className='bg-[#000000f2] z-10 absolute top-0 left-0 w-full h-full px-[8px] pb-[8px] flex items-center '>
                  <div className='w-full h-full transition-all duration-[400ms] flex flex-col items-center justify-center'>
                    <div className='rounded-[16px] py-[24px] px-[32px] flex flex-col '>
                      <div className='w-[72px] h-[72px] m-auto relative'>
                        <svg data-v-ed470ef8="" className="q-circle  origin-[50%] w-full h-full m-auto absolute top-0 left-0 right-0 bottom-0 rotate-[27deg]" viewBox="25 25 50 50"><circle data-v-ed470ef8="" className="q-path  animate-dash  stroke-[#ffffffa8] fadedWhite" cx="50" cy="50" r="20" fill="none" ></circle></svg>
                        <div className='w-[15px] h-[15px] bg-[#ffffffa8] rounded-full absolute top-[83%] right-0 animate-dot scale-0'></div>

                      </div>
                      <div className='text-[#ffffffa8] text-center w-full max-w-[400px] max-h-[30px] mt-[20px] bg-[#0000] text-[24px]'>Chờ đợi người khác trả lời...</div>
                    </div>
                    <div className='top-[calc(50%-109px)] h-[52px] text-[24px] transition-all duration-[400ms] bg-[#8854c0] w-[100vw] relative flex items-center justify-center'>
                      <div className='text-[24px] text-white transition duration-300 opacity-100 scale-[1] text-center font-bold'>ĐÃ NỘP</div>
                    </div>
                  </div>
                </div>
                }

                <div className='w-full h-full p-[8px] rounded-[16px] bg-purple-1'>
                  {/* teacher mode */}
                  {showBanner &&
                    <div className='bg-[#00000080] absolute left-0 top-0 w-full z-[2] h-full py-[8px] overflow-hidden flex items-center'>
                      {showWrong && <div className='w-full h-full transition-all justify-center duration-[400ms] flex items-center flex-col'>
                        <div className={`${animate ? "translate-y-[358px] text-[24px] h-[44px]" : "text-[32px] "} h-[141px] animate-answare flex justify-center transition-all duration-[400ms]  bg-[#ec0b43] w-[100vw] absolute translate-y-(309px)`}>
                          <div className='text-white flex items-center  text-center font-bold  transition duration-300'>
                            KHÔNG CHÍNH XÁC
                          </div>
                        </div>
                      </div>}
                      {showTimeout && <div className='w-full h-full transition-all justify-center duration-[400ms] flex items-center flex-col'>
                        <div className={`${animate ? "translate-y-[358px] text-[24px] h-[44px]" : "text-[32px] "} h-[141px] animate-answare flex justify-center transition-all duration-[400ms]  bg-[#b6b6b6] w-[100vw] absolute translate-y-(309px)`}>
                          <div className='text-white flex items-center  text-center font-bold  transition duration-300'>
                            Câu hỏi được thực hiện
                          </div>
                        </div>
                      </div>}
                      {showCorrect && <div className='w-full h-full transition-all justify-center duration-[400ms] flex items-center flex-col'>
                        <div className={`${animate ? "translate-y-[358px] text-[24px] h-[44px]" : "text-[32px] "} h-[141px] animate-answare flex justify-center transition-all duration-[400ms]  bg-green-600 w-[100vw] absolute translate-y-(309px)`}>
                          <div className='text-white flex items-center  text-center font-bold  transition duration-300'>
                            CHÍNH XÁC
                          </div>
                        </div>
                      </div>}


                    </div>
                  }

                  <div className='text-[32px] text-center flex justify-center items-center w-full h-full font-medium'>
                    {/* game đa lựa trọn */}
                    {!childrenQues?.questionType &&
                      <div className='w-full h-full'>
                        <div className='w-full text-white h-[50%] flex justify-center items-center p-2 relative'>{childrenQues?.questionTitle}</div>
                        <div className='pt-[8px] overflow-y-auto w-full text-center rounded-t-lg h-1/2'>
                          <div className=' flex flex-col w-full h-full sm:flex-row'>
                            <div className='p-1 pb-1 flex gap-[7px]  flex-1'>
                              {childrenQues?.question.map((result, index) => (
                                <div
                                  onClick={() => handleAnswareQues(result, index)}
                                  key={index}
                                  className={`
                                ${isCorrect && result === checkResult && "bg-green-500 border-[3px]  border-[#fff] shadow-none"}
                                ${isCorrect && result !== checkResult && "invisible"}
                                ${isWrong && type === result && "bg-red-500 border-[3px] border-[#fff] shadow-none"}
                                ${isWrong && type !== result && result !== checkResult && "invisible"}
                                ${isWrong && result === checkResult && "bg-green-500 border-[3px]  border-[#fff] shadow-none"}
                                
                                
                              ${index === 0 && "bg-[#2f6dae] border-[#2f6dae] shadow-[0_6px_#214e7c]"}
                              ${index === 1 && "bg-[#2c9ca6] border-[#2c9ca6] shadow-[0_6px_#1f6d74]"}
                              ${index === 2 && "bg-[#eca82c] border-[#eca82c] shadow-[0_6px_#c68612]"}
                              ${index === 3 && "bg-[#d4546a] border-[#d4546a] shadow-[0_6px_#ba2f47]"}
                                  cursor-pointer flex visible justify-center items-center border-[3px]  p-[5px] rounded-[4px] w-full h-full relative text-white`}>
                                  {result}
                                  <div className='border absolute cursor-pointer top-[10px] right-[10px] w-[32px] h-[32px] rounded-[4px] bg-[#0000] border-[rgba(0_0_0/0.2)] shadow-[rgba(0_0_0/0.2)_0px_2px_0px_0px] text-white'>
                                    <div className='w-full text-[15px] h-full flex justify-center items-center'>
                                      {index + 1}
                                    </div>
                                  </div>
                                </div>

                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    }

                    {/* game điền từ */}
                    {childrenQues?.questionType === "Điền từ"
                      &&
                      <FillWordGame
                        setCurrentQuestion={setCurrentQuestion}
                        currentQuestion={currentQuestion}
                        question={question}
                        username={username}
                        checkUser={checkUser}
                        router={router}
                        socket={socket}
                        isShow={isShow}
                        setIsShow={setIsShow}
                        countdown={countdown}
                        setCountdown={setCountdown}

                      />}

                  </div>


                </div>
              </div>
            </div>
          </div>
      }

    </>
  )
}
