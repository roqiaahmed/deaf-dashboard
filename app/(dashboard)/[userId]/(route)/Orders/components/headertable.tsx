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
        <TableHead className="w-[14%] text-center ml-[20%]">Name</TableHead>
        <TableHead className="w-[15%] text-center">Phone</TableHead>
        <TableHead className="w-[25%] text-center">Address</TableHead>
        <TableHead className="w-[30%] text-center">Orders & Quantity</TableHead>
        <TableHead className="w-[8%] text-center">Total</TableHead>
        <TableHead className="w-[8%] text-center">status</TableHead>
        </TableRow>
    </TableHeader>
    </Table>
  )
}
