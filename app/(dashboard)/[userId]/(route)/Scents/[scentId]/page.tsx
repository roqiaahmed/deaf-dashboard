import React from 'react'
import prismadb from '@/lib/prismadb'
import ScentForm from './components/scent-form'

const ScentPage = async(
    {params}:{params:{
        scentId:string,
    }}
) => {
    const scent = await prismadb.scent.findUnique({
        where:{
            id: params.scentId
        }
    })
  return (
    <div>
        <ScentForm initialData={scent}/>
    </div>
  )
}
export default ScentPage