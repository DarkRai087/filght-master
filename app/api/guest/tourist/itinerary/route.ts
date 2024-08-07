
import prisma from "@/services/Prisma/prismadb";
import { NextResponse } from "next/server";


export  async function GET(request: Request) {
     
    try {
      const guests = await prisma.guest.findMany({
        include: {
            itinerary: true,
          },
          
          
      }); 
    //   const modifiedguests = guests.map(({ id,   name}) => ({ id, name }));
    const flattenedItineraryActivities = guests.flatMap((guest) =>
    guest.itinerary.map((itinerary) => itinerary.activity).flat(),
  );

  return NextResponse.json({
    users: flattenedItineraryActivities,
  });
    } catch (error) {
      return new NextResponse(`Error: ${error}`, { status: 500 });
    }
 
}