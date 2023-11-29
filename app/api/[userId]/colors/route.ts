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
        const { name, value } = body;

        if (!userId) {
            return new NextResponse("BAD_REQUEST", { status: 403 });
        }

        if (!name || !value) {
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

        const color = await prismadb.color.create({
            data: {
                name,
                value,
                adminId: params.userId,
            }
        })

        return NextResponse.json(color, { status: 201})
    }
    catch (error) {
        console.log('[ERROR] admin/colors/route.ts POST', error);
        return new NextResponse("INTERNAL_ERROR", { status: 500 });
    }
}

export async function GET(
    req:Request,
    {params}:{params:{userId:string}}
){
    try {        
        const  userId  = params.userId;
        if (!userId) {
            return new NextResponse("BAD_REQUEST", { status: 403 });
        }

        if (!params.userId) {
            return new NextResponse("BAD_REQUEST", { status: 403 });
        }

        const colors = await prismadb.color.findMany({
            where: {
                adminId: params.userId,
            }
        })

        return NextResponse.json(colors);
    }
    catch (error) {
        console.log('[ERROR] admin/colors/route.ts GET', error);
        return new NextResponse("INTERNAL_ERROR", { status: 500 });
    }
}