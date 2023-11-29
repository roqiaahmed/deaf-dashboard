"use client"
// import React from 'react'
import { Product } from "@prisma/client"
import { useRouter } from "next/navigation"

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

interface ActionTableProps {
    initialData: Product | null
}

const ActionTable : React.FC<ActionTableProps> = (
{initialData}
) => {
    const router = useRouter()
    const category = initialData?.category.name
    const color = initialData?.color.name
    const scent = initialData?.scent.name
  return (
    <div>
        {!initialData && (<div> There is no data to show</div>)}
        {initialData && (
        <div className="rounded-md border">
            <Table className="table-auto">
                <TableBody>
                    <TableRow 
                    className="cursor-pointer"
                    onClick={() => router.push(`/${initialData.adminId}/Products/${initialData.id}`)}
                    >
                    <TableCell className="text-center w-[25%]">{initialData.id}</TableCell>
                    <TableCell className="text-center w-[20%]">{initialData.name}</TableCell>
                    <TableCell className="text-center w-[15%]">{color}</TableCell>
                    <TableCell className="text-center w-[15%]">{initialData.price}</TableCell>
                    <TableCell className="text-center w-[15%]">{scent}</TableCell>
                    <TableCell className="text-center w-[10%]">{category}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        )}
    </div>
  )
}
export default ActionTable;