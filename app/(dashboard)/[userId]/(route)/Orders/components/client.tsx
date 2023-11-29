"use client"
import React from 'react'
import { useParams, useRouter } from "next/navigation"
import { Heading } from '@/components/ui/heading'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Client() {
    const router = useRouter()
    const params = useParams()
  return (
    <div className='flex '>
        <Heading 
        title="Orders" 
        description="That's all the orders you have"
        />
    </div>
  )
}
