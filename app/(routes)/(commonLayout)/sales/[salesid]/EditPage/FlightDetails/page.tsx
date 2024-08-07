import React from 'react'
import Itinerary from '../../ViewPage/Itinerary/page' 
import { IParams } from "../../page";
import Iternairy  from "../../Components/EditForm/Itineray";
import { getSingleGuest } from '@/actions/getSingleGuest';
import { format } from "date-fns";
import Flight from '../../ViewPage/FlightDetails/page';
import FlightForm from '../../Components/EditForm/Flight';
export type DateActivity = {
  day: string;
  date: string;
  activity: string[];
  stay: string;
};
const page =async( { params }: { params: IParams }) => {
  const guestUser = await getSingleGuest(params.salesid);
 

  return (
    <div>
      <Flight params={params}/>
      {/* <div className='flex items-center justify-center'>Edit this  form </div> */}
      <FlightForm  id={params.salesid} />
    </div>
  )
}

export default page