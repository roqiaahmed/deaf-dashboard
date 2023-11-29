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
        title="Scents" 
        description="Manage your Scents here."
        />
        <div className='ml-auto w-[10%]'>
            <Button onClick={()=>{router.push(`/${params.userId}/Scents/New`)}}>
                <Plus /> <span>Add New</span>
            </Button>
        </div>
    </div>
  )
}
