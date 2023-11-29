import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function GET(
    req:Request,
    { params }:
    {params:{userId:string, colorId:string}})
    {
        try {
            const userId  = params.userId;
            if (!userId) {
                return new NextResponse("BAD_REQUEST", { status: 403 });
            }
            if (!params.userId || !params.colorId) {
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
            const color = await prismadb.color.findUnique({
                where: {
                    id: params.colorId,
                }
            })
            if (!color) {
                return new NextResponse("BAD_REQUEST", { status: 403 });
            }
            return NextResponse.json(color)
        }
        catch(error){
            console.log('[ERROR] admin/colors/[colorId]/route.ts GET', error);
            return new NextResponse("INTERNAL_ERROR", { status: 500 });
        }
    }

    export async function PATCH(
        req:Request,
        { params }:
        {params:{userId:string, colorId:string}})
        {
            const body = await req.json();
            const { name, value } = body;
            try {
                const { userId } = auth();
                if (!userId) {
                    return new NextResponse("BAD_REQUEST", { status: 403 });
                }
                if (!params.userId || !params.colorId) {
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
                const color = await prismadb.color.update({
                    where: {
                        id: params.colorId,
                    },
                    data:{
                        name,
                        value,
                    }
                })

                return NextResponse.json(color)
            }
            catch(error){
                console.log('[ERROR] admin/colors/[colorId]/route.ts GET', error);
                return new NextResponse("INTERNAL_ERROR", { status: 500 });
            }
        }

        export async function DELETE(
            req:Request,
            { params }:
            {params:{userId:string, colorId:string}})
            {
                try {
                    if (!params.userId || !params.colorId) {
                        return new NextResponse("BAD_REQUEST", { status: 400 });
                    }
                    const color = await prismadb.color.delete({
                        where: {
                            id: params.colorId,
                        }
                    })
                    return NextResponse.json({ 'is_success': true })
                }
                catch(error){
                    console.log('[ERROR] admin/colors/[colorId]/route.ts GET', error);
                    return new NextResponse("INTERNAL_ERROR", { status: 500 });
                }
            }