import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function ModalCreate({ showModal, setShowModal }) {
  const router = useRouter()
  const [left, setLeft] = useState('0')

  const handleCreator = () => {
      
      setTimeout(() => {
        setShowModal(false)
        router.push('/admin/quiz/creator')
      },1000)
  }

  return (
    <div>
      <div onClick={() => setShowModal(false)} className=' fixed z-[10002] top-0 left-0 h-screen w-screen bg-[#090909cc]  flex justify-center items-center pt-6 px-6'>
        <div onClick={(e) => e.stopPropagation()} className={`bg-white animate-opacity  animate-top w-[22rem]  relative  rounded-lg`}>
          <div className='rounded-lg relative  z-[10003]'>
            <div className='px-4 overflow-y-auto py-[32px]'>
              <div className='overflow-x-hidden bg-white w-full flex flex-col'>

                <div className='flex flex-col items-center  px-[17px]'>
                  <h1 className='text-lg font-semibold'>
                    Bạn muốn tạo gì?
                  </h1>
                  <div className='w-full flex flex-col gap-6 mt-6'>

                    <button onClick={handleCreator} className='content-card shadow-contentCard border-light-2  min-h-33 h-full w-full px-4 pt-3 pb-4 border-[1px] rounded-lg flex gap-2 flex-col bg-bd-ft items-start hover:bg-lilac-faded hover:border-light  hover:shadow-contentCardHover'>
                      <div className='flex items-center justify-between w-full'>
                        <div className='flex items-center gap-2'>
                          <img className='w-[53px]' src='https://cf.quizizz.com/img/illustrations/quiz.png' />
                          <p className='text-xl font-bold text-dark'>
                            Quiz
                          </p>
                        </div>
                      </div>
                      <p className='text-sm text-left text-dark-4'>
                        Đánh giá và thực hành tạo động lực bằng các câu hỏi tương tác
                      </p>
                    </button>


                    <button className='content-card shadow-contentCard border-light-2  min-h-33 h-full w-full px-4 pt-3 pb-4 border-[1px] rounded-lg flex gap-2 flex-col bg-bd-ft items-start hover:bg-lilac-faded hover:border-light  hover:shadow-contentCardHover'>
                      <div className='flex items-center justify-between w-full'>
                        <div className='flex items-center gap-2'>
                          <img className='w-[53px]' src='https://cf.quizizz.com/img/illustrations/lesson.png' />
                          <p className='text-xl font-bold text-dark'>
                            Bài học
                          </p>
                        </div>
                      </div>
                      <p className='text-sm text-left text-dark-4'>
                        Thêm các slide vui nhộn và tương tác vào các bài đánh giá mà học sinh đã yêu thích
                      </p>
                    </button>
                  </div>
                </div>

                <div className='w-full mt-3 font-semibold text-dark-4 flex flex-col justify-center items-center p-2 text-sm'>
                  Đã có nội dung sẵn sàng? Hãy nhập khẩu

                  <div className='flex gap-2'>
                    <div className='flex space-x-2 mt-3 w-full'>
                      <button className='flex-1 py-1 px-5 rounded border-[1px] border-[#0909090d] bg-[#0909090d] text-dark-6 text-xs flex items-center justify-center'>
                        <i className="fa-solid fa-file-lines w-4 mr-1 text-purple-3"></i>
                        <div>
                          Biểu mẫu Google
                        </div>
                      </button>
                    </div>
                    <div className='flex space-x-2 mt-3 w-full'>
                      <button className='flex-1 py-1 px-5 rounded border-[1px] border-[#0909090d] bg-[#0909090d] text-dark-6 text-xs flex items-center justify-center'>
                        <img src='https://cf.quizizz.com/image/google-slides.svg' className='mr-1' />
                        <div>
                          Google Trang trình bày
                        </div>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>


          </div>
          <div className={`z-[0] left-full animate-left  absolute  top-0 h-full flex items-center transition-all duration-200 opacity-100 translate-x-0`}>
            <div className='bg-bd-ft w-72 p-6 rounded-r-lg'>
              <div className='w-full'>
                <div className='relative h-80 w-60 rounded-lg overflow-hidden bg-dark-4'>
                  <div className='h-full w-full flex transition-transform duration-500'>
                    <img className='object-fill h-full absolute opacity-0' src="https://cf.quizizz.com/videos/contentCreation/quiz/c.mp4" />
                    <video autoPlay className='object-fill h-full absolute'>
                      <source src='https://cf.quizizz.com/videos/contentCreation/quiz/c.mp4' type='video/mp4' />
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
