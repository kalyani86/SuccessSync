import { SignIn } from '@clerk/nextjs'
import React from 'react'

const signin = () => {
  return (
    <div className='pt-30'>
        <SignIn/>
    </div>
  )
}
export default signin;