import React, { useState } from 'react'
import SearchResults from '../SearchBar/SearchResults'
import DataQuiz from '../common/TitleSearch/DataQuiz'

export default function Admin() {
  const [showScroll, setShowScroll] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const handleBackLeft = () => {
    let slider = document.getElementById("slide")
    slider.scrollLeft = slider.scrollLeft - 500
    setShowScroll(false)
  }
  const handleBackRight = () => {
    let slider = document.getElementById("slide")
    slider.scrollLeft = slider.scrollLeft + 500
    setShowScroll(true)
  }
  return (
    <div className=' p-[3rem] mt-[3rem] ml-[193px]  h-full'>
      <div className='w-full'>
        <div className='w-full flex justify-center flex-col'>

          <div className='w-full'>
            <div className='relative'>
              <div className='text-dark-6 text-center font-semibold md:block text-[35px] mb-8 mt-12'>
                <div>
                  Bạn sẽ dạy gì hôm nay?
                </div>
              </div>


            </div>
            <div className='hero-search-bar mt-[56px] w-[50rem] mx-auto  shadow-sortLow flex items-center z-10 bg-white shadow-soft-low relative p-0 md:py-3 md:px-6 rounded-lg'>

              <div className='relative w-full '>
                <input
                  onClick={() => setShowResult(!showResult)}
                  placeholder='Tìm kiếm quiz về bất kỳ chủ đề nào'
                  className='text-dark-6 text-2xl font-semibold pr-9 pl-3 py-2 w-full h-10 outline-none'
                />
                <div className='w-6 h-6 flex items-center justify-center absolute right-2 top-2 pt-0.5 '>
                  <i className="fa-solid fa-chevron-right cursor-pointer"></i>
                </div>
              </div>
              {showResult && <SearchResults showResult={showResult} />}

            </div>


          </div>

          <div className='flex w-full pt-4 pb-4  scroll-smooth'>
            <div className='relative mx-auto mb-4 overflow-hidden mt-[6rem]'>

              {/* Flex item  */}

              <div id='slide' className='py-1 group scroll-smooth scrollbar-hide md:px-[2.75rem]  overflow-y-hidden overflow-x-auto flex mx-auto gap-[26px]'>

                {!showScroll && <div onClick={handleBackRight} className='bg-[#ffffffa8] 2xl:hidden hidden group-hover:flex right absolute cursor-pointer  justify-center items-center w-6 h-full z-50 right-0'>
                  <i className="text-[16px] fa-solid fa-chevron-right"></i>
                </div>}
                {showScroll && <div onClick={handleBackLeft} className='bg-[#ffffffa8]  2xl:hidden hidden group-hover:flex right absolute cursor-pointer  justify-center items-center w-6 h-full z-50 left-0'>
                  <i className="text-[16px] fa-solid fa-chevron-left"></i>
                </div>}

                <div className='flex flex-col items-center transition duration-300 transform cursor-pointer hover:scale-110'>

                  <div className='rounded-full w-14 h-14 md:w-16 md:h-16 border-dark-6'>
                    <div className='bg-[url("https://cf.quizizz.com/img/course-assets/title_imgs/bts_templates.png")] bg-center bg-contain w-full h-full' >
                    </div>
                  </div>

                  <div className='text-xs font-semibold text-center md:text-sm text-dark-3 whitespace-nowrap'>
                    <div>
                      Khởi động vui vẻ
                    </div>
                  </div>

                </div>
                <div className='flex flex-col items-center transition duration-300 transform cursor-pointer hover:scale-110'>

                  <div className='rounded-full w-14 h-14 md:w-16 md:h-16 border-dark-6'>
                    <div className='bg-[url("https://cf.quizizz.com/image/subject-math.png")] bg-center bg-contain w-full h-full' >
                    </div>
                  </div>

                  <div className='text-xs font-semibold text-center md:text-sm text-dark-3 whitespace-nowrap'>
                    <div>
                      môn Toán
                    </div>
                  </div>

                </div>
                <div className='flex flex-col items-center transition duration-300 transform cursor-pointer hover:scale-110'>

                  <div className='rounded-full w-14 h-14 md:w-16 md:h-16 border-dark-6'>
                    <div className='bg-[url("https://cf.quizizz.com/image/subject-english.png")] bg-center bg-contain w-full h-full' >
                    </div>
                  </div>

                  <div className='text-xs font-semibold text-center md:text-sm text-dark-3 whitespace-nowrap'>
                    <div>
                      Tiếng Anh
                    </div>
                  </div>

                </div>
                <div className='flex flex-col items-center transition duration-300 transform cursor-pointer hover:scale-110'>

                  <div className='rounded-full w-14 h-14 md:w-16 md:h-16 border-dark-6'>
                    <div className='bg-[url("https://cf.quizizz.com/image/subject-social-studies.png")] bg-center bg-contain w-full h-full' >
                    </div>
                  </div>

                  <div className='text-xs font-semibold text-center md:text-sm text-dark-3 whitespace-nowrap'>
                    <div>
                      Khoa học Xã hội
                    </div>
                  </div>

                </div>
                <div className='flex flex-col items-center transition duration-300 transform cursor-pointer hover:scale-110'>

                  <div className='rounded-full w-14 h-14 md:w-16 md:h-16 border-dark-6'>
                    <div className='bg-[url("https://cf.quizizz.com/image/subject-world-languages.png")] bg-center bg-contain w-full h-full' >
                    </div>
                  </div>

                  <div className='text-xs font-semibold text-center md:text-sm text-dark-3 whitespace-nowrap'>
                    <div>
                      Ngôn ggữ
                    </div>
                  </div>

                </div>
                <div className='flex flex-col items-center transition duration-300 transform cursor-pointer hover:scale-110'>

                  <div className='rounded-full w-14 h-14 md:w-16 md:h-16 border-dark-6'>
                    <div className='bg-[url("https://cf.quizizz.com/image/subject-science.png")] bg-center bg-contain w-full h-full' >
                    </div>
                  </div>

                  <div className='text-xs font-semibold text-center md:text-sm text-dark-3 whitespace-nowrap'>
                    <div>
                      Khoa học
                    </div>
                  </div>

                </div>
                <div className='flex flex-col items-center transition duration-300 transform cursor-pointer hover:scale-110'>

                  <div className='rounded-full w-14 h-14 md:w-16 md:h-16 border-dark-6'>
                    <div className='bg-[url("https://cf.quizizz.com/image/subject-computers.png")] bg-center bg-contain w-full h-full' >
                    </div>
                  </div>

                  <div className='text-xs font-semibold text-center md:text-sm text-dark-3 whitespace-nowrap'>
                    <div>
                      Máy tính
                    </div>
                  </div>

                </div>
                <div className='flex flex-col items-center transition duration-300 transform cursor-pointer hover:scale-110'>

                  <div className='rounded-full w-14 h-14 md:w-16 md:h-16 border-dark-6'>
                    <div className='bg-[url("https://cf.quizizz.com/image/subject-career-ed-professional-development.png")] bg-center bg-contain w-full h-full' >
                    </div>
                  </div>

                  <div className='text-xs font-semibold text-center md:text-sm text-dark-3 whitespace-nowrap'>
                    <div>
                      GD nghề nghiệp
                    </div>
                  </div>

                </div>
                <div className='flex flex-col items-center transition duration-300 transform cursor-pointer hover:scale-110'>

                  <div className='rounded-full w-14 h-14 md:w-16 md:h-16 border-dark-6'>
                    <div className='bg-[url("https://cf.quizizz.com/image/subject-arts-music.png")] bg-center bg-contain w-full h-full' >
                    </div>
                  </div>

                  <div className='text-xs font-semibold text-center md:text-sm text-dark-3 whitespace-nowrap'>
                    <div>
                      Nghệ thuật sáng tạo
                    </div>
                  </div>

                </div>
                <div className='flex flex-col items-center transition duration-300 transform cursor-pointer hover:scale-110'>

                  <div className='rounded-full w-14 h-14 md:w-16 md:h-16 border-dark-6'>
                    <div className='bg-[url("https://cf.quizizz.com/image/subject-physical-ed.png")] bg-center bg-contain w-full h-full' >
                    </div>
                  </div>

                  <div className='text-xs font-semibold text-center md:text-sm text-dark-3 whitespace-nowrap'>
                    <div>
                      Sức khỏe & Thể chất
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* */}

        </div>
      </div>
      <DataQuiz/>
    </div >
  )
}
