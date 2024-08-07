import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/services/Prisma/prismadb";
interface IParams {
    id?: string
}

export async function PUT(request: Request, { params }: { params: IParams }) {
    try {
        // const session = await getServerSession();
        // if (!session || (session.user.role !== "admin" && session.user.role !== "sales")) {
        //     return new NextResponse("User not authorized", { status: 403 });
        // }

        const requestBody = await request.json(); // Parse the request body as JSON

        // Ensure the required fields 'name' and 'points' exist in the request body
        const {   email,
        contact, 
        Channel,
        assignedTo,
        service,
        category,
        guestType,
        vip,
        dateOfArrival,
        timeOfArrival,
        dateOfDeparture,
        timeOfDeparture ,
        adult,
        adult12,
        ch512,
        ch35,
        infant,
        total  } = requestBody;

        // Update selected fields in the GuestInfo record
        
        const updatedGuestInfo = await prisma.guestInfo.update({
            where: {
                guestId: params.id,
            },
            data: {
                email,
                contact, 
                Channel,
                assignedTo,
                service,
                category,
                guestType,
                vip,
                dateOfArrival,
                timeOfArrival,
                dateOfDeparture,
                timeOfDeparture ,
                adult,
                adult12,
                ch512,
                ch35,
                infant,
                total 
            },
            include: {
                guest: true, // Include associated Guest record
            },
        });

        return NextResponse.json({
            updatedGuestInfo,
          });
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse(`Error: ${error}`, { status: 500 });
    }
}