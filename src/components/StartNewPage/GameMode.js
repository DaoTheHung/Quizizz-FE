import React, { useEffect, useState } from 'react'
import DateGameMode from '../common/GameMode/DateGameMode'
import { useRouter } from 'next/router'
import { useStore } from '../../../store/useStore'
import { useQuery } from '@tanstack/react-query'

export default function GameMode() {
  const router = useRouter()
  const id = router.query.name

  useEffect(() => {
    if (router.pathname === `/admin/quiz/start_new/[name]`) {
      document.title = `Start Live Game - Quizizz`
    }
  }, [router])

  //
  const [modeTeam, setModeTeam] = useState(false)
  const [modePeak, setModePeak] = useState(false)
  const [modeNormal, setModeNormal] = useState(true)
  const [modeCheck, setModeCheck] = useState(false)
  const [showGameTurn, setShowGameTurn] = useState(false)
  const [checked, setChecked] = useState(false)

  // store
  const fetchDataQuiz = useStore(state => state.fetchDataQuiz)
  const dataQuiz = useStore(state => state.dataQuiz)
  const socket = useStore(state => state.socket)


  // call api
  useQuery(['quizizz'], fetchDataQuiz,)
  const quizDetail = dataQuiz?.find(item => item.id == id)
  const questionLength = quizDetail && JSON.parse(quizDetail?.questionList)


  // theo team
  const handleModeTeam = () => {
    setModeTeam(true)
    setModePeak(false)
    setModeNormal(false)
    setModeCheck(false)
  }
  // đỉnh cao
  const handleModePeak = () => {
    setModeTeam(false)
    setModePeak(true)
    setModeNormal(false)
    setModeCheck(false)
  }
  // thông thường
  const handleModeNormal = () => {

    setModeTeam(false)
    setModePeak(false)
    setModeNormal(true)
    setModeCheck(false)
  }

  // kiểm tra
  const handleModeCheck = () => {
    setModeTeam(false)
    setModePeak(false)
    setModeNormal(false)
    setModeCheck(true)
  }

  // tạo zoom
  const handleCreateZoom = () => {
    socket.emit('join_room', `${quizDetail?.id}`)
    if (modeNormal) {
      router.push(`/admin/quiz/startV4/${quizDetail?.id}?type=${router.query.type}`)
    }
    if (modeTeam) {
      router.push(`/admin/quiz/team/${quizDetail?.id}?type=team`)

    }
  }
  return (
    <div className=' ml-[12rem] h-full p-8 flex'>
      <div className='relative flex justify-center w-full pb-20 md:pb-6'>
        <button type='button' onClick={() => router.push(`/admin/quiz/${quizDetail.id}`)} className='absolute md:flex items-center text-dark-4 -left-4 -top-4 md:left-0 text-xs'>
          <i className="text-[10px] p-1 fa-solid fa-chevron-left"></i>
          Quay lại
        </button>
        <div className='px-4 w-[31rem] max-w-full md:px-0 flex flex-col items-center mb-15 md:mb-0'>

          <div className='flex w-full flex-col gap-3 justify-between items-center'>
            <div className='text-dark-3 text-xl font-semibold overflow-hidden text-ellipsis flex-1 text-left'>
              {quizDetail?.nameQuiz}
            </div>
            <div className='text-sm font-semibold text-dark-4'>
              {questionLength?.length} câu hỏi
            </div>
          </div>
          <div className='flex justify-center mt-4 font-semibold text-2xl'>Chọn chế độ chơi</div>
          <div className='flex justify-center items-end my-8'>
            {/* */}
            <div onClick={handleModeTeam} className={`w-32 h-36 border-2 flex flex-col justify-center items-center bg-white rounded-lg shadow-md transition transform cursor-pointer ${modeTeam ? "border-lilac" : ""}`}>
              <div className='w-20 h-20 rounded-full'>
                <img className='rounded-full' src='https://cf.quizizz.com/image/mode-team.png' />
              </div>
              <div className='text-dark-2 text-base font-semibold mt-4'>
                Theo nhóm
              </div>
            </div>
            {/* */}
            <div onClick={handleModePeak} className='relative'>
              <div className={`w-36 h-[10.5rem] rounded-lg shadow-md ml-4 border-2  transition transform cursor-pointer object-contain origin-left md:origin-top-left overflow-hidden  ${modePeak ? "border-[#2d9da6]" : ""}`}>
                <img src='https://cf.quizizz.com/img/game-options/v1/mastery_peak_thubmnail.png' />
                <div className='text-dark-6 text-center text-sm whitespace-nowrap font-semibold absolute bottom-3 flex justify-center w-full'>
                  Đỉnh cao tinh thông
                </div>

              </div>
            </div>
            {/* */}
            <div onClick={handleModeNormal} className={`w-36 h-[10.5rem] flex flex-col justify-center items-center bg-white rounded-lg shadow-md mx-4 transition transform cursor-pointer  border-2 ${modeNormal ? "border-lilac" : ""}`}>
              <div className='h-[6.25rem] w-[6.25rem] bg-light rounded-full'>
                <img src='https://cf.quizizz.com/image/mode-classic.png' />
              </div>
              <div className='text-dark-6 text-base font-semibold mt-5'>
                Thông thường
              </div>
            </div>
            {/* */}
            <div onClick={handleModeCheck} className={`w-[7.5rem] h-36 flex flex-col justify-center items-center bg-white rounded-lg shadow-md transition transform cursor-pointer border-2 ${modeCheck ? "border-lilac" : ""}`}>
              <div className='h-20 w-20 bg-red-light rounded-full'>
                <img src='https://cf.quizizz.com/image/mode-test.png' />
              </div>
              <div className='text-dark-2 text-base font-semibold mt-4'>Kiểm tra</div>
            </div>
          </div>

          {modePeak && <>
            <div className='relative bg-[#ec0b431a] w-full p-3 text-sm text-[rgb(188_8_53/1)] first-line:font-semibold flex rounded-md'>
              <div className='flex gap-1 items-center'>
                <span>Đỉnh thông thạo chỉ có thể được chơi nếu có nhiều hơn</span>
                <span className='font-bold'>9</span>
                <span className='font-bold flex items-center'>câu hỏi.<i className="text-[12px] fa-regular fa-circle-question"></i></span>

              </div>
            </div>
            <div className='bg-white p-2 w-full '>
              <div className='font-semibold text-base'>We recommend:</div>

              <span>
                Thêm
              </span>
              <span className='font-semibold ml-1 mr-1'>9 <span>câu hỏi</span></span>
              <span>đến bài kiểm tra của bạn để chơi Mastery Peak với lớp của bạn.</span>

            </div>
          </>}

          {!modePeak &&
            <>
              <div className='border rounded-lg text-sm flex justify-center items-center h-[4.5rem] font-semibold opacity-100 border-lilac bg-purple-2 text-lilac'>
                <div className='my-4 mx-12 text-center'>
                  {modeNormal && "Những người tham gia trả lời theo tốc độ của riêng họ, cạnh tranh cá nhân và có một sự bùng nổ trong suốt quá trình"}
                  {modeTeam && "Những người tham gia trả lời theo tốc độ của riêng họ, nhưng điểm số được nhóm theo nhóm"}
                  {modeCheck && "Chế độ đơn giản để đánh giá nghiêm túc hơn (Yêu cầu đăng nhập)"}
                </div>
              </div>
              <button type='button' onClick={handleCreateZoom} className=' items-center justify-center px-7.5 py-2.5 text-lg font-semibold shadow-[0_4px_#6c4298] mb-1 h-10 base bg-lilac text-white hover:bg-light  rounded-lg primary transition-colors duration-200 ease-in-out flex relative min-w-max w-full mt-5'>
                Tiếp tục
              </button>
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
                <div className='p-4 bg-light-3 relative rounded-b-lg border-t border-light-2'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <div className='flex items-center'>
                        <h4 className='text-sm font-semibold'>Lượt chơi</h4>
                      </div>
                      <div className='my-1 text-xs text-dark-3'>Người tham gia có thể làm bài kiểm tra này bao nhiêu lần? </div>
                    </div>

                    <div className='ml-4'>
                      <div className='w-[8.75rem]'>
                        <div className='select w-full inline-flex relative'>
                          <button onClick={() => setShowGameTurn(!showGameTurn)} type='button' className='listbox-button flex items-center cursor-pointer box-border text-left rounded font-semibold text-sm text-dark-3 p-4 border border-light-2 text-dark-2 pl-2 pr-1 py-2 h-8 w-full'>
                            <div className='title w-full truncate text-sm'>
                              Không giới hạn
                            </div>
                            <div className='ml-auto flex items-center justify-center w-4 h-4'>
                              <i className='flex items-center fas fa-caret-down text-dark-3'></i>

                            </div>
                          </button>
                          <ul className={`transition-transform absolute h-auto top-[0px] left-0 right-0 shadow-sortHig bg-white rounded overflow-y-auto overflow-hidden transform ${!showGameTurn ? "scale-y-0" : "scale-y-100"} origin-top max-h-44 mt-10 z-30`}>

                            <li className={` rounded-t p-2  border-purple-2 border-1 border-b-2  cursor-pointer flex`}>
                              <div className=''>
                                <div className='item-title font-semibold text-sm'>
                                  Không giới hạn
                                </div>
                              </div>
                            </li>


                            <li className={` p-2 border-b-[#0909090d]   border-purple-2 border-1 border-b-2 cursor-pointer flex`}>
                              <div className=''>
                                <div className='item-title font-semibold text-sm'>
                                  1
                                </div>
                              </div>
                            </li>


                            <li className={`  p-2 rounded-b border-purple-2 border-1 border-b-2  cursor-pointer flex`}>
                              <div className=''>
                                <div className='item-title font-semibold text-sm'>
                                  2
                                </div>
                              </div>
                            </li>

                            <li className={`  p-2 rounded-b border-purple-2 border-1 border-b-2  cursor-pointer flex`}>
                              <div className=''>
                                <div className='item-title font-semibold text-sm'>
                                  3
                                </div>
                              </div>
                            </li>

                            <li className={`  p-2 rounded-b border-purple-2 border-1 border-b-2  cursor-pointer flex`}>
                              <div className=''>
                                <div className='item-title font-semibold text-sm'>
                                  4
                                </div>
                              </div>
                            </li>

                            <li className={`  p-2 rounded-b border-purple-2 border-1  cursor-pointer flex`}>
                              <div className=''>
                                <div className='item-title font-semibold text-sm'>
                                  5
                                </div>
                              </div>
                            </li>

                          </ul>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}
