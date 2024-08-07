
import prisma from "@/services/Prisma/prismadb";
import { NextResponse } from "next/server";


export  async function GET(request: Request) {
    
    try {
      const users = await prisma.guest.findMany({
          select: {
              id: true,
              name:true 
            }, 
          
      }); 
      const modifiedUsers = users.map(({ id,   name}) => ({ id, name }));
  
  return NextResponse.json({
    users: modifiedUsers,
  });
    } catch (error) {
      return new NextResponse(`Error: ${error}`, { status: 500 });
    }
 
}