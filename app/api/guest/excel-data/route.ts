import { authOptions } from "@/services/Auth/authOption";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/services/Prisma/prismadb";
import { Workbook } from "exceljs";


export async function POST(request: Request) {
    // const session = await getServerSession(authOptions);
    // if (session?.user.role !== "admin" && session?.user.role !== "sales") {
    //     return new NextResponse("user is not authorized", { status: 404 })
    // }

    try {
        const body = await request.json();
        const allGuests = await prisma.guest.findMany({
            where: {
                // requisitionGuestId: {
                //     not: null
                // }
            },
            include: {
                cruise: body.cruise,
                fiberboat: body.fiberboat,
                flight: body.flight,
                guestInfo: body.guestInfo,
                itinerary: body.itinerary,
                roomBooking: body.roomBooking,
                vehical: body.vehical,
                discount: body.discount
            }
        })
        let columns = [
            { id: "name", displayName: "Name" },
            { id: "points", displayName: "Points" },
            { id: "filledDate", displayName: "Filled Date" },
            { id: "bookedDate", displayName: "Booked Date" },
        ]
        let rows = allGuests.map((guest) => {
            return {
                id: guest.id,
                name: guest.name,
                points: guest.points,
                filledDate: guest.filledDate,
                bookedDate: guest.bookedDate
            }
        })

        const individualCustomerData = allGuests.map((guest) => {
            return {
                tabName: `${guest.name}_${guest.id.substring(0, 6)}`,
                tables: [
                    body.guestInfo ? {
                        name: "Guest Information",
                        columns: [
                            { id: "email", displayName: "Email" },
                            { id: "contact", displayName: "Contact" },
                            { id: "Channel", displayName: "Channel" },
                            { id: "assignedTo", displayName: "Assigned To" },
                            { id: "service", displayName: "Service" },
                            { id: "category", displayName: "Category" },
                            { id: "guestType", displayName: "Guest Type" },
                            { id: "vip", displayName: "VIP" },
                            { id: "dateOfArrival", displayName: "Date of Arrival" },
                            { id: "timeOfArrival", displayName: "Time of Arrival" },
                            { id: "dateOfDeparture", displayName: "Date of Departure" },
                            { id: "timeOfDeparture", displayName: "Time of Departure" },
                            { id: "adult", displayName: "Adult" },
                            { id: "adult12", displayName: "Adult (12+)" },
                            { id: "ch512", displayName: "Child (5-12)" },
                            { id: "ch35", displayName: "Child (3-5)" },
                            { id: "infant", displayName: "Infant" },
                            { id: "total", displayName: "Total" },
                            // Add more columns as needed
                        ],
                        rows: guest?.guestInfo?.map((info) => {
                            return {
                                email: info.email || "",
                                contact: info.contact || "",
                                Channel: info.Channel || "",
                                assignedTo: info.assignedTo || "",
                                service: info.service || "",
                                category: info.category || "",
                                guestType: info.guestType || "",
                                vip: info.vip || "",
                                dateOfArrival: info.dateOfArrival || "",
                                timeOfArrival: info.timeOfArrival || "",
                                dateOfDeparture: info.dateOfDeparture || "",
                                timeOfDeparture: info.timeOfDeparture || "",
                                adult: info.adult || 0,
                                adult12: info.adult12 || 0,
                                ch512: info.ch512 || 0,
                                ch35: info.ch35 || 0,
                                infant: info.infant || 0,
                                total: info.total || 0,
                                // Map other properties accordingly
                            };
                        }),
                    } : null,
                    body.itinerary ? {
                        name: "Itinerary",
                        columns: [
                            { id: "date", displayName: "Date" },
                            { id: "day", displayName: "Day" },
                            { id: "stay", displayName: "Stay" },
                            { id: "activity", displayName: "Activity" },
                            // Add more columns as needed
                        ],
                        rows: guest?.itinerary?.map((item) => {
                            return {
                                date: item.date || "",
                                day: item.day || "",
                                stay: item.stay || "",
                                activity: item?.activity?.join(", ") || "",
                                // Map other properties accordingly
                            };
                        }),
                    } : null,
                    body.roomBooking ? {
                        name: "Room Booking",
                        columns: [
                            { id: "place", displayName: "Place" },
                            { id: "hotel", displayName: "Hotel" },
                            { id: "choosedhotel", displayName: "Choosed Hotel" },
                            { id: "roomType", displayName: "Room Type" },
                            { id: "plan", displayName: "Plan" },
                            { id: "rooms", displayName: "Rooms" },
                            { id: "Ex_ADL", displayName: "Ex ADL" },
                            { id: "CWB", displayName: "CWB" },
                            { id: "CWOB", displayName: "CWOB" },
                            { id: "comp_Child", displayName: "Comp Child" },
                            { id: "checkIn", displayName: "Check In" },
                            { id: "checkOut", displayName: "Check Out" },
                            { id: "guestChoice", displayName: "Guest Choice" },
                            // Add more columns as needed
                        ],
                        rows: guest?.roomBooking?.map((booking) => {
                            return {
                                place: booking.place || "",
                                hotel: booking.hotel.join(", ") || "",
                                choosedhotel: booking.choosedhotel || "",
                                roomType: booking.roomType || "",
                                plan: booking.plan || "",
                                rooms: booking.rooms || "",
                                Ex_ADL: booking.Ex_ADL || "",
                                CWB: booking.CWB || "",
                                CWOB: booking.CWOB || "",
                                comp_Child: booking.comp_Child || "",
                                checkIn: booking.checkIn || "",
                                checkOut: booking.checkOut || "",
                                guestChoice: booking.guestChoice || "",
                                // Map other properties accordingly
                            };
                        }),
                    } : null,
                    body.cruise ? {
                        name: "Cruise",
                        columns: [
                            { id: "time", displayName: "Time" },
                            { id: "route", displayName: "Route" },
                            { id: "cruise", displayName: "Cruise" },
                            { id: "journeyDate", displayName: "Journey Date" },
                            { id: "seat_class", displayName: "Seat Class" },
                            { id: "PNR", displayName: "PNR" },
                            // Add more columns as needed
                        ],
                        rows: guest?.cruise?.map((cruise) => {
                            return {
                                time: cruise.time || "",
                                route: cruise.route || "",
                                cruise: cruise.cruise || "",
                                journeyDate: cruise.journeyDate || "",
                                seat_class: cruise.seat_class || "",
                                PNR: cruise.PNR || "",
                                // Map other properties accordingly
                            };
                        }),
                    } : null,

                    // Vehical Table
                    body.vehical ? {
                        name: "Vehical",
                        columns: [
                            { id: "place", displayName: "Place" },
                            { id: "service", displayName: "Service" },
                            { id: "ac_nonac", displayName: "AC/Non-AC" },
                            { id: "vehical_type", displayName: "Vehicle Type" },
                            // Add more columns as needed
                        ],
                        rows: guest?.vehical?.map((vehical) => {
                            return {
                                place: vehical.place || "",
                                service: vehical.service || "",
                                ac_nonac: vehical.ac_nonac || "",
                                vehical_type: vehical.vehical_type || "",
                                // Map other properties accordingly
                            };
                        }),
                    } : null,

                    // Discount Table
                    body.discount ? {
                        name: "Discount",
                        columns: [
                            { id: "Activies", displayName: "Activities" },
                            { id: "time", displayName: "Time" },
                            { id: "date", displayName: "Date" },
                            { id: "complimentary", displayName: "Complimentary" },
                            { id: "remark", displayName: "Remark" },
                            { id: "vehical_type", displayName: "Vehicle Type" },
                            { id: "service", displayName: "Service" },
                            { id: "amount", displayName: "Amount" },
                            { id: "pax", displayName: "Pax" },
                            // Add more columns as needed
                        ],
                        rows: guest?.discount?.map((discount) => {
                            return {
                                Activies: discount.Activies || "",
                                time: discount.time || "",
                                date: discount.date || "",
                                complimentary: discount.complimentary || "",
                                remark: discount.remark || "",
                                vehical_type: discount.vehical_type || "",
                                service: discount.service || "",
                                amount: discount.amount || "",
                                pax: discount.pax || "",
                                // Map other properties accordingly
                            };
                        }),
                    } : null,
                    // flight
                    body.flight ? {
                        name: "Flight",
                        columns: [
                            { id: "time", displayName: "Time" },
                            { id: "arrival", displayName: "Arrival" },
                            { id: "flightno", displayName: "Flight No" },
                            { id: "deptcity", displayName: "Departure City" },
                            { id: "arrivalcity", displayName: "Arrival City" },
                            { id: "PNR", displayName: "PNR" },
                            // Add more columns as needed
                        ],
                        rows: guest?.flight?.map((flight) => {
                            return {
                                time: flight.time || "",
                                arrival: flight.arrival || "",
                                flightno: flight.flightno || "",
                                deptcity: flight.deptcity || "",
                                arrivalcity: flight.arrivalcity || "",
                                PNR: flight.PNR || "",
                                // Map other properties accordingly
                            };
                        }),
                    } : null,

                    // Fiberboat Table
                    body.fiberboat ? {
                        name: "Fiberboat",
                        columns: [
                            { id: "time", displayName: "Time" },
                            { id: "arrival", displayName: "Arrival" },
                            { id: "stay", displayName: "Stay" },
                            { id: "service", displayName: "Service" },
                            { id: "boattype", displayName: "Boat Type" },
                            // Add more columns as needed
                        ],
                        rows: guest?.fiberboat?.map((fiberboat) => {
                            return {
                                time: fiberboat.time || "",
                                arrival: fiberboat.arrival || "",
                                stay: fiberboat.stay || "",
                                service: fiberboat.service || "",
                                boattype: fiberboat.boattype || "",
                                // Map other properties accordingly
                            };
                        }),
                    } : null,

                ].filter(Boolean),
            };
        });




        // const strBuffer = JSON.stringify(Array.from(new Uint8Array(workbookBuffer)));
        // console.log(new Uint8Array(JSON.parse(strBuffer)).buffer);

        // return NextResponse.json({ data: { buffer: strBuffer } });

        return NextResponse.json({ columns, rows, individualCustomerData });
    } catch (error: any) {
        return new NextResponse(error?.message, { status: 404 });
    }
}