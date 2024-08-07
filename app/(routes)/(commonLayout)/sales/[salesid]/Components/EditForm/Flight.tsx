"use client"
import { Button } from '@/components/ui/button';
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog } from '@radix-ui/react-dialog';
import React, { FC, useEffect, useState } from 'react'

type ItenaryInputProps = {
  id: string;
}

interface DataItem {
  id: number;
  time: string,
  flightno: string;
  deptcity: string;
  arrival: string;
  arrivalcity: string;
  PNR: string;
}
const FlightForm: FC<ItenaryInputProps> = ({ id }) => {
  const [recordInput, setRecordInput] = useState([])
  //   console.log(paramsid);

  const [apiData, setApiData] = useState<DataItem[]>([]);
  console.log(apiData);

  console.log(id);


  useEffect(() => {
    const fetchGuestInfo = async () => {
      try {
        // Fetch data from your Next.js API endpoint based on the provided reservationid
        const response = await fetch(`/api/Forms/Flight/${id}`);
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
      const response = await fetch(`/api/guest/EditFormdata/flight/${id}`, {
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

  const handleInputVehicleTimeChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, time: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputArrivalChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, arrival: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputFlightnoChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, flightno: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputdeptcityChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, deptcity: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputarrivalcityChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, arrivalcity: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputPNRChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, PNR: event.target.value };
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
    <div className='p-3'>
      <div className='flex items-center mb-3 justify-center'>Edit the Flight Data</div>
      {
        apiData?.map((el: any, i) => (
          <Dialog>
            <div key={i}>
              {/* <div>{el.date}</div> */}
              <Table className='gap-y-16 mb-10 border rounded-xl'>
                <DialogContent className="overflow-y-scroll max-h-[90vh] bg-white sm:max-w-[600px]">
                  <DialogHeader className="pb-4">
                    <DialogTitle>Edit Fiber boat details</DialogTitle>
                    <DialogDescription>Edit a boat details</DialogDescription>
                  </DialogHeader>

                  {/* <label className='w-48'>Enter time</label> <br />
                  <input className='border w-48 border-black px-1 py-2 rounded-xl' type='text' value={el.time} onChange={(event) => handleInputVehicleTimeChange(el.id, event)} />
                  <label className='w-48'>Enter arrival</label> <br />
                  <input className='border w-48 border-black px-1 py-2 rounded-xl' type='text' value={el.arrival} onChange={(event) => handleInputArrivalChange(el.id, event)} />
                  <label className='w-48'>Enter flightno</label> <br />
                  <input className='border w-48  border-black px-1 py-2 rounded-xl' type='text' value={el.flightno} onChange={(event) => handleInputFlightnoChange(el.id, event)} />
                  <label className='w-48'>Enter deptcity</label> <br />
                  <input className='border w-48 border-black px-1 py-2 rounded-xl' type='text' value={el.deptcity} onChange={(event) => handleInputdeptcityChange(el.id, event)} />
                  <label className='w-48'>Enter arrivalcity</label> <br />
                  <input className='border w-48 border-black px-1 py-2 rounded-xl' type='text' value={el.arrivalcity} onChange={(event) => handleInputarrivalcityChange(el.id, event)} />
                  <label className='w-48'>Enter PNR</label> <br />
                  <input className='border w-48 border-black px-1 py-2 rounded-xl' type='text' value={el.PNR} onChange={(event) => handleInputPNRChange(el.id, event)} /> */}


                  <div className='space-y-6'>
                    <div className='flex   space-x-12'>
                      <div className='space-y-2'>
                        <label className='text-sm font-semibold '> Time</label> <br />
                        <input type='time' className='text-sm border w-60 rounded-md border-gray-400 px-1 py-2 hover:border-blue-600 font-light outline-none hover:border-2' value={el.time} onChange={(event) => handleInputVehicleTimeChange(el.id, event)} />
                      </div>
                      <div className='space-y-2'>
                        <label className='text-sm font-semibold'> Date </label> <br />
                        <input type='date' className='text-sm border w-60  rounded-md border-gray-400 px-1 py-2 hover:border-blue-600 font-light outline-none hover:border-2' value={el.arrival} onChange={(event) => handleInputArrivalChange(el.id, event)} />
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> Flight No </label> <br />
                      <input type='text' className='text-sm border w-full  rounded-md border-gray-400 px-1 py-2 hover:border-blue-600 font-light outline-none hover:border-2' value={el.flightno} onChange={(event) => handleInputFlightnoChange(el.id, event)} />
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> Depticity </label> <br />
                      <input type='text' className='text-sm border w-full  rounded-md border-gray-400 px-1 py-2 hover:border-blue-600 font-light outline-none hover:border-2' value={el.deptcity} onChange={(event) => handleInputdeptcityChange(el.id, event)} />
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> Arivilacity</label> <br />
                      <input type='text' className=' text-sm border rounded-md border-gray-400 w-full px-1 py-2 hover:border-blue-600 font-light outline-none hover:border-2' value={el.arrivalcity} onChange={(event) => handleInputarrivalcityChange(el.id, event)} />
                    </div>
                    <div>
                      <label className='text-sm font-semibold'> PNR</label> <br />
                      <input type='text' className='text-sm border rounded-md border-gray-400 w-full px-1 py-2 hover:border-blue-600 font-light outline-none hover:border-2' value={el.PNR} onChange={(event) => handleInputPNRChange(el.id, event)} />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose>
                      <Button type="submit">Save changes</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>

                <TableHeader className='bg-[#F1F5F9]' >
                  <TableRow className='bg-[#F1F5F9]'>
                    <TableHead className=' text-black'>
                      Time
                    </TableHead>
                    <TableHead className=' text-black'>
                      Arrival
                    </TableHead>
                    <TableHead className=' text-black'>
                      Flight No
                    </TableHead>
                    <TableHead className=' text-black'>
                      Depticity
                    </TableHead>
                    <TableHead className=' text-black'>
                      Arrivalicity
                    </TableHead>
                    <TableHead className=' text-black'>
                      PNR
                    </TableHead>
                    <TableHead className=' text-black'>
                      Edit
                    </TableHead>
                  </TableRow>
                </TableHeader>


                <TableBody className=' '>
                  <TableRow className=''>
                    <TableCell className=''>
                      {/* {apiData?.time} */}



                      {el.time}


                    </TableCell>
                    <TableCell>
                      {/* {apiData?.arrival}/ */}


                      {el.arrival}


                    </TableCell>
                    <TableCell>
                      {/* {apiData?.stay} */}


                      {el.flightno}


                    </TableCell>
                    <TableCell>
                      {/* {apiData?.service} */}


                      {el.deptcity}


                    </TableCell>
                    <TableCell>
                      {/* {apiData?.boattype} */}


                      {el.arrivalcity}


                    </TableCell>

                    <TableCell>
                      {/* {apiData?.boattype} */}


                      {el.PNR}


                    </TableCell>
                    <DialogTrigger onClick={() => GetDataByEdit(el.id)} className='border text-white mt-2  px-1 py-2 bg-blue-600 rounded-xl ml-4'>

                      Edit

                    </DialogTrigger>
                  </TableRow>

                </TableBody>

              </Table>
            </div>
          </Dialog>
        ))
      }
      <button className='bg-blue-600 px-1 py-2 rounded-xl text-white' onClick={updateData}>click To update</button>
    </div>
  )
}

export default FlightForm