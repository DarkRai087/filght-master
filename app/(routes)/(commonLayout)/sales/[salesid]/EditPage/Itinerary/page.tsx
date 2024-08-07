import React from 'react'
import Itinerary from '../../ViewPage/Itinerary/page'
import { IParams } from "../../page";
import Iternairy from "../../Components/EditForm/Itineray";
import { getSingleGuest } from '@/actions/getSingleGuest';
import { format } from "date-fns";
export type DateActivity = {
  day: string;
  date: string;
  activity: string[];
  stay: string;
};
const page = async ({ params }: { params: IParams }) => {
  const guestUser = await getSingleGuest(params.salesid);
  const generateDateActivityArray = (
    startDate: string,
    endDate: string
  ): DateActivity[] => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const daysDiff =
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const dataArray: any = Array.from({ length: daysDiff }, (_, index) => ({
      day: `Day ${index + 1}`,
      date: new Date(
        start.getTime() + index * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),
      activity: [],
      stay: `data ${index + 1}`,
      guestId: params.salesid,
    }));

    return dataArray;
  };

  let [data]: any = guestUser?.guestInfo || [];



  const startDate = data && format(new Date(data.dateOfArrival), "PP");
  const endDate = data && format(new Date(data.dateOfDeparture), "PP");
  let dateActivities = generateDateActivityArray(startDate, endDate);

  return (
    <div>
      <Itinerary params={params} />
      {/* <div className='flex items-center justify-center'>Edit this  form </div> */}
      <Iternairy paramsid={params.salesid} />
    </div>
  )
}

export default page