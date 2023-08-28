import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useStore } from '../../../store/useStore'
import HeaderPresentation from '../../../src/components/PresentationPage/HeaderPresentation'
import ContentPresentation from '../../../src/components/PresentationPage/ContentPresentation'
import TeacherMode from '../../../src/components/FollowPlayers/TeacherMode'

export default function index() {
    const router = useRouter()

    useEffect(() => {
        if (router.pathname === `/admin/presentation/[id]`) {
            document.title = `Quizizz Lesson`
        }
    }, [router])
    const socket = useStore(state => state.socket)

    if (router) {
        socket.emit('join_room', router.query.id, router.query.type)
    }
    return (
        <div className='font-quick flex flex-col-reverse fixed left-0 top-0 right-0 bottom-0 h-full w-full bg-black'>
            {router.query.fromBrowserLoad === "true" && router.query.type === "teacher"
                ?
                <TeacherMode  />
                :
                <>
                    <HeaderPresentation />
                    <ContentPresentation />
                </>
            }
        </div>
    )
}
