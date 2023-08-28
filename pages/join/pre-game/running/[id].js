import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useStore } from '../../../../store/useStore'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'


export default function index() {
  const [showModal, setShowModal] = useState(false)
  const [user, setUser] = useState([])
  const [show, setShow] = useState(false)

  // Modal kick khoi phong
  const [showChangeName, setShowChangeName] = useState(false)

  // store
  const socket = useStore(state => state.socket)
  const router = useRouter()


  useEffect(() => {
    if (router.pathname === "/join/pre-game/running/[id]") {
      document.title = "Start Playing - Quizizz"
    }
  }, [router])


  // check ten nguoi choi da bi duoi khoi phong
  useEffect(() => {
    const username = localStorage.getItem('username')
    if (username) {
      setShow(true)
    }
    socket.on('disconnectUserName', data => {
      if (data) {
        const check = data.some(user => user.username === watch('userName'))
        if (check) {
          setShowChangeName(true)
          localStorage.removeItem('username')
        }
      }
    })


  }, [socket, showChangeName])



  // join phong
  if (router) {
    socket.emit('join_room', router.query.id, router.query.type)
  }


  // store
  const fetchPlayerZoom = useStore(state => state.fetchPlayerZoom)
  const { data, refetch } = useQuery(['zoom'], fetchPlayerZoom)

  const checkPlayerRoom = data?.data.filter(user => user.roomId === router.query.id)


  //
  const [checked, setChecked] = useState(false)
  const [checked1, setChecked1] = useState(false)
  const [checked2, setChecked2] = useState(false)
  const [checked3, setChecked3] = useState(false)
  //Form
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  // const arrUser = [...user]


  const onSubmit = async (dataUser) => {
    const checkUser = checkPlayerRoom?.find(user => user.username === dataUser.userName && user.type === router.query.type)

    const newUser = {
      roomId: router.query.id,
      username: dataUser,
      type: router.query.type,
    }

    if (checkUser) {
      setShowModal(true)
    } else {
      // arrUser.push(newUser)
      localStorage.setItem('username', dataUser.userName)
      await socket.emit("userJoin", newUser)
      socket.emit('join_room', newUser.roomId, router.query.type)
      router.push(`/join/game/${router.query.id}?type=${router.query.type}`)
    }
  }
  return (
    <div className='font-quick  bg-[#000]  top-0 left-0 right-0 bottom-0 bg-fixed bg-no-repeat bg-center bg-cover fixed'>
      {showChangeName && <div className='bg-[#000000d9] fixed top-0 bottom-0 right-0 left-0  z-[9999]'>
        <div className='w-full h-full'>
          <div className='mt-[101px] h-[200px] flex w-full justify-center'>
            <img className='w-[200px]' src='https://cf.quizizz.com/game/img/ui/invalid_game.png' />
          </div>
          <div className='mt-[32px] text-white text-center w-[92%] max-w-[520px] mx-auto text-[18px]'>
            Bạn đã bị đuổi khỏi trò chơi
          </div>
          <div onClick={() => (router.push('/'), localStorage.removeItem('id'))} className='text-[#519900] text-center mt-[32px] text-[24px] font-bold cursor-pointer'>
            Về Trang chủ
          </div>
        </div>
      </div>}
      <div className='py-[12px] px-[8px] text-white'>
        <div className='flex justify-between items-center relative'>
          <div className='items-center flex-1 flex '>
            <button className='text-white bg-[#fff3] border-0  rounded-[8px]  flex-shrink-0 transition-colors duration-200'>
              <i className="text-[24px] fa-solid fa-xmark w-[40px] h-[40px] flex items-center justify-center"></i>
            </button>
            <div className='w-[1px] h-[36px] bg-[#fff3] mx-[8px]'></div>
            <button className='text-[#ffffff54] bg-[#fff3] border-0  rounded-[8px]  flex-shrink-0 transition-colors duration-200'>
              <i className="text-[16px]  w-[40px] h-[40px] flex items-center justify-center fa-solid fa-magnifying-glass-plus"></i>
            </button>
          </div>
          <div className='text-[16px] flex font-medium'>
            <div className='rounded-[8px] flex justify-center items-center max-h-[40px] w-[104px] bg-[#ffffff1a] py-[10px]'>
              <div className='relative'>
                <span className='blur-[8px] bg-[#7d72ec54] rounded-[12px] w-[16px] h-[16px] absolute z-0'></span>
                <i className="text-[#7d72ec] fa-solid fa-medal"></i>
              </div>
              <div className='ml-[8px] relative overflow-hidden'>
                —
              </div>
            </div>
          </div>
          <div className='py-[8px] px-[16px] rounded-[8px] font-medium bg-[#ffffff1a] ml-[8px] leading-[1.5]'>
            <span className='pr-1.5'>896</span>093
          </div>
        </div>
      </div>

      <div className='overflow-y-auto justify-center flex mt-[45px]  w-full'>
        <div className='mb-0 flex-col flex-1 max-w-[480px] flex'>
          <div className='bg-card w-[480px] p-[24px] rounded-[16px] flex flex-col mb-[16px]'>
            {!show ? <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
              <div className='mb-[8px] text-[#fdfdfda8] text-[14px] flex justify-between font-medium'>
                Tên Quizizz của bạn là...
                <div className='relative cursor-pointer'>
                  <i className="fa-solid fa-circle-info"></i>
                </div>
              </div>
              <div className='flex items-center justify-center relative'>
                <img className='max-w-[40px] max-h-[40px] z-10 left-[5px] absolute' src='https://cf.quizizz.com/join/img/avatars/tablet_sm/monster16.png?w=90&h=90' />
                <div className='w-full relative'>
                  <input maxLength={60} className={`${errors.userName?.type === "required" ? "border-2 border-[#ec0b43]" : ""} py-[13px] pl-[50px] pr-[13px] text-[20px] text-[#292a3a] bg-[#fff] rounded-[8px] outline-none w-full font-medium shadow-[inset_0_1px_4px_#00000026]`}
                    {...register('userName', {
                      required: true
                    })}
                  />
                </div>
                {
                  errors.userName?.type === "required" &&
                  <span className='right-[49px] text-[16px] text-[#ec0b43] rounded-full absolute'>
                    <i className="fa-solid fa-circle-exclamation"></i>
                  </span>
                }
                <div className='p-[13px] text-[16px] text-[#292a3a] bg-[#f2f2f2] rounded-[4px] right-[5px] absolute '>
                  <i className="fa-solid fa-rotate"></i>
                </div>
              </div>
              {
                errors.userName?.type === "required" &&
                <div>
                  <div className='text-center bg-[#ec0b43] rounded-[8px] justify-center w-full mt-[6px] py-[8px] px-[13px] flex shadow-[0_2px_6px_#00000029]'>
                    <div className='text-white text-[14px] font-medium'>
                      Vui lòng nhập tên
                    </div>
                  </div>
                </div>
              }
              <button type='submit' className='mt-[16px] hover:bg-[#34d49d] text-[20px] text-[#fafafa]  bg-[#00c985] rounded-[8px] justify-center py-[10px] px-[30px] font-bold flex relative  shadow-[0_4px_#00a06a]'>
                Bắt đầu
              </button>
            </form> :
              <div className='mt-5'>
                <div>
                  <div className='flex flex-col w-full'>
                    <div className='h-[16px] w-full mb-[4px] transition-all relative rounded-[8px] bg-white'>
                      <i className="fa-solid fa-person-running absolute left-0 top-[-20px] text-[#fff] text-[16px]"></i>
                      <i className="fa-solid fa-flag-checkered absolute right-0 top-[-20px] text-[#fff] text-[16px]"></i>
                    </div>
                    <div className='text-[#fff] flex mb-[2px] text-[10px] font-medium'>
                      <span>Bắt đầu</span>
                      <span className='ml-auto'>Kết thúc</span>
                    </div>
                  </div>
                </div>
                <div className='mb-[16px] text-[#fff] text-center text-[18px] font-bold'>
                  1 câu hỏi còn lại
                </div>
                <div className='flex justify-between'>
                  <button onClick={() => router.push(`/join/game/${router.query.id}`)} type='button' className='w-full mt-[12px] mr-[12px] text-[20px] text-[#fafafa] bg-[#00c985] rounded-[8px] justify-center flex items-center py-[10px] px-[30px] font-bold relative shadow-[0_4px_#00a06a]'>
                    Tiếp tục thử
                  </button>
                  <button className='w-full mt-[12px]  text-[20px] text-[#fafafa] bg-[#8854c0] rounded-[8px] justify-center flex items-center py-[10px] px-[30px] font-bold relative shadow-[0_4px_#6c4298]'>
                    Bắt đầu lại
                  </button>
                </div>
              </div>
            }

          </div>
          <div >

            <div className='flex flex-col'>
              <div className='text-white  self-start mb-[18px] text-[16px] font-medium'>
                Cài đặt
                <div className='bg-card w-[480px] max-w-[480px] p-[24px] mt-[18px] rounded-[16px]'>
                  <div className='justify-between flex w-full'>
                    <div className='flex items-center text-[#fff] gap-[8px]'>
                      <i className="fa-solid fa-volume-high "></i>
                      Đọc to văn bản
                    </div>
                    <label className={`switch__label rounded-full w-[38px] h-[20px] flex items-center whitespace-nowrap relative select-none default cursor-pointer ${checked ? "bg-[#0c6]" : "bg-[#d5d5d5]"}`}>
                      <div className={`absolute w-[16px] h-[16px] top-[2px] ${checked ? "left-[20px]" : "left-[2px]"}  rounded-full bg-white transition-allCheck`}></div>
                      <input type='checkbox' onChange={(e) => setChecked(e.target.checked)} className='absolute mr-2 w-px h-px overflow-hidden cursor-pointer' />
                    </label>
                  </div>
                  {checked &&
                    <div className='flex pt-[16px] w-full'>
                      <label className='text-white text-[14px]'>Tốc độ, vận tốc</label>
                      <div className='w-full pl-[16px]'>
                        <div className='flex'>
                          <svg data-v-ca46f9c8="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-ca46f9c8="" d="M11.7812 8.5H2.1875C1.53125 8.5 1 7.96875 1 7.3125V6.5C1 3.1875 3.65625 0.5 7 0.5C10.3125 0.5 13 3.1875 13 6.5V7.3125C13 7.96875 12.4375 8.5 11.7812 8.5ZM16 8.5C15.9375 8.5 15.875 8.5 15.8125 8.5C15.2812 10.1562 13.7812 11.4062 12 11.5V13.25C12 13.9688 11.4375 14.5 10.75 14.5H9.25C8.53125 14.5 8 13.9688 8 13.25V11.5H6V13.25C6 13.9688 5.4375 14.5 4.75 14.5H3.25C2.53125 14.5 2 13.9688 2 13.25V11.5H1C0.4375 11.5 0 11.0625 0 10.5C0 9.96875 0.4375 9.5 1 9.5H11.75C12.9688 9.5 14 8.5 14 7.25V4.5C14 3.40625 14.875 2.5 16 2.5H17C18.6562 2.5 20 3.84375 20 5.5V6.5C20 7.625 19.0938 8.5 18 8.5H16ZM16.5 6.5C16.75 6.5 17 6.28125 17 6C17 5.75 16.75 5.5 16.5 5.5C16.2188 5.5 16 5.75 16 6C16 6.28125 16.2188 6.5 16.5 6.5Z" fill="white"></path></svg>
                          <div className='w-full h-[5px] mt-[-12px] appearance-none '>
                            <input type='range' className='cursor-pointer bg-[#00000000] z-10 top-[4px] appearance-none  w-full h-[34.5px] px-[8px] transition-all duration-300 relative' />
                            <div className='text-[#fff] z-0 justify-between px-[11px] flex relative top-[-31.5px]'>
                              <span className='bg-[#6d6d6d] rounded-[12px] w-[93%] h-[4px] absolute top-[10px]'></span>
                              <span className='cursor-pointer z-10 bg-white border-[1.5px] border-[#b6b6b6] rounded-[25px] h-[12px] mt-[6px] relative'></span>
                              <span className='cursor-pointer z-10 bg-white border-[1.5px] border-[#b6b6b6] rounded-[25px] h-[12px] mt-[6px] relative'></span>
                              <span className='cursor-pointer z-10 bg-white border-[1.5px] border-[#b6b6b6] rounded-[25px] h-[12px] mt-[6px] relative'></span>
                              <span className='cursor-pointer z-10 bg-white border-[1.5px] border-[#b6b6b6] rounded-[25px] h-[12px] mt-[6px] relative'></span>
                              <span className='cursor-pointer z-10 bg-white border-[1.5px] border-[#b6b6b6] rounded-[25px] h-[12px] mt-[6px] relative'></span>
                            </div>
                            <div className='flex justify-between mt-[-24px]'>
                              <label className='text-[#b6b6b6] cursor-pointer text-[12px]'>Chậm</label>
                              <label className='text-[#b6b6b6] cursor-pointer text-[12px]'>Bình thường</label>
                              <label className='text-[#b6b6b6] cursor-pointer text-[12px]'>Nhanh</label>
                            </div>
                          </div>
                          <svg data-v-ca46f9c8="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-ca46f9c8="" d="M5.21875 11.4062C5.0625 11.4688 4.96875 11.6562 4.96875 11.8438V13.0312C4.96875 13.4062 5.40625 13.6562 5.75 13.4375L7.84375 12.1875L6.34375 10.6875L5.21875 11.4062ZM18.25 5.3125L16.4688 4.21875C16.4688 3.8125 16.4062 3.25 16.25 2.71875C15.9062 1.375 15.25 0.40625 14.8125 0.53125C14.375 0.65625 14.3125 1.8125 14.6562 3.125C14.6875 3.21875 14.7188 3.28125 14.7188 3.34375C14.5625 3.15625 14.4062 2.96875 14.2188 2.78125C13.25 1.8125 12.2188 1.28125 11.875 1.625C11.5312 1.9375 12.0625 2.96875 13.0312 3.9375C13.4375 4.34375 13.8438 4.65625 14.1875 4.875C14.0938 5.0625 14.0312 5.25 13.9688 5.46875C13.9688 5.5625 13.9688 5.65625 13.9688 5.78125C12.3438 4.65625 9.125 2.53125 6.96875 2.53125C5.3125 2.53125 4.28125 3.40625 3.6875 4.21875C3.625 4.125 3.59375 4.03125 3.53125 3.96875C2.9375 3.375 1.96875 3.375 1.40625 3.96875C0.8125 4.53125 0.8125 5.5 1.40625 6.09375C1.90625 6.59375 2.6875 6.625 3.28125 6.25L9.25 12.2188C9.4375 12.4062 9.6875 12.5312 9.96875 12.5312H14.4375C14.7188 12.5312 14.9062 12.2812 14.9062 12.0312V11.5C14.9062 10.9688 14.4688 10.5312 13.9062 10.5312H10.9688V8.8125C10.9688 7.6875 10.25 6.71875 9.15625 6.40625L7.84375 6C7.59375 5.90625 7.4375 5.65625 7.5 5.375C7.5625 5.125 7.84375 4.96875 8.125 5.0625L9.4375 5.4375C10.9375 5.875 11.9688 7.25 11.9688 8.8125V9.53125L13.9688 8.53125H17.2188C18.1875 8.5 19 7.71875 19 6.75C19 6.15625 18.7188 5.625 18.25 5.3125ZM16.4688 6.5C16.1875 6.5 15.9688 6.28125 15.9688 6.03125C15.9688 5.78125 16.1875 5.5625 16.4688 5.5625C16.7188 5.5625 16.9688 5.78125 16.9688 6.03125C16.9688 6.28125 16.75 6.5 16.4688 6.5Z" fill="white"></path></svg>
                        </div>
                      </div>
                    </div>
                  }
                </div>
                <div className='bg-card mt-2 w-[480px] max-w-[480px] p-[24px] rounded-[16px]'>
                  <ul className='flex justify-between w-full mb-[14px]'>
                    <li className='flex font-medium text-[16px] gap-[77px]  items-center justify-between'>
                      <div className='flex items-center text-[16px] text-white justify-center '>
                        <i className="fa-solid fa-music mr-[8px]"></i>
                        Nhạc
                      </div>
                      <label className={`switch__label rounded-full w-[38px] h-[20px] flex items-center whitespace-nowrap relative select-none default cursor-pointer ${!checked1 ? "bg-[#0c6]" : "bg-[#d5d5d5]"}`}>
                        <div className={`absolute w-[16px] h-[16px] top-[2px] ${!checked1 ? "left-[20px]" : "left-[2px]"}  rounded-full bg-white transition-allCheck`}></div>
                        <input type='checkbox' onChange={(e) => setChecked1(e.target.checked)} className='absolute mr-2 w-px h-px overflow-hidden cursor-pointer' />
                      </label>
                      <div></div>
                    </li>
                    <li className='flex font-medium text-[16px] gap-[77px] items-center justify-between'>
                      <div className='flex items-center text-[16px] text-white justify-center '>
                        <i className="fa-solid fa-music mr-[8px]"></i>
                        Meme
                      </div>
                      <label className={`switch__label rounded-full w-[38px] h-[20px] flex items-center whitespace-nowrap relative select-none default cursor-pointer ${!checked2 ? "bg-[#0c6]" : "bg-[#d5d5d5]"}`}>
                        <div className={`absolute w-[16px] h-[16px] top-[2px] ${!checked2 ? "left-[20px]" : "left-[2px]"}  rounded-full bg-white transition-allCheck`}></div>
                        <input type='checkbox' onChange={(e) => setChecked2(e.target.checked)} className='absolute mr-2 w-px h-px overflow-hidden cursor-pointer' />
                      </label>
                      <div></div>
                    </li>
                  </ul>
                  <div className='flex font-medium text-[16px] w-[49%] items-center justify-between'>
                    <div className='flex items-center w-[107px] text-[16px] text-white justify-center '>
                      <i className="fa-solid fa-music mr-[8px]"></i>
                      Hiệu ứng âm thanh
                    </div>
                    <label className={`switch__label rounded-full w-[38px] h-[20px] flex items-center whitespace-nowrap relative select-none default cursor-pointer ${!checked3 ? "bg-[#0c6]" : "bg-[#d5d5d5]"}`}>
                      <div className={`absolute w-[16px] h-[16px] top-[2px] ${!checked3 ? "left-[20px]" : "left-[2px]"}  rounded-full bg-white transition-allCheck`}></div>
                      <input type='checkbox' onChange={(e) => setChecked3(e.target.checked)} className='absolute mr-2 w-px h-px overflow-hidden cursor-pointer' />
                    </label>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {showModal && <div onClick={() => setShowModal(false)} className='bg-[#000000b3] z-[999] transition-all w-full h-full fixed overflow-auto top-0 left-0 right-0 bottom-0  flex items-center justify-center m-auto inset-0'>
        <div onClick={(e) => e.stopPropagation()} className='w-[30rem] mx-auto h-auto bg-white text-dark transition-all my-0 p-4 rounded-lg '>
          <div className=''>
            <p className='text-[24px] font-bold'>
              Oops! This name is already taken
            </p>
            <p className='text-[16px] whitespace-pre-line mt-[8px] font-medium'>
              Please pick another name, or log in to resume a previous attempt.
            </p>
            <div className='flex justify-end uppercase mt-6 py-0 px-4'>
              <button className='mr-[24px] text-[#292a3aa8] text-center rounded-[4px] py-[8px] px-[16px] text-[16px] font-bold uppercase'>
                Log in
              </button>
              <button onClick={() => setShowModal(false)} className='text-[#292a3a] bg-[#fceed4] text-center rounded-[4px] py-[8px] px-[16px] text-[16px] font-bold uppercase'>
                Change Name
              </button>
            </div>
          </div>
        </div>
      </div>}

    </div>
  )
}
