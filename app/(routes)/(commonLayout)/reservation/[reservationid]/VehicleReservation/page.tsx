import DeskNav from "@/components/Custom/Navbar/DeskNav";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Props } from "../ItineraryReservation/page";
import { getSingleGuest } from "@/actions/getSingleGuest";

import VehicalForm from "../components/Form5/VehicleForm";
import Vehicle from "../components/previewData/Vehicle";

export type VehicalFormProps = {
  place: string;
  service: string;
  ac_nonac: string;
  vehical_type: string;
};

const page = async (props: Props) => {
  const guestUser = await getSingleGuest(props.params.reservationid);
  //   console.log(guestUser);

  return (
    <>
       
      <div className=" bg-sky-100 py-4">
        <div className="flex gap-4 px-8 items-center">
          <Link href={`/reservation/${props.params.reservationid}`}>
            <ArrowLeftCircle className="h-5 cursor-pointer hover:translate-x-[-5px] hover:text-sky-400 transition-all" />
          </Link>
          <h1 className="text-lg  font-semibold">
            Vehical Reservation Section
          </h1>
        </div>
      </div>
      <div className="px-8 py-4  h-[84vh] bg-gray-50">
        <VehicalForm id={props.params.reservationid} />
        <Vehicle paramsid={props.params.reservationid}/>
      </div>
    </>
  );
};

export default page;
