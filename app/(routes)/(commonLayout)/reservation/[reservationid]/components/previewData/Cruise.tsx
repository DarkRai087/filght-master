"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React, { FC, useEffect, useState } from 'react'
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
  
const Cruise :FC<ItenaryInputProps> = ( paramsid) => {
    const [apiData, setApiData] = useState<CruiseBooking | null>(null);

    useEffect(() => {
      const fetchGuestInfo = async () => {
        try {
          // Fetch data from your Next.js API endpoint based on the provided reservationid
          const response = await fetch(`/api/Forms/Cruise/${paramsid.paramsid}`);
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
    }, [paramsid.paramsid]); // Re-run effect when reservationid changes
    console.log(apiData);
  return (
    <div className='mb-6'>
    <div className='flex items-center justify-center mt-8 mb-2'>
      Reviewed You'r Cruise Data
    </div>
  <div className="rounded-md border">
  <Table>
    <TableHeader>
        <TableRow>
      <TableHead>
      time
      </TableHead>
      <TableHead>
      route
      </TableHead>
      <TableHead>
      cruise
      </TableHead>
      <TableHead>
      journeyDate
      </TableHead>
      <TableHead>
      seat_class
      </TableHead>
      <TableHead>
      PNR
      </TableHead>
        </TableRow>
    </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>
              {apiData?.time}
            </TableCell>
            <TableCell>
              {apiData?.route}
            </TableCell>
            <TableCell>
              {apiData?.cruise}
            </TableCell>
            <TableCell>
              {apiData?.journeyDate}
            </TableCell>
            <TableCell>
              {apiData?.seat_class}
            </TableCell>
            <TableCell>
              {apiData?.PNR}
            </TableCell>
          </TableRow>
        </TableBody>
  </Table>
</div>
  </div>
  )
}

export default Cruise