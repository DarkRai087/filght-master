import prisma from "@/services/Prisma/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const inputData = await request.json();

    // Loop through the input array and update the records in the database
    for (const data of inputData) {
      const { id, date, day, stay, activity } = data;

      // Update the record matching the given ID (assuming each element in the array contains an 'id' field)
      await prisma.itinerary.update({
        where: {
          id:id
        },
        data: {
          date,
          day,
          stay,
          activity,
        },
      });
    }

    return new NextResponse('Data updated successfully');
  } catch (error) {
    console.log(error, "Error while updating data");
    return new NextResponse("Internal server error", { status: 500 });
  }
}
