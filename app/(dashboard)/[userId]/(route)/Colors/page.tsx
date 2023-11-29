import React from 'react'
import prismadb from '@/lib/prismadb'
import Client from './components/client'
import ActionTable from './components/action-table'
import HeaderTable from './components/headertable'

const ColorsPage = async (
  { params }: { params: { userId: string } }
) => {
  const Colors = await prismadb.color.findMany({
    where: {
      adminId: params.userId
    }
  })
  return (
    <div>
      <Client />
      <HeaderTable />
      {Colors.map((color) => (
        <div key={color.id}>
          <ActionTable initialData={color} />
        </div>
      ))}
    </div>
  )
}

export default ColorsPage