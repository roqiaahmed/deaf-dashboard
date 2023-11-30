import React from 'react'
import prismadb from '@/lib/prismadb'
import OrderForm from './components/order-form'

const OrderPage = async ({ params }: { params: { orderId: string } }) => {
  const order = await prismadb.order.findUnique({
    where: {
      id: params.orderId
    }
  })

  if (!order) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <OrderForm initialData={order} />
    </div>
  )
}

export default OrderPage