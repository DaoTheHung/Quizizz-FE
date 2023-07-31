import React from 'react'

export default function HeaderPlayer() {
  return (
    <div className='border-b-2 border-b-[#00000036] fixed top-0 left-0 block w-full'>
      <div className='text-[#292a3a]  select-none bg-white px-[12px] relative flex items-center justify-between w-full'>
        <div className='flex flex-grow-[1] items-center '>
          <div className='w-[112px]'>
            <img src='https://cf.quizizz.com/img/quizizz_logos/purple-brandmark-600x164.png' />
          </div>
          <div className='text-[#292a3a] bg-[#fff3] border border-[#292a3a1a]   rounded-[18px]  flex-1 justify-between items-center max-w-[300px] h-[32px] my-[12px] flex mx-[16px] transition-colors relative'>
            <input placeholder='Tìm quiz' className='border-none outline-none flex-auto w-[65px] rounded-[18px] pl-[20px]   text-[16px] font-medium flex' />
            <div className='text-[#292a3aa8] text-[16px] h-[32px] flex justify-center items-center w-[40px] rounded-tr-[16px] rounded-br-[16px]'>
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
          <div className='flex'>
            <div className='text-[#8854c0] flex border-b-[3px] border-b-[#8854c0] py-[16px] px-[20px] text-[16px] font-bold relative transition-all'>
              <div>
                <i className="fa-solid fa-house-chimney"></i>
              </div>
              <div className='ml-[5px]'>
                Trang chủ
              </div>
            </div>
            <div className='text-[#292a3aa8] flex   py-[16px] px-[20px] text-[16px] font-bold relative transition-all'>
              <div>
                <i className="fa-solid fa-clock-rotate-left"></i>
              </div>
              <div className='ml-[5px]'>
                Hoạt động
              </div>
            </div>
            <div className='text-[#292a3aa8] flex   py-[16px] px-[20px] text-[16px] font-bold relative transition-all'>
              <div>
                <i className="fa-solid fa-users"></i>
              </div>
              <div className='ml-[5px]'>
                Các lớp học
              </div>
            </div>
          </div>
        </div>

        <div className='flex-[2] flex justify-end relative'>
          <button className='mr-[16px] text-[#292a3a] cursor-pointer bg-[#292a3a1a] border-none rounded-[4px] justify-center items-center flex p-[8px] text-[16px] font-bold leading-[16px]'>Đăng nhập</button>
          <button className=' text-[#fff] cursor-pointer bg-[#8854c0] border-none rounded-[4px] justify-center items-center flex p-[8px] text-[16px] font-bold leading-[16px]'>Đăng ký</button>
        </div>
        <div className='ml-[16px] relative'>
          <button className='text-center text-[#292a3a] bg-[#292a3a1a] rounded-full w-[32px] h-[32px] py-[8px] px-[9px] text-[16px] leading-[16px] transition-transform flex'>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>

      </div>
    </div>
  )
}
