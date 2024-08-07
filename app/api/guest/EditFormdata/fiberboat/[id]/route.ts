import prisma from "@/services/Prisma/prismadb"
import { NextResponse } from "next/server";

export async function POST(request: Request,{ params }: { params: {id:string} }) {
    try {
        const inputData = await request.json();

        // Loop through the input array and update the records in the database
        for (const data of inputData) {
          const { id, 
            time    ,
            arrival  ,
            stay     ,
            service  ,
            boattype ,} = data;
        await prisma.fiberboat.update({
        where:{
            id:id
        },
        data:{
            time    ,
            arrival  ,
            stay     ,
            service  ,
            boattype ,
        }
       })
    }

    return NextResponse.json('Data updated successfully');
    } catch (error) {
        console.log(error, "Register error");
        return new NextResponse("internal error", { status: 400 });
    }
}