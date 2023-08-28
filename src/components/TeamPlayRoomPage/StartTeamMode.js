import React, { useEffect } from 'react'
import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query';
import { useStore } from '../../../store/useStore'
import { useRouter } from 'next/router';
export default function StartTeamMode({ socket, checkPlayerRoom, refetch }) {



    // Join phòng 
    const createPlayer = useMutation(async (data) => {
        const res = await axios.post('http://localhost:3080/api/zoom/create', data)
        return res.data
    });

    const removePlayer = useMutation(async (id) => {
        const res = await axios.delete(`http://localhost:3080/api/zoom/delete/${id}`)
        return res.data
    });


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

                            refetch()
                        }
                    }
                })
            }

        })
        return () => socket.off('sendUserJoin')
    }, [socket])


    // kick player
    const handleKickPlayer = (id) => {
        removePlayer.mutate(id, {
            onSuccess: (response) => {
                if (response) {
                    console.log(response)
                    refetch()
                    localStorage.removeItem('username')
                }
            }
        })
    }

    // Kéo thả



    return (
        <div style={checkPlayerRoom?.length > 0 ? { transform: "translateY(-70%)" } : {}} className='bg-[rgba(46_238_249/0.1)] mt-[80px] py-[24px] px-[40px] flex flex-col rounded-[16px] transition-transform duration-300 ease-in-out relative w-full min-h-[calc(100vh-350px)] h-auto'>
            <div className='mb-[24px] flex justify-between items-center w-full'>
                <div className='flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-[8px] py-[7px] px-[10px]'>
                    <div className='bg-[#ec0b43] w-[12px] h-[12px] rounded-full mr-[10px]'>

                    </div>
                    <span className='text-[14px] font-medium text-[#ffffff]'>{checkPlayerRoom?.length}  Người tham gia</span>
                </div>
                <button style={checkPlayerRoom?.length > 0 ? { transform: "translateY(9%)" } : {}} className='transition-all left-[2%] duration-200 translate-y-[-95%] relative rounded-[32px] py-[12px] text-[24px] px-[50px] text-white font-bold bg-[#efa929] hover:bg-[#efaa29e9] z-[3]'>
                    BẮT ĐẦU
                </button>
                <div className='opacity-[0.2] rounded-[8px bg-[rgba(0,0,0,0.5)] text-[#2eeef9] text-[14px] font-bold py-[7px] px-[10px] relative min-w-[137px]'>
                    <i className='fas fa-random shuffle-icon mr-[8px] relative z-[3]'></i>
                    <span> Phân đội ngẫu nhiên </span>
                </div>
            </div>
            <div className='text-[#ffffff] text-center font-medium '>
                {checkPlayerRoom?.length <= 0 && <span className='text-[32px]'>Chờ ít nhất một người tham gia trò chơi ...</span>}
                {checkPlayerRoom?.length > 0 && <span className='text-[16px]'>Người tham gia không thể vào sau khi trò chơi bắt đầu ...</span>}

            </div>

            {checkPlayerRoom?.length > 0 && <div className='flex justify-center'>
                <div className='flex  mt-[20px] flex-wrap w-full mb-[-40px] gap-[44px]'>

                    <div className='mb-[40px] min-h-[313px] p-[24px] rounded-[16px] bg-team-color relative flex flex-col'>

                        <div className='flex items-center justify-between mb-[17px]'>
                            <div className='flex flex-col'>
                                <span className='max-w-[108px] text-[20px] font-bold text-[#ffffff] mb-[4px]'>Brutish Bunnies</span>
                                <span className='text-[12px] font-normal text-[rgba(255,255,255,0.66)]'>0 người chơi </span>
                            </div>
                            <div className=''>
                                <img className='h-[68px] w-auto' src='https://cf.quizizz.com/game/img/teams/emblems/lg/11.png' />

                            </div>

                        </div>

                        <div className='flex relative w-full h-full'>

                            {checkPlayerRoom?.length <= 0 && <div className='absolute top-0 left-0 right-0 bottom-0 h-full w-full border border-dashed border-[rgba(46,238,249,0.33)] rounded-[8px] flex items-center justify-center '>
                                <span className='text-center text-[rgba(255,255,255,0.34)] text-[12px] max-w-[76px] font-medium'>Chờ người tham gia ... </span>
                            </div>}

                            {checkPlayerRoom?.length > 0 &&
                                checkPlayerRoom?.map((user, index) => (

                                    <div key={user.id} className='flex flex-col w-full min-h-[40px] m-[-12px] p-[12px]'>
                                        <div className='flex group hover:cursor-grab select-none'>
                                            <div className='w-[27px] h-[20px] rounded-full mr-[12px] flex justify-center items-center bg-[rgba(255,255,255,0.05)]'>
                                                <img src='https://cf.quizizz.com/join/img/avatars/tablet_sm/monster17.png' className='w-full group-hover:hidden  h-[20px]' />
                                                <div onClick={() => handleKickPlayer(user.id)} className='text-[14px] cursor-pointer group-hover:block text-[#ec0b43] hidden relative'>X</div>
                                            </div>
                                            <div className='w-full h-full text-[14px] font-medium text-white leading-[1.43] overflow-x-hidden text-ellipsis'>{user.username}</div>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>

                    <div className='mb-[40px] min-h-[313px] p-[24px] rounded-[16px] bg-team-color relative flex flex-col'>
                        <div className='flex items-center justify-between mb-[17px]'>
                            <div className='flex flex-col'>
                                <span className='max-w-[108px] text-[20px] font-bold text-[#ffffff] mb-[4px]'>Brutish Bunnies</span>
                                <span className='text-[12px] font-normal text-[rgba(255,255,255,0.66)]'>0 người chơi </span>
                            </div>
                            <div className=''>
                                <img className='h-[68px] w-auto ' src='https://cf.quizizz.com/game/img/teams/emblems/lg/11.png' />
                            </div>
                        </div>
                        <div className='flex relative w-full h-full'>
                            <div
                                className='absolute top-0 left-0 right-0 bottom-0 h-full w-full border border-dashed border-[rgba(46,238,249,0.33)] rounded-[8px] flex items-center justify-center '>
                                <span className='text-center text-[rgba(255,255,255,0.34)] text-[12px] max-w-[76px] font-medium'>Chờ người tham gia ... </span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>}

        </div>
    )
}
