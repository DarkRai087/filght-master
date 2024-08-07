import { authOptions } from "@/services/Auth/authOption";
import prisma from "@/services/Prisma/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    if (session?.user.role !== "sales" && session?.user.role !== "admin") {
        console.log(session?.user.role);

        return new NextResponse("User is not authorized to perform the following task", { status: 402 })
    }

    const body = await request.json();
    try {
        const { ...dayData } = body;

        // if (!dayData || !Array.isArray(dayData) || dayData.length === 0) {
        //     return new NextResponse("Fileds mandatory", { status: 404 });
        // }
        const activitiesArray = Object.values(dayData);
        const formattedData = activitiesArray.map((activity: any) => ({
            ...activity,
        }));

        const guest = await prisma.roomBooking.createMany({
            data: formattedData,
        });

        return NextResponse.json(guest, { status: 200 });
    } catch (error) {
        console.log(error, "Register error");
        return new NextResponse("internal error", { status: 400 });
    }
}