import Link from 'next/link'
import React, { useState } from 'react'
import { dataQuiz } from '../../common/Datafill/Data'
import { useRouter } from 'next/router'

export default function HeaderCreateQs({ setTypeQuiz, typeQuiz }) {
    const router = useRouter()
    const [showDataQuiz, setShowDataQuiz] = useState(false)

    // các kiểu chữ
    const [iconType, setIconType] = useState('')
    const [bg1, setBg1] = useState(false)
    const [bg2, setBg2] = useState(false)
    const [bg3, setBg3] = useState(false)
    const [bg4, setBg4] = useState(false)
    const [bg5, setBg5] = useState(false)
    const [bg6, setBg6] = useState(false)

    const handleSetIcon1 = () => {

        setBg1(!bg1)

    }
    const handleSetIcon2 = () => {

        setBg2(!bg2)

    }
    const handleSetIcon3 = () => {

        setBg3(!bg3)

    }
    const handleSetIcon4 = () => {

        setBg4(!bg4)

    }
    const handleSetIcon5 = () => {

        setBg5(!bg5)

    }
    const handleSetIcon6 = () => {

        setBg6(!bg6)

    }

    // Hiện các chủ đề quiz
    const handleShowDataQuiz = (name, icon) => {
        setIconType(icon)
        setTypeQuiz(name)
        setShowDataQuiz(false)
    }

    return (
        <header className='flex items-center p-2 bg-purple-4'>
            <Link href='/admin/quiz/creator'>
                <button type='button' className='flex items-center justify-center px-4 py-1.5 text-xs font-semibold h-8 transparent bg-[#fff3] text-white   hover:bg-[#ffffff54] rounded transparent transition-colors duration-200 ease-in-out  relative min-w-max'>
                    <i className="text-[11px] fa-solid fa-arrow-left mr-[8px]"></i>
                    <div>
                        Quay lại
                    </div>
                </button>
            </Link>
            <div className='flex items-center gap-x-2 relative px-2'>
                <div className='h-8 border border-[#ffffff1a]'>
                </div>
                <button className='flex rounded-none border-b-[2px] items-center justify-center w-7 h-7 bg-transparent text-white hover:bg-[#ffffff1a]   transition-colors duration-200 ease-in-out relative min-w-max '>
                    <i className="text-[11px] fa-solid fa-font"></i>
                </button>
                <div className='h-8 border border-[#ffffff1a]'>
                </div>
                {/*bg-lilac-faded text-lilac*/}
                <button
                    onClick={handleSetIcon1}
                    className={`${bg1 ? "bg-lilac-faded text-lilac" : "hover:bg-[#ffffff1a] text-white"}    flex rounded items-center justify-center w-7 h-7 transition-colors duration-200 ease-in-out relative min-w-max`}>
                    <i className='text-[11px] fa-solid fa-bold'></i>
                </button>
                <button
                    onClick={handleSetIcon2}
                    className={`${bg2 ? "bg-lilac-faded text-lilac" : "hover:bg-[#ffffff1a] text-white"}    flex rounded items-center justify-center w-7 h-7 transition-colors duration-200 ease-in-out relative min-w-max`}>
                    <i className='text-[11px] fa-solid fa-italic'></i>
                </button>
                <button
                    onClick={handleSetIcon3}
                    className={`${bg3 ? "bg-lilac-faded text-lilac" : "hover:bg-[#ffffff1a] text-white"}    flex rounded items-center justify-center w-7 h-7 transition-colors duration-200 ease-in-out relative min-w-max`}>
                    <i className='text-[11px] fa-solid fa-underline'></i>
                </button>
                <button
                    onClick={handleSetIcon4}
                    className={`${bg4 ? "bg-lilac-faded text-lilac" : "hover:bg-[#ffffff1a] text-white"}    flex rounded items-center justify-center w-7 h-7 transition-colors duration-200 ease-in-out relative min-w-max`}>
                    <i className='text-[11px] fa-solid fa-strikethrough'></i>
                </button>
                <button
                    onClick={handleSetIcon5}
                    className={`${bg5 ? "bg-lilac-faded text-lilac" : "hover:bg-[#ffffff1a] text-white"}    flex rounded items-center justify-center w-7 h-7 transition-colors duration-200 ease-in-out relative min-w-max`}>
                    <i className='text-[11px] fa-solid fa-superscript'></i>
                </button>
                <button
                    onClick={handleSetIcon6}
                    className={`${bg6 ? "bg-lilac-faded text-lilac" : "hover:bg-[#ffffff1a] text-white"}    flex rounded items-center justify-center w-7 h-7 transition-colors duration-200 ease-in-out relative min-w-max`}>
                    <i className='text-[11px] fa-solid fa-subscript'></i>
                </button>
                <button
                    className=' text-white hover:bg-[#ffffff1a]  flex rounded items-center justify-center w-7 h-7 transition-colors duration-200 ease-in-out relative min-w-max'>
                    <i className="text-[11px] fa-solid fa-signature"></i>
                </button>
                <div className='h-8 border border-[#ffffff1a]'>
                </div>
                <button className='text-xs font-semibold gap-[8px] py-4 px-[18px] text-white hover:bg-[#ffffff1a]  flex rounded items-center justify-center w-7 h-7 transition-colors duration-200 ease-in-out relative min-w-max'>
                    <i className="text-[11px] fa-solid fa-square-root-variable"></i>
                    <div>
                        Chèn kí hiệu toán học
                    </div>
                </button>

            </div>
            <div className='field relative  w-[220px] ml-auto'>
                <div className=' flex relative rounded w-full'>
                    <button onClick={() => setShowDataQuiz(true)} className='py-2 pl-2 pr-1 text-xs h-8 cursor-pointer bg-[#09090980] text-light-3 hover:bg-[#09090999]  w-full flex rounded font-semibold  whitespace-nowrap items-center'>
                        <div className='relative flex items-center justify-center p-1 bg-brand-b text-white rounded-sm mr-2'>
                            <i className={iconType}></i>
                        </div>
                        <div className='text-white mr-2'>
                            {typeQuiz ? typeQuiz : `${router.query.games}`}
                        </div>
                        <div className='text-white w-4 h-4 items-center justify-center flex relative ml-auto'>
                            {showDataQuiz ? <i className="text-[11px] fa-solid fa-caret-up"></i> : <i className="text-[11px] fa-solid fa-caret-down"></i>}
                        </div>
                    </button>
                    {showDataQuiz &&
                        <div className='list bg-white shadow-sortHig h-fit absolute z-30 transform rounded transition-transform  mt-2 scale-y-100 left-0 w-full top-full origin-top '>
                            <ul className='overflow-auto h-[630px]'>
                                {dataQuiz.slice(0, 9).map((item) => (

                                    <div onClick={() => handleShowDataQuiz(item.name, item.icon)} key={item.id} className='h-fit py-1.5 px-3  hover:bg-[#0909090d]'>

                                        <button className='flex items-center p-1 w-full text-dark-3 '>
                                            <div className='relative w-6 h-6 mr-2 rounded'>
                                                <div className=' relative flex items-center justify-center bg-brand-b text-white rounded h-full aspect-square'>
                                                    <i className={item.icon}></i>
                                                </div>
                                            </div>
                                            <div className='flex items-center justify-between w-full'>
                                                <div className='flex  text-sm font-semibold text-left truncate whitespace-normal text-dark-6 '>
                                                    {item.name}
                                                </div>
                                            </div>
                                        </button>

                                    </div>
                                ))}
                                {dataQuiz.slice(9, 14).map((item) => (

                                    <div onClick={() => handleShowDataQuiz(item.name)} key={item.id} className='h-fit py-1.5 px-3  hover:bg-[#0909090d]'>

                                        <button className='flex items-center p-1 w-full text-dark-3 '>
                                            <div className='relative w-6 h-6 mr-2 rounded'>
                                                <div className=' relative flex items-center justify-center bg-brand-e text-white rounded h-full aspect-square'>
                                                    <i className={item.icon}></i>
                                                </div>
                                            </div>
                                            <div className='flex items-center justify-between w-full'>
                                                <div className='flex  text-sm font-semibold text-left truncate whitespace-normal text-dark-6 '>
                                                    {item.name}
                                                </div>
                                            </div>
                                        </button>

                                    </div>
                                ))}
                                {dataQuiz.slice(14, 15).map((item) => (
                                    <div key={item.id} className='h-fit py-1.5 px-3  hover:bg-[#0909090d]'>
                                        <div onClick={() => handleShowDataQuiz(item.name)} className='h-fit'>
                                            <button className='flex items-center p-1 w-full text-dark-3 '>
                                                <div className='relative w-6 h-6 mr-2 rounded'>
                                                    <div className=' relative flex items-center justify-center bg-brand-a text-white rounded h-full aspect-square'>
                                                        <i className={item.icon}></i>
                                                    </div>
                                                </div>
                                                <div className='flex items-center justify-between w-full'>
                                                    <div className='flex  text-sm font-semibold text-left truncate whitespace-normal text-dark-6 '>
                                                        {item.name}
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                ))}


                            </ul>
                        </div>}
                </div>
            </div>
        </header>
    )
}
