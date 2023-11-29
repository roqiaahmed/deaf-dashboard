"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useParams, useRouter} from "next/navigation"
import axios from "axios"

import {
    Product,
    Category,
    Color,
    Scent,
  } from "@prisma/client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import ImageUpload from "@/components/ui/image-upload"
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
    urlImage: z.string().min(1, {
        message: "must be at least image.",
    }),
    categoryId: z.string().min(1, {
        message: "select category.",
    }),
    colorId: z.string().min(1, {
        message: "select color.",
    }),
    scentId: z.string().min(1, {
        message: "select scent.",
    }),
    price: z.number().min(1, {
        message: "price must be at least 1 number.",
    }),
    description: z.string().min(2, {
        message: "description must be at least 2 characters.",
    }),
})

interface  ProductFormProps {
    initialData: Product | null
    colors: Color[],
    scents: Scent[],
    categories: Category[],
}

const ProductForm:React.FC<ProductFormProps> = ({
    initialData, 
    colors,
    scents,
    categories
}) =>
{
    const param = useParams()
    const route = useRouter()
    const title = initialData ? "Edit Product" : "New Product"
    const description = initialData ? "Edit your Product here." : "Create a new Product here."
    const action = initialData ? "Edit" : "Create"
    const toastmessage = initialData ? "Edit Product" : "Create a new Product here."

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name:  initialData? initialData.name : "",
            price: initialData? Number(initialData.price) : 0,
            description: initialData? initialData.description : "",
            urlImage: initialData? initialData.urlImage : "",
            categoryId: initialData? initialData.categoryId : "",
            colorId: initialData? initialData.colorId : "",
            scentId: initialData? initialData.scentId : "",
            },
        })
        
        function onSubmit(values: z.infer<typeof formSchema>) {
            try{
                if(initialData){
                    axios.patch(`/api/${param.userId}/products/${param.productId}`, values)
                }else{
                    axios.post(`/api/${param.userId}/products`, values)
                }
                toast.success(toastmessage)
                route.push(`/${param.userId}/Products`)
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
                axios.delete(`/api/${param.userId}/products/${param.productId}`)
                toast.success("product deleted")
                route.push(`/${param.userId}/Products`)
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 container mx-auto ">

            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>product name</FormLabel>
                
                <FormControl>
                    <Input placeholder="product name" {...field}  className="w-auto ml-0 mb-3"/>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem>
                <FormLabel>product price</FormLabel>
                
                <FormControl>
                    <Input placeholder="product price" {...field}  className="w-auto ml-0"
                              onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                field.onChange(isNaN(value) ? '' : value);
                              }}/>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
                <FormItem>
                <FormLabel>product description</FormLabel>
                
                <FormControl>
                    <Input placeholder="product description" {...field}  className="w-auto ml-0"/>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

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

            <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
                <FormItem className="w-[30%] ml-0">
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select lable" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
        />

        { <FormField
            control={form.control}
            name="colorId"
            render={({ field }) => (
                <FormItem className="w-[30%] ml-0">
                <FormLabel>colors</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {colors.map((color) => (
                            <SelectItem key={color.id} value={color.id}>
                                {color.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
        /> }

            <FormField
            control={form.control}
            name="scentId"
            render={({ field }) => (
                <FormItem className="w-[30%] ml-0">
                <FormLabel>Scents</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select scent" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {scents.map((scent) => (
                            <SelectItem key={scent.id} value={scent.id}>
                                {scent.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
        />
            <Button className="w-[30%] mt-5" type="submit">{action}</Button>
        </form>
        </Form> }
        </div>
        </>
    )
}
export default ProductForm