import React from 'react'
import prismadb from '@/lib/prismadb'

import  DataTable  from './components/product-form'

const ProductPage = async(
    {params}:{params:{
        productId:string,
        userId:string
    }}
    )=>{
    const product = await prismadb.product.findUnique({
        where:{
            id: params.productId
        },
        include:{
            category:true,
            color:true,
            scent:true,
        }
    })

    const categories = await prismadb.category.findMany({
        where:{
            adminId: params.userId
        }
    })

    const colors = await prismadb.color.findMany({
        where:{
            adminId: params.userId
        }
    })

    const scents = await prismadb.scent.findMany({
        where:{
            adminId: params.userId
        }
    })
    return (
        <div>
        <DataTable 
        categories={categories} 
        colors={colors}
        scents={scents}
        initialData={product}/>
        </div>
    )
}
export default ProductPage