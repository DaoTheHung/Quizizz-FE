import React from 'react'
import HeaderCreateQs from '../../../../../src/components/CreateQuestionPage/HeaderCreateQs'
import ContentCreateQs from '../../../../../src/components/CreateQuestionPage/ContentCreateQs'

export default function index() {
    return (
        <div className='w-full overflow-auto h-screen scrollbar-hide bg-dark-3 font-quick'>
            <main className='w-full h-full'>
                <HeaderCreateQs />
                <ContentCreateQs />
            </main>
        </div>
    )
}
