import React, { useEffect } from 'react'
import HeaderTeamMode from '../../../../src/components/TeamPlayRoomPage/HeaderTeamMode'
import ContentTeamMode from '../../../../src/components/TeamPlayRoomPage/ContentTeamMode'
import StartTeamMode from '../../../../src/components/TeamPlayRoomPage/StartTeamMode'
import { useRouter } from 'next/router'
import { useStore } from '../../../../store/useStore'
import { useQuery } from '@tanstack/react-query'

export default function index() {
    const socket = useStore(state => state.socket)
    const router = useRouter()
    // console.log(router.query.room)
    useEffect(() => {
        if (router.pathname === '/admin/quiz/team/[id]') {
            document.title = "Bảng điều khiển đội - Đang đợi"
        }
    }, [router])

    const checkPath = router.pathname.split('/').find(path => path === "team") // team

    if (checkPath) {
        socket?.emit('join_room', router.query.id, checkPath)
    }


    // store
    const fetchPlayerZoom = useStore(state => state.fetchPlayerZoom)
    const { data, refetch } = useQuery(['zoom'], fetchPlayerZoom)

    // check người chơi trong phòng
    const checkPlayerRoom = data?.data.filter(user => user.roomId === router.query.id && user.type === router.query.type)


    return (
        <div className='bg-team bg-cover font-quick w-full  bg-[rgb(6_12_24)]  '>
            <main className='w-full relative'>
                <div className='max-w-[1200px] m-auto w-full overflow-hidden'>
                    <div className='w-full max-w-[1080px] mx-auto'>
                        <HeaderTeamMode checkPlayerRoom={checkPlayerRoom} socket={socket} />
                        <ContentTeamMode checkPlayerRoom={checkPlayerRoom} socket={socket} />
                        <StartTeamMode checkPlayerRoom={checkPlayerRoom} socket={socket} refetch={refetch} />
                    </div>
                </div>
            </main>
        </div>
    )
}
