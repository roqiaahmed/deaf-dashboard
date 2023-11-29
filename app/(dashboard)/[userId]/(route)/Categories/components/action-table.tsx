"use client"
// import React from 'react'
import { Category } from "@prisma/client"
import { useRouter } from "next/navigation"

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

interface ActionTableProps {
    initialData: Category | null
}

const ActionTable : React.FC<ActionTableProps> = (
{initialData}
) => {
    const router = useRouter()
    const lable = initialData?.billboard.lable
  return (
    <div>
        {!initialData && (<div> There is no data to show</div>)}
        {initialData && (
        <div className="rounded-md border">
            <Table className="table-auto">
                <TableBody>
                    <TableRow 
                    className="cursor-pointer"
                    onClick={() => router.push(`/${initialData.adminId}/Categories/${initialData.id}`)}
                    >
                    <TableCell className="text-center w-[35%]">{initialData.id}</TableCell>
                    <TableCell className="text-center w-[35%]">{initialData.name}</TableCell>
                    <TableCell className="text-center w-[30%]">{lable}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        )}
    </div>
  )
}
export default ActionTable;