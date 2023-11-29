import React from 'react'
import prismadb from '@/lib/prismadb'

import  DataTable  from './components/billboard-form'

const BillboardPage = async(
    {params}:{params:{billboardId:string}}
    )=>{
    const billboard = await prismadb.billboard.findUnique({
        where:{
            id: params.billboardId
        }
    })
        
    return (
        <div>
        <DataTable initialData={billboard}/>
        </div>
    )
}
export default BillboardPage