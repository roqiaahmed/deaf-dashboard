import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function GET(
    req:Request,
    { params }:
    {params:{userId:string, orderId:string}})
    {
        try {
            const userId  = params.userId;
            if (!userId) {
                return new NextResponse("BAD_REQUEST", { status: 403 });
            }
            if (!params.userId || !params.orderId) {
                return new NextResponse("BAD_REQUEST", { status: 400 });
            }
            const admin = await prismadb.admin.findUnique({
                where: {
                    userId,
                }
            })
            if (!admin) {
                return new NextResponse("BAD_REQUEST", { status: 403 });
            }
            const order = await prismadb.order.findUnique({
                where: {
                    id: params.orderId,
                }
            })
            if (!order) {
                return new NextResponse("BAD_REQUEST", { status: 403 });
            }
            return NextResponse.json(order)
        }
        catch(error){
            console.log('[ERROR] admin/orders/[orderId]/route.ts GET', error);
            return new NextResponse("INTERNAL_ERROR", { status: 500 });
        }
    }

    export async function PATCH(
        req:Request,
        { params }:
        {params:{userId:string, orderId:string}})
        {
            const body = await req.json();
            const { 
                status
            } = body;
            try {
                const { userId } = auth();
                if (!userId) {
                    return new NextResponse("BAD_REQUEST", { status: 403 });
                }
                if (!params.userId || !params.orderId) {
                    return new NextResponse("BAD_REQUEST", { status: 400 });
                }
                const admin = await prismadb.admin.findUnique({
                    where: {
                        userId,
                    }
                })
                if (!admin) {
                    return new NextResponse("BAD_REQUEST", { status: 403 });
                }
                const order = await prismadb.order.update({
                    where: {
                        id: params.orderId,
                    },
                    data:{
                        status
                    }
                })

                return NextResponse.json(order)
            }
            catch(error){
                console.log('[ERROR] admin/orders/[orderId]/route.ts GET', error);
                return new NextResponse("INTERNAL_ERROR", { status: 500 });
            }
        }

        export async function DELETE(
            req:Request,
            { params }:
            {params:{userId:string, orderId:string}})
            {
                try {
                    if (!params.userId || !params.orderId) {
                        return new NextResponse("BAD_REQUEST", { status: 400 });
                    }
                    const order = await prismadb.order.delete({
                        where: {
                            id: params.orderId,
                        }
                    })
                    return NextResponse.json({ 'is_success': true })
                }
                catch(error){
                    console.log('[ERROR] admin/orders/[orderId]/route.ts GET', error);
                    return new NextResponse("INTERNAL_ERROR", { status: 500 });
                }
            }