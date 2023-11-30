"use client"
// import React from 'react'
import { useState, useEffect } from "react"
import { Product } from "@prisma/client"
import { useRouter, useParams } from "next/navigation"
import prismadb from '@/lib/prismadb'

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
    const param = useParams()
    const [category, setCategory] = useState<string | undefined>(undefined);
    const [color, setColor] = useState<string | undefined>(undefined);
    const [scent, setScent] = useState<string | undefined>(undefined);
    useEffect(() => {
      const fetchCategory = async () => {
        try {
          const response = await fetch(`/api/${param.userId}/categories/${initialData?.categoryId}`);
          const data = await response.json();
          setCategory(data.name);
          
        } catch (error) {
          console.error('Error fetching category:', error);
        }
      };

      const fetchColor = async () => {
        try {
          const response = await fetch(`/api/${param.userId}/colors/${initialData?.colorId}`);
          const data = await response.json();
          setColor(data.name);
          
        } catch (error) {
          console.error('Error fetching category:', error);
        }
      };

      const fetchScent = async () => {
        try {
          const response = await fetch(`/api/${param.userId}/scents/${initialData?.scentId}`);
          const data = await response.json();
          setScent(data.name);
          
        } catch (error) {
          console.error('Error fetching category:', error);
        }
      };

      fetchColor();
      fetchScent();
      fetchCategory();
    },)
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