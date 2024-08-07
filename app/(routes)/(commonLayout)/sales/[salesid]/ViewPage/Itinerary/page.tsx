"use client"
import { TableHeader, Table, TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table';
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

interface Stay {
  id: string;
  date: string;
  day: string;
  stay: string;
  activity: any[]; // You might want to replace 'any[]' with a more specific type if possible
  guestId: string;
  guest: Guest;
}

const Itinerary = ({ params }: { params: IParams }) => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchGuestInfo = async () => {
      try {
        // Fetch data from your Next.js API endpoint based on the provided reservationid
        const response = await fetch(`/api/Forms/Itinerary/${params.salesid}`);
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
        Reviewed You'r Itinerary Data
      </div>
      <div className="rounded-md border ">
        <Table className='rounded-xl'>
          <TableHeader className='bg-[#F1F5F9] '>
            <TableRow>
              <TableHead className=' text-black'>
                Date
              </TableHead>
              <TableHead className=' text-black'>
                Day
              </TableHead>
              <TableHead className=' text-black'>
                Activity
              </TableHead>
              <TableHead className=' text-black'>
                Stay
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className='space-y-2'>
            <TableRow  >
              <TableCell className='space-y-4'>
                {apiData.map((el: any, i) => (
                  <div>

                    {
                      el.guestId === params.salesid && <div>{el.date}</div>
                    }

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.day} */}
                {apiData.map((el: any, i) => (
                  <div>


                    {
                      el.guestId === params.salesid && <div>{el.day}</div>
                    }

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.stay} */}
                {apiData.map((el: any, i) => (
                  <div>

                    {
                      el.guestId === params.salesid && <div>{el.activity}</div>
                    }


                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.activity} */}
                {apiData.map((el: any, i) => (
                  <div>

                    {
                      el.guestId === params.salesid && <div>{el.stay}</div>
                    }

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

export default Itinerary;
