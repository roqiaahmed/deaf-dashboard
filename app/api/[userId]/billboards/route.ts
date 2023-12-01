import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export const dynamic = 'force-dynamic';
export async function POST(
    req:Request,
    {params}:{params:{userId:string}}
    ) {
    try {
        const { userId } = auth()
        const body = await req.json();
        const { lable, urlImage } = body;

        if (!userId) {
            return new NextResponse("BAD_REQUEST", { status: 403 });
        }

        if (!lable || !urlImage) {
            return new NextResponse("BAD_REQUEST", { status: 400 });
        }

        if (!params.userId) {
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

        const billboard = await prismadb.billboard.create({
            data: {
                lable,
                urlImage,
                adminId: params.userId,
            }
        })
        
        return NextResponse.json({ 'is_success': true, billboard })
    }
    catch (error) {
        console.log('[ERROR] admin/billboards/route.ts POST', error);
        return new NextResponse("INTERNAL_ERROR", { status: 500 });
    }
}

export async function GET(
    req:Request,
    {params}:{params:{userId:string}}
){
    try {
        const { userId } = params

        if (!userId) {
            return new NextResponse("BAD_REQUEST", { status: 403 });
        }

        const admin = await prismadb.admin.findUnique({
            where: {
                userId,
            }
        })

        if (!admin) {
            return new NextResponse("BAD_REQUEST", { status: 403 });
        }

        const billboards = await prismadb.billboard.findMany({
            where: {
                adminId: params.userId,
            }
        })
        console.log("billboards",billboards);
        return NextResponse.json(billboards);
    }
    catch (error) {
        console.log('[ERROR] admin/billboards/route.ts GET', error);
        return new NextResponse("INTERNAL_ERROR", { status: 500 });
    }
}