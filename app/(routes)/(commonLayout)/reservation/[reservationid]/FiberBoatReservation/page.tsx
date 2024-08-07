import DeskNav from "@/components/Custom/Navbar/DeskNav";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Props } from "../ItineraryReservation/page";
import { getSingleGuest } from "@/actions/getSingleGuest";
import FiberBoatForm from "../components/Form8/FiberBoatForm";
import FiberBoat from "../components/previewData/FiberBoat";

const page = async (props: Props) => {
  const guestUser = await getSingleGuest(props.params.reservationid);

  return (
    <>
       
      <div className=" bg-sky-100 py-4">
        <div className="flex gap-4 px-8 items-center">
          <Link href={`/sales/${props.params.reservationid}`}>
            <ArrowLeftCircle className="h-5 cursor-pointer hover:translate-x-[-5px] hover:text-sky-400 transition-all" />
          </Link>
          <h1 className="text-lg  font-semibold">Flight Details Section</h1>
        </div>
      </div>
      <div className="px-8 py-4  h-[84vh] bg-gray-50">
        <FiberBoatForm id={props.params.reservationid} />
        <FiberBoat paramsid={props.params.reservationid}/>
      </div>
    </>
  );
};

export default page;
