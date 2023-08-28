import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { useStore } from '../../../store/useStore'
import React, { useEffect, useState } from 'react'


export default function index() {
    const router = useRouter()
    const socket = useStore(state => state.socket)
    if (router) {
        socket.emit('join_room', router.query.id, router.query.type)
    }
    const [show, setShow] = useState(false)
    const [name, setName] = useState('')
    const [listUser, setListUser] = useState([])

    // 
    const fetchPlayerZoom = useStore(state => state.fetchPlayerZoom)
    const { data, refetch } = useQuery(['room'], fetchPlayerZoom)
    //
    const [showIcon, setShowIcon] = useState(false)


    // kiểm tra phòng và người tham gia
    const checkRoom = data?.data.filter(room => room.roomId === router.query.id && room.type === router.query.type)
    const checkMe = checkRoom?.filter(item => item.username === name)
    const checkOthers = checkRoom?.filter(item => item.username !== name)

    useEffect(() => {
        if (router.pathname === "/join/game/[id]") {
            document.title = "Playing a Game - Quizizz"
        }
    }, [router])

    // Kick người chơi ra khỏi phòng
    useEffect(() => {

        const local = localStorage.getItem('username')
        const local1 = localStorage.getItem('key')
        if (local) {
            setName(local)
        }
        if (local1) {
            setShow(local1)
        }
        socket.on('outRoom', data => {
            localStorage.setItem('key', true)
            if (data === local) {
                setShow(true)
            }
        })
        socket.on('sendUpdateUser', data => {
            setListUser(data)
        })

    }, [socket])


    // Bắt đàu trò chơi

    useEffect(() => {
        socket.on('sendUserName', data => {
            console.log(data)
        })
        socket.on('sendStartGame', data => {
            if (data) {
                router.push(`/playgame/${data.id}?type=${data.type}`)
            }
        })

    }, [socket])



    return (
        <div className='font-quick w-full h-[931px] relative  bg-[#461a42] bg-cover'>

            {show && <div className='bg-[#000000d9] fixed top-0 bottom-0 right-0 left-0  z-[9999]'>
                <div className='w-full h-full'>
                    <div className='mt-[101px] h-[200px] flex w-full justify-center'>
                        <img className='w-[200px]' src='https://cf.quizizz.com/game/img/ui/invalid_game.png' />
                    </div>
                    <div className='mt-[32px] text-white text-center w-[92%] max-w-[520px] mx-auto text-[18px]'>
                        Bạn đã bị đuổi khỏi trò chơi
                    </div>
                    <div onClick={() => (router.push('/'), localStorage.removeItem('key'), localStorage.removeItem('username'))} className='text-[#519900] text-center mt-[32px] text-[24px] font-bold cursor-pointer'>
                        Về Trang chủ
                    </div>
                </div>
            </div>}

            <div className='py-[12px] px-[8px] z-[101] text-white bg-[#000] text-[16px] transition-transform duration-500 ease-in-out fixed top-0 left-0 right-0'>
                <div className='flex justify-between relative'>

                    <div className='flex items-center flex-1 gap-2'>
                        <button className='text-white hover:bg-[#ffffff54] bg-[#fff3] rounded-[8px] transition-colors duration-200 ease-out'>
                            <div className='w-[40px] h-[40px] flex justify-center items-center text-[16px] relative'>
                                <i className="fa-solid fa-gear"></i>
                            </div>
                        </button>
                        <button className='text-white hover:bg-[#ffffff54] bg-[#fff3] rounded-[8px] transition-colors duration-200 ease-out'>
                            <div className='w-[40px] h-[40px] flex justify-center items-center text-[16px] relative'>
                                <i className="fa-solid fa-volume-xmark"></i>
                            </div>
                        </button>
                        <div className='w-[1px] h-[36px] bg-[#fff3]'></div>
                        <div className='py-[8px] px-[16px] text-[18px] rounded-[8px] font-medium bg-[#fff3] ml-[8px] flex items-center'>
                            <i className="fa-solid fa-users"></i>
                            <span className='ml-4'>{checkRoom?.length}</span>
                        </div>
                    </div>

                    <div className='text-[16px] flex font-medium '>
                        <div className='rounded-[8px] h-[40px] flex justify-center overflow-hidden w-[104px] py-[10px] bg-[#ffffff1a]'>
                            <div className='relative'>
                                <span className='blur-[8px] bg-[#7d72ec54] rounded-[12px] w-[16px] h-[16px] absolute'></span>
                                <i className="fa-solid fa-medal text-[#7d72ec]"></i>
                            </div>
                            <div className='ml-[8px] relative overflow-hidden'>
                                —
                            </div>
                        </div>
                        <div>
                            <button className='text-white rounded-[8px] ml-[8px] py-[8px] px-[16px] text-[18px] font-medium bg-[#fff3]'>
                                <i className="fa-solid fa-palette mr-[8px]"></i>
                                Chọn chủ đề của bạn
                            </button>
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
            <div className='h-[calc(100%-64px)] mt-[64px] w-full absolute overflow-y-auto'>
                <div className='relative'>
                    <div>
                        <div className='border-b border-[#ffffff1a] relative'>
                            <div className='py-[20px] px-[8px] w-full max-w-[620px] mx-auto relative flex flex-col'>
                                <div className='flex mb-[16px]'>

                                    <div className='rounded-[8px] flex-1 items-center flex bg-[#000000a6] relative p-[24px] text-white '>
                                        <div className='mr-[12px]'>
                                            <img src='https://cf.quizizz.com/join/img/avatars/tablet_sm/monster2.png?w=90&h=90' className='w-[44px] h-[44px]' />
                                        </div>
                                        <div className='flex flex-col overflow-hidden justify-center'>
                                            {checkMe?.map((user) => (

                                                <h4 key={user.id} className='text-[24px] font-bold'>{user.username}</h4>
                                            ))}
                                            <div className='bg-[#fff3] w-fit rounded-[2px] mt-[4px] px-[4px] text-[10px]'>
                                                Bạn
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bg-[#000000a6] p-[24px] justify-center text-white cursor-pointer rounded-[8px] flex flex-col  items-center w-fit ml-[12px] text-[24px]'>
                                        <div className='text-[#ffffffa8] text-[14px] font-semibold'>Tham gia mã</div>
                                        <div className='text-[#fff] text-[24px] font-bold'>818 071</div>
                                    </div>
                                </div>

                                {router.query.type === "basic" &&
                                    <div className='bg-[#000000a6] p-[24px] text-white rounded-[8px]'>
                                        <div className='flex items-center justify-between text-[14px] font-bold'>
                                            <span className='text-[14px]'>Các chế độ trợ giúp và điểm thưởng ngẫu nhiên của bạn</span>
                                            <div className='text-[#ffffffa8] text-[12px]'>
                                                <div className='inline-block relative cursor-pointer'>
                                                    <i className="fa-solid fa-circle-info mr-1"></i>
                                                </div>
                                                3 xáo trộn còn lại
                                            </div>
                                        </div>
                                        <div className='flex gap-[8px] mt-[12px]'>
                                            <div className='bg-[rgb(90_12_12)] w-[146px] h-[92px] p-[8px] shadow-[inset_0_0_0_2px_#fff3] text-white rounded-[8px]'>
                                                <div className='flex items-center w-full'>
                                                    <img src='https://cf.quizizz.com/game/img/powerups/lg/eraser.png' className='w-[28px h-[18px] rounded-full mr-[4px]' />
                                                    <h6 className='text-[18px] font-bold'>Tẩy</h6>
                                                </div>
                                                <div className='pl-[4px]'>
                                                    <p className='text-[12px] text-[#fffc]'>Xóa một lựa chọn sai.</p>
                                                </div>
                                            </div>
                                            <div className='bg-[rgb(90_12_12)] w-[146px] h-[92px] p-[8px] shadow-[inset_0_0_0_2px_#fff3] text-white rounded-[8px]'>
                                                <div className='flex items-center w-full'>
                                                    <img src='https://cf.quizizz.com/game/img/powerups/lg/eraser.png' className='w-[28px h-[18px] rounded-full mr-[4px]' />
                                                    <h6 className='text-[18px] font-bold'>Tẩy</h6>
                                                </div>
                                                <div className='pl-[4px]'>
                                                    <p className='text-[12px] text-[#fffc]'>Xóa một lựa chọn sai.</p>
                                                </div>
                                            </div>
                                            <div className='bg-[rgb(90_12_12)] w-[146px] h-[92px] p-[8px] shadow-[inset_0_0_0_2px_#fff3] text-white rounded-[8px]'>
                                                <div className='flex items-center w-full'>
                                                    <img src='https://cf.quizizz.com/game/img/powerups/lg/eraser.png' className='w-[28px h-[18px] rounded-full mr-[4px]' />
                                                    <h6 className='text-[18px] font-bold'>Tẩy</h6>
                                                </div>
                                                <div className='pl-[4px]'>
                                                    <p className='text-[12px] text-[#fffc]'>Xóa một lựa chọn sai.</p>
                                                </div>
                                            </div>
                                            <div className='bg-[rgb(90_12_12)] w-[146px] h-[92px] p-[8px] shadow-[inset_0_0_0_2px_#fff3] text-white rounded-[8px]'>
                                                <div className='flex items-center w-full'>
                                                    <img src='https://cf.quizizz.com/game/img/powerups/lg/eraser.png' className='w-[28px h-[18px] rounded-full mr-[4px]' />
                                                    <h6 className='text-[18px] font-bold'>Tẩy</h6>
                                                </div>
                                                <div className='pl-[4px]'>
                                                    <p className='text-[12px] text-[#fffc]'>Xóa một lựa chọn sai.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }


                            </div>

                            <div className='mb-[16px] flex justify-center'>
                                <div className='flex-grow flex justify-between max-w-[608px] h-[32px] px-[8px]'>
                                    <div className='text-[16px] text-white w-[225px] h-[24px] font-bold leading-[24px]'>
                                        Chờ máy chủ khởi động...
                                    </div>
                                </div>
                            </div>

                        </div>

                        {checkOthers?.length <= 0 && <div className='p-[24px] mt-[43px]'>
                            <div className='p-[48px] text-[20px] text-center text-white m-auto'>
                                Bạn là người đầu tiên tham gia!
                            </div>
                        </div>}

                        {checkOthers?.length > 0 && <div className='pt-[24px]'>
                            <div className='flex gap-[24px] p-[24px] w-full max-w-[1596px] m-auto'>
                                <div className='w-full'>
                                    {checkOthers?.map((user) => (

                                        <div key={user.id} className='bg-[#00000080] border border-[#ffffff1a] rounded-[12px] w-[258px] p-[12px] overflow-hidden'>
                                            <div className='flex items-center w-[full] h-full'>
                                                <div className='w-[54px] h-[54px] rounded-full mr-[6px] overflow-hidden'>
                                                    <img src='https://cf.quizizz.com/join/img/avatars/tablet_sm/monster29.png?w=90&h=90' />
                                                </div>
                                                <div className='text-[14px] text-[#fff] rounded-[4px] px-[8px] pt-[3px] pb-[4px] font-bold relative'>
                                                    {user.username}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>}
                    </div>
                    <div className='fixed top-[50%] right-[18px] translate-y-[-50%] h-[440px] flex'>
                        <div className='z-10 bg-[linear-gradient(#090909_0%_100%)] border-[2px] border-[#fff3] rounded-[16px] flex-col flex justify-center items-center gap-[12px] w-[72px] py-[16px] px-[12px] overflow-hidden'>
                            <div onMouseOut={() => setShowIcon(false)} onMouseOver={() => setShowIcon(true)} className='cursor-pointer justify-center items-center flex w-[48px] h-[48px]'>
                                <img className='opacity-100' src='https://cf.quizizz.com/game/img/liveReactions/NewWaitingScreen-1.png' />
                            </div>
                            <div className='cursor-pointer justify-center items-center flex w-[48px] h-[48px]'>
                                <img className='opacity-100' src='https://cf.quizizz.com/game/img/liveReactions/NewWaitingScreen-1.png' />
                            </div>
                            <div className='cursor-pointer justify-center items-center flex w-[48px] h-[48px]'>
                                <img className='opacity-100' src='https://cf.quizizz.com/game/img/liveReactions/NewWaitingScreen-1.png' />
                            </div>
                            <div className='cursor-pointer justify-center items-center flex w-[48px] h-[48px]'>
                                <img className='opacity-100' src='https://cf.quizizz.com/game/img/liveReactions/NewWaitingScreen-1.png' />
                            </div>
                            <div className='cursor-pointer justify-center items-center flex w-[48px] h-[48px]'>
                                <img className='opacity-100' src='https://cf.quizizz.com/game/img/liveReactions/NewWaitingScreen-1.png' />
                            </div>
                            <div className='cursor-pointer justify-center items-center flex w-[48px] h-[48px]'>
                                <img className='opacity-100' src='https://cf.quizizz.com/game/img/liveReactions/NewWaitingScreen-1.png' />
                            </div>
                            <div className='cursor-pointer justify-center items-center flex w-[48px] h-[48px]'>
                                <img className='opacity-100' src='https://cf.quizizz.com/game/img/liveReactions/NewWaitingScreen-1.png' />
                            </div>
                        </div>
                        <div className={`flex ${showIcon ? "right-[77px] animate-icon" : "right-[0px]"} transition-all ease-in-out h-full w-[72px] flex-col items-center justify-between gap-[12px] py-[16px] px-[12px] absolute `}>
                            <img src='https://cf.quizizz.com/game/img/liveReactions/NewWaitingScreen-1.png' />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
