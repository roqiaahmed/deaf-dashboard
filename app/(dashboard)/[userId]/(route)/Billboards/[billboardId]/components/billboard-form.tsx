"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useParams, useRouter} from "next/navigation"
import axios from "axios"

import { Billboard } from "@prisma/client"

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
import ImageUpload from "@/components/ui/image-upload"


const formSchema = z.object({
    lable: z.string().min(2, {
        message: "lable must be at least 2 characters.",
    }),
    urlImage: z.string().min(2, {
        message: "lable must be at least 2 characters.",
    }),
})

interface  BillboardFormProps {
    initialData: Billboard | null
}

const BillboardForm:React.FC<BillboardFormProps> = ({initialData}) =>
{
    const param = useParams()
    const route = useRouter()
    const title = initialData ? "Edit Billboard" : "New Billboard"
    const description = initialData ? "Edit your billboard here." : "Create a new billboard here."
    const action = initialData ? "Edit" : "Create"
    const toastmessage = initialData ? "Edit billboard" : "Create a new billboard here."

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            lable:  initialData? initialData.lable : "",
            urlImage: initialData? initialData.urlImage : "",
            },
        })
        
        function onSubmit(values: z.infer<typeof formSchema>) {
            try{
                if(initialData){
                    axios.patch(`/api/${param.userId}/billboards/${param.billboardId}`, values)
                }else{
                    axios.post(`/api/${param.userId}/billboards`, values)
                }
                toast.success(toastmessage)
                route.push(`/${param.userId}/Billboards`)
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
            .delete(`/api/${param.userId}/billboards/${param.billboardId}`)
            .then(() => {
                toast.success("Billboard deleted");
                route.push(`/${param.userId}/Billboards`);
                route.refresh();
            })
            .catch((error) => {
                toast.error("Be sure to delete all categories used this billboard frist!");
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
            name="urlImage"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Background Image</FormLabel>
                <ImageUpload 
                        value={field.value ? [field.value] : []} 
                        onChange={(url) => field.onChange(url)}
                        onRemove={() => field.onChange('')}
                    />
                <FormControl>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            {/* ##############LABLE################ */}
            <FormField
            control={form.control}
            name="lable"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Lable</FormLabel>
                
                <FormControl>
                    <Input placeholder="Billboard" {...field}  className="w-[20%] ml-0"/>
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
export default BillboardForm