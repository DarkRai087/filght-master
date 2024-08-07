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
  
  interface Booking {
    id: string;
    place: string;
    hotel: string[];
    choosedhotel: string;
    roomType: string;
    plan: string;
    rooms: string;
    Ex_ADL: string;
    CWB: string;
    CWOB: string;
    comp_Child: string;
    checkIn: string;
    checkOut: string;
    guestChoice: string;
    guestId: string;
    guest: Guest;
  }
 export const RoomBooking:FC<ItenaryInputProps> = ( paramsid) => {
    const [apiData, setApiData] = useState<Booking | null>(null);

    useEffect(() => {
      const fetchGuestInfo = async () => {
        try {
          // Fetch data from your Next.js API endpoint based on the provided reservationid
          const response = await fetch(`/api/Forms/RoomBooking/${paramsid.paramsid}`);
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
      Reviewed You'r Room Booking Data
    </div>
  <div className="rounded-md border">
  <Table>
    <TableHeader>
        <TableRow>
      <TableHead>
      place
      </TableHead>
      <TableHead>
      hotel
      </TableHead>
      <TableHead>
      choosedhotel
      </TableHead>
      <TableHead>
      roomType
      </TableHead>
      <TableHead>
      plan
      </TableHead>
      <TableHead>
      rooms
      </TableHead>
      <TableHead>
      Ex_ADL
      </TableHead>
      <TableHead>
      CWB
      </TableHead>
      <TableHead>
      CWOB
      </TableHead>
      <TableHead>
      comp_Child
      </TableHead>
      <TableHead>
      checkIn
      </TableHead>
      <TableHead>
      checkOut
      </TableHead>
      <TableHead>
      guestChoice
      </TableHead>
        </TableRow>
    </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>
              {apiData?.place}
            </TableCell>
            <TableCell>
              {apiData?.hotel}
            </TableCell>
            <TableCell>
              {apiData?.choosedhotel}
            </TableCell>
            <TableCell>
              {apiData?.roomType}
            </TableCell>
            <TableCell>
              {apiData?.plan}
            </TableCell>
            <TableCell>
              {apiData?.rooms}
            </TableCell>
            <TableCell>
              {apiData?.Ex_ADL}
            </TableCell>
            <TableCell>
              {apiData?.CWB}
            </TableCell>
            <TableCell>
              {apiData?.CWOB}
            </TableCell>
            <TableCell>
              {apiData?.comp_Child}
            </TableCell>
            <TableCell>
              {apiData?.checkIn}
            </TableCell>
            <TableCell>
              {apiData?.checkOut}
            </TableCell>
            <TableCell>
              {apiData?.guestChoice}
            </TableCell>
          </TableRow>
        </TableBody>
  </Table>
</div>
  </div>
  )
}

