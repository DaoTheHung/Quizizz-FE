import React from 'react'
import HeaderQuiz from '../../../../src/components/QuizCreatorPage/HeaderQuiz'
import SearchQuiz from '../../../../src/components/QuizCreatorPage/SearchQuiz'
import DataTypeQuiz from '../../../../src/components/QuizCreatorPage/DataTypeQuiz'
import { useStore } from '../../../../store/useStore'
import { useQuery } from '@tanstack/react-query'
import ListQuestion from '../../../../src/components/QuizCreatorPage/ListQuestion'
import BlockRight from '../../../../src/components/QuizCreatorPage/BlockRight'

export default function index() {
  const fetchDataQs = useStore(state => state.fetchData)

  const { data, error, isError, isLoading } = useQuery(["question"], fetchDataQs, {
    staleTime: 5000,
    refetchOnWindowFocus: false,
  })


  return (
    <div className='w-full '>
      <div className='relative overflow-y-auto h-screen w-full max-h-screen bg-bd'>

        <HeaderQuiz />

        <div className='w-full'>
          <div className='flex w-full'>
            <div className='w-full'>
              <SearchQuiz />
              {data?.data.question.length > 0 && <ListQuestion />}
            </div>
            {data?.data.question.length > 0 && <BlockRight />}
          </div>
          {data?.data.question.length <= 0 && <div className='text-center text-sm font-bold py-4'>hoặc, Tạo một câu hỏi mới</div>}
          {data?.data.question.length <= 0 && <DataTypeQuiz />}
        </div>


      </div>

    </div >

  )
}
