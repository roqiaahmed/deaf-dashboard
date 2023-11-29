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
        const { name } = body;

        if (!userId) {
            return new NextResponse("BAD_REQUEST", { status: 403 });
        }

        if (!name) {
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

        const scent = await prismadb.scent.create({
            data: {
                name,
                adminId: params.userId,
            }
        })

        return NextResponse.json(scent, { status: 201})
    }
    catch (error) {
        console.log('[ERROR] admin/scents/route.ts POST', error);
        return new NextResponse("INTERNAL_ERROR", { status: 500 });
    }
}

export async function GET(
    req:Request,
    {params}:{params:{userId:string}}
){
    try {        
        const userId  = params.userId;
        if (!userId) {
            return new NextResponse("BAD_REQUEST", { status: 403 });
        }

        if (!params.userId) {
            return new NextResponse("BAD_REQUEST", { status: 403 });
        }

        const scents = await prismadb.scent.findMany({
            where: {
                adminId: params.userId,
            }
        })

        return NextResponse.json(scents);
    }
    catch (error) {
        console.log('[ERROR] admin/scents/route.ts GET', error);
        return new NextResponse("INTERNAL_ERROR", { status: 500 });
    }
}