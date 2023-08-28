import React from 'react'
import GameMode from '../../../../src/components/StartNewPage/GameMode'

export default function index() {
    return (
        <div>
            <div className='w-full '>
                <div className='absolute left-0  h-full w-full  bg-bd'>
                    <GameMode />
                </div>
            </div>
        </div>
    )
}
