import React, { useEffect } from 'react'
import HeaderRoom from '../../../../src/components/StartV4Page/HeaderRoom'
import JoinRoom from '../../../../src/components/StartV4Page/JoinRoom'
import { useRouter } from 'next/router'
import StartRoom from '../../../../src/components/StartV4Page/StartRoom'
import { useStore } from '../../../../store/useStore'
import FollowPlayers from '../../../../src/components/FollowPlayers/FollowPlayers'

export default function index() {
    const router = useRouter()
    // console.log(router.query.room)
    useEffect(() => {
        if (router.pathname === '/admin/quiz/startV4/[room]') {
            document.title = "Bảng xếp hạng trực tiếp - Đang đợi"
        }
    }, [router])
    //
    const socket = useStore(state => state.socket)

    useEffect(() => {
        socket.on('connection', data => {

        })
    }, [socket])

    return (
        <div className='max-w-[9999px] overflow-hidden'>
            <div className='font-quick pt-[80px] min-h-[100vh] box-border'>
                <div className='bg-[url("https://cf.quizizz.com/themes/default/default_theme-night.jpg")] overflow-y-auto fixed left-0 top-0 right-0 bottom-0 bg-cover m-auto'>
                    {router.query.fromBrowserLoad === "true" ? <FollowPlayers />
                        :
                        <>
                            <HeaderRoom />
                            <JoinRoom socket={socket} />
                            <StartRoom socket={socket} />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
