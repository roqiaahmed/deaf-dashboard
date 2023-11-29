"use client"
// import React from 'react'
import { Color } from "@prisma/client"
import { useRouter } from "next/navigation"

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

interface ActionTableProps {
    initialData: Color | null
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
                    onClick={() => router.push(`/${initialData.adminId}/Colors/${initialData.id}`)}
                    >
                    <TableCell className="text-center w-[35%]">{initialData.id}</TableCell>
                    <TableCell className="text-center w-[35%]">{initialData.name}</TableCell>
                    <TableCell className="text-center w-[35%]">
                      <div  className="rounded-full w-8 h-8 align-middle m-auto border-[1px] border-[#e5e7eb]" 
                            style={{backgroundColor : `${initialData.value}`}}/>
                    </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        )}
    </div>
  )
}
export default ActionTable;