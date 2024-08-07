import prisma from "@/services/Prisma/prismadb"
import { NextResponse } from "next/server";

export async function POST(request: Request,{ params }: { params: {id:string} }) {
    try {
        const inputData = await request.json();

        // Loop through the input array and update the records in the database
        for (const data of inputData) {
          const { id, 
            place       ,
            hotel        ,
            choosedhotel ,
            roomType     ,
            plan         ,
            rooms        ,
            Ex_ADL       ,
            CWB          ,
            CWOB         ,
            comp_Child   ,
            checkIn      ,
            checkOut     ,
            guestChoice  , } = data;
        await prisma.roomBooking.update({
        where:{
            id:id
        },
        data:{
            place       ,
            hotel        ,
            choosedhotel ,
            roomType     ,
            plan         ,
            rooms        ,
            Ex_ADL       ,
            CWB          ,
            CWOB         ,
            comp_Child   ,
            checkIn      ,
            checkOut     ,
            guestChoice  ,
        }
       })
    }
    return NextResponse.json('Data updated successfully');
    } catch (error) {
        console.log(error, "Register error");
        return new NextResponse("internal error", { status: 400 });
    }
}