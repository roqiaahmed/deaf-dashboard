import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(
    req:Request,
    {params}:{params:{userId:string}}
    ) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name, billboardId } = body;

        if (!userId) {
            return new NextResponse("BAD_REQUEST", { status: 403 });
        }

        if (!name || !billboardId) {
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

        const category = await prismadb.category.create({
            data: {
                name,
                billboardId,
                adminId: params.userId,
            }
        })

        return NextResponse.json(category, { status: 201})
    }
    catch (error) {
        console.log('[ERROR] admin/categories/route.ts POST', error);
        return new NextResponse("INTERNAL_ERROR", { status: 500 });
    }
}

export async function GET(
    req:Request,
    {params}:{params:{userId:string}}
){
    try {
        const { searchParams } = new URL(req.url)
        const billboardId = searchParams.get('billboardId') || undefined;
        
        if (!params.userId) {
            return new NextResponse("BAD_REQUEST", { status: 403 });
        }

        const categories = await prismadb.category.findMany({
            where: {
                adminId: params.userId,
                billboardId: billboardId
            }
        })

        return NextResponse.json(categories);
    }
    catch (error) {
        console.log('[ERROR] admin/categories/route.ts GET', error);
        return new NextResponse("INTERNAL_ERROR", { status: 500 });
    }
}