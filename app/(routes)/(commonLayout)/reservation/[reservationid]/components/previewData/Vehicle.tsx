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
  
  interface Transportation {
    id: string;
    place: string;
    service: string;
    ac_nonac: string;
    vehical_type: string;
    guestId: string;
    guest: Guest;
  }
  
const Vehicle:FC<ItenaryInputProps> = ( paramsid) => {
    const [apiData, setApiData] = useState<Transportation | null>(null);

    useEffect(() => {
      const fetchGuestInfo = async () => {
        try {
          // Fetch data from your Next.js API endpoint based on the provided reservationid
          const response = await fetch(`/api/Forms/Vehicle/${paramsid.paramsid}`);
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
      Reviewed You'r Vehicle Data
    </div>
  <div className="rounded-md border">
  <Table>
    <TableHeader>
        <TableRow>
      <TableHead>
        Place
      </TableHead>
      <TableHead>
      service
      </TableHead>
      <TableHead>
      ac_nonac
      </TableHead>
      <TableHead>
      vehical_type
      </TableHead>
        </TableRow>
    </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>
              {apiData?.place}
            </TableCell>
            <TableCell>
              {apiData?.service}
            </TableCell>
            <TableCell>
              {apiData?.ac_nonac}
            </TableCell>
            <TableCell>
              {apiData?.vehical_type}
            </TableCell>
          </TableRow>
        </TableBody>
  </Table>
</div>
  </div>
  )
}

export default Vehicle