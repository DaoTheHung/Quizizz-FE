import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import TitleSearch from '../../src/components/AdminPage/TitleSearch'
// import Navbar from '../../src/components/Navbar'
export default function index() {
    const { data: session } = useSession()
    const router = useRouter()
    useEffect(() => {
        if (router.pathname === "/admin") document.title = "Tìm kiếm từ hàng triệu câu đố - Quizizz"
    }, [])

    if (session) {

        return (
            <div className='w-full absolute h-auto bg-bd '>
                <TitleSearch />

            </div>
        )
    }

}
