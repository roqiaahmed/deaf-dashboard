import Navbar from '@/components/navbar'
import { Toaster } from 'react-hot-toast'
import React from 'react'

export default function layout(
    { children, params }
    : 
    {
    children: React.ReactNode 
    params: {userId: string}
    },
    
) {
  return (
    <div className='md:container md:mx-auto' >
        <Navbar />
        <Toaster />
            {children}
    </div>
  )
}
