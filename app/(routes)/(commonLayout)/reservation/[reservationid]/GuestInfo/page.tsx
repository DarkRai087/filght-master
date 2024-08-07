import DeskNav from "@/components/Custom/Navbar/DeskNav";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import ReservationForm from '../components/Form1/ReservationForm'
import React from "react";
import Form1SideDiv from "../components/Form1/ReserverForm1SideDiv";
import Guest from "./ReservedGuestInfo";
export interface IParams {
  reservationid: string;
}

const page = ({ params }: { params: IParams }) => {
  return (
    <>

      <div className=" bg-sky-100 py-4">
        <div className="flex gap-4 px-8 items-center">
          <Link href={`/reservation/${params.reservationid}`}>
            <ArrowLeftCircle className="h-5 cursor-pointer hover:translate-x-[-5px] hover:text-sky-400 transition-all" />
          </Link>
          <h1 className="text-lg  font-semibold"> Basic Guest Info</h1>
        </div>
      </div>
      <div className="px-8 py-2 bg-gray-50">

        <ReservationForm id={params.reservationid} />

        <Guest reservationId={params.reservationid} />
      </div>
    </>
  );
};

export default page;
