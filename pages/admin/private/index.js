import React, { useState } from 'react'
import ListQuiz from '../../../src/components/PrivatePage/ListQuiz'

export default function index() {
  const [show, setShow] = useState(false)
  return (
    <div onClick={() => setShow(false)} className='w-full absolute h-full bg-bd '>
      <ListQuiz show={show} setShow={setShow}/>
    </div>
  )
}
