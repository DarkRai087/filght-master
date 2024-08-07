import prisma from "@/services/Prisma/prismadb"
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {

        const reservedGuestId = await prisma.guest.findUnique({
            where: {
                id: params.id
            }
        })
        const guest = await prisma.guestInfo.findUnique({
            where: {
                guestId: reservedGuestId?.requisitionGuestId!
            }
        })

        const userName = await prisma.user.findUnique({
            where: {
                id: guest?.assignedTo
            }
        })

        guest!.assignedTo = `${userName?.name!} (${guest?.assignedTo})`
        console.log(guest)
        return NextResponse.json(guest, { status: 200 });
    } catch (error) {
        console.log(error, "Register error");
        return new NextResponse("internal error", { status: 400 });
    }
}