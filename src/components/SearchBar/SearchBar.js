import React, { useState } from 'react'
import SearchResults from './SearchResults'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function SearchBar({ show, setShow }) {
  const router = useRouter()
  const [showClasses, setShowClasses] = useState(true)



  return (
    <div className='w-full'>
      <header className='flex gap-2 h-[3.625rem] fixed top-0 z-[10001] bg-[#fff] w-full ml-[193px] '>
        <div className='flex justify-center items-center absolute left-0 right-[214px] h-fit'>
          <nav className='p-2 text-acc justify-between w-full flex relative'>
            <div className={`rounded flex-grow bg-bd  flex relative ${show ? "border-light" : ""}  border-[1px]`}>

              <div className=' absolute left-0 z-10'>
                <div className='w-6 h-6 flex items-center justify-center pt-[0.125rem] text-dark-4 absolute top-2 left-2'>
                  <i className="fa-solid fa-magnifying-glass  text-[12px] font-semibold text-purple-1"></i>
                </div>
              </div>

              <div className='relative w-full'>
                <input onClick={() => setShow(true)} className='text-dark-6 rounded  bg-bd font-semibold  w-full  text-sm pr-3 pl-9 py-2 h-10 outline-none' placeholder='Tìm trong thư viện Quizizz' />
                {show && <SearchResults show={show} />}
              </div>


              <div onClick={() => setShowClasses(!showClasses)} className='flex '>
                <div className='border-r-[1px] border-dark-5 my-2 '></div>
                <div className='w-full flex items-center relative '>
                  <button className='tex-dark-3 font-semibold text-sm text-left pr-[2.25rem] pl-2 py-2 rounded flex items-center cursor-pointer h-10'>
                    <div className='w-max text-sm truncate'>
                      {router.pathname === "/admin/reports" && "Báo cáo"}
                      {router.pathname === "/admin/private" && "Thư viện của tôi"}
                      {router.pathname === "/admin" && "Thư viện"}
                    </div>
                  </button>
                  <div className='flex justify-center items-center w-6 h-6 ml-auto'>
                    {!showClasses ? <i class="fa-solid fa-caret-up"></i> : <i className="fa-sharp fa-solid fa-caret-down tex-dark-3"></i>}

                  </div>
                  <ul className={`transition-transform absolute top-[0px] left-0 right-0 shadow-sortHig bg-white rounded overflow-y transform ${showClasses ? "scale-y-0" : "scale-y-100"} origin-top max-h-44 mt-10 z-30`}>
                    <Link href="/admin">
                      <li className={`${router.pathname === "/admin" ? "text-purple-3  bg-purple-2" : ""} rounded-t p-2  border-purple-2 border-1 cursor-pointer flex`}>
                        <div className=''>
                          <div className='item-title font-semibold text-sm'>
                            Thư viện
                          </div>
                        </div>
                      </li>
                    </Link>
                    <Link href="/admin/private">
                      <li className={`${router.pathname === "/admin/private" ? "text-purple-3 bg-purple-2" : ""} p-2 border-b-[#0909090d]   border-purple-2 border-1 border-b-2 cursor-pointer flex`}>
                        <div className=''>
                          <div className='item-title font-semibold text-sm'>
                            Thư viện của tôi
                          </div>
                        </div>
                      </li>
                    </Link>
                    <Link href="/admin/reports">
                      <li className={` ${router.pathname === "/admin/reports" ? "text-purple-3 bg-purple-2" : ""} p-2 rounded-b border-purple-2 border-1  cursor-pointer flex`}>
                        <div className=''>
                          <div className='item-title font-semibold text-sm'>
                            Báo cáo
                          </div>
                        </div>
                      </li>
                    </Link>
                  </ul>
                </div>


              </div>

            </div>

          </nav>
          <div className='pl-[1.5rem] flex h-10'>
            <button className='transition-colors w-[103px] duration-200 text-purple-3 bg-purple-2 flex justify-center items-center h-full relative font-semibold text-sm py-1 px-4 rounded'>
              <div> Nhập mã</div>
            </button>
          </div>

          <div className='relative left-[13px]'>
            <button className='flex items-center justify-center w-10 h-10 bg-[#0909090d] text-dark-6 hover:text-dark-3  rounded-full other transition-colors duration-200 ease-in-out  relative min-w-max'>
              <i className="text-[16px] fa-regular fa-bell"></i>
            </button>
          </div>
        </div>

      </header>

    </div>
  )
}
