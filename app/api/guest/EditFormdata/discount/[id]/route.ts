import prisma from "@/services/Prisma/prismadb"
import { NextResponse } from "next/server";

export async function POST(request: Request,{ params }: { params: {id:string} }) {
    try {
        const inputData = await request.json();

        // Loop through the input array and update the records in the database
        for (const data of inputData) {
          const { id, 
            Activies     ,
            time          ,
            date          ,
            complimentary ,
            remark        ,
            vehical_type  ,
            service       ,
            amount        ,
            pax           ,  } = data;
      await prisma.discount.update({
        where:{
            id:id
        },
        data:{
            Activies     ,
            time          ,
            date          ,
            complimentary ,
            remark        ,
            vehical_type  ,
            service       ,
            amount        ,
            pax           ,
        }
       })
    }
    return NextResponse.json('Data updated successfully');
    } catch (error) {
        console.log(error, "Register error");
        return new NextResponse("internal error", { status: 400 });
    }
}