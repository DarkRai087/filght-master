import { authOptions } from "@/services/Auth/authOption";
import prisma from "@/services/Prisma/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    if (session?.user.role !== "sales" && session?.user.role !== "admin") {
        console.log(session?.user.role);

        return new NextResponse("User is not authorized to perform the following task", { status: 402 })
    }

    try {
        const body = await request.json();
        const {
            date,
            tourist,
            activity,
            driver,
            timeToPickup,
            id
        } = body;

        const userDriver = await prisma.user.findUnique({ where: { id: driver } });

        if (!date || !tourist || !activity || !driver || !timeToPickup) {
            return new NextResponse("All Fields are mandatory", { status: 400 });
        }
        if (userDriver && userDriver.role !== 'driver') {
            return new NextResponse("Selected User is not a driver.", { status: 400 });
        }

        const driverTask = await prisma.driverTasks.create({
            data: {
                date,
                tourist,
                activity,
                driverId: driver,
                timeToPickup
            },
        });

        return NextResponse.json(driverTask, { status: 200 });
    } catch (error: any) {
        console.log(error, "Register error");
        return new NextResponse(error.message, { status: 400 });
    }
}
export async function PUT(request: Request) {
    
    const session = await getServerSession(authOptions)
    if (session?.user.role !== "sales" && session?.user.role !== "admin") {
        console.log(session?.user.role);

        return new NextResponse("User is not authorized to perform the following task", { status: 402 })
    }

    try {
        const body = await request.json();
        const {
            id,
            date,
            tourist,
            activity,
            driverId,
            timeToPickup
        } = body;

        if (!date || !tourist || !activity || !driverId || !timeToPickup || !id) {
            return new NextResponse("All Fields are mandatory", { status: 400 });
        }

      
        
        const updatedDriver = await prisma.driverTasks.update({
            where: {
                id: id
            },
            data: {
              tourist,
              driverId,
              date,
              timeToPickup,
              activity
            }
          });
          console.log(updatedDriver, "aesrfhg");


       

        return NextResponse.json(updatedDriver, { status: 200 });
    } catch (error: any) {
        console.log(error, "Register error");
        return new NextResponse(error.message, { status: 400 });
    }
}



export async function GET(request: Request) {

    try {
        let driverActivities= await prisma.driverTasks.findMany({
            include:{
                driver: true,
                guest: true
            }
        });

        driverActivities = driverActivities?.map((item: any) => {
            item.tourist = item.guest.name;
            item.driverId = item.driver.name;
            return item;
        })

        return NextResponse.json({
            driverActivities,
        });
    } catch (error) {
        return new NextResponse(`Error: ${error}`, { status: 500 });
    }

}

