import { authOptions } from "@/services/Auth/authOption";
import prisma from "@/services/Prisma/prismadb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  // if (session?.user.role !== "sales" && session?.user.role !== "admin") {
  //   console.log(session?.user.role);

  //   return new NextResponse(
  //     "User is not authorized to perform the following task",
  //     { status: 402 }
  //   );
  // }

  try {
    const body = await request.json();
    console.log(body);
    
    return NextResponse.json({message: "sent message!!"}, { status: 200 });
  } catch (error: any) {
    console.log(error, "Register error");
    return new NextResponse(error.message, { status: 400 });
  }
}
