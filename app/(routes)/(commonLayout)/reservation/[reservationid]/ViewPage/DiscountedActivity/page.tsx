"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React, { FC, useEffect, useState } from 'react'
import { IParams } from "../../page";
import DeskNav from '@/components/Custom/Navbar/DeskNav';
type ItenaryInputProps = {
  paramsid: string;
};
interface Guest {
  id: string;
  name: string;
  points: number;
  filledDate: string;
  bookedDate: string;
  createdAt: string;
  updatedAt: string;
}

interface ActivityBooking {
  id: string;
  Activies: string;
  time: string;
  date: string;
  complimentary: boolean;
  remark: string;
  vehical_type: string;
  service: boolean;
  amount: string;
  pax: string;
  guestId: string;
  guest: Guest;
}

const Discount = ({ params }: { params: IParams }) => {
  const [apiData, setApiData] = useState<ActivityBooking[]>([]);

  useEffect(() => {
    const fetchGuestInfo = async () => {
      try {
        // Fetch data from your Next.js API endpoint based on the provided reservationid
        const response = await fetch(`/api/Forms/Complimentary/${params.reservationid}`);
        if (response.ok) {
          const data = await response.json();
          // Set the fetched data to the state

          setApiData(data);

        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        // Handle errors if any
        console.error('Error fetching data:', error);
      }
    };

    fetchGuestInfo();
  }, [params.reservationid]); // Re-run effect when reservationid changes
  console.log(apiData);
  return (
    <div className='mb-6 p-4'>
       
      <div className='flex items-center justify-center mt-8 mb-2'>
        Reviewed You'r Discount Data
      </div>
      <div className="rounded-md border">
        <Table className='rounded-xl'>
          <TableHeader className='bg-[#F1F5F9] '>
            <TableRow>
              <TableHead className=' text-black'>
                Time
              </TableHead>
              <TableHead className=' text-black'>
                Activies
              </TableHead>
              <TableHead className=' text-black'>
                Date
              </TableHead>
              <TableHead className=' text-black'>
                Complimentary
              </TableHead>
              <TableHead className=' text-black'>
                stay
              </TableHead>
              <TableHead className=' text-black'>
                Service
              </TableHead>
              <TableHead className=' text-black'>
                Amount
              </TableHead>
              <TableHead className=' text-black'>
                Pax
              </TableHead>
              <TableHead className=' text-black'>
                Remark
              </TableHead >
            </TableRow>
          </TableHeader>

          <TableBody className='space-y-2'>
            <TableRow>
              <TableCell className='space-y-4'>
                {/* {apiData?.Activies} */}
                {apiData.map((el: any, i) => (
                  <div>

                    {el.time}

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.time} */}
                {apiData.map((el: any, i) => (
                  <div>

                    {el.Activies}

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.date} */}
                {apiData.map((el: any, i) => (
                  <div>

                    {el.date}

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.complimentary} */}
                {apiData.map((el: any, i) => (
                  <div>

                    {el.complimentary.toString()}

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.remark} */}
                {apiData.map((el: any, i) => (
                  <div>

                    {el.vehical_type}

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.vehical_type} */}
                {apiData.map((el: any, i) => (
                  <div>

                    {el.service.toString()}

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.service} */}
                {apiData.map((el: any, i) => (
                  <div>

                    {el.amount}

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.amount} */}
                {apiData.map((el: any, i) => (
                  <div>

                    {el.pax}

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.pax} */}
                {apiData.map((el: any, i) => (
                  <div>

                    {el.remark}

                  </div>
                ))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Discount