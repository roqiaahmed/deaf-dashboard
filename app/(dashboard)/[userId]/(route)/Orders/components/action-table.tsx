"use client"

import { Order } from "@prisma/client"
import { useRouter } from "next/navigation"

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

interface ActionTableProps {
    initialData: Order | null
    userId: string
}

const ActionTable : React.FC<ActionTableProps> = (
{initialData, userId}
) => {
    const router = useRouter()

    
  return (
    <div>
        {!initialData && (<div> There is no data to show</div>)}
        {initialData && (
        <div className="rounded-md border">
            <Table 
            style={initialData.status === "done" ? {backgroundColor: "#4bff9242"} : {backgroundColor: "#FFFFFF"}}
            className="table-auto">
                <TableBody >
                    <TableRow 
                    className="cursor-pointer "
                    onClick={() => router.push(`/${userId}/Orders/${initialData.id}`)}
                    >
                    <TableCell className="text-center w-[14%]">{initialData.name}</TableCell>
                    <TableCell className="text-center w-[15%]">{initialData.phone}</TableCell>
                    <TableCell className="text-center w-[25%]">{initialData.address}</TableCell>
                    <TableCell className="text-center w-[30%]">
                      {Object.entries(initialData?.details).map(([key, value]) => (
                        <div className="grid grid-cols-2" key={key}>
                          <div>{value.product.name}</div>
                          <div>{value.count}</div>
                        </div>
                      ))}
                      </TableCell>
                    <TableCell className="text-center w-[8%]">{initialData.cost}</TableCell>
                    <TableCell className="text-center w-[8%]">{initialData.status}</TableCell>                    
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        )}
    </div>
  )
}
export default ActionTable;