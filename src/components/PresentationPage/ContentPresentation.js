
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useStore } from '../../../store/useStore'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'

export default function ContentPresentation() {
    const socket = useStore(state => state.socket)
    const router = useRouter()
    const id = router.query.id
    const type = router.query.type
    if (router) {
        socket.emit('join_room', router.query.id, router.query.type)
    }
    // store

    const fetchDataQuiz = useStore(state => state.fetchDataQuiz)
    const { data } = useQuery(['quizizz'], fetchDataQuiz)
    const quizDetail = data?.data.find(item => item.id == id)

    const fetchPlayerZoom = useStore(state => state.fetchPlayerZoom)
    const dataPlayer = useStore(state => state.dataPlayer)
    const { refetch } = useQuery(['room'], fetchPlayerZoom)


    // Join phòng 
    const createPlayer = useMutation(async (data) => {
        const res = await axios.post('http://localhost:3080/api/zoom/create', data)
        return res.data
    });

    const removePlayer = useMutation(async (id) => {
        const res = await axios.delete(`http://localhost:3080/api/zoom/delete/${id}`)
        return res.data
    });


    // check player in room
    const checkPlayerRoom = dataPlayer?.filter(user => user.roomId === id && user.type === router.query.type)
    // console.log(checkPlayerRoom)



    // Xóa người chơi
    const handleRemovePlayer = (id, username) => {
        removePlayer.mutate(id, {
            onSuccess: (response) => {
                if (response) {
                    socket.emit("kick", username, router.query.id, router.query.type)
                    refetch()
                    localStorage.removeItem('username')
                }
            }
        })
    }

    // Người chơi vào phòng
    useEffect(() => {
        socket.on('sendUserJoin', async data => {
            const newPlayer = {
                roomId: data.roomId,
                username: data.username.userName,
                type: data.type
            }
            if (data) {
                await createPlayer.mutate(newPlayer, {
                    onSuccess: (response) => {
                        if (response) {

                        }
                    }
                })
            }

        })
        return () => socket.off('sendUserJoin')
    }, [socket])

    // bắt đầu trò chơi
    const handleStartGame = () => {
        socket.emit('start_game', { id, type })
        if (checkPlayerRoom?.length > 0) {
            router.push(`/admin/presentation/${id}?type=${type}&fromBrowserLoad=true`)
        }
    }
    return (
        <div>
            <div className='absolute top-0 left-0 right-0 bottom-0 bg-center bg-cover z-[9998] overflow-hidden'>
                <div className='bg-[#222] absolute top-0 left-0 right-0 bottom-0 backdrop-blur-[40px] flex overflow-hidden'>
                    <section className='relative w-[calc(100%-512px)] h-[calc(100%-72px)]'>
                        <div className='absolute top-0 left-0 bottom-0 right-0 w-[60vw] h-[calc((60vw-112px)*0.5625)] m-auto px-[56px] pb-[56px]'>
                            <div className='bg-[#090909]  rounded-[18px] w-[calc(60vw-112px)] h-[calc((60vw-112px)*0.5625)] relative  text-[#fff] text-[44px] font-bold flex items-center justify-center'>
                                {quizDetail?.nameQuiz}
                            </div>
                        </div>
                    </section>
                    <section className='fixed right-0 rounded-[16px] p-[12px] w-[512px] bg-[#090909] flex items-center pt-[24px] h-full text-center flex-col overflow-y-auto overflow-x-hidden'>
                        <div className='flex flex-col items-center z-10'>
                            <div className='text-[16px] leading-[24px] font-bold text-white'>
                                Để bắt đầu trò chơi này
                            </div>
                            <div className='text-[16px] leading-[24px] mt-[24px] font-bold text-white'>
                                1. Sử dụng bất kỳ thiết nào để mở
                            </div>
                            <div className='bg-white text-[#090909] p-[8px] w-[320px] rounded-[8px] mt-[8px] flex gap-[8px] justify-center items-center'>
                                <a href={`/join/pre-game/running/${id}?type=${router.query.type}`} className='text-[24px] leading-[48px] font-bold w-[80%] text-[#090909] flex justify-center hover:underline' target='_blank' >
                                    <span className='inline-flex mr-[4px] text-[24px] font-bold text-[#090909] leading-[48px]'> join </span>
                                    <span className='inline-flex mr-[4px] text-[24px] font-bold text-[#090909] leading-[48px]'>  my  </span>
                                    <span className='inline-flex text-[24px] font-bold text-[#090909] leading-[48px]'>   quiz.com   </span>
                                </a>
                                <div className='text-[#090909] cursor-pointer bg-[rgba(9,9,9,0.1)] w-[50px]  h-[100%] flex justify-center items-center rounded-[4px]'>
                                    <i className="fa-regular fa-paste"></i>
                                </div>
                            </div>
                            <div className='text-[16px] leading-[24px] mt-[24px] font-bold text-white'>
                                2. Nhập mã trò chơi
                            </div>
                            <div className='bg-white text-[#090909] p-[8px] w-[320px] rounded-[8px] mt-[8px] flex gap-[8px] justify-center items-center'>
                                <div className='text-[32px] w-[80%] leading-[52px] font-bold tracking-[4px] cursor-pointer'>
                                    472 092
                                </div>
                                <div className='text-[#090909] cursor-pointer bg-[rgba(9,9,9,0.1)] w-[50px]  h-[100%] flex justify-center items-center rounded-[4px]'>
                                    <i className="fa-regular fa-paste"></i>
                                </div>
                            </div>
                            <div className='bg-[rgba(255,255,255,0.2)] text-white rounded-[4px] mt-[24px] py-[4px] px-[20px] cursor-pointer'>
                                hoặc chia sẻ thông qua ...
                            </div>
                            <div onClick={handleStartGame} className='text-white w-full mt-[24px]'>
                                <div className='hover:translate-y-[4px] hover:shadow-[0px_0px_0px_#6c4298] text-[24px] font-bold leading-[32px] w-[240px] h-[60px] rounded-[8px] bg-[#8854C0] inline-flex justify-center items-center cursor-pointer shadow-[0px_4px_0px_#6c4298] transition-all duration-100 ease-in-out'>
                                    BẮT ĐẦU
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex flex-col bg-teacherMode rounded-t-[16px] mt-[-24px] flex-grow'>
                            <div className='bg-[rgba(0,0,0,0.2)] h-full relative'>
                                <div className='flex mt-[-30px]'>
                                    <div className='flex items-center text-white bg-[#090909] py-[12px] px-[16px] rounded-[8px] border border-[rgba(255,255,255,0.2)] ml-[32px] text-[16px]'>
                                        <i className="text-[16px] mr-[8px] w-[32px] h-[32px] inline-flex justify-center items-center fa-solid fa-users"></i>
                                        <div className='text-[18px] inline-block font-bold'>
                                            {checkPlayerRoom?.length}
                                        </div>
                                    </div>
                                </div>
                                <div className='absolute w-full h-fit p-[32px]'>
                                    {checkPlayerRoom?.length <= 0 ?
                                        <section className='absolute w-[calc(100%-64px)] text-center text-[18px] leading-[22px] font-bold text-[rgba(255,255,255,0.66)] flex items-center h-full p-[32px]'>
                                            Không có người tham gia đã tham gia. Yêu cầu họ tham gia bằng cách sử dụng các hướng dẫn ở trên.
                                        </section>
                                        :
                                        checkPlayerRoom.map((item) => (

                                            <section key={item.id} className='translate-x-0 hover:bg-[rgba(255,255,255,0.05)] group opacity-[1] flex items-center p-[16px] rounded-[8px] transition-transform duration-200 ease-in cursor-pointer'>
                                                <img className='w-[48px] mr-[16px]' src='https://cf.quizizz.com/join/img/avatars/tablet_sm/monster28.png' />
                                                <div className='text-[18px] font-medium text-white'>
                                                    {item.username}
                                                </div>
                                                <div className='text-white hidden hover:scale-[1.2] hover:bg-[rgba(255,255,255,0.1)] group-hover:inline-flex  right-[58px] w-[32px] h-[32px] justify-center items-center z-10 transition-all duration-200 ease-in-out cursor-pointer rounded-[50%] absolute'>
                                                    <i className='far fa-eye-slash'></i>

                                                </div>
                                                <div onClick={() => handleRemovePlayer(item.id, item.username)} className='text-white hidden hover:scale-[1.2] hover:bg-[rgba(255,255,255,0.1)] group-hover:inline-flex  right-[16px] w-[32px] h-[32px] justify-center items-center z-10 transition-all duration-200 ease-in-out cursor-pointer rounded-[50%] absolute'>
                                                    x
                                                </div>
                                            </section>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
