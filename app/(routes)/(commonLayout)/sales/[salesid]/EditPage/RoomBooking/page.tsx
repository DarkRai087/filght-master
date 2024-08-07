import React from 'react'
import RoomBookingForm from '../../Components/EditForm/RoomBooking'
import { getSingleGuest } from "@/actions/getSingleGuest";
import { Props } from "../../Itinerary/page"
import RoomBooking from '../../ViewPage/RoomBooking/page';

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
const page = async (props: Props) => {
  const guestUser = await getSingleGuest(props.params.salesid);
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
          guestId: props.params.salesid,
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
    <div className='space-y-8'>
      <RoomBooking params={props.params} />
      <RoomBookingForm id={props.params.salesid} />
    </div>
  )
}

export default page