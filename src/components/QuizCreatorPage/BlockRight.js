import React from 'react'

export default function BlockRight() {
  return (
    <div className='p-4 w-[33%] sticky  max-h-[100vh] right-[53px] '>
      <div className='action-center my-4 p-4 flex flex-col gap-y-2 border border-light-2 rounded-lg'>
        <button className='w-full flex justify-center items-center h-36 border border-light-2 rounded-lg' type='button'>
          <div className='flex flex-col gap-2 text-sm text-dark-4 font-semibold items-center w-full'>
            <span className='bg-brand-b text-white p-4 flex items-center rounded-full'>
              <i className="text-[26px] fa-solid fa-image"></i>
            </span>
            <span>Click here to upload image</span>
          </div>
        </button>
        <button className='relative text-lg flex items-center justify-between w-full font-semibold text-dark-6'>
          <span>Bài Quiz không có tiêu đề</span>
          <div className='p-2 h-full flex items-center rounded bg-light-2'>
            <i className="text-[12px] fa-solid fa-pencil"></i>
          </div>
        </button>
        <div className='flex items-center'>
          <button className='text-sm text-lilac font-semibold flex items-center gap-1 v-popper--has-tooltip'>
            <i className="text-[12px] fa-regular fa-eye"></i>
            <span>Công khai</span>
          </button>
          <div className='flex items-center font-bold bg-lilac mx-2  h-3 w-[2px]'>

          </div>
          <button className='text-sm text-lilac font-semibold flex items-center gap-1 v-popper--has-tooltip'>
            <i className="text-[12px] fa-solid fa-language"></i>
            <span>English</span>
          </button>
        </div>
        <div className='flex items-center'>
          <button className='text-sm text-lilac font-semibold flex items-center gap-1 v-popper--has-tooltip'>
            <i className="text-[12px] fa-regular fa-clock"></i>
            <span>Thay đổi thời gian</span>
            <i className="text-[12px] fa-solid fa-caret-down"></i>
          </button>
          <div className='flex items-center font-bold bg-lilac mx-2  h-3 w-[2px]'>

          </div>
          <button className='text-sm text-lilac font-semibold flex items-center gap-1 v-popper--has-tooltip'>
            <i className="text-[12px] fa-regular fa-circle-check"></i>
            <span>Change points</span>
            <i className="text-[12px] fa-solid fa-caret-down"></i>
          </button>
        </div>
        <hr className='border-light-2' />
        <span className='font-semibold'>Nhập khẩu từ:</span>
        <button type='button' className='flex flex-col text-dark-6'>
          <div className='flex items-center pl-1  rounded hover:bg-[#0909090d] text-sm w-full text-left'>
            <i className="text-[12px] fa-solid fa-file-lines mr-2"></i>
            <span>Biểu mẫu Google</span>
            <div className='p-2 ml-auto h-full flex items-center rounded bg-light-2'>
              <i className="text-[12px] fa-solid fa-upload"></i>
            </div>
          </div>
        </button>
        <button type='button' className='flex flex-col text-dark-6'>
          <div className='flex items-center pl-1  rounded hover:bg-[#0909090d] text-sm w-full text-left'>
            <i className="text-[12px] fa-solid fa-file-lines mr-2"></i>
            <span>Biểu mẫu Google</span>
            <div className='p-2 ml-auto h-full flex items-center rounded bg-light-2'>
              <i className="text-[12px] fa-solid fa-upload"></i>
            </div>
          </div>
        </button>
        <hr className='border-light-2' />
        <button type='button' className='flex flex-col text-dark-6'>
          <div className='flex items-center pl-1  rounded hover:bg-[#0909090d] text-sm w-full text-left'>
            <i className="text-[12px] fa-solid fa-graduation-cap mr-2"></i>
            <span>Add grade</span>
            <div className='p-2 ml-auto h-full flex items-center rounded bg-light-2'>
              <i className="text-[12px] fa-solid fa-pencil"></i>
            </div>
          </div>
        </button>
        <button type='button' className='flex flex-col text-dark-6'>
          <div className='flex items-center pl-1  rounded hover:bg-[#0909090d] text-sm w-full text-left'>
            <i className="mr-2 text-[12px] fa-solid fa-book"></i>
            <span>Thêm môn học</span>
            <div className='p-2 ml-auto h-full flex items-center rounded bg-light-2'>
              <i className="text-[12px] fa-solid fa-pencil"></i>
            </div>
          </div>
        </button>
        <hr className='border-light-2' />
        <div className='flex flex-col text-sm text-dark-4'>
          <span>Tổng điểm</span>
          <p>
            <span className='font-semibold text-3xl mr-1'>1</span>
            <span>points,</span>
          </p>
          <p>
            <span className='font-semibold text-3xl mr-1'>1</span>
            <span>câu hỏi đã được chấm điểm</span>
          </p>
        </div>
      </div>
    </div>
  )
}
