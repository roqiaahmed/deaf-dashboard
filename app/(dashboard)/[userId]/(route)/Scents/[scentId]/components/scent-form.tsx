"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useParams, useRouter} from "next/navigation"
import axios from "axios"

import { Scent } from "@prisma/client"

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
    name: z.string().min(3, {
        message: "name must be at least 3 characters.",
    })
})

interface  ScentFormProps {
    initialData: Scent | null
}

const ScentForm:React.FC<ScentFormProps> = ({initialData}) =>
{
    const param = useParams()
    const route = useRouter()
    const title = initialData ? "Edit Scent" : "New Scent"
    const description = initialData ? "Edit your Scent here." : "Create a new Scent here."
    const action = initialData ? "Edit" : "Create"
    const toastmessage = initialData ? "Edit Scent" : "Create a new Scent here."

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name:  initialData? initialData.name : "",
            },
        })
        
        function onSubmit(values: z.infer<typeof formSchema>) {
            try{
                if(initialData){
                    axios.patch(`/api/${param.userId}/scents/${param.scentId}`, values)
                }else{
                    axios.post(`/api/${param.userId}/scents`, values)
                }
                toast.success(toastmessage)
                route.push(`/${param.userId}/Scents`)
                route.refresh()
            }
            catch (error) {
                console.log(error)
                toast.error("Something went wrong!")
            }
            console.log(values)
        }

        function onDelete() {
            axios
            .delete(`/api/${param.userId}/scents/${param.scentId}`)
            .then(() => {
                toast.success("Scent deleted")
                route.push(`/${param.userId}/Scents`)
                route.refresh();
            })
            .catch((error) => {
                toast.error("Be sure to delete all products used this scent frist!");
                console.log(error);
            });
        }

    return (
        <>
        <div className="flex align-middle ">
            <Heading 
            title={title}
            description={description}
            />
            {initialData && 
                <div className="w-[7%] ml-auto">
                <Button 
                size="icon" 
                onClick={onDelete} 
                variant="destructive">
                    <Trash size={15}/>
                </Button>
                </div>
            }
        </div>
        <div className="m-9">
        <Separator className='my-5'/>
        {<Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>name</FormLabel>
                
                <FormControl>
                    <Input placeholder="scent" {...field}  className="w-[20%] ml-0"/>
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