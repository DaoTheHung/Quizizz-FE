import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useStore } from '../../../store/useStore'
export default function StartZoom({ socket }) {
    const router = useRouter()
    const [userName, setUserName] = useState('')
    const id = router.query.room
    const type = router.query.type

    if (router) {
        socket.emit('join_room', router.query.room, router.query.type)
    }
    useEffect(() => {
        const local = localStorage.getItem('username')
        if (local !== null) {
            setUserName(local)
        }

    }, [])

    // store
    const fetchPlayerZoom = useStore(state => state.fetchPlayerZoom)
    const { data, refetch } = useQuery(['zoom'], fetchPlayerZoom)

    // Join phòng 
    const createPlayer = useMutation(async (data) => {
        const res = await axios.post('http://localhost:3080/api/zoom/create', data)
        return res.data
    });

    const removePlayer = useMutation(async (id) => {
        const res = await axios.delete(`http://localhost:3080/api/zoom/delete/${id}`)
        return res.data
    });

    // check người chơi trong phòng
    const checkPlayerRoom = data?.data.filter(user => user.roomId === router.query.room && user.type === router.query.type)


    // Xóa người chơi
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

    // Người chơi vào phòng
    useEffect(() => {
        socket.on('sendUserJoin', data => {
            const newPlayer = {
                roomId: data.roomId,
                username: data.username.userName,
                type: data.type,
            }
            if (data) {
                createPlayer.mutate(newPlayer, {
                    onSuccess: (response) => {
                        if (response) {

                        }
                    }
                })
            }

        })
        return () => socket.off('sendUserJoin')
    }, [socket])




    const handleStartGame = () => {

        socket.emit('start_game', { id, type })
        if (checkPlayerRoom.length > 0) {
            router.push(`/admin/quiz/startV4/${id}?type=${type}&fromBrowserLoad=true`)
        }
    }


    return (
        <div className='mt-[122px] min-h-[400px]  bg-[rgba(0,0,0,0.2)] py-[16px]'>
            <div className='rounded-tl-[8px] relative mt-[25px] rounded-tr-[8px] bg-joinB h-[calc(100vh-415px)]'>
                <div className='my-[16px] top-[-84px] bg-[#000] absolute mx-[24px]  z-20 text-[#fff] py-[12px] px-[16px] border border-[rgba(255,255,255,0.2)] rounded-[12px] 
            shadow-[0_4px_0_0_rgba(0,0,0,0.2)]'>
                    <i className="fa-solid fa-users mr-[16px] ml-[8px] text-white"></i>
                    <span>{checkPlayerRoom?.length}</span>
                </div>
                <button onClick={handleStartGame} className={`text-white ${checkPlayerRoom?.length > 0 ? "animate-best" : ""}  text-center z-10 mt-[24px] h-[62px] mx-auto text-[24px] font-bold leading-[32px] w-[240px]  rounded-[8px] bg-[#8854c0] flex justify-center items-center shadow-[0px_4px_0px_#6c4298] transition-all relative top-[-30px]`}>BẮT ĐẦU</button>

                <div className=' leading-[64px] text-white  text-[18px] mt-[40px]'>
                    <div className='flex gap-[15px] justify-center'>
                        {data?.data.length > 0 &&
                            checkPlayerRoom?.map((user) => (

                                <div key={user.id} className='w-[300px]  group h-[96px] rounded-[24px] p-[16px] flex justify-between items-center bg-[#000] m-[16px] scale-[0.0001] animate-player-card relative'>
                                    <span className='text-[16px] text-white py-[4px] px-[8px] rounded-[4px] w-[calc(100%-64px-32px)]'>{user.username}</span>
                                    <img className='w-[64px] h-[64px] rounded-full border-[3px] border-white' src='https://cf.quizizz.com/join/img/avatars/tablet_sm/monster34.png' />
                                    <div onClick={() => handleRemovePlayer(user.id, user.username)} className='absolute hidden group-hover:block top-0 right-0 bottom-0 left-0 bg-[#000] p-[8px]'>
                                        <div className='h-[75px] w-full mt-[3px] leading-[60px] bg-[#ec0b43] text-white font-semibold cursor-pointer p-[8px] rounded-[8px] text-center '>
                                            Nhấn vào đây để loại bỏ người tham gia
                                        </div>
                                    </div>
                                </div>

                            ))
                        }

                        {checkPlayerRoom?.length <= 0 && <div className='mx-auto'>
                            Chờ người tham gia tham gia
                            <span className='text-white text-[18px] delay-[0s] animate-waitEllipsis '>.</span>
                            <span className='text-white text-[18px] delay-[0.2s] animate-waitEllipsis '>.</span>
                            <span className='text-white text-[18px] delay-[0.3s] animate-waitEllipsis '>.</span>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
