import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        const body = await req.json();
        const { userId } = body;
        if (!userId) {
            return new NextResponse("BAD_REQUEST", { status: 400 });
        }

        let admin = await prismadb.admin.findUnique({
            where: {
                userId,
            }
        })

        if (!admin) {
            admin = await prismadb.admin.create({
                data: {
                    userId,
                }
            })
        }

        return NextResponse.json({ 'is_success': true, admin });
    } catch (error) {
        console.log('[ERROR] admin/route.ts POST', error);
        return new NextResponse("INTERNAL_ERROR", { status: 500 });
    }
}