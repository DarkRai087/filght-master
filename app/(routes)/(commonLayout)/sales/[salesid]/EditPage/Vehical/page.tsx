import React from 'react'
import Itinerary from '../../ViewPage/Itinerary/page' 
import { IParams } from "../../page";
import { getSingleGuest } from '@/actions/getSingleGuest';
import { format } from "date-fns";
import Vehicle from '../../ViewPage/Vehical/page';
import CruiseForm from '../../Components/EditForm/Cruise';
import VehicalForm from '../../Components/EditForm/Vehicle';
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
      {/* <Itinerary params={params}/> */}
      <Vehicle params={params}/>
      {/* <div className='flex items-center justify-center'>Edit this  form </div> */}
      <VehicalForm id={params.salesid} />
    </div>
  )
}

export default page