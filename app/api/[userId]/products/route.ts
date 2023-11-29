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
        const { 
            name,
            price,
            urlImage,
            categoryId,
            description,
            colorId,
            scentId,
        } = body;

        if (!userId) {
            return new NextResponse("BAD_REQUEST", { status: 403 });
        }

        if (!name || !price || !urlImage || !categoryId || !description || !colorId || !scentId) {
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

        const product = await prismadb.product.create({
            data: {
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

        return NextResponse.json(product, { status: 201})
    }
    catch (error) {
        console.log('[ERROR] admin/products/route.ts POST', error);
        return new NextResponse("INTERNAL_ERROR", { status: 500 });
    }
}

export async function GET(
    req:Request,
    {params}:{params:{userId:string}}
){
    try {
        const { searchParams } = new URL(req.url)
        const categoryId = searchParams.get('categoryId') || undefined;
        
        if (!params.userId) {
            return new NextResponse("BAD_REQUEST", { status: 403 });
        }

        const products = await prismadb.product.findMany({
            where: {
                adminId: params.userId,
                categoryId: categoryId,
            }
        })

        return NextResponse.json(products);
    }
    catch (error) {
        console.log('[ERROR] admin/products/route.ts GET', error);
        return new NextResponse("INTERNAL_ERROR", { status: 500 });
    }
}