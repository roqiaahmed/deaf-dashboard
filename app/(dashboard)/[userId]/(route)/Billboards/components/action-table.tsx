"use client"
// import React from 'react'
import { Billboard } from "@prisma/client"
import { useRouter } from "next/navigation"

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

interface ActionTableProps {
    initialData: Billboard | null
}

const ActionTable : React.FC<ActionTableProps> = (
{initialData}
) => {
    const router = useRouter()
  return (
    <div>
        {!initialData && (<div> There is no data to show</div>)}
        {initialData && (
        <div className="rounded-md border">
            <Table className="table-auto">
                <TableBody>
                    <TableRow 
                    className="cursor-pointer"
                    onClick={() => router.push(`/${initialData.adminId}/Billboards/${initialData.id}`)}
                    >
                    <TableCell className="text-center w-[50%]">{initialData.id}</TableCell>
                    <TableCell className="text-center w-[50%]">{initialData.lable}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        )}
    </div>
  )
}
export default ActionTable;