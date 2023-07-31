import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
export default function LoginHeader() {
const router = useRouter()
  return (
    <div>
        <div className="w-full fixed top-0 shadow-headerLogin py-[1rem] px-[0.5rem] bg-purple-1 z-20">
                <div className="login">
                    <div className="flex justify-between mx-auto my-0">
                        <h7 className="h-[1.75rem] ml-[43px]">
                            <a href="quizizz.com">
                                <img className="h-full xs:ml-10" src="https://cf.quizizz.com/img/quizizz_logos/white-brandmark-600x164.png" />
                            </a>
                        </h7>
                        <div className="flex justify-center items-center">
                            <div className="h-8 px-4 py-[0.4rem] mr-[1.5rem]  text-sm transition-transform scale-100 rounded bg-purple-4 text-[#fff] xs:mr-6 hover:scale-110">
                                <a href='/join' target="_blank">
                                    <span>Tham gia một trò chơi </span>
                                </a>    
                            </div>
                            <div className="h-8 px-4 py-[0.4rem] text-sm transition-transform scale-100 rounded bg-purple-dk text-[#fff] hover:scale-110">
                                <Link href={router.pathname === "/signup" ? "/login" : "/signup"}>
                                {router.pathname==="/signup" ? "Đăng nhập" : "Đăng ký"}
                                </Link>
                                
                            </div>

                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}
