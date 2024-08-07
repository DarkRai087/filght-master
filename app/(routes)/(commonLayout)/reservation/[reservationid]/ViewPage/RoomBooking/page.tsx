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
const RoomBooking = ({ params }: { params: IParams }) => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchGuestInfo = async () => {
      try {
        // Fetch data from your Next.js API endpoint based on the provided reservationid
        const response = await fetch(`/api/Forms/RoomBooking/${params.reservationid}`);
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
       
      <div className='flex items-center justify-center mt-8 mb-4'>
        Reviewed You'r Room Booking Data
      </div>
      <div className="rounded-md border">
        <Table className='rounded-xl'>
          <TableHeader className='bg-[#F1F5F9] '>
            <TableRow>
              <TableHead className=' text-black'>
                place
              </TableHead>
              <TableHead className=' text-black'>
                hotel
              </TableHead>
              <TableHead className=' text-black'>
                choosedhotel
              </TableHead>
              <TableHead className=' text-black'>
                roomType
              </TableHead>
              <TableHead className=' text-black'>
                plan
              </TableHead>
              <TableHead className=' text-black'>
                rooms
              </TableHead>
              <TableHead className=' text-black'>
                Ex_ADL
              </TableHead>
              <TableHead className=' text-black'>
                CWB
              </TableHead>
              <TableHead className=' text-black'>
                CWOB
              </TableHead>
              <TableHead className=' text-black'>
                comp_Child
              </TableHead>
              <TableHead className=' text-black'>
                checkIn
              </TableHead>
              <TableHead className=' text-black'>
                checkOut
              </TableHead>
              <TableHead className=' text-black'>
                guestChoice
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className='space-y-2'>
            <TableRow>
              <TableCell className='space-y-4'>
                {apiData.map((el: any, i) => (
                  <div>

                    {
                      el.guestId === params.reservationid && <div>{el.place}</div>
                    }


                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.hotel} */}
                {apiData.map((el: any, i) => (
                  <div>


                    {
                      el.guestId === params.reservationid && <div>{el.hotel}</div>
                    }

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.choosedhotel} */}
                {apiData.map((el: any, i) => (
                  <div>

                    {
                      el.guestId === params.reservationid && <div>{el.choosedhotel}</div>
                    }

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.roomType} */}
                {apiData.map((el: any, i) => (
                  <div>

                    {
                      el.guestId === params.reservationid && <div>{el.roomType}</div>
                    }

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.plan} */}
                {apiData.map((el: any, i) => (
                  <div>

                    {
                      el.guestId === params.reservationid && <div>{el.plan}</div>
                    }

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.rooms} */}
                {apiData.map((el: any, i) => (
                  <div>

                    {
                      el.guestId === params.reservationid && <div>{el.rooms}</div>
                    }

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.Ex_ADL} */}
                {apiData.map((el: any, i) => (
                  <div>


                    {
                      el.guestId === params.reservationid && <div>{el.Ex_ADL}</div>
                    }

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.CWB} */}
                {apiData.map((el: any, i) => (
                  <div>


                    {
                      el.guestId === params.reservationid && <div>{el.CWB}</div>
                    }

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.CWOB} */}
                {apiData.map((el: any, i) => (
                  <div>

                    {
                      el.guestId === params.reservationid && <div>{el.CWOB}</div>
                    }

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.comp_Child} */}
                {apiData.map((el: any, i) => (
                  <div>

                    {
                      el.guestId === params.reservationid && <div>{el.comp_Child}</div>
                    }

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.checkIn} */}
                {apiData.map((el: any, i) => (
                  <div>

                    {
                      el.guestId === params.reservationid && <div>{el.checkIn}</div>
                    }

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.checkOut} */}
                {apiData.map((el: any, i) => (
                  <div>


                    {
                      el.guestId === params.reservationid && <div>{el.checkOut}</div>
                    }

                  </div>
                ))}
              </TableCell>
              <TableCell className='space-y-4'>
                {/* {apiData?.guestChoice} */}
                {apiData.map((el: any, i) => (
                  <div>


                    {
                      el.guestId === params.reservationid && <div>{el.guestChoice}</div>
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

export default RoomBooking