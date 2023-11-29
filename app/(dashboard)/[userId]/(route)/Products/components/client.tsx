"use client"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"


const Client = () => {
const router = useRouter()
const params = useParams()
    return (
        <div className="flex align-middle ">
            <Heading 
            title="Products"
            description="Manage your Product here."
            />
            <div className="w-[10%] ml-auto">
            <Button onClick={()=>{ router.push(`/${params.userId}/Products/New`) }}>
                <Plus /> <span>Add New</span>
            </Button>
            </div>
        </div>
    )
}
export default Client;