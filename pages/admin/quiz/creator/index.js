import React, { useState, useEffect } from 'react'
import HeaderQuiz from '../../../../src/components/QuizCreatorPage/HeaderQuiz'
import SearchQuiz from '../../../../src/components/QuizCreatorPage/SearchQuiz'
import DataTypeQuiz from '../../../../src/components/QuizCreatorPage/DataTypeQuiz'
import { useStore } from '../../../../store/useStore'
import { useQuery } from '@tanstack/react-query'
import ListQuestion from '../../../../src/components/QuizCreatorPage/ListQuestion'
import BlockRight from '../../../../src/components/QuizCreatorPage/BlockRight'

export default function index() {
  const [dataQuestion, setDataQuestion] = useState([])

  const fetchDataQs = useStore(state => state.fetchData)
  const { data, error, isError, isLoading } = useQuery(["question"], fetchDataQs, {
    staleTime: 5000,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('question'))
    if (local !== null) {
      setDataQuestion(local)
    }
  }, [])

  return (
    <div className='w-full '>
      <div className='relative overflow-y-auto h-screen w-full max-h-screen bg-bd'>

        <HeaderQuiz data={data} dataQuestion={dataQuestion}/>

        <div className='w-full'>
          <div className='flex w-full'>
            <div className='w-full'>
              <SearchQuiz />
              {dataQuestion.length > 0 && <ListQuestion data={data} />}
            </div>
            {dataQuestion.length > 0 && <BlockRight />}
          </div>
          {dataQuestion.length <= 0 && <div className='text-center text-sm font-bold py-4'>hoặc, Tạo một câu hỏi mới</div>}
          {dataQuestion.length <= 0 && <DataTypeQuiz />}
        </div>


      </div>

    </div >

  )
}
