import React from 'react'
import prismadb from '@/lib/prismadb'
import ActionTable from './components/action-table'
import  Client  from './components/client'
import Columns  from './components/action-table'
import HeaderTable from './components/headertable'


const BillboardsPage = async(
  {params}:{params:{userId:string}}
)=>{
  const Billboards = await prismadb.billboard.findMany({
    where:{
      adminId:params.userId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
console.log("=================================>Billboards", Billboards);
return (
  <div>
    <Client />
    <HeaderTable />
    {Billboards.map((billboard) =>(
       <div key={billboard.id}>
          <ActionTable initialData={billboard}/>
       </div>
    ))}
  </div>
)

}
export default BillboardsPage