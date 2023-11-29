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
        <TableHead className="w-[50%] text-center ml-[20%]">Id</TableHead>
        <TableHead className="w-[50%] text-center">Lable</TableHead>
        </TableRow>
    </TableHeader>
    </Table>
  )
}
