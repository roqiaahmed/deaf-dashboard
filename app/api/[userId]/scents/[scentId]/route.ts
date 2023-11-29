import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function GET(
    eq:Request,
    { params }:
    {params:{userId:string, scentId:string}})
    {
        try {
            const userId  = params.userId;
            if (!userId) {
                return new NextResponse("BAD_REQUEST", { status: 403 });
            }
            if (!params.userId || !params.scentId) {
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
            const scent = await prismadb.scent.findUnique({
                where: {
                    id: params.scentId,
                }
            })
            if (!scent) {
                return new NextResponse("BAD_REQUEST", { status: 403 });
            }
            return NextResponse.json(scent)
        }
        catch(error){
            console.log('[ERROR] admin/scents/[scentId]/route.ts GET', error);
            return new NextResponse("INTERNAL_ERROR", { status: 500 });
        }
    }

    export async function PATCH(
        req:Request,
        { params }:
        {params:{userId:string, scentId:string}})
        {
            const body = await req.json();
            const { name } = body;
            try {
                const { userId } = auth();
                if (!userId) {
                    return new NextResponse("BAD_REQUEST", { status: 403 });
                }
                if (!params.userId || !params.scentId) {
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
                const scent = await prismadb.scent.update({
                    where: {
                        id: params.scentId,
                    },
                    data:{
                        name,
                    }
                })

                return NextResponse.json(scent)
            }
            catch(error){
                console.log('[ERROR] admin/scents/[scentId]/route.ts GET', error);
                return new NextResponse("INTERNAL_ERROR", { status: 500 });
            }
        }

        export async function DELETE(
            req:Request,
            { params }:
            {params:{userId:string, scentId:string}})
            {
                try {
                    if (!params.userId || !params.scentId) {
                        return new NextResponse("BAD_REQUEST", { status: 400 });
                    }
                    const scent = await prismadb.scent.delete({
                        where: {
                            id: params.scentId,
                        }
                    })
                    return NextResponse.json({ 'is_success': true })
                }
                catch(error){
                    console.log('[ERROR] admin/scents/[scentId]/route.ts GET', error);
                    return new NextResponse("INTERNAL_ERROR", { status: 500 });
                }
            }