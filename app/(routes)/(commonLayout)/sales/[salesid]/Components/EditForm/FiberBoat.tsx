"use client"
import React, { FC, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
type ItenaryInputProps = {
  id: string;
}

interface DataItem {
  id: number;
  time: string,
  arrival: string;
  stay: string;
  service: string;
  boattype: string;
}
const FiberBoatForm: FC<ItenaryInputProps> = ({ id }) => {
  const [recordInput, setRecordInput] = useState([])
  //   console.log(paramsid);

  const [apiData, setApiData] = useState<DataItem[]>([]);
  console.log(apiData);


  useEffect(() => {
    const fetchGuestInfo = async () => {
      try {
        // Fetch data from your Next.js API endpoint based on the provided reservationid
        const response = await fetch(`/api/Forms/FiberBoat/${id}`);
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
      const response = await fetch(`/api/guest/EditFormdata/fiberboat/${id}`, {
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



  const handleInputTimeChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleInputStayChange = (id: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, stay: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputServiceChange = (id: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, service: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputBoattypeChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, boattype: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const [selectedData, setSelectedData] = useState<DataItem | null>(null);

  const handleButtonClick = (id: any) => {
    setSelectedData(id); // Set the selected item ID when the button is clicked
    // Additional logic to open the dialog or fetch data if needed
  };

  const GetDataByEdit = (id: number) => {
    const foundData = apiData.find(el => el.id === id);
    // setSelectedData(foundData || null)
    console.log(foundData);
    return foundData || null;
  }

  // console.log(GetDataByEdit('6569591d09d0cd429b7e7c84'));



  return (
    <div className='p-3'>
      <div className='flex items-center justify-center mb-3'>Edit the Fiber Boat Data</div>



      {
        apiData?.map((el: any, i) => (
          <Dialog>
            <div key={i}>
              <Table className='gap-y-16 mb-10 border rounded-xl'>
                <DialogContent className="overflow-y-scroll max-h-[90vh] bg-white sm:max-w-[600px]">
                  {/* <input type='text' className='border w-48 border-black px-1 py-2 rounded-xl' value={el.service} onChange={(event)=>handleInputServiceChange(el.id,event)} />
     */}
                  <DialogHeader className="pb-4">
                    <DialogTitle>Edit Fiber boat details</DialogTitle>
                    <DialogDescription>Edit a boat details</DialogDescription>
                  </DialogHeader>
                  <div className='space-y-5'>
                    <div className='flex   space-x-12'>
                      <div className='space-y-2'>
                        <label className='text-sm font-semibold '> Time</label> <br />
                        <input type='time' className=' border w-60 hover:border-blue-600 rounded-md border-gray-400 px-1 py-2 outline-none' value={el.time} onChange={(event) => handleInputTimeChange(el.id, event)} />
                      </div>
                      <div className='space-y-2'>
                        <label className='text-sm font-semibold'> Date </label> <br />
                        <input type='date' className=' border w-60  hover:border-blue-600 outline-none  rounded-md border-gray-400 px-1 py-2' value={el.arrival} onChange={(event) => handleInputArrivalChange(el.id, event)} />
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> Stay</label> <br />
                      <select className=' border   rounded-md hover:border-blue-600 outline-none border-gray-400 w-full  px-2 py-3 font-light   hover:border-2  text-sm' value={el.stay} onChange={(event) => handleInputStayChange(el.id, event)}>
                        <option value="PB">PB</option>
                        <option value="NL">NL</option>
                        <option value="HL">HL</option>
                        <option value="DP">DP</option>
                      </select>
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> Service</label> <br />
                      <select className=' border  hover:border-blue-600 rounded-md outline-none border-gray-400 w-full px-2 py-3 font-light  text-sm hover:border-2' value={el.service} onChange={(event) => handleInputServiceChange(el.id, event)} >
                        <option className='p-1' value="HIGH">HIGH</option>
                        <option className='p-1' value="MEDIUM">MEDIUM</option>
                        <option className='p-1' value="LOW">LOW</option>
                      </select>
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> Boattype</label> <br />
                      <input type='text' className=' border hover:border-2 hover:border-blue-600 text-sm outline-none rounded-md border-gray-400 w-full px-2 py-3 font-light' value={el.boattype} onChange={(event) => handleInputBoattypeChange(el.id, event)} />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose>
                      <Button type="submit">Save changes</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>

                <TableHeader className='bg-[#F1F5F9] ' >
                  <TableRow className='bg-[#F1F5F9] '>
                    <TableHead className=' text-black'>
                      Time
                    </TableHead>
                    <TableHead className=' text-black'>
                      Arrival
                    </TableHead>
                    <TableHead className=' text-black'>
                      Stay
                    </TableHead>
                    <TableHead className=' text-black'>
                      Service
                    </TableHead>
                    <TableHead className=' text-black'>
                      Boattype
                    </TableHead>
                    <TableHead className=' text-black'>
                      Edit
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className=' '>
                  <TableRow >

                    {/* {apiData?.time} */}


                    <TableCell>
                      {el.time}
                    </TableCell>

                    {/* {apiData?.arrival}/ */}

                    <TableCell>
                      {el.arrival}
                    </TableCell>


                    {/* {apiData?.stay} */}

                    <TableCell>
                      {el.stay}
                    </TableCell>


                    {/* {apiData?.service} */}

                    <TableCell>
                      {el.service}
                    </TableCell>


                    {/* {apiData?.boattype} */}

                    <TableCell>
                      {el.boattype}
                    </TableCell>

                    <DialogTrigger onClick={() => GetDataByEdit(el.id)} className='border text-white mt-2 ml-3  px-1 py-2 bg-blue-600 rounded-xl'>

                      Edit

                    </DialogTrigger>
                  </TableRow>
                </TableBody>
                {/* <div>{el.date}</div> */}
                {/* <label className='w-48'> Time</label> <br />
        <input type='text' className='border w-48 border-black px-1 py-2 rounded-xl' value={el.time}  onChange={(event)=>handleInputTimeChange(el.id,event)}/>
        <div>{el.time}</div>
        <label className='w-48'> Arrival</label> <br />
        <input type='text' className='border w-48 border-black px-1 py-2 rounded-xl' value={el.arrival} onChange={(event)=>handleInputArrivalChange(el.id,event)} />
        <label className='w-48'> Stay</label> <br />
        <input type='text'className='border w-48 border-black px-1 py-2 rounded-xl' value={el.stay} onChange={(event)=>handleInputStayChange(el.id,event)}/>
        <label className='w-48'> Service</label> <br />
        <input type='text' className='border w-48 border-black px-1 py-2 rounded-xl' value={el.service} onChange={(event)=>handleInputServiceChange(el.id,event)} />
        <label className='w-48'> Boattype</label> <br />
        <input type='text' className='border w-48 border-black px-1 py-2 rounded-xl' value={el.boattype} onChange={(event)=>handleInputBoattypeChange(el.id,event)} /> */}
                {/* <input type='text' value={el.PNR}  onChange={(event)=>handleInputPNRChange(el.id,event)} /> */}
                {/* Dailog Content */}
              </Table>
            </div>
          </Dialog>
        ))
      }
      <button className='bg-blue-600 px-1 py-2 rounded-xl text-white' onClick={updateData}>click To update</button>
    </div>
  )
}

export default FiberBoatForm