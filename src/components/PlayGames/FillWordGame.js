import React, { useState, useEffect, useRef } from 'react'
import { useForm } from "react-hook-form"

export default function FillWordGame({ question, checkUser, router, socket, currentQuestion,
    setCurrentQuestion, isShow, setIsShow, setCountdown, countdown }) {


    // ẩn hiện câu trả lời chính xác cho câu hỏi
    const [showResult, setShowResult] = useState(false)

    // màu sắc nút nộp bài
    const [answerValue, setAnswerValue] = useState(true)


    const [userName, setUserName] = useState('')

    //
    const [value, setValue] = useState('')
    const [index, setIndex] = useState('')
    const [score, setScore] = useState(0)
    const [isLoading, setIsLoading] = useState(false)


    // logic trả lời câu hỏi
    const ref = useRef([])
    const [isCorrect, setIsCorrect] = useState([])
    const [isRequire, setIsRequire] = useState(false)
    const [showAnswer, setShowAnswer] = useState(false)

    // chế độ giáo viên
    const [showBanner, setShowBanner] = useState(false)
    const [animate, setAnimate] = useState(false)
    const [showCorrect, setShowCorrect] = useState(true)
    const [showWrong, setShowWrong] = useState(false)
    const [showTimeout, setShowTimeout] = useState(false)
    const [correct, setCorrect] = useState(false)
    const [wrong, setWrong] = useState(false)
    const [test, settest] = useState(false)



    // lấy dữ liệu từ api
    const childrenQues = question && question[currentQuestion]


    // chuyển đổi mảng thành chuỗi 
    const answerQuestion = childrenQues?.answare.map(item => item)
    const stringAnswer = answerQuestion?.toString()

    // bỏ dấu chữ cái
    const stringWithoutPunctuation = stringAnswer?.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    // mảng chứa từng kí tự
    const answer = stringWithoutPunctuation?.split("")

    useEffect(() => {
        const local = localStorage.getItem('username')
        if (local !== null) {
            setUserName(local)
        }
    }, [])


    // chế độ giáo viên
    useEffect(() => {

        // chuyển sang câu hỏi tiếp theo
        socket.on('sendNextQuestion', data => {
            setCurrentQuestion(data?.currentQuestion)
            setShowWrong(false)
            setShowCorrect(false)
            setAnimate(false)
            setShowBanner(false)
            setShowTimeout(false)
            setIsShow(false)
            setCountdown(10)

            setShowResult(false)
            setShowAnswer(false)
            // set giá trị về rỗng\
            ref.current.forEach((item, i) => {
                item?.blur()
                if (item?.value) {

                    return item.value = ''
                }
            })
        })

        // người chơi đã trả lời hết 
        socket.on('sendAnswered', (data) => {
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
                if (correct) {
                    setShowCorrect(true)
                }
                if (wrong) {
                    setShowWrong(true)
                }
            }
            setIsLoading(false)
            setTimeout(() => setAnimate(true), 1200)
        })

    }, [socket, isShow, correct, wrong])



    // nhập câu trả lời
    const handleChangeAnswer = (e, index) => {
        setIndex(index)
        setValue(e.target.value)

        // focus đến ô tiếp theo
        const next = ref.current[index + 1]
        if (e.target.value.length >= e.target.maxLength) {
            if (next) {
                if (ref.current[index]) {
                    next.focus()
                }
                setAnswerValue(false)
            }
        }
    }

    // xóa câu trả lời
    const handleRemoveAnswer = (e, index) => {
        if (e.keyCode === 8 && !e.target.value) {
            const next = ref.current[index - 1]
            if (next) {
                next.focus()
            }
        }
    }

    // Nộp bài
    const handleAnswer = (e) => {
        e.preventDefault()
        setIsShow(true)

        // xác định từ đúng và sai
        const valuesMatch = ref.current.map((item, index) => {
            return item?.value === answer[index];
        });


        // delay hiển thị kết quả - chế độ thông thường 
        if (router.query.type === "basic") {
            setTimeout(() => {
                setShowAnswer(true)
                setIsCorrect(valuesMatch)
                setIsRequire(true)
                setShowResult(true)
            }, 1000)
        }

        // delay hiển thị kết quả - chế độ giáo viên
        if (router.query.type === "teacher") {

            setShowAnswer(true)
            setIsCorrect(valuesMatch)
            setIsRequire(true)
            setShowResult(true)

        }


        // trả lời đúng
        // const checkResult = ref.current.map(item => item.value.join('').split(',').join(''))
        const checkResult = ref.current.map((item, i) => {
            if (item?.value) {
                return item.value
            }
        })


        if (checkResult.join('').split(',').join('') === stringWithoutPunctuation) {
            setScore(prev => prev + 600)
            
            if (router.query.type === "teacher") {
                setCorrect(true)
                setWrong(false)

                setIsLoading(true)
                setShowCorrect(true)
                setShowWrong(false)
            }
        } else {
            // chế độ giáo viên điều khiển
            if (router.query.type === "teacher") {
                setWrong(true)
                setCorrect(false)
                setIsLoading(true)
                setShowWrong(true)
                setShowCorrect(false)
            }
        }


        // chế độ thông thường
        if (router.query.type === "basic") {
            // Check câu hỏi cuối
            if (currentQuestion == question?.length - 1) {
                setTimeout(() => {
                    router.push(`/playgame/${router.query.id}?page=summary`)
                }, 2000)
            } else {
                setTimeout(() => {
                    setCurrentQuestion(prev => prev + 1)
                    setShowResult(false)
                    setShowAnswer(false)
                    // set giá trị về rỗng\
                    ref.current.forEach((item, i) => {
                        item?.blur()
                        if (item?.value) {

                            return item.value = ''
                        }
                    })

                }, 2000)
            }

        }


        // trả lời câu hỏi - chế độ thông thường
        if (router.query.type === "basic") {
            socket.emit('answer',
                {
                    score: correct ? score + 600 : score,
                    index: currentQuestion,
                    userId: checkUser?.id,
                    username: userName,
                    result: checkResult,
                    room: router.query.id,
                    type: router.query.type,
                }
            )
        }


        // trả lời câu hỏi - chế độ giáo viên
        if (router.query.type === "teacher") {
            socket.emit('answerTeacher', {
                userId: checkUser?.id,
                index: currentQuestion,
                score: correct ? score + 600 : score,
                username: userName,
                result: checkResult,
                room: router.query.id,
                type: router.query.type,
            }, userName)
        }

    }




    return (
        <div className='w-full h-full'>
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

            {showResult == false &&
                <div className='w-full text-white h-[50%] flex justify-center items-center p-2 relative'>{childrenQues?.questionTitle}</div>
            }
            {showResult == true &&
                <div className='w-full text-white h-[50%] flex justify-center items-center gap-1 p-2 relative'>
                    {answer.map((ans, index) => (
                        <div key={index} className='relative rounded box-border border-[#ffffff54] border'>
                            <div

                                type='text'
                                className='text-center flex items-center justify-center bg-green-600  font-bold text-white focus:ring-2  focus:ring-lilac  focus:outline-none rounded w-16 h-16 text-2xl'>
                                {ans}
                            </div>
                        </div>
                    ))}
                </div>
            }

            <div className='pt-[8px] overflow-y-auto w-full text-center rounded-t-lg h-1/2'>

                <form className='w-full h-full' onSubmit={handleAnswer}  >
                    <div className='  relative flex flex-col  w-full min-h-full align-items justify-center overflow-y-auto px-2 pt-8 pb-1 text-base gap-8 md:text-xl md:pt-6 md:px-26 md:pb-2 lg:px-2 lg:py-0 bg-[#000000a6] '>

                        <div className='flex items-center justify-center w-full overflow-y-hidden cursor-pointer relative'>
                            <div className='flex flex-col gap-4'>
                                <p className='text-lg font-semibold text-[#ffffffa8]'>
                                    Nhập câu trả lời của bạn vào các hộp
                                </p>
                                <div className='flex gap-2 flex-wrap items-center justify-center h-max'>
                                    {answer?.map((ans, index) => (

                                        <div key={index} className='relative rounded box-border border-[#ffffff54] border'>
                                            <input
                                                // value={isRefesh == false ? listValue[index] : ''}
                                                onChange={(e) => handleChangeAnswer(e, index)}
                                                onKeyDown={(e) => handleRemoveAnswer(e, index)}
                                                maxLength={1}
                                                ref={prev => ref.current[index] = prev}
                                                type='text'
                                                className={`
                                                    ${showAnswer && isCorrect[index] ? "bg-green-600" : "bg-[#09090980]"}
                                                    ${showAnswer && isCorrect[index] == false ? "bg-red-600" : "bg-[#09090980]"}
                                                    ${showAnswer && !isCorrect[index] && isRequire == true && "bg-red-600"}
                                        text-center  font-bold text-white focus:ring-2  focus:ring-lilac  focus:outline-none rounded w-16 h-16 text-2xl`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='h-[88px] text-white text-center z-[100] absolute bg-[#000] text-[16px]  bottom-[-88px] left-0 right-0'>
                        <div className='flex pr-[8px]  items-center justify-end relative'>
                            <div className='pl-[12px] flex-1 gap-[12px] overflow-x-auto flex '></div>
                            <div className='h-[55px] my-auto mx-[8px] bg-[#ffffff54] w-[2px]'>
                            </div>
                            <div className='justify-center items-center transition-all duration-300 ease-in flex'>
                                <div className='text-right my-[8px] ml-[8px] flex items-center'>
                                    <div className='inline-block relative cursor-pointer'>
                                        <button type='submit'
                                            className={`transition-all duration-300  shadow-[0_4px_#2f2f2f] py-[16px] px-[32px] text-[18px] rounded-[8px] inline-flex items-center font-bold relative bottom-[2px] overflow-hidden
                                    ${value && "bg-[#8854c0] text-white"}
                                    ${answerValue || !value && index === 0 ? "text-[#ffffff26] bg-[#474747]" : "bg-[#8854c0] text-white"}
                                    `}
                                        >
                                            <span className=''>
                                                NỘP
                                            </span>
                                            <i className='icon-fas-arrow-right'></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}                                          
