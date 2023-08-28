import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import { useRouter } from 'next/router';
export default function DateGameMode() {
    const router = useRouter()
    //
    const [showDate, setShowDate] = useState(false)
    const [startDate, setStarDate] = useState(new Date())

    // Format date
    const weekday = ["chủ nhật", "hai", "ba", "tư", "năm", "sáu", "bảy"];
    const newDate = `thứ` + " " + weekday[(startDate.getDay())] + " " + "tháng" + " " + (startDate.getMonth() + 1) + " " + startDate.getDate()
    return (
        <>
            <div className='mt-3'>
                <div className='flex flex-col md:flex-row md:items-center justify-between'>
                    <div className='w-[205px]'>
                        <div className='relative flex-grow w-full border rounded md:min-w-max md:w-50 border-light-2 px-2 py-2 h-10'>
                            <button type='button' onClick={() => setShowDate(!showDate)} className='flex items-center justify-between w-full h-full'>
                                <div className='text-sm font-semibold text-dark-3'>
                                    {newDate}
                                </div>
                                <i className="text-[16px] text-lilac ml-3 fa-regular fa-calendar"></i>
                            </button>
                        </div>
                        <div className='mt-2 absolute z-10'>
                            {showDate && <DatePicker
                                monthsShown={1}
                                inline selected={startDate}
                                onChange={(date) => setStarDate(date)}
                            />}
                        </div>
                    </div>
                    <span className='hidden items-end m-2 md:flex'>,</span>
                    <div className='flex mt-2 md:mt-0'>

                        <div className='select w-full inline-flex relative'>
                            <button className='listbox-button flex items-center cursor-pointer box-border text-left rounded font-semibold text-sm text-dark-3 p-4 border border-light-2 text-dark-2 pl-2 pr-1 py-2 h-10 w-full'>
                                <div className='title w-full truncate text-sm'>11</div>
                                <div className='ml-auto flex items-center justify-center w-6 h-6'>
                                    <i className='flex items-center fas fa-caret-down text-dark-3'></i>
                                </div>
                            </button>
                        </div>

                    </div>
                    <span className='flex items-center m-2 mx-2'>:</span>
                    <div className='select  inline-flex relative'>
                        <button className='listbox-button flex items-center cursor-pointer box-border text-left rounded font-semibold text-sm text-dark-3 p-4 border border-light-2 pl-2 pr-1 py-2 h-10 w-full'>
                            <div className='title w-full truncate text-sm'>
                                00
                            </div>
                            <div className='ml-auto flex items-center justify-center w-6 h-6'>
                                <i className='flex items-center fas fa-caret-down text-dark-3'></i>
                            </div>
                        </button>
                    </div>
                    <span className='flex items-center m-2 mx-2'></span>
                    <div className='select inline-flex relative'>
                        <button className='listbox-button flex items-center cursor-pointer box-border text-left rounded font-semibold text-sm text-dark-3 p-4 border border-light-2 pl-2 pr-1 py-2 h-10 w-full'>
                            <div className='title w-full truncate text-sm'>
                                PM
                            </div>
                            <div className='ml-auto flex items-center justify-center w-6 h-6'>
                                <i className='flex items-center fas fa-caret-down text-dark-3'></i>
                            </div>
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}
