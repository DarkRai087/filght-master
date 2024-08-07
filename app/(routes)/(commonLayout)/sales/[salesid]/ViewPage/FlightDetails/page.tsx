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

interface FlightBooking {
  id: string;
  time: string;
  arrival: string;
  flightno: string;
  deptcity: string;
  arrivalcity: string;
  PNR: string;
  guestId: string;
  guest: Guest;
}


const Flight = ({ params }: { params: IParams }) => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchGuestInfo = async () => {
      try {
        // Fetch data from your Next.js API endpoint based on the provided reservationid
        const response = await fetch(`/api/Forms/Flight/${params.salesid}`);
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

  function convertUTCToIST(utcTime: string): string {
    const date = new Date(utcTime);

    // Check if the date is valid before proceeding with conversion
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    const ISTOffset = 330; // IST offset in minutes (UTC+5:30)
    const ISTTime = new Date(date.getTime() + ISTOffset * 60000); // Adding offset in milliseconds

    return ISTTime.toISOString().replace('T', ' ').replace('Z', ''); // Convert to IST and format
  }


  return (
    <div className='mb-6 p-4'>
       
      <div className='flex items-center justify-center mt-8 mb-2'>
        Reviewed You'r Flight Data
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
                Flightno
              </TableHead>
              <TableHead className=' text-black'>
                Deptcity
              </TableHead>
              <TableHead className=' text-black'>
                Arrivalcity
              </TableHead>
              <TableHead className=' text-black'>
                PNR
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className='space-y-2'>
            <TableRow>
              <TableCell className='space-y-4'>
                {/* {apiData?.time} */}
                {apiData.map((el: any, i) => (
                  <div>


                    {convertUTCToIST(el.time)}

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.arrival} */}
                {apiData.map((el: any, i) => (
                  <div>

                    {el.arrival}

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.flightno} */}
                {apiData.map((el: any, i) => (
                  <div>

                    {el.flightno}

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.deptcity} */}
                {apiData.map((el: any, i) => (
                  <div>

                    {el.deptcity}

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.arrivalcity} */}
                {apiData.map((el: any, i) => (
                  <div>

                    {el.arrivalcity}

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
    </div>
  )
}

export default Flight