"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useParams, useRouter} from "next/navigation"
import axios from "axios"

import { Order } from "@prisma/client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Trash } from "lucide-react"
import { toast } from "react-hot-toast"


const formSchema = z.object({
    status: z.string().min(3, {
        message: "name must be at least 3 characters.",
    })
})

interface  ScentFormProps {
    initialData: Order
}

const ScentForm:React.FC<ScentFormProps> = ({initialData}) =>
{
    const param = useParams()
    const route = useRouter()
    const title =  "Update status" 
    const description =  "Update status in this order." 
    const action =  "Update" 
    const toastmessage =  "Update status"

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: initialData.status,
            },
        })
        
        function onSubmit(values: z.infer<typeof formSchema>) {
            try{
                if(initialData){
                    axios.patch(`/api/${param.userId}/orders/${param.orderId}`, values)
                }
                toast.success(toastmessage)
                route.push(`/${param.userId}/Orders`)
                route.refresh()
            }
            catch (error) {
                console.log(error)
                toast.error("Something went wrong!")
            }
            console.log(values)
        }

        function onDelete() {
            try{
                axios.delete(`/api/${param.userId}/orders/${param.orderId}`)
                toast.success("order deleted")
                route.push(`/${param.userId}/Orders`)
                route.refresh()
            }
            catch (error) {
                console.log(error)
                toast.error("Something went wrong!")
            }
        }

    return (
        <>
        <div className="flex align-middle ">
            <Heading 
            title={title}
            description={description}
            />
        <div className="w-[7%] ml-auto">
            <Button 
                size="icon" 
                onClick={onDelete} 
                variant="destructive">
                <Trash size={15}/>
            </Button>
        </div>
        </div>
        <div className="m-9">
        <Separator className='my-5'/>
        {<Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
                <FormItem>
                <FormLabel>status</FormLabel>
                
                <FormControl>
                    <Input placeholder="status" {...field}  className="w-[20%] ml-0"/>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit">{action}</Button>
        </form>
        </Form> }
        </div>
        </>
    )
}
export default ScentForm