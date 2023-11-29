import Image from 'next/image'
import logo from '@/public/logo.ico'

import MainNav from '@/components/main-nav'
import { Separator } from "@/components/ui/separator"
import { UserButton } from '@clerk/nextjs'

export default function Navbar() {
    return (
        <>
        <div className='border-b'>
            <div className='flex h-36 items-center px-4 '>
                <Image src={logo} alt="logo" width={100} height={100} />

                <MainNav className="mx-20"/>

                <div className='ml-auto flex items-center space-x-4 '>
                <UserButton afterSignOutUrl='/'/>
                </div>
            </div>
        </div>
        <Separator className='mb-9'/>
        </>
    )
}