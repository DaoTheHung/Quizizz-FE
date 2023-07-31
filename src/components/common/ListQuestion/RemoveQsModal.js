import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useStore } from '../../../../store/useStore'

export default function RemoveQsModal({ setShowModalRemove, showModalRemove, removeQuestion, id }) {
    const fetchDataQs = useStore(state => state.fetchData)

    const { data, error, isError, isLoading, refetch } = useQuery(['question'], fetchDataQs, {
        staleTime: 5000,
        refetchOnWindowFocus: false,
    })
    const hanldeRemoveQs = () => {
        setShowModalRemove(false)
        removeQuestion.mutate(id,
            {
                onSuccess: (response) => {
                    if (response) {
                        refetch()
                    }
                }
            }
        )
    }
    return (
        <>
            <div className='bg-[#fff]  w-[23rem] bottom-[242px] text-[#000] rounded-[6px] border border-[#ddd] shadow-[0_6px_30px_#0000001a] absolute box-border overflow-y-auto'>
                <div className='flex p-4 flex-row items-center body'>
                    <div className='flex items-center justify-center w-10 h-10 rounded-full icon-container shrink-0  text-red bg-[rgb(252_219_227/1)]'>
                        <i className="text-[16px] fa-regular fa-trash-can"></i>
                    </div>
                    <div className='flex-auto text-content ml-3'>
                        <h4 className='text-dark-6 text-sm'>Bạn có chắc chắn muốn xóa câu hỏi này?</h4>
                    </div>
                </div>
                <div className='flex flex-row items-center justify-end p-2 rounded-b btns-container bg-bd-ft'>
                    <button onClick={() => setShowModalRemove(!showModalRemove)} className='flex items-center mr-2 justify-center px-3 py-1 text-xs font-semibold h-6 bg-[rgb(252_219_227/1)] text-[rgb(236_11_67/1)] hover:text-[rgb(239_60_105/1)] active:text-red-dark rounded danger transition-colors duration-200 ease-in-out  relative min-w-max'>
                        <div>
                            Hủy
                        </div>
                    </button>
                    <button onClick={hanldeRemoveQs} className='flex items-center justify-center px-3 py-1 text-xs font-semibold h-6 bg-[rgb(252_219_227/1)] text-[rgb(236_11_67/1)] hover:text-[rgb(239_60_105/1)] active:text-red-dark rounded danger transition-colors duration-200 ease-in-out  relative min-w-max'>
                        <div>
                            Xóa
                        </div>
                    </button>
                </div>
            </div>

            <i className="fa-solid fa-caret-down right-[26px] top-[-6px] absolute text-white"></i>

        </>
    )
}
