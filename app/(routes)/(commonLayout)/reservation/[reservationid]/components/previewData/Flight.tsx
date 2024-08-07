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
  

const Flight:FC<ItenaryInputProps> = ( paramsid) => {
    const [apiData, setApiData] = useState<FlightBooking | null>(null);

    useEffect(() => {
      const fetchGuestInfo = async () => {
        try {
          // Fetch data from your Next.js API endpoint based on the provided reservationid
          const response = await fetch(`/api/Forms/Flight/${paramsid.paramsid}`);
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
  return (
    <div className='mb-6'>
    <div className='flex items-center justify-center mt-8 mb-2'>
      Reviewed You'r Flight Data
    </div>
  <div className="rounded-md border">
  <Table>
    <TableHeader>
        <TableRow>
      <TableHead>
      time
      </TableHead>
      <TableHead>
      arrival
      </TableHead>
      <TableHead>
      flightno
      </TableHead>
      <TableHead>
      deptcity
      </TableHead>
      <TableHead>
      arrivalcity
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
              {apiData?.arrival}
            </TableCell>
            <TableCell>
              {apiData?.flightno}
            </TableCell>
            <TableCell>
              {apiData?.deptcity}
            </TableCell>
            <TableCell>
              {apiData?.arrivalcity}
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

export default Flight