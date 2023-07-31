import React from 'react'

export default function HomeHeader() {
  return (
    <div className='sticky top-0 left-0 right-0 bottom-auto w-full z-[9999] float-none bg-white'>
      <header className='w-[97%] max-w-fit relative py-[10px] z-20 mx-auto flex items-center'>
        <a href="#" >
          <img src='https://quizizz.com/wf/assets/62fa6419161d3a641f681ceb_Logo.svg' />
        </a>
        <nav className='flex static ml-[20px]'>
          <div className='py-[6px] pr-[20px] pl-0 block text-[16px] '>
            <div className='flex items-center py-[14px] px-[10px] bg-white hover:bg-[#d8d7d7] transition-colors duration-300 rounded-[8px] cursor-pointer'>
              <div className=' text-[#1f1c1c]'>For Schools</div>
            </div>
          </div>

          <div className='py-[6px] pr-[20px] pl-0 block'>
            <div className='flex items-center py-[14px] px-[10px] bg-white hover:bg-[#d8d7d7] transition-colors duration-300 rounded-[8px] cursor-pointer'>
              <div>Plans</div>
            </div>
          </div>

          <div className='py-[6px] pr-[20px] pl-0 block'>
            <div className='flex items-center py-[14px] px-[10px] bg-white hover:bg-[#d8d7d7] transition-colors duration-300 rounded-[8px] cursor-pointer'>
              <div>Solutions</div>
            </div>
          </div>

          <div className='py-[6px] pr-[20px] pl-0 block'>
            <div className='flex items-center py-[14px] px-[10px] bg-white hover:bg-[#d8d7d7] transition-colors duration-300 rounded-[8px] cursor-pointer'>
              <div>Resources</div>
            </div>
          </div>

        </nav>

        <a target='_blank' href='https://quizizz.com/home/forwork?ref=header_tab&lng=en&source=home_header'>
          <div className='flex gap-[10px]'>
            <img src='https://quizizz.com/wf/assets/64b1287b635cb0e2d0f26d08_QFW_Sparkle.svg' />
            <div className='text-[#6c4298] font-bold'>
              Quizizz for Work
            </div>
          </div>
          <img src='https://quizizz.com/wf/assets/64801add382f148958974df1_Mask_group.png' />
        </a>

        <div className='flex gap-[10px] ml-[268px]'>
          <div className='py-[10px] bg-white hover:bg-[#d8d7d7] hover:border-[#d8d7d7] cursor-pointer pr-[14px] pl-[12px] font-medium transition-colors duration-300 border-[3px] border-[#ede6f6] rounded-[8px]'>
            <a target='_blank' className='text-[#5d2057]'>
              School Plan Quote
            </a>
          </div>

          <div className='py-[10px] bg-white hover:bg-[#d8d7d7] hover:border-[#d8d7d7] cursor-pointer pr-[14px] pl-[12px] font-medium transition-colors duration-300 border-[3px] border-[#ede6f6] rounded-[8px]'>
            <a target='_blank' className='text-[#5d2057]'>
              Enter code
            </a>
          </div>


          <div className='py-[10px]  hover:bg-[#d3b4fb] hover:border-[#d3b4fb]  pr-[14px] pl-[12px] bg-[#ede6f6] cursor-pointer font-medium transition-colors duration-300 border-[3px] border-[#ede6f6] rounded-[8px]'>
            <a href='/login' className='text-[#5d2057]'>
              Login
            </a>
          </div>

          <div className='py-[10px] font-quick font-bold pr-[14px] pl-[12px]  bg-[#9a4292] cursor-pointer  transition-colors duration-300 border-[3px] border-[#9a4292] rounded-[8px]'>
            <a href='/signup' className='text-[#fff]'>
            Sign up

            </a>
          </div>

        </div>
      </header>

    </div>
  )
}
