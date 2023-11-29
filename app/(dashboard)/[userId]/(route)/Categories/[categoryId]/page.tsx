import React from 'react'
import prismadb from '@/lib/prismadb'

import  DataTable  from './components/category-form'

const BillboardPage = async(
    {params}:{params:{
        categoryId:string,
        userId:string
    }}
    )=>{
    const category = await prismadb.category.findUnique({
        where:{
            id: params.categoryId
        },
        include:{
            billboard: true
        }
    })

    const billboards = await prismadb.billboard.findMany({
        where:{
            adminId: params.userId
        }
    })

    return (
        <div>
        <DataTable billboards={billboards} initialData={category}/>
        </div>
    )
}
export default BillboardPage