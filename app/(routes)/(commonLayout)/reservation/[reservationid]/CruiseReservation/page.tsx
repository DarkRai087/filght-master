import DeskNav from "@/components/Custom/Navbar/DeskNav";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Props } from "../ItineraryReservation/page";
import { getSingleGuest } from "@/actions/getSingleGuest";
import { Itinerary } from "@prisma/client";
import CruiseForm from "../components/Form4/CruiseForm";
import Cruise from "../components/previewData/Cruise";
import Guest from "../components/previewData/Guest";

export type CruiseFormProps = {
  seat_class: string;
  PNR: string;
  time: string;
  route: string;
  cruise: string;
  journeyDate: string;
};

const page = async (props: Props) => {
  const guestUser = await getSingleGuest(props.params.reservationid);
  return (
    <>
       
      <div className=" bg-sky-100 py-4">
        <div className="flex gap-4 px-8 items-center">
          <Link href={`/reservation/${props.params.reservationid}`}>
            <ArrowLeftCircle className="h-5 cursor-pointer hover:translate-x-[-5px] hover:text-sky-400 transition-all" />
          </Link>
          <h1 className="text-lg  font-semibold">Cruise Reservation Section</h1>
        </div>
      </div>
      <div className="px-8 py-4  h-[84vh] bg-gray-50">
        <CruiseForm id={props.params.reservationid} />
        <Cruise paramsid={props.params.reservationid}/>
  
      </div>
    </>
  );
};

export default page;
