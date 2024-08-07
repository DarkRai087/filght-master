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
  
  interface ActivityBooking {
    id: string;
    Activies: string;
    time: string;
    date: string;
    complimentary: string;
    remark: string;
    vehical_type: string;
    service: string;
    amount: string;
    pax: string;
    guestId: string;
    guest: Guest;
  }
  
const Discount:FC<ItenaryInputProps> = ( paramsid)  => {
    const [apiData, setApiData] = useState<ActivityBooking | null>(null);

    useEffect(() => {
      const fetchGuestInfo = async () => {
        try {
          // Fetch data from your Next.js API endpoint based on the provided reservationid
          const response = await fetch(`/api/Forms/Complimentary/${paramsid.paramsid}`);
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
          Reviewed You'r Discount Data
        </div>
      <div className="rounded-md border">
      <Table>
        <TableHeader>
            <TableRow>
          <TableHead>
          Activies
          </TableHead>
          <TableHead>
          time
          </TableHead>
          <TableHead>
          date
          </TableHead>
          <TableHead>
          complimentary
          </TableHead>
          <TableHead>
          remark
          </TableHead>
          <TableHead>
          vehical_type
          </TableHead>
          <TableHead>
          service
          </TableHead>
          <TableHead>
          amount
          </TableHead>
          <TableHead>
          pax
          </TableHead>
            </TableRow>
        </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>
                  {apiData?.Activies}
                </TableCell>
                <TableCell>
                  {apiData?.time}
                </TableCell>
                <TableCell>
                  {apiData?.date}
                </TableCell>
                <TableCell>
                  {apiData?.complimentary}
                </TableCell>
                <TableCell>
                  {apiData?.remark}
                </TableCell>
                <TableCell>
                  {apiData?.vehical_type}
                </TableCell>
                <TableCell>
                  {apiData?.service}
                </TableCell>
                <TableCell>
                  {apiData?.amount}
                </TableCell>
                <TableCell>
                  {apiData?.pax}
                </TableCell>
              </TableRow>
            </TableBody>
      </Table>
    </div>
      </div>
  )
}

export default Discount