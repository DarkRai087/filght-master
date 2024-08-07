"use client"
import React, { FC, useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
type ItenaryInputProps = {
  id: string;
}

interface DataItem {
  id: number;
  time: string,
  route: string;
  cruise: string;
  journeyDate: string;
  seat_class: string;
  PNR: string;
}
const CruiseForm: FC<ItenaryInputProps> = ({ id }) => {
  const [recordInput, setRecordInput] = useState([])
  //   console.log(paramsid);

  const [apiData, setApiData] = useState<DataItem[]>([]);
  console.log(apiData);


  useEffect(() => {
    const fetchGuestInfo = async () => {
      try {
        // Fetch data from your Next.js API endpoint based on the provided reservationid
        const response = await fetch(`/api/Forms/Cruise/${id}`);
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
  }, [id]); // Re-run effect when reservationid changes



  const updateData = async () => {
    try {
      const response = await fetch(`/api/guest/EditFormdata/Cruise/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        throw new Error('Failed to update data');
      }

      const result = await response.json();
      console.log('Data updated successfully:', result);
      location.reload()
      // Handle success
    } catch (error) {
      console.error('Error while updating data:', error);
      // Handle error
    }
  }

  const handleInputPNRChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, PNR: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputCruiseChange = (id: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, cruise: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputTimeChange = (id: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, time: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputRouteChange = (id: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, route: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputJourneyDateChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, journeyDate: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputSeat_classChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, seat_class: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };


  const GetDataByEdit = (id: number) => {
    const foundData = apiData.find(el => el.id === id);
    // setSelectedData(foundData || null)
    console.log(foundData);
    return foundData || null;
  }


  return (
    <div className='space-y-4 p-3'>
      <div className='flex items-center justify-center'>Edit the Cruise Data</div>
      {
        apiData?.map((el: any, i) => (
          <Dialog>
            <div key={i}>
              <Table className='gap-y-16 mb-10 border rounded-xl'>
                <DialogContent className="overflow-y-scroll max-h-[90vh] bg-white sm:max-w-[600px]">
                  {/* <input type='text' className='border w-48 border-black px-1 py-2 rounded-xl' value={el.service} onChange={(event)=>handleInputServiceChange(el.id,event)} />
     */}
                  <DialogHeader className="pb-4">
                    <DialogTitle>Edit Cruise details</DialogTitle>
                    <DialogDescription>Edit a Cruise details</DialogDescription>
                  </DialogHeader>
                  {/* <label className='w-48'>Enter time</label> <br />
        <input type='text' className='border 48 border-black px-1 py-2 rounded-xl' value={el.time}  onChange={(event)=>handleInputTimeChange(el.id,event)}/>
        <label className='w-48'>Enter route</label> <br />
        <input type='text' className='border 48 border-black px-1 py-2 rounded-xl' value={el.route} onChange={(event)=>handleInputRouteChange(el.id,event)} />
        <label className='w-48'>Enter Cruise</label> <br />
        <input type='text' className='border 48 border-black px-1 py-2 rounded-xl' value={el.cruise} onChange={(event)=>handleInputCruiseChange(el.id,event)}/>
        <label className='w-48'>Enter journeyDate</label> <br />
        <input type='text' className='border 48 border-black px-1 py-2 rounded-xl' value={el.journeyDate}  onChange={(event)=>handleInputJourneyDateChange(el.id,event)}/>
        <label className='w-48'>Enter seatClass</label> <br />
        <input type='text' className='border 48 border-black px-1 py-2 rounded-xl' value={el.seat_class} onChange={(event)=>handleInputSeat_classChange(el.id,event)} />
        <label className='w-48'>Enter PNR</label> <br />
        <input type='text'className='border 48 border-black px-1 py-2 rounded-xl' value={el.PNR}  onChange={(event)=>handleInputPNRChange(el.id,event)} />
        </div> */}


                  <div className='space-y-5'>

                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> Time</label> <br />
                      <select className=' border   rounded-md hover:border-blue-600 outline-none border-gray-400  w-full  px-2 py-3 font-light  text-sm hover:border-2  ' value={el.time} onChange={(event) => handleInputTimeChange(el.id, event)}>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> Journey Date </label> <br />
                      <input type='date' className=' border w-full  hover:border-blue-600 outline-none  rounded-md border-gray-400 px-1 py-2' value={el.journeyDate} onChange={(event) => handleInputJourneyDateChange(el.id, event)} />
                    </div>

                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> Route</label> <br />
                      <select className=' border   rounded-md hover:border-blue-600 outline-none border-gray-400 w-full  px-2 py-3 font-light  text-sm hover:border-2  ' value={el.route} onChange={(event) => handleInputRouteChange(el.id, event)}>
                        <option value="PB-Havelock">PB-Havelock</option>
                        <option value="PB-Neil">PB-Neil</option>
                        <option value="Havelock-Neil">Havelock-Neil</option>
                        <option value="Havelock-PB">Havelock-PB</option>
                        <option value="Neil-Havelock">Neil-Havelock</option>
                        <option value="Neil-PB">Neil-PB</option>
                      </select>
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> Cruise</label> <br />
                      <select className=' border  hover:border-blue-600 rounded-md outline-none border-gray-400 w-full px-2 py-3 font-light  text-sm hover:border-2' value={el.cruise} onChange={(event) => handleInputCruiseChange(el.id, event)} >
                        <option value="Nautika">Nautika</option>
                        <option value="Makruzz">Makruzz</option>
                        <option value="Green Ocean">Green Ocean</option>
                      </select>
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> Seat Class</label> <br />
                      <input type='text' className=' border hover:border-2 hover:border-blue-600 text-sm outline-none rounded-md border-gray-400 w-full px-2 py-3 font-light' value={el.seat_class} onChange={(event) => handleInputSeat_classChange(el.id, event)} />
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> PNR</label> <br />
                      <input type='text' className=' border hover:border-2 hover:border-blue-600 text-sm outline-none rounded-md border-gray-400 w-full px-2 py-3 font-light' value={el.PNR} onChange={(event) => handleInputPNRChange(el.id, event)} />
                    </div>
                  </div>

                  <DialogFooter>
                    <DialogClose>
                      <Button type="submit">Save changes</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
                <TableHeader className='bg-[#F1F5F9] ' >
                  <TableRow className='bg-[#F1F5F9] ' >
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
                    <TableHead className=' text-black'>
                      Edit
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  <TableRow>
                    <TableCell>
                      {el.time}
                    </TableCell>
                    <TableCell>
                      {/* {apiData?.route} */}

                      {el.route}

                    </TableCell>
                    <TableCell>
                      {/* {apiData?.cruise} */}


                      {el.cruise}

                    </TableCell>
                    <TableCell>
                      {/* {apiData?.journeyDate} */}


                      {el.journeyDate}

                    </TableCell>
                    <TableCell>
                      {/* {apiData?.seat_class} */}

                      {el.seat_class}

                    </TableCell>
                    <TableCell>
                      {/* {apiData?.PNR} */}


                      {el.PNR}

                    </TableCell>
                    <DialogTrigger onClick={() => GetDataByEdit(el.id)} className='border text-white mt-2 ml-3  px-1 py-2 bg-blue-600 rounded-xl'>

                      Edit

                    </DialogTrigger>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Dialog>
        ))
      }
      <button onClick={updateData} className='bg-blue-600 px-1 py-2 rounded-xl text-white' >click To update</button>
    </div>
  )
}

export default CruiseForm