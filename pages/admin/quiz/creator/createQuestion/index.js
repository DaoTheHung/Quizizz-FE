import React, { useState } from 'react'
import HeaderCreateQs from '../../../../../src/components/Games/AnswerPickGame/HeaderCreateQs'
import ContentCreateQs from '../../../../../src/components/Games/AnswerPickGame/ContentCreateQs'
import ContentCreateQsWS from '../../../../../src/components/Games/FillWordGame/ContentCreateQsFW'

import { useRouter } from 'next/router'

export default function index() {
    const router = useRouter()
    const [typeQuiz, setTypeQuiz] = useState(``)
    
    return (
        <div className='w-full overflow-auto h-screen scrollbar-hide bg-dark-3 font-quick'>
            <main className='w-full h-full'>
                <HeaderCreateQs typeQuiz={typeQuiz} setTypeQuiz={setTypeQuiz} />
                {/* game đa lựa chọn */}
                {!router.query.games && <ContentCreateQs typeQuiz={typeQuiz} setTypeQuiz={setTypeQuiz} />}
                {/*game điền từ */}
                {router.query.games === 'fillword' && <ContentCreateQsWS typeQuiz={typeQuiz} setTypeQuiz={setTypeQuiz} />}
            </main>


        </div>
    )
}
