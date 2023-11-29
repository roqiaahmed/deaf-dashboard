import React from 'react'

import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function HeaderTable() {
  return (
    <Table>
    <TableHeader>
        <TableRow>
        <TableHead className="w-[25%] text-center ml-[20%]">Id</TableHead>
        <TableHead className="w-[20%] text-center">Name</TableHead>
        <TableHead className="w-[15%] text-center">Color</TableHead>
        <TableHead className="w-[15%] text-center">Price</TableHead>
        <TableHead className="w-[15%] text-center">Scent</TableHead>
        <TableHead className="w-[10%] text-center">Category</TableHead>
        </TableRow>
    </TableHeader>
    </Table>
  )
}
