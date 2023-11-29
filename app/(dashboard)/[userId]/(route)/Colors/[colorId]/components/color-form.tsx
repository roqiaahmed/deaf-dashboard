"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useParams, useRouter} from "next/navigation"
import axios from "axios"

import { Color } from "@prisma/client"

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
    }),
    value: z.string().min(4).max(9).regex(/^#/, {
        message: 'String must be a valid hex code'
    }),
})

interface  ColorFormProps {
    initialData: Color | null
}

const ColorForm:React.FC<ColorFormProps> = ({initialData}) =>
{
    const param = useParams()
    const route = useRouter()
    const title = initialData ? "Edit Color" : "New Color"
    const description = initialData ? "Edit your Color here." : "Create a new Color here."
    const action = initialData ? "Edit" : "Create"
    const toastmessage = initialData ? "Edit Color" : "Create a new Color here."

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name:  initialData? initialData.name : "",
            value: initialData? initialData.value : "",
            },
        })
        
        function onSubmit(values: z.infer<typeof formSchema>) {
            try{
                if(initialData){
                    axios.patch(`/api/${param.userId}/colors/${param.colorId}`, values)
                }else{
                    axios.post(`/api/${param.userId}/colors`, values)
                }
                toast.success(toastmessage)
                route.push(`/${param.userId}/Colors`)
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
            .delete(`/api/${param.userId}/colors/${param.colorId}`)
            .then(() => {
                toast.success("Color deleted");
                route.push(`/${param.userId}/Colors`)
                route.refresh();
            })
            .catch((error) => {
                toast.error("Be sure to delete all products used this color frist!");
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
                    <Input placeholder="color" {...field}  className="w-[20%] ml-0"/>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
                <FormItem>
                <FormLabel>value</FormLabel>
                
                <FormControl>
                    <div className="flex ">
                    <Input placeholder="color value" {...field}  className="w-[20%] ml-0 mr-2"/>

                    <div 
                        className="rounded-full w-8 h-8 my-1 border-[1px] border-[#e5e7eb]" 
                        style={{ backgroundColor: field.value }}
                    />
                    </div>
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
export default ColorForm