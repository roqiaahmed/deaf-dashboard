import React from 'react'
import prismadb from '@/lib/prismadb'
import ActionTable from './components/action-table'
import  Client  from './components/client'
import Columns  from './components/action-table'
import HeaderTable from './components/headertable'


const CategoriesPage = async(
  {params}:{params:{userId:string}}
)=>{
  const Categories = await prismadb.category.findMany({
    where:{
      adminId:params.userId
    },
    include:{
      billboard:true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
console.log("=================================>Categories", Categories);
return (
  <div>
    <Client />
    <HeaderTable />
    {Categories.map((category) =>(
       <div key={category.id}>
          <ActionTable initialData={category}/>
       </div>
    ))}
  </div>
)

}
export default CategoriesPage