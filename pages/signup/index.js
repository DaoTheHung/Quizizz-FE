import React from 'react'
import FormSignUp from '../../src/components/SignUpPage/FormSignUp'
import LoginHeader from '../../src/components/LoginPage/LoginHeader'
import ImageForm from '../../src/components/LoginPage/ImageForm'

export default function index() {
  return (
    <>
            <LoginHeader />
            <div className=' absolute left-0 w-full overflow-x-hidden signup-view top-0 bg-purple-1 h-full'>
                <div className='flex mt-[10rem] h-[36rem] rounded-[0.5rem] md:w-fit mx-auto bg-[#fff]'>
                    <FormSignUp />
                    <ImageForm />
                </div>
            </div>
        </>
  )
}
