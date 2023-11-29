import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(
    req:Request,
    {params}:{params:{userId:string}}
    ) {
        
    try {
        const body = await req.json();
        const { 
            name,
            address,
            phone,
            cost,
            details,
        } = body;

        const status = "pending"

        if (!name || !address || !phone || !cost || !details) {
            return new NextResponse("BAD_REQUEST", { status: 400 });
        }

        const order = await prismadb.order.create({
            data: {
                name,      
                address,  
                phone,     
                cost,     
                details,
                status
            }
        })

        return NextResponse.json(order, { status: 201})
    }
    catch (error) {
        console.log('[ERROR] admin/orders/route.ts POST', error);
        return new NextResponse("INTERNAL_ERROR", { status: 500 });
    }
}

export async function GET(
    req:Request,
    {params}:{params:{userId:string}}
){
    try {
        const orders = await prismadb.order.findMany()
        return NextResponse.json(orders);
    }
    catch (error) {
        console.log('[ERROR] admin/orders/route.ts GET', error);
        return new NextResponse("INTERNAL_ERROR", { status: 500 });
    }
}