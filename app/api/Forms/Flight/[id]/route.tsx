import prisma from "@/services/Prisma/prismadb"
import { NextResponse } from "next/server";

export async function GET(request: Request,{ params }: { params: {id:string} }) {
    try {
       const guest = await prisma.flight.findMany({
        where:{
            guestId:params.id
        },
        include: {
            guest: true // Include related guest information
        }
       })
       if (!guest) {
        return new NextResponse("Itinerary not found", { status: 404 });
    }
    return NextResponse.json(guest, { status: 200 });
    } catch (error) {
        console.log(error, "Register error");
        return new NextResponse("internal error", { status: 400 });
    }
}