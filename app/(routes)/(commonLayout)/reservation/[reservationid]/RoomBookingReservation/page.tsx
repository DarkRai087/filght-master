import DeskNav from "@/components/Custom/Navbar/DeskNav";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";


import { getSingleGuest } from "@/actions/getSingleGuest";
import { Itinerary } from "@prisma/client";
import { RoomBookingForm } from "../components/Form3/ReservationRoomBookingForm";
import { IParams } from "../page";
import {RoomBooking} from "../components/previewData/RoomBooking";

export type RoomBookingProps = {
  place?: string;
  hotel: string[];
  guestChoice: string;
  choosedhotel: string;
  roomType: string;
  plan: string;
  checkIn: string;
  checkOut?: string;
  rooms: string;
  Ex_ADL: string;
  CWB: string;
  CWOB: string;
  comp_Child: string;
};

const page = async ({ params }: { params: IParams }) => {
  const guestUser = await getSingleGuest(params.reservationid);
  //   const stayValues = guestUser?.itinerary.map((entry) => entry.stay);
  //   const dataArray: RoomBookingProps[] = Array.from(
  //     guestUser?.itinerary!,
  //     (entry) => ({
  //       place: entry.stay,
  //       hotel: "",
  //       guestChoice: "",
  //       roomType: "",
  //       plan: "",
  //       checkIn: "",
  //       checkOut: "",
  //       rooms: "",
  //       Ex_ADL: "",
  //       CWB: "",
  //       CWOB: "",
  //       comp_Child: "",
  //     })
  //   );

  const processData = () => {
    let processedData = [];
    let currentRow = null;

    for (let i = 0; i < guestUser!?.itinerary.length; i++) {
      const item = guestUser!.itinerary[i];

      if (currentRow && currentRow.place === item.stay) {
        currentRow.checkOut = item.date;
      } else {
        if (currentRow) {
          processedData.push(currentRow);
        }
        currentRow = {
          checkIn: item.date,
          place: item.stay,
          hotel: [],
          guestChoice: "",
          choosedhotel: "",
          roomType: "",
          plan: "",
          rooms: "",
          Ex_ADL: "",
          CWB: "",
          CWOB: "",
          comp_Child: "",
          checkOut: item.date,
          guestId: params.reservationid,
        };
      }

      // If 'stay' value changes, set the 'out' date to the next date
      if (
        i < guestUser!?.itinerary.length - 1 &&
        guestUser!?.itinerary[i + 1].stay !== item.stay
      ) {
        currentRow.checkOut = guestUser!?.itinerary[i + 1].date;
      }

      // Push the last item
      if (i === guestUser?.itinerary.length! - 1) {
        processedData.push(currentRow);
      }
    }

    return processedData;
  };

  const dataArray: RoomBookingProps[] = processData();


  return (
    <>
       
      <div className=" bg-sky-100 py-4">
        <div className="flex gap-4 px-8 items-center">
          <Link href={`/reservation/${params.reservationid}`}>
            <ArrowLeftCircle className="h-5 cursor-pointer hover:translate-x-[-5px] hover:text-sky-400 transition-all" />
          </Link>
          <h1 className="text-lg  font-semibold">Room Booking Section</h1>
        </div>
      </div>
      <div className="px-8 py-4  h-[84vh] bg-gray-50">
        <RoomBookingForm
          paramsid={params.reservationid}
          RoomTableData={dataArray}
        />
        <RoomBooking paramsid={params.reservationid}/>
      </div>
    </>
  );
};

export default page;
