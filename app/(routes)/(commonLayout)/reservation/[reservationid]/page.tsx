import DeskNav from "@/components/Custom/Navbar/DeskNav";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";
import { StageFormProps, StageTable } from "./components/ReservationStageTable";
import { getSingleGuest } from "@/actions/getSingleGuest";
import { format } from "date-fns";

export interface IParams {
  reservationid: string;
  params:string
}
interface UserData {
  id: string;
  role: string;
  name: string;
  // Add other properties if present in your actual data
}

type StateInputProps = {
  service: string;
  email: string;
  adult: number | null;
  adult12: number | null;
  ch512: number | null;
  ch35: number | null;
  infant: number | null;
  contact: string;
};



const page = async ({ params }: { params: IParams }) => {
  const guestUser = await getSingleGuest(params.reservationid);

  const data: StageFormProps[] = [
    {
      id: params.reservationid,
      sr: 1,
      status: guestUser && guestUser?.guestInfo?.length <= 0 ? false : true,
      Stages: "Guest info Form",
      href: `/reservation/${params.reservationid}/GuestInfo`,
      hrefData:`/reservation/${params.reservationid}/ViewPage/Guestinfo`
    },
    {
      id: params.reservationid,
      sr: 2,
      status: guestUser && guestUser.itinerary.length <= 0 ? false : true,
      Stages: " Itinerary or Day Plans Form",
      href: `/reservation/${params.reservationid}/ItineraryReservation`,
      hrefData:`/reservation/${params.reservationid}/ViewPage/Itinerary`
    },
    {
      id: params.reservationid,
      sr: 3,
      status: guestUser && guestUser.roomBooking.length <= 0 ? false : true,
      Stages: " Room Booking Form",
      href: `/reservation/${params.reservationid}/RoomBookingReservation`,
      hrefData:`/reservation/${params.reservationid}/ViewPage/RoomBooking`
    },
    {
      id: params.reservationid,
      sr: 4,
      status: guestUser && guestUser.cruise.length <= 0 ? false : true,
      Stages: "Cruise Requisition Form",
      href: `/reservation/${params.reservationid}/CruiseReservation`,
      hrefData:`/reservation/${params.reservationid}/ViewPage/Cruise`
    },
    {
      id: params.reservationid,
      sr: 5,
      status: guestUser && guestUser.vehical.length <= 0 ? false : true,
      Stages: "Vehicle Requisition Form",
      href: `/reservation/${params.reservationid}/VehicleReservation`,
      hrefData:`/reservation/${params.reservationid}/ViewPage/Vehical`
    },
    {
      id: params.reservationid,
      sr: 6,
      status: guestUser && guestUser.discount.length <= 0 ? false : true,
      Stages: "Complimentary / Discounted Activities Form",
      href: `/reservation/${params.reservationid}/DiscountReservation`,
      hrefData:`/reservation/${params.reservationid}/ViewPage/DiscountedActivity`
    },
    {
      id: params.reservationid,
      sr: 7,
      status: guestUser && guestUser?.flight?.length <= 0 ? false : true,
      Stages: "Flight Details Form",
      href: `/reservation/${params.reservationid}/FlightReservation`,
      hrefData:`/reservation/${params.reservationid}/ViewPage/FlightDetails`
    },
    {
      id: params.reservationid,
      sr: 8,
      status: guestUser && guestUser.fiberboat.length <= 0 ? false : true,
      Stages: "Fiber Boat Requisition Form",
      href: `/reservation/${params.reservationid}/FiberBoatReservation`, 
      hrefData:`/reservation/${params.reservationid}/ViewPage/FiberBoat`
    },
  ];

  const previewData = {}

  return (
    <>
      {/*   */}
      <div className=" bg-sky-100 py-4">
        <div className="flex gap-4 px-8 items-center">
          <Link href={"/reservation"}>
            <ArrowLeftCircle className="h-5 cursor-pointer hover:translate-x-[-5px] hover:text-sky-400 transition-all" />
          </Link>
          <h1 className="text-lg  font-semibold">
            Sales Reservation Form Stages
          </h1>
        </div>
      </div>
      <div className="px-8 py-4 bg-gray-50 ">
        <div className="flex gap-4">
          <div className="p-4 w-max px-8  rounded-md border-[.5px] shadow-md">
            <span className="font-semibold"> Name of guest :</span>{" "}
            {guestUser?.name}
          </div>

          <div className="p-4 w-max px-8  rounded-md border-[.5px] shadow-md">
            <span className="font-semibold"> Filed Date :</span>{" "}
            {guestUser && format(new Date(guestUser?.filledDate), "PP")}
          </div>
          <div className="p-4 w-max px-8  rounded-md border-[.5px] shadow-md">
            <span className="font-semibold">Booked Date :</span>{" "}
            {guestUser && format(new Date(guestUser?.bookedDate), "PP")}
          </div>
        </div>
        <StageTable data={data} />
      </div>
      {/* <GuestInfoReservation data={params.reservationid}/> */}
    </>
  );
};

export default page;
