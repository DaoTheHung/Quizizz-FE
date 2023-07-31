import React, { useEffect, useState } from 'react'

export default function DataQuiz() {


  // Slider
  const [showScroll, setShowScroll] = useState(false)
  const handleBackLeft = () => {
    let slider = document.getElementById("slideItem")
    slider.scrollLeft = slider.scrollLeft - 500
    setShowScroll(false)
  }
  const handleBackRight = () => {
    let slider = document.getElementById("slideItem")
    slider.scrollLeft = slider.scrollLeft + 500
    setShowScroll(true)
  }

  return (
    <div className='mt-10 md:mx-0 2xl:mx-[10rem]'>
      <div className='mx-auto'>
        <div className=''>
          {/*<---->*/}
          <div className='flex mb-4 items-center'>
            <i className="fa-solid fa-star text-[20px] text-yellow-3"></i>
            <h2 className='text-dark-6 text-2xl font-semibold ml-2'>
              Khởi động vui vẻ
            </h2>
            <div className='ml-auto flex'>
              <button className='hover:text-light items-center justify-center px-4 py-1 text-sm font-semibold h-8 base bg-lilac-faded text-lilac hover:text-lilac-light active:text-lilac-dark rounded-full secondary transition-colors duration-200 ease-in-out  relative min-w-max  ml-auto'>
                <div>
                  Xem thêm
                  <i className="fa-solid fa-chevron-right text-[12px] ml-[8px]"></i>
                </div>


              </button>
            </div>
          </div>
        </div>
        {/*<---->*/}
        <div className='flex max-w-full relative mb-4'>
          <div id='slideItem' className='w-full flex gap-4 overflow-y-hidden overflow-x-auto scroll-smooth group  scrollbar-hide '>
            {/*<---->*/}
            {!showScroll && <div className='bg-wrapper-right  right absolute hidden group-hover:flex  justify-center items-center w-16 h-full z-50 right-0'>
              <button onClick={handleBackRight} className='bg-white text-dark-3 w-10 h-10 rounded-full inline-flex justify-center items-center'>
                <i className="fa-solid fa-chevron-right text-[24px]"></i>
              </button>
            </div>}
            {showScroll && <div className='bg-wrapper-left  right absolute hidden group-hover:flex  justify-center items-center w-16 h-full z-50 left-0'>
              <button onClick={handleBackLeft} className='bg-white text-dark-3 w-10 h-10 rounded-full inline-flex justify-center items-center'>
                <i className="fa-solid fa-chevron-left text-[24px]"></i>
              </button>
            </div>}
            {/*<---->*/}
            <a target='_blank' href='https://quizizz.com/admin/quiz/62ff9b9a42f96b001d17fb24/v%C3%B2ng-quanh-th%E1%BA%BF-gi%E1%BB%9Bi?adminRecommend=true'
              className='quiz-card mb-4 md:mb-8 h-60 md:h-72 rounded-lg bg-white text-left ring-1 ring-dark-10% flex-shrink-0 cursor-pointer hover:shadow-lg max-w-44 md:max-w-60'
            >
              <div className='rounded-t-lg overflow-hidden h-full'>

                <div>
                  <div className='w-44 md:w-60 h-28 md:h-40 '>
                    <img className='w-full h-full object-cover  ' src='https://quizizz.com/media/resource/gs/quizizz-media/quizzes/4bcf5a95-a02f-417d-9cff-49d2c4d10f25?w=400&h=400' />
                  </div>
                </div>

                <div className='px-2.5 pt-2.5 pb-3.5 flex flex-col h-30'>
                  <div className='flex items-center'>
                    <div className='lozenge items-center inline-flex text-[.625rem] leading-[1rem] tracking-[+.015em] font-semibold rounded-full px-1.5 bg-bd text-dark-3'>
                      <div>QUIZ</div>
                    </div>
                  </div>
                  <div className='mt-2 mb-4 text-sm md:text-base text-dark-6 font-semibold'>
                    Vòng quanh thế giới
                  </div>
                  <div className='flex  text-[.75rem] leading-[1rem] items-center  md:text-xs text-dark-4 font-semibold mt-auto'>
                    <div className='m-1.5'>
                      8 Câu hỏi
                    </div>
                    <div className='mr-1.5 ml-1.5'>
                      3K lần chơi
                    </div>
                  </div>
                </div>
              </div>
            </a>
            {/*<---->*/}
            <a target='_blank' href='https://quizizz.com/admin/quiz/62ff9b9a42f96b001d17fb24/v%C3%B2ng-quanh-th%E1%BA%BF-gi%E1%BB%9Bi?adminRecommend=true'
              className='quiz-card mb-4 md:mb-8 h-60 md:h-72 rounded-lg bg-white text-left ring-1 ring-dark-10% flex-shrink-0 cursor-pointer hover:shadow-lg max-w-44 md:max-w-60'
            >
              <div className='rounded-t-lg overflow-hidden h-full'>

                <div>
                  <div className='w-44 md:w-60 h-28 md:h-40 '>
                    <img className='w-full h-full object-cover  ' src='https://quizizz.com/media/resource/gs/quizizz-media/quizzes/fdf19b1b-7d86-485d-859d-a13390a9197f?w=400&h=400' />
                  </div>
                </div>

                <div className='px-2.5 pt-2.5 pb-3.5 flex flex-col h-30'>
                  <div className='flex items-center'>
                    <div className='lozenge items-center inline-flex text-[.625rem] leading-[1rem] tracking-[+.015em] font-semibold rounded-full px-1.5 bg-bd text-dark-3'>
                      <div>QUIZ</div>
                    </div>
                  </div>
                  <div className='mt-2 mb-4 text-sm md:text-base text-dark-6 font-semibold'>
                    Vòng quanh thế giới
                  </div>
                  <div className='flex  text-[.75rem] leading-[1rem] items-center  md:text-xs text-dark-4 font-semibold mt-auto'>
                    <div className='m-1.5'>
                      12 Câu hỏi
                    </div>
                    <div className='mr-1.5 ml-1.5'>
                      3.6K lần chơi
                    </div>
                  </div>
                </div>
              </div>
            </a>
            {/*<---->*/}
            <a target='_blank' href='https://quizizz.com/admin/quiz/62ff9b9a42f96b001d17fb24/v%C3%B2ng-quanh-th%E1%BA%BF-gi%E1%BB%9Bi?adminRecommend=true'
              className='quiz-card mb-4 md:mb-8 h-60 md:h-72 rounded-lg bg-white text-left ring-1 ring-dark-10% flex-shrink-0 cursor-pointer hover:shadow-lg max-w-44 md:max-w-60'
            >
              <div className='rounded-t-lg overflow-hidden h-full'>

                <div>
                  <div className='w-44 md:w-60 h-28 md:h-40 '>
                    <img className='w-full h-full object-cover  ' src='https://quizizz.com/media/resource/gs/quizizz-media/quizzes/13045fcf-cc50-45db-9eab-491e0b2d9790?w=400&h=400' />
                  </div>
                </div>

                <div className='px-2.5 pt-2.5 pb-3.5 flex flex-col h-30'>
                  <div className='flex items-center'>
                    <div className='lozenge items-center inline-flex text-[.625rem] leading-[1rem] tracking-[+.015em] font-semibold rounded-full px-1.5 bg-bd text-dark-3'>
                      <div>QUIZ</div>
                    </div>
                  </div>
                  <div className='mt-2 mb-4 text-sm md:text-base text-dark-6 font-semibold'>
                    Vòng quanh thế giới
                  </div>
                  <div className='flex  text-[.75rem] leading-[1rem] items-center  md:text-xs text-dark-4 font-semibold mt-auto'>
                    <div className='m-1.5'>
                      14 Câu hỏi
                    </div>
                    <div className='mr-1.5 ml-1.5'>
                      282 lần chơi
                    </div>
                  </div>
                </div>
              </div>
            </a>
            {/*<---->*/}
            <a target='_blank' href='https://quizizz.com/admin/quiz/62ff9b9a42f96b001d17fb24/v%C3%B2ng-quanh-th%E1%BA%BF-gi%E1%BB%9Bi?adminRecommend=true'
              className='quiz-card mb-4 md:mb-8 h-60 md:h-72 rounded-lg bg-white text-left ring-1 ring-dark-10% flex-shrink-0 cursor-pointer hover:shadow-lg max-w-44 md:max-w-60'
            >
              <div className='rounded-t-lg overflow-hidden h-full'>

                <div>
                  <div className='w-44 md:w-60 h-28 md:h-40 '>
                    <img className='w-full h-full object-cover  ' src='https://quizizz.com/media/resource/gs/quizizz-media/quizzes/14753bce-ba21-4b0e-8271-a84e797940bb?w=400&h=400' />
                  </div>
                </div>

                <div className='px-2.5 pt-2.5 pb-3.5 flex flex-col h-30'>
                  <div className='flex items-center'>
                    <div className='lozenge items-center inline-flex text-[.625rem] leading-[1rem] tracking-[+.015em] font-semibold rounded-full px-1.5 bg-bd text-dark-3'>
                      <div>QUIZ</div>
                    </div>
                  </div>
                  <div className='mt-2 mb-4 text-sm md:text-base text-dark-6 font-semibold'>
                    Vòng quanh thế giới
                  </div>
                  <div className='flex  text-[.75rem] leading-[1rem] items-center  md:text-xs text-dark-4 font-semibold mt-auto'>
                    <div className='m-1.5'>
                      4 Câu hỏi
                    </div>
                    <div className='mr-1.5 ml-1.5'>
                      332 lần chơi
                    </div>
                  </div>
                </div>
              </div>
            </a>
            {/*<---->*/}
            <a target='_blank' href='https://quizizz.com/admin/quiz/62ff9b9a42f96b001d17fb24/v%C3%B2ng-quanh-th%E1%BA%BF-gi%E1%BB%9Bi?adminRecommend=true'
              className='quiz-card mb-4 md:mb-8 h-60 md:h-72 rounded-lg bg-white text-left ring-1 ring-dark-10% flex-shrink-0 cursor-pointer hover:shadow-lg max-w-44 md:max-w-60'
            >
              <div className='rounded-t-lg overflow-hidden h-full'>

                <div>
                  <div className='w-44 md:w-60 h-28 md:h-40 '>
                    <img className='w-full h-full object-cover  ' src='https://quizizz.com/media/resource/gs/quizizz-media/quizzes/a395a795-93b3-4d76-a3c4-2e90c7746817?w=400&h=400' />
                  </div>
                </div>

                <div className='px-2.5 pt-2.5 pb-3.5 flex flex-col h-30'>
                  <div className='flex items-center'>
                    <div className='lozenge items-center inline-flex text-[.625rem] leading-[1rem] tracking-[+.015em] font-semibold rounded-full px-1.5 bg-bd text-dark-3'>
                      <div>QUIZ</div>
                    </div>
                  </div>
                  <div className='mt-2 mb-4 text-sm md:text-base text-dark-6 font-semibold'>
                    Vòng quanh thế giới
                  </div>
                  <div className='flex  text-[.75rem] leading-[1rem] items-center  md:text-xs text-dark-4 font-semibold mt-auto'>
                    <div className='m-1.5'>
                      12 Câu hỏi
                    </div>
                    <div className='mr-1.5 ml-1.5'>
                      637 lần chơi
                    </div>
                  </div>
                </div>
              </div>
            </a>
            {/*<---->*/}
            <a target='_blank' href='https://quizizz.com/admin/quiz/62ff9b9a42f96b001d17fb24/v%C3%B2ng-quanh-th%E1%BA%BF-gi%E1%BB%9Bi?adminRecommend=true'
              className='quiz-card mb-4 md:mb-8 h-60 md:h-72 rounded-lg bg-white text-left ring-1 ring-dark-10% flex-shrink-0 cursor-pointer hover:shadow-lg max-w-44 md:max-w-60'
            >
              <div className='rounded-t-lg overflow-hidden h-full'>

                <div>
                  <div className='w-44 md:w-60 h-28 md:h-40 '>
                    <img className='w-full h-full object-cover  ' src='https://quizizz.com/media/resource/gs/quizizz-media/quizzes/1ca8a96f-7b4d-4fa1-bd37-050dcdef435e?w=400&h=400' />
                  </div>
                </div>

                <div className='px-2.5 pt-2.5 pb-3.5 flex flex-col h-30'>
                  <div className='flex items-center'>
                    <div className='lozenge items-center inline-flex text-[.625rem] leading-[1rem] tracking-[+.015em] font-semibold rounded-full px-1.5 bg-bd text-dark-3'>
                      <div>QUIZ</div>
                    </div>
                  </div>
                  <div className='mt-2 mb-4 text-sm md:text-base text-dark-6 font-semibold'>
                    Vòng quanh thế giới
                  </div>
                  <div className='flex  text-[.75rem] leading-[1rem] items-center  md:text-xs text-dark-4 font-semibold mt-auto'>
                    <div className='m-1.5'>
                      12 Câu hỏi
                    </div>
                    <div className='mr-1.5 ml-1.5'>
                      87 lần chơi
                    </div>
                  </div>
                </div>
              </div>
            </a>
            {/*<---->*/}
          </div>
        </div>
        {/*<---->*/}

      </div>
    </div>
  )
}
