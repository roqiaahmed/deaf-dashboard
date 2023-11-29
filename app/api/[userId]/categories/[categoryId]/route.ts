import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function GET(
    eq:Request,
    { params }:
    {params:{userId:string, categoryId:string}})
    {
        try {
            const userId  = params.userId;
            if (!userId) {
                return new NextResponse("BAD_REQUEST", { status: 403 });
            }
            if (!params.userId || !params.categoryId) {
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
            const category = await prismadb.category.findUnique({
                where: {
                    id: params.categoryId,
                }
            })
            if (!category) {
                return new NextResponse("BAD_REQUEST", { status: 403 });
            }
            return NextResponse.json(category)
        }
        catch(error){
            console.log('[ERROR] admin/categories/[categoryId]/route.ts GET', error);
            return new NextResponse("INTERNAL_ERROR", { status: 500 });
        }
    }

    export async function PATCH(
        req:Request,
        { params }:
        {params:{userId:string, categoryId:string}})
        {
            const body = await req.json();
            const { name, billboardId } = body;
            try {
                const { userId } = auth();
                if (!userId) {
                    return new NextResponse("BAD_REQUEST", { status: 403 });
                }
                if (!params.userId || !params.categoryId) {
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
                const category = await prismadb.category.update({
                    where: {
                        id: params.categoryId,
                    },
                    data:{
                        name,
                        billboardId,
                    }
                })

                return NextResponse.json(category)
            }
            catch(error){
                console.log('[ERROR] admin/categories/[categoryId]/route.ts GET', error);
                return new NextResponse("INTERNAL_ERROR", { status: 500 });
            }
        }

        export async function DELETE(
            eq:Request,
            { params }:
            {params:{userId:string, categoryId:string}})
            {
                try {
                    if (!params.userId || !params.categoryId) {
                        return new NextResponse("BAD_REQUEST", { status: 400 });
                    }
                    const category = await prismadb.category.delete({
                        where: {
                            id: params.categoryId,
                        }
                    })
                    return NextResponse.json({ 'is_success': true })
                }
                catch(error){
                    console.log('[ERROR] admin/categories/[categoryId]/route.ts GET', error);
                    return new NextResponse("INTERNAL_ERROR", { status: 500 });
                }
            }