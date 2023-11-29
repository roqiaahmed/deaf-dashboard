import React from 'react'
import prismadb from '@/lib/prismadb'
import Client from './components/client'
import ActionTable from './components/action-table'
import HeaderTable from './components/headertable'

const ScentsPage = async (
  { params }: { params: { userId: string } }
) => {
  const Scents = await prismadb.scent.findMany({
    where: {
      adminId: params.userId
    }
  })
  return (
    <div>
      <Client />
      <HeaderTable />
      {Scents.map((scent) => (
        <div key={scent.id}>
          <ActionTable initialData={scent} />
        </div>
      ))}
    </div>
  )
}

export default ScentsPage