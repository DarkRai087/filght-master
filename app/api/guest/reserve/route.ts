import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { requisitionGuestId } = body;

        const requisitionGuest = await prisma.guest.findUnique({
            where: {
                id: requisitionGuestId
            },
            include: {
                guestInfo: false,
                itinerary: false,
                roomBooking: false,
                cruise: false,
                discount: false,
                vehical: false,
                flight: false,
                fiberboat: false,
                DriverTasks: false
            }
        });

        if (!requisitionGuest) {
            return new NextResponse("Requisition guest not found", { status: 404 });
        }

        const newGuest = await prisma.guest.create({
            data: {
                name: requisitionGuest.name,
                requisitionGuestId: requisitionGuest.id,
                points: requisitionGuest.points,
                filledDate: requisitionGuest.filledDate,
                bookedDate: requisitionGuest.bookedDate
            }
        });

        return new NextResponse(JSON.stringify(newGuest), { status: 201 });
    } catch (error: any) {
        return new NextResponse(`Error: ${error.message}`, { status: 500 });
        console.log(error);

    } finally {
        await prisma.$disconnect();
    }
}
