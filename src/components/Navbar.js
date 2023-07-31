import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import Link from 'next/link'
import ModalCreate from './common/Navbar/ModalCreate'
export default function Navbar({ showModal, setShowModal }) {
    const { data: session } = useSession()
    const router = useRouter()

    const [type, setType] = useState('Khám phá')
    const [seeMore, setSeeMore] = useState(false)
    const [count, setCout] = useState(5)


    const dataItemNavbar = [
        {
            id: 1,
            link: "/admin",
            text: "Khám phá",
            icon: "fa-solid  fa-map-location-dot",
        },
        {
            id: 2,
            link: "/admin/private",
            text: "Thư viện của tôi",
            icon: "fa-solid fa-swatchbook",
        },
        {
            id: 3,
            link: "/admin/reports",
            text: "Báo cáo",
            icon: "fa-solid fa-chart-bar",
        },
        {
            id: 4,
            link: "/admin/classes",
            text: "Các lớp học",
            icon: "fa-solid fa-users",
        },
        {
            id: 5,
            link: "/settings",
            text: "Cài đặt",
            icon: "fa-solid fa-gear",
        },
        {
            id: 6,
            link: "/memes",
            text: "Meme",
            icon: "fa-regular fa-images",
        },
        {
            id: 7,
            link: "/memes",
            text: "Bộ sưu tập",
            icon: "fa-regular fa-folder",
        },
        {
            id: 8,
            link: "/admin/profile",
            text: "Hồ sơ",
            icon: "fa-regular fa-circle-user",
        },
        {
            id: 9,
            link: "/login",
            text: "Đăng xuất",
            icon: "fa-solid fa-arrow-right-from-bracket",
        },


    ]

    useEffect(() => {
        if (seeMore) {
            setCout(9)
        } else {
            setCout(5)
        }

        //
        setType(router.pathname)
    }, [seeMore])

    // Đăng xuất
    const handleLogout = (link, text) => {
        if (text === "Đăng xuất") signOut()
        setType(link)

    }

    // Xem thêm
    const handleSeeMore = () => {
        setSeeMore(!seeMore)
    }

    // Hiện modal tạo mới
    const handleShowModal = () => {
        setShowModal(true)
    }
    return (
        <div className='flex  h-[100dvh] '>
            <div className='shadow-navbar bg-[#fff] fixed scale-[1] z-[999] w-[192px] flex flex-col  h-full border-r-1 '>
                <div className='h-[2.5rem] m-[0.5rem]'>
                    <img className='h-full' src='https://cf.quizizz.com/img/quizizz_logos/purple-brandmark-600x164.png' />
                </div>
                <div className='relative min-w-40 p-[1rem] '>
                    <div className=' mb-[0.75rem] flex items-center'>
                        <div>
                            <Link href='/admin/profile'>
                                <div className='capitalize mb-[0.75rem] text-dark-6 font-semibold text-[0.875rem] leading-[1.5rem] tracking-[-.01em] cursor-pointer w-full'>
                                    {session?.user.name}
                                </div>
                            </Link>
                            <div className=' font-semibold flex items-center text-acc rounded-[0.25rem] text-[0.625rem] leading-[1rem] tracking-[+.015em] w-fit bg-[#0909090d] px-1'>
                                <div>
                                    Tài khoản cơ bản
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className='bg-[#ffa40233] py-[0.45rem] hover:text-yellow-2 duration-200 leading-[1rem] tracking-0 font-semibold text-[0.75rem]  px-4 rounded-[1rem] text-yellow-1 flex items-center justify-center mb-[1rem] relative min-w-full '>
                        <div className=''>
                            Nâng cấp gói của bạn
                        </div>
                    </button>
                </div>

                <div className='pl-[1rem] bock mb-[1rem] relative '>
                    <button onClick={handleShowModal} className='shadow-btnCreate  gap-[10px] transition-colors duration-200 text-[#fff] text-[1.125rem] leading-[1.5rem] tracking-[-.015em] font-semibold py-[0.625rem] px-[1.875rem] hover:bg-light bg-purple-3 rounded-[0.5rem] justify-center items-center flex min-w-max h-[2.5rem] mb-[0.25rem] relative'>
                        <i className="fa-regular fa-circle relative flex justify-center items-center">
                            <i className="fa-solid fa-plus text-[10px] absolute left-0 top-[4px] right-[-1px] bottom-0"></i>
                        </i>
                        <div>Tạo mới</div>
                    </button>
                </div>
                {/*Modal create */}
                {/* <ModalCreate /> */}
                {/*<---->*/}
                <div className='overflow-y-auto flex flex-col'>
                    {dataItemNavbar.slice(0, count).map(item => (
                        <Link href={item.link} key={item.id}>
                            <div onClick={() => handleLogout(item.link, item.text)} className={` pl-[1rem] py-2  whitespace-nowrap items-center cursor-pointer w-full flex ${type === item.link ? "text-purple-3 bg-bd font-semibold" : "text-dark-4"}`}>
                                <div className='w-full items-center flex'>
                                    <div className='flex items-center w-6 justify-center'>
                                        <i className={` ${item.icon}  ${type === item.link ? "text-purple-3 bg-bd font-semibold" : "text-[#09090933]"}`}></i>
                                    </div>
                                    <div className='text-sm pl-1 whitespace-nowrap'>{item.text}</div>
                                </div>
                            </div>
                        </Link>

                    ))}
                    <div onClick={handleSeeMore} className='pl-[1rem] py-2  whitespace-nowrap items-center cursor-pointer w-full flex'>
                        <div className='w-full items-center flex text-dark-4 '>
                            <div className='flex items-center w-6 justify-center'>
                                {seeMore ? <i className="fa-solid fa-angle-up "></i> : <i className="fa-solid fa-angle-down"></i>}
                            </div>
                            <div className='text-sm pl-1 whitespace-nowrap mt-[-3px]'>{seeMore ? "Ít hơn" : "Hơn"}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
