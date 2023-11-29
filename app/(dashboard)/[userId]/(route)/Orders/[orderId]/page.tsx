import React from 'react'
import prismadb from '@/lib/prismadb'
import OrderForm from './components/order-form'

const orderPage = async(
    {params}:{params:{
        orderId:string,
    }}
) => {
    const order = await prismadb.order.findUnique({
        where:{
            id: params.orderId
        }
    })
  return (
    <div>
        <OrderForm initialData={order}/>
    </div>
  )
}
export default orderPage