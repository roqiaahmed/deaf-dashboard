import React from 'react'
import prismadb from '@/lib/prismadb'
import ActionTable from './components/action-table'
import  Client  from './components/client'
import Columns  from './components/action-table'
import HeaderTable from './components/headertable'


const ProductsPage = async(
  {params}:{params:{userId:string}}
)=>{
  const Products = await prismadb.product.findMany({
    where:{
      adminId:params.userId
    },
    include:{
      category:true,
      color:true,
      scent:true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
console.log("=================================>Products", Products);
return (
  <div>
    <Client />
    <HeaderTable />
    {Products.map((product) =>(
       <div key={product.id}>
          <ActionTable initialData={product}/>
       </div>
    ))}
  </div>
)

}
export default ProductsPage