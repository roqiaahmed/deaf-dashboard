"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useParams, useRouter} from "next/navigation"
import axios from "axios"

import { Category, Billboard } from "@prisma/client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Trash } from "lucide-react"
import { toast } from "react-hot-toast"


const formSchema = z.object({
    name: z.string().min(2, {
        message: "name must be at least 2 characters.",
    }),
    billboardId: z.string().min(1),
})

interface  CategoryFormProps {
    initialData: Category | null
    billboards: Billboard[];
}

const CategoryForm:React.FC<CategoryFormProps> = ({initialData, billboards}) =>
{
    const param = useParams()
    const route = useRouter()
    const title = initialData ? "Edit Category" : "New Category"
    const description = initialData ? "Edit your Category here." : "Create a new Category here."
    const action = initialData ? "Edit" : "Create"
    const toastmessage = initialData ? "Edit Category" : "Create a new Category here."

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name:  initialData? initialData.name : "",
            billboardId : initialData? initialData.billboardId : "",
            },
        })
        
        function onSubmit(values: z.infer<typeof formSchema>) {
            try{
                if(initialData){
                    axios.patch(`/api/${param.userId}/categories/${param.categoryId}`, values)
                }else{
                    axios.post(`/api/${param.userId}/categories`, values)
                }
                toast.success(toastmessage)
                route.push(`/${param.userId}/Categories`)
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
            .delete(`/api/${param.userId}/categories/${param.categoryId}`)
            .then(() => {
                toast.success("Category deleted");
                route.push(`/${param.userId}/Categories`)
                route.refresh();
            })
            .catch((error) => {
                toast.error("Be sure to delete all products used this category frist!");
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
                    <Input placeholder="Category" {...field}  className="w-[20%] ml-0"/>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="billboardId"
            render={({ field }) => (
                <FormItem className="w-[20%] ml-0">
                <FormLabel>billboard lable</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select lable" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {billboards.map((billboard) => (
                            <SelectItem key={billboard.id} value={billboard.id}>
                                {billboard.lable}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
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
export default CategoryForm