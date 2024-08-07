import { toast } from "@/components/ui/use-toast";
import { authOptions } from "@/services/Auth/authOption";
import prisma from "@/services/Prisma/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const getGuestList = async (reservation: boolean = false) => {
  const session = await getServerSession(authOptions);
  if (
    session?.user.role !== "admin" &&
    session?.user.role !== "sales" &&
    session?.user.role !== "operation"
  ) {
    return new NextResponse("user not authorized", { status: 404 });
  }

  try {
    const where = reservation
      ? {
        requisitionGuestId: {
          not: null,
        },
      }
      : {};
    let guest = await prisma.guest.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    if (session?.user.role === "operation") {
      if (!reservation) {
        return new NextResponse("You dont have access to this Resource", {
          status: 404,
        });
      }

      const data = await Promise.all(guest.map(async (item) => {
        const reqGuest = await prisma.guest.findUnique({
          where: {
            id: item.requisitionGuestId!,
          },
          include: {
            guestInfo: true,
          },
        });
        return reqGuest?.guestInfo[0]?.assignedTo === session?.user.id ? item : null;
      }));

      const filteredGuests = data.filter(item => item !== null);

      return filteredGuests;
    }

    if (!reservation) {
      let data = await prisma.guest.findMany({
        where: {
          requisitionGuestId: {
            not: null,
          },
        },
      });
      guest = guest.filter(
        (item) => !data.map((item) => item.id).includes(item.id)
      );
    }

    return guest;
  } catch (error) {
    console.log(error);
    return new NextResponse(`error  ${error}`, { status: 404 });
  }
};
