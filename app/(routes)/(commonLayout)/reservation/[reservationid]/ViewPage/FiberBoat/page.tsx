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

interface BoatBooking {
  id: string;
  time: string;
  arrival: string;
  stay: string;
  service: string;
  boattype: string;
  guestId: string;
  guest: Guest;
}

const FiberBoat = ({ params }: { params: IParams }) => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchGuestInfo = async () => {
      try {
        // Fetch data from your Next.js API endpoint based on the provided reservationid
        const response = await fetch(`/api/Forms/FiberBoat/${params.reservationid}`);
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
    <div className='mb-6'>
       
      <div className='flex items-center justify-center mt-8 mb-2'>
        Reviewed You're Fiber Boat Data
      </div>
      <div className="rounded-md border">
        <Table className='rounded-xl'>
          <TableHeader className='bg-[#F1F5F9] '>
            <TableRow>
              <TableHead className=' text-black'>
                Time
              </TableHead>
              <TableHead className=' text-black'>
                Arrival
              </TableHead>
              <TableHead className=' text-black'>
                Stay
              </TableHead>
              <TableHead className=' text-black'>
                Service
              </TableHead>
              <TableHead className=' text-black'>
                Boattype
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className='space-y-2'>
            <TableRow>
              <TableCell className='space-y-4'>
                {/* {apiData?.time} */}
                {apiData.map((el: any, i) => (
                  <div>

                    {el.time}

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.arrival}/ */}
                {apiData.map((el: any, i) => (
                  <div>

                    {el.arrival}

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.stay} */}
                {apiData.map((el: any, i) => (
                  <div>

                    {el.stay}

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.service} */}
                {apiData.map((el: any, i) => (
                  <div>

                    {el.service}

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.boattype} */}
                {apiData.map((el: any, i) => (
                  <div>

                    {el.boattype}

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

export default FiberBoat