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

interface CruiseBooking {
  id: string;
  time: string;
  route: string;
  cruise: string;
  journeyDate: string;
  seat_class: string;
  PNR: string;
  guestId: string;
  guest: Guest;
}

const Cruise = ({ params }: { params: IParams }) => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchGuestInfo = async () => {
      try {
        // Fetch data from your Next.js API endpoint based on the provided reservationid
        const response = await fetch(`/api/Forms/Cruise/${params.salesid}`);
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
  }, [params.salesid]); // Re-run effect when reservationid changes
  console.log(apiData);
  return (
    <div className='mb-6 p-4'>
       
      <div className='flex items-center justify-center mt-8 mb-2'>
        Reviewed You'r Cruise Data
      </div>
      <div className="rounded-md border">
        <Table className='rounded-xl'>
          <TableHeader className='bg-[#F1F5F9]  '>
            <TableRow >
              <TableHead className=' text-black'>
                Time
              </TableHead>
              <TableHead className=' text-black'>
                Route
              </TableHead>
              <TableHead className=' text-black'>
                Cruise
              </TableHead>
              <TableHead className=' text-black'>
                Journey Date
              </TableHead>
              <TableHead className=' text-black'>
                Seat_class
              </TableHead>
              <TableHead className=' text-black'>
                PNR
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className='space-y-2'>
            <TableRow>
              <TableCell className='space-y-4'>
                {apiData.map((el: any, i) => (
                  <div>

                    {el.time}

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.route} */}
                {apiData.map((el: any, i) => (
                  <div>


                    {el.route}

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.cruise} */}
                {apiData.map((el: any, i) => (
                  <div>


                    {el.cruise}

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.journeyDate} */}
                {apiData.map((el: any, i) => (
                  <div>


                    {el.journeyDate}

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.seat_class} */}
                {apiData.map((el: any, i) => (
                  <div>

                    {el.seat_class}

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.PNR} */}
                {apiData.map((el: any, i) => (
                  <div>


                    {el.PNR}

                  </div>
                ))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div >
  )
}

export default Cruise