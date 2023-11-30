"use client"
import { useEffect, useState } from 'react';
import { Category } from "@prisma/client";
import { useRouter, useParams } from "next/navigation";


import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

interface ActionTableProps {
  initialData: Category | null;
}

const ActionTable: React.FC<ActionTableProps> = ({ initialData }) => {
  const router = useRouter();
  const param = useParams();
  const [label, setLabel] = useState<string | undefined>(undefined);

  useEffect(() => {
    const getLabel = async () => {
      try {
        const response = await fetch(`/api/${param.userId}/billboards/${initialData?.billboardId}`);
        const data = await response.json();
        setLabel(data.lable);
        
      } catch (error) {
        console.error('Error fetching label:', error);
      }
    };

    if (initialData?.billboardId) {
      getLabel();
    }
  },);

  return (
    <div>
      {!initialData && <div>There is no data to show</div>}
      {initialData && (
        <div className="rounded-md border">
          <Table className="table-auto">
            <TableBody>
              <TableRow
                className="cursor-pointer"
                onClick={() =>
                  router.push(`/${initialData.adminId}/Categories/${initialData.id}`)
                }
              >
                <TableCell className="text-center w-[35%]">{initialData.id}</TableCell>
                <TableCell className="text-center w-[35%]">{initialData.name}</TableCell>
                <TableCell className="text-center w-[30%]">{label}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ActionTable;
