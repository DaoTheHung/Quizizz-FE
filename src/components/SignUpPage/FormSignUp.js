import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import { deleteCookie, setCookie } from 'cookies-next';
import { useStore } from '../../../store/useStore';
import Link from 'next/link';


export default function FormSignUp() {
    const router = useRouter()
    useEffect(() => {
        if (router.pathname === "/signup") {
            document.title = "Sign up for Free Quizzes, Worksheets. For Teachers and Students"
        }
    },[])
    const handleLogin = () => {
        signIn('google')
    }
    return (
        <div className='h-auto rounded-tl-[0.5rem]  w-[30rem] flex flex-col'>
            <div className='Form padding p-[40px]'>
                <div className='Form header flex justify-between items-center w-full'>
                    <h1 className='text-[1.25rem] leading-[2rem] tracking-[-.015em] font-semibold'>
                      Chào mừng đến với Quizizz
                    </h1>
                </div>
                <div className='text-dark-4 text-[1rem] leading-[1.5rem] tracking-[-.015em]'> Tạo tài khoản miễn phí trong 2 bước</div>
                <div className='sigup-button mt-[1rem] flex flex-col gap-[11px]'>

                    <button onClick={handleLogin} className='flex w-full justify-center items-center rounded-[0.25rem] py-[0.5rem] border-[1px] hover:shadow-hoverBtn group shadow-button border-bd'>
                        <div className='w-full flex items-center font-semibold'>
                            <img className='w-4 h-4 mx-[1rem] my-[0.5rem]' src='https://cf.quizizz.com/img/logos/google-logo-1.png' />
                            <div>Tiếp tục với Google</div>
                            <span className='ml-auto mr-[1rem] text-dark-5'>
                                <i className="fa-solid fa-arrow-right group-hover:text-[#8854c0] mr-[1rem]"></i>
                            </span>
                        </div>
                    </button>

                    <button className='flex w-full justify-center items-center rounded-[0.25rem] py-[0.5rem] border-[1px] hover:shadow-hoverBtn group shadow-button border-bd'>
                        <div className='w-full flex items-center font-semibold'>
                            <img className='w-4 h-4 mx-[1rem] my-[0.5rem]' src='https://cf.quizizz.com/image/envelope-regular.png' />
                            <div>Tiếp tục với Email</div>
                            <span className='ml-auto mr-[1rem] text-dark-5'>
                                <i className="fa-solid fa-arrow-right group-hover:text-[#8854c0] mr-[1rem]"></i>
                            </span>
                        </div>
                    </button>

                    <button className='flex w-full justify-center items-center rounded-[0.25rem] py-[0.5rem] border-[1px] hover:shadow-hoverBtn group shadow-button border-bd'>
                        <div className='w-full flex items-center font-semibold'>
                            <img className='w-4 h-4 mx-[1rem] my-[0.5rem]' src='https://cf.quizizz.com/image/facebook(1).png' />
                            <div>Tiếp tục với Facebook</div>
                            <span className='ml-auto mr-[1rem] text-dark-5'>
                                <i className="fa-solid fa-arrow-right group-hover:text-[#8854c0] mr-[1rem]"></i>
                            </span>
                        </div>
                    </button>

                    <div>
                        <div className='mt-4 text-dark-4 text-sm flex justify-center'>
                            <div>hoặc tiếp tục với</div>
                        </div>
                        <div className='flex flex-row justify-center mt-4 gap-4'>

                            <div>
                                <div className='w-10 h-10 box-shadow-secondary-signup rounded-sm cursor-pointer shadow-secondary'>
                                    <img className='bg-[#fff]  w-full h-full rounded-[0.125rem]' src='https://cf.quizizz.com/image/Microsoft.png' />
                                </div>
                                <span className='capitalize text-dark-2 text-[10px] font-normal flex justify-center mt-1'>
                                    microsoft
                                </span>
                            </div>

                            <div>
                                <div className='w-10 h-10 box-shadow-secondary-signup rounded-sm cursor-pointer shadow-secondary'>
                                    <img className='bg-black w-full p-[8px] h-full rounded-[0.125rem]' src='https://cf.quizizz.com/image/Apple.png' />
                                </div>
                                <span className='capitalize text-dark-2 text-[10px] font-normal flex justify-center mt-1'>
                                    apple
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

             <div className='mt-auto mb-[1rem] text-center text-[0.75rem] leading-[1rem] text-dark-5'>
                <div className='justify-center text-xs text-center text-dark-5 md:flex px-10'>
                    <div className='font-semibold'>Bằng cách đăng ký, bạn đồng ý với</div>
                    &
                    <a target='_blank' href='https://quizizz.com/tos'><div className='font-semibold underline'>Điều khoản dịch vụ</div></a>
                         &   
                     <a target='_blank' href='https://quizizz.com/privacy'><div className='font-semibold underline'>Chính sách bảo mật</div></a>

                </div>
            </div>

            <div className='mt-auto rounded-bl-[0.5rem] bg-bd-ft py-[1rem] text-[.75rem] leading-[1rem] text-dark-6 flex justify-center items-center'>
                <div>Đã có tài khoản?</div>
                <Link href="/login">
                <button  className='rounded-[.25rem] ml-[8px] bg-purple-2 text-purple-3 py-[0.25rem] px-[0.75rem] font-semibold'>
                    <div> Đăng Nhập</div>
                </button>
                </Link>
            </div>
        </div>
    )
}