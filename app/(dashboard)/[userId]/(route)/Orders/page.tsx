import React from 'react'
import prismadb from '@/lib/prismadb'
import Client from './components/client'
import ActionTable from './components/action-table'
import HeaderTable from './components/headertable'

const OrdersPage = async (
  { params }: { params: { userId: string } }
) => {
  const Orders = await prismadb.order.findMany(
    {
      orderBy: {
        createdAt: 'desc'
      }
    }
  )
  return (
    <div>
      <Client />
      <HeaderTable />
      {Orders.map((order) => (
        <div key={order.id}>
          <ActionTable userId={params.userId} initialData={order} />
        </div>
      ))}
    </div>
  )
}

export default OrdersPage