import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function GET(
    eq:Request,
    { params }:
    {params:{userId:string, billboardId:string}})
    {
        try {
            const userId  = params.userId;
            if (!userId) {
                return new NextResponse("BAD_REQUEST", { status: 403 });
            }
            if (!params.userId || !params.billboardId) {
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
            const billboard = await prismadb.billboard.findUnique({
                where: {
                    id: params.billboardId,
                }
            })
            if (!billboard) {
                return new NextResponse("BAD_REQUEST", { status: 403 });
            }
            return NextResponse.json(billboard)
        }
        catch(error){
            console.log('[ERROR] admin/billboards/[billboardId]/route.ts GET', error);
            return new NextResponse("INTERNAL_ERROR", { status: 500 });
        }
    }

    export async function PATCH(
        req:Request,
        { params }:
        {params:{userId:string, billboardId:string}})
        {
            const body = await req.json();
            const { lable, urlImage } = body;
            try {
                const { userId } = auth();
                if (!userId) {
                    return new NextResponse("BAD_REQUEST", { status: 403 });
                }
                if (!params.userId || !params.billboardId) {
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
                const billboard = await prismadb.billboard.update({
                    where: {
                        id: params.billboardId,
                    },
                    data:{
                        lable: lable,
                        urlImage: urlImage,
                    }
                })

                return NextResponse.json({billboard })
            }
            catch(error){
                console.log('[ERROR] admin/billboards/[billboardId]/route.ts GET', error);
                return new NextResponse("INTERNAL_ERROR", { status: 500 });
            }
        }

        export async function DELETE(
            eq:Request,
            { params }:
            {params:{userId:string, billboardId:string}})
            {
                try {
                    if (!params.userId || !params.billboardId) {
                        return new NextResponse("BAD_REQUEST", { status: 400 });
                    }
                    const billboard = await prismadb.billboard.delete({
                        where: {
                            id: params.billboardId,
                        }
                    })
                    return NextResponse.json({ 'is_success': true })
                }
                catch(error){
                    console.log('[ERROR] admin/billboards/[billboardId]/route.ts GET', error);
                    return new NextResponse("INTERNAL_ERROR", { status: 500 });
                }
            }