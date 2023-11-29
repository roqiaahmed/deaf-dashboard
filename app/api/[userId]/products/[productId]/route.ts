import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function GET(
    req:Request,
    { params }:
    {params:{userId:string, productId:string}})
    {
        try {
            const userId  = params.userId;
            if (!userId) {
                return new NextResponse("BAD_REQUEST", { status: 403 });
            }
            if (!params.userId || !params.productId) {
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
            const product = await prismadb.product.findUnique({
                where: {
                    id: params.productId,
                }
            })
            if (!product) {
                return new NextResponse("BAD_REQUEST", { status: 403 });
            }
            return NextResponse.json(product)
        }
        catch(error){
            console.log('[ERROR] admin/products/[productId]/route.ts GET', error);
            return new NextResponse("INTERNAL_ERROR", { status: 500 });
        }
    }

    export async function PATCH(
        req:Request,
        { params }:
        {params:{userId:string, productId:string}})
        {
            const body = await req.json();
            const { 
                name,
                price,
                urlImage,
                categoryId,
                description,
                colorId,
                scentId,
            } = body;
            try {
                const { userId } = auth();
                if (!userId) {
                    return new NextResponse("BAD_REQUEST", { status: 403 });
                }
                if (!params.userId || !params.productId) {
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
                const product = await prismadb.product.update({
                    where: {
                        id: params.productId,
                    },
                    data:{
                        name,
                        description,
                        price,
                        urlImage,
                        categoryId,
                        colorId,
                        scentId,
                        adminId: params.userId,
                    }
                })

                return NextResponse.json(product)
            }
            catch(error){
                console.log('[ERROR] admin/products/[productId]/route.ts GET', error);
                return new NextResponse("INTERNAL_ERROR", { status: 500 });
            }
        }

        export async function DELETE(
            req:Request,
            { params }:
            {params:{userId:string, productId:string}})
            {
                try {
                    if (!params.userId || !params.productId) {
                        return new NextResponse("BAD_REQUEST", { status: 400 });
                    }
                    const product = await prismadb.product.delete({
                        where: {
                            id: params.productId,
                        }
                    })
                    return NextResponse.json({ 'is_success': true })
                }
                catch(error){
                    console.log('[ERROR] admin/products/[productId]/route.ts GET', error);
                    return new NextResponse("INTERNAL_ERROR", { status: 500 });
                }
            }