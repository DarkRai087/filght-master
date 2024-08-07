import { authOptions } from "@/services/Auth/authOption";
import prisma from "@/services/Prisma/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';
interface IParams {
  id?: string
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const session = await getServerSession(authOptions);
  // if (session?.user.role !== "admin" && session?.user.role !== "sales") {
  //     return new NextResponse("user not authorized", { status: 404 });
  // }

  try {
    const requestBody = await request.json(); // Parse the request body as JSON

    // Ensure the required fields 'name' and 'points' exist in the request body
    const { name, points } = requestBody;
    if (!name || !points) {
      return new NextResponse('Invalid request body', { status: 400 });
    }

    // Update the Guest record
    const updatedGuest = await prisma.guest.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        points: parseFloat(points),
      },
      include: {
        guestInfo: true, // Include associated GuestInfo records
        itinerary: true, // Include
      },
    });

    await prisma.guest.update({
      where: {
        requisitionGuestId: params.id
      },
      data: {
        name,
        points: parseFloat(points),
      }
    })
    return NextResponse.json({
      updatedGuest,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(`Error: ${error}`, { status: 404 });
  }

}