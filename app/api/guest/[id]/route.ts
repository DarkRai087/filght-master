
import { authOptions } from "@/services/Auth/authOption";
import prisma from "@/services/Prisma/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';
interface IParams {
  id?: string
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== "admin" && session?.user.role !== "sales") {
      return new NextResponse("user is not authorized", { status: 404 })
    }

    await prisma.guestInfo.deleteMany({ where: { guestId: params.id } });
    await prisma.itinerary.deleteMany({ where: { guestId: params.id } });
    await prisma.roomBooking.deleteMany({ where: { guestId: params.id } });
    await prisma.cruise.deleteMany({ where: { guestId: params.id } });
    await prisma.vehical.deleteMany({ where: { guestId: params.id } });
    await prisma.flight.deleteMany({ where: { guestId: params.id } });
    await prisma.fiberboat.deleteMany({ where: { guestId: params.id } });
    await prisma.discount.deleteMany({ where: { guestId: params.id } });

    const deleteUser = await prisma.guest.deleteMany({
      where: {
        id: params.id
      }
    })


    return NextResponse.json(deleteUser, { status: 200 })

  } catch (error: any) {
    console.log(error);
    return new NextResponse("internal error", { status: 500 })

  }
}



export async function GET(request: Request, { params }: { params: IParams }) {
  const session = await getServerSession(authOptions);
  // if (session?.user.role !== "admin" && session?.user.role !== "sales") {
  //     return new NextResponse("user not authorized", { status: 404 });
  // }

  try {
    const guest = await prisma.guest.findUnique({
      where: {
        id: params.id
      },
      include: {
        guestInfo: true,
        itinerary: true,
        roomBooking: true,
        cruise: true,
        discount: true,
        vehical: true,
        flight: true,
        fiberboat: true,
      },
    })

    return NextResponse.json(guest);

  } catch (error) {
    console.log(error);
    return new NextResponse(`error  ${error}`, { status: 404 })

  }
}


export async function PUT(request: Request, { params }: { params: IParams }) {
  const session = await getServerSession(authOptions);

  try {
    const requestBody = await request.json();

    const { name, points, filledDate, bookedDate } = requestBody;

    if (!name || !points || !filledDate || !bookedDate) {
      return new NextResponse('Invalid request body', { status: 400 });
    }

    // Find the existing guest
    const existingGuest = await prisma.guest.findUnique({
      where: {
        id: params.id,
      },
      include: {
        guestInfo: true,
        itinerary: true,
        roomBooking: true,
        cruise: true,
        discount: true,
        vehical: true,
        flight: true,
        fiberboat: true,
      },
    });

    if (!existingGuest) {
      return new NextResponse('Guest not found', { status: 404 });
    }

    // Delete associated data
    await prisma.guestInfo.deleteMany({
      where: {
        guestId: params.id,
      },
    });
    await prisma.itinerary.deleteMany({
      where: {
        guestId: params.id,
      },
    });
    await prisma.roomBooking.deleteMany({
      where: {
        guestId: params.id,
      },
    });
    await prisma.cruise.deleteMany({
      where: {
        guestId: params.id,
      },
    });
    await prisma.discount.deleteMany({
      where: {
        guestId: params.id,
      },
    });
    await prisma.vehical.deleteMany({
      where: {
        guestId: params.id,
      },
    });
    await prisma.flight.deleteMany({
      where: {
        guestId: params.id,
      },
    });
    await prisma.fiberboat.deleteMany({
      where: {
        guestId: params.id,
      },
    });

    // Delete the existing guest
    await prisma.guest.delete({
      where: {
        id: params.id,
      },
    });


    // Find the existing guest
    const existingReservationGuest = await prisma.guest.findUnique({
      where: {
        requisitionGuestId: params.id,
      },
      include: {
        guestInfo: true,
        itinerary: true,
        roomBooking: true,
        cruise: true,
        discount: true,
        vehical: true,
        flight: true,
        fiberboat: true,
      },
    });

    if (existingReservationGuest) {

      await prisma.guestInfo.deleteMany({
        where: {
          guestId: existingReservationGuest.id,
        },
      });
      await prisma.itinerary.deleteMany({
        where: {
          guestId: existingReservationGuest.id,
        },
      });
      await prisma.roomBooking.deleteMany({
        where: {
          guestId: existingReservationGuest.id,
        },
      });
      await prisma.cruise.deleteMany({
        where: {
          guestId: existingReservationGuest.id,
        },
      });
      await prisma.discount.deleteMany({
        where: {
          guestId: existingReservationGuest.id,
        },
      });
      await prisma.vehical.deleteMany({
        where: {
          guestId: existingReservationGuest.id,
        },
      });
      await prisma.flight.deleteMany({
        where: {
          guestId: existingReservationGuest.id,
        },
      });
      await prisma.fiberboat.deleteMany({
        where: {
          guestId: existingReservationGuest.id,
        },
      });

      await prisma.guest.delete({
        where: {
          id: existingReservationGuest.id,
        },
      });
    }

    const newGuest = await prisma.guest.create({
      data: {
        name,
        points: parseFloat(points),
        filledDate: new Date(filledDate),
        bookedDate: new Date(bookedDate),
      },
    });

    return new NextResponse(JSON.stringify(newGuest), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(`Error: ${error}`, { status: 500 });
  }
}



