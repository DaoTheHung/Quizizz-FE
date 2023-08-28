import React from 'react'
import HeaderQuizDetail from '../../../src/components/QuizDetailPage/HeaderQuizDetail'
import QuizContent from '../../../src/components/QuizDetailPage/QuizContent'

export default function index() {
  return (
    <div className='w-full absolute h-full bg-bd '>
        <HeaderQuizDetail />
        <QuizContent />
    </div>
  )
}
