"use client"
import React, { FC, useEffect, useState, ChangeEvent } from 'react'
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
  place: String;
  hotel: String[];
  choosedhotel: String;
  roomType: String;
  plan: String;
  rooms: String;
  Ex_ADL: String;
  CWB: String;
  CWOB: String;
  comp_Child: String;
  checkIn: String;
  checkOut: String;
  guestChoice: String;
}
const RoomBookingForm: FC<ItenaryInputProps> = ({ id }) => {
  const [recordInput, setRecordInput] = useState([])
  //   console.log(paramsid);

  const [apiData, setApiData] = useState<DataItem[]>([]);
  console.log(apiData);


  useEffect(() => {
    const fetchGuestInfo = async () => {
      try {
        // Fetch data from your Next.js API endpoint based on the provided reservationid
        const response = await fetch(`/api/Forms/RoomBooking/${id}`);
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
      const response = await fetch(`/api/guest/EditFormdata/roombooking/${id}`, {
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
      // Handle success
    } catch (error) {
      console.error('Error while updating data:', error);
      // Handle error
    }
  }

  const handleInputPlaceChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, place: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputChoosedhotelChange = (id: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, choosedhotel: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputRoomTypeChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, roomType: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputPlanChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, plan: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputRoomsChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, rooms: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputExADLChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, Ex_ADL: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputCWBChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, CWB: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputCWOBChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, CWOB: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputCompChildChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, comp_Child: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputGuestChange = (id: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, guestChoice: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };


  const handleChange = (id: number, event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setApiData(prevData => {
      const updatedData = prevData.map(item => {
        if (item.id === id) {
          return { ...item, activity: [newValue] }; // Update the entire 'activity' array with a single value
        }
        return item;
      });

      return updatedData;
    });
  };

  const GetDataByEdit = (id: number) => {
    const foundData = apiData.find(el => el.id === id);
    // setSelectedData(foundData || null)
    console.log(foundData);
    return foundData || null;
  }


  return (
    <div className=' p-3' >
      <div className='flex mb-4 items-center justify-center'>Edit the RoomBooking Data</div>
      {
        apiData?.map((el: any, i) => (
          <Dialog>
            <div key={i}>
              <Table className='gap-y-16 mb-10 border rounded-xl'>
                <DialogContent className="overflow-y-scroll max-h-[90vh] bg-white sm:max-w-[600px]">
                  {/* <input type='text' className='border w-48 border-black px-1 py-2 rounded-xl' value={el.service} onChange={(event)=>handleInputServiceChange(el.id,event)} />
     */}
                  <DialogHeader className="pb-4">
                    <DialogTitle>Edit RoomBooking details</DialogTitle>
                    <DialogDescription>Edit a RoomBooking details</DialogDescription>
                  </DialogHeader>
                  {/* <hr />
        <label className='w-48'>Enter place</label> <br />
        <input className='border w-48 border-black px-1 py-2 rounded-xl' type='text' value={el.place}  onChange={(event)=>handleInputPlaceChange(el.id,event)}/>
        <label  className='w-48'>Enter hotel</label> <br />
      <input className='border w-48 border-black px-1 py-2 rounded-xl' type='text' value={el.hotel} onChange={(event)=>handleChange(el.id,event)}/>
      <label  className='w-48'>Enter choosedhotel</label> <br />
        <input className='border w-48 border-black px-1 py-2 rounded-xl' type='text' value={el.choosedhotel} onChange={(event)=>handleInputChoosedhotelChange(el.id,event)}/>
        <label  className='w-48'>Enter roomType</label> <br />
        <input className='border w-48 border-black px-1 py-2 rounded-xl' type='text' value={el.roomType}  onChange={(event)=>handleInputRoomTypeChange(el.id,event)}/>
        <label  className='w-48'>Enter plan</label> <br />
        <input className='border w-48 border-black px-1 py-2 rounded-xl' type='text' value={el.plan} onChange={(event)=>handleInputPlanChange(el.id,event)} />
        <label  className='w-48'>Enter rooms</label> <br />
        <input className='border w-48 border-black px-1 py-2 rounded-xl' type='text' value={el.rooms}  onChange={(event)=>handleInputRoomsChange(el.id,event)} />
        <label  className='w-48'>Enter Ex_ADL</label> <br />
        <input className='border w-48 border-black px-1 py-2 rounded-xl' type='text' value={el.Ex_ADL}  onChange={(event)=>handleInputExADLChange(el.id,event)} />
        <label  className='w-48'>Enter CWB</label> <br />
        <input className='border w-48 border-black px-1 py-2 rounded-xl' type='text' value={el.CWB}  onChange={(event)=>handleInputCWBChange(el.id,event)} />
        <label  className='w-48'>Enter CWOB</label> <br />
        <input className='border w-48 border-black px-1 py-2 rounded-xl' type='text' value={el.CWOB}  onChange={(event)=>handleInputCWOBChange(el.id,event)} />
        <label  className='w-48'>Enter compChild</label> <br />
        <input className='border w-48 border-black px-1 py-2 rounded-xl' type='text' value={el.comp_Child}  onChange={(event)=>handleInputCompChildChange(el.id,event)} />
        <label  className='w-48'>Enter CheckIn</label> <br />
        <input className='border w-48 border-black px-1 py-2 rounded-xl' type='text' value={el.checkIn}  onChange={(event)=>handleInputCheckInChange(el.id,event)} />
        </div> */}

                  <div className='space-y-2'>
                    <label className='text-sm font-semibold'> Date</label> <br />
                    <div className=' border hover:border-2 hover:border-blue-600 text-sm outline-none rounded-md border-gray-400 w-16 px-2 py-3 font-light'>{el.place}</div>
                    <label className='text-sm font-semibold'> Hotels</label> <br />
                    <input type='text' className=' border hover:border-2 hover:border-blue-600 text-sm outline-none rounded-md border-gray-400 w-full px-2 py-3 font-light' value={el.hotel} onChange={(event) => handleChange(el.id, event)} />

                    <div className='flex   space-x-12'>
                      <div className='space-y-2 w-full '>
                        <label className='text-sm font-semibold'> Choice</label> <br />
                        <select className=' border   rounded-md hover:border-blue-600 outline-none border-gray-400  px-2 py-3 w-full font-light   hover:border-2  text-sm' value={el.guestChoice} onChange={(event) => handleInputGuestChange(el.id, event)} >
                          <option value="particular">particular</option>
                          <option value="preffred">preffred</option>
                          <option value="optional">optional</option>
                        </select>
                      </div>
                      <div className='space-y-2 w-full '>
                        <label className='text-sm font-semibold'> Select Hotels</label> <br />
                        <select className=' border   rounded-md hover:border-blue-600 outline-none  border-gray-400  w-full  px-2 py-3 font-light   hover:border-2  text-sm' value={el.choosedhotel} onChange={(event) => handleInputChoosedhotelChange(el.id, event)}>
                          <option value="Hotel 1">Hotel 1</option>
                          <option value="Hotel 2">Hotel 2</option>
                          <option value="Hotel 3">Hotel 3</option>
                        </select>
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> Room Type</label> <br />
                      <input type='text' className=' border hover:border-2 hover:border-blue-600 text-sm outline-none rounded-md border-gray-400 w-full px-2 py-3 font-light' value={el.roomType} onChange={(event) => handleInputRoomTypeChange(el.id, event)} />
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> Plans</label> <br />
                      <input type='text' className=' border hover:border-2 hover:border-blue-600 text-sm outline-none rounded-md border-gray-400 w-full px-2 py-3 font-light' value={el.plan} onChange={(event) => handleInputPlanChange(el.id, event)} />
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> Rooms</label> <br />
                      <input type='text' className=' border hover:border-2 hover:border-blue-600 text-sm outline-none rounded-md border-gray-400 w-full px-2 py-3 font-light' value={el.rooms} onChange={(event) => handleInputRoomsChange(el.id, event)} />
                    </div>

                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> Ex-ADL</label> <br />
                      <input type='text' className=' border hover:border-2 hover:border-blue-600 text-sm outline-none rounded-md border-gray-400 w-full px-2 py-3 font-light' value={el.Ex_ADL} onChange={(event) => handleInputExADLChange(el.id, event)} />
                    </div>

                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> CWB</label> <br />
                      <input type='text' className=' border hover:border-2 hover:border-blue-600 text-sm outline-none rounded-md border-gray-400 w-full px-2 py-3 font-light' value={el.CWB} onChange={(event) => handleInputCWBChange(el.id, event)} />
                    </div>

                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> CWOB</label> <br />
                      <input type='text' className=' border hover:border-2 hover:border-blue-600 text-sm outline-none rounded-md border-gray-400 w-full px-2 py-3 font-light' value={el.CWOB} onChange={(event) => handleInputCWOBChange(el.id, event)} />
                    </div>

                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> comp_Child</label> <br />
                      <input type='text' className=' border hover:border-2 hover:border-blue-600 text-sm outline-none rounded-md border-gray-400 w-full px-2 py-3 font-light' value={el.comp_Child} onChange={(event) => handleInputCompChildChange(el.id, event)} />
                    </div>

                  </div>

                  <DialogFooter>
                    <DialogClose>
                      <Button type="submit">Save changes</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>

                <TableHeader className='bg-[#F1F5F9] ' >
                  <TableRow>
                    <TableHead className=' text-black' >
                      Place
                    </TableHead>
                    <TableHead className=' text-black'>
                      Hotel
                    </TableHead>
                    <TableHead className=' text-black'>
                      Choosed Hotel
                    </TableHead>
                    <TableHead className=' text-black'>
                      Room Type
                    </TableHead>
                    <TableHead className=' text-black'>
                      Plan
                    </TableHead>
                    <TableHead className=' text-black'>
                      Rooms
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
                      Comp_Child
                    </TableHead>
                    <TableHead className=' text-black'>
                      CheckIn
                    </TableHead>
                    <TableHead className=' text-black'>
                      CheckOut
                    </TableHead>
                    <TableHead className=' text-black'>
                      Guest Choice
                    </TableHead>
                    <TableHead className=' text-black'>
                      Edit
                    </TableHead>
                  </TableRow>
                </TableHeader>



                <TableBody>
                  <TableRow>

                    <TableCell>
                      {el.place}
                    </TableCell>

                    <TableCell>
                      {el.hotel}
                    </TableCell>

                    <TableCell>
                      {el.choosedhotel}
                    </TableCell>

                    <TableCell>
                      {el.roomType}
                    </TableCell>

                    <TableCell>
                      {el.plan}
                    </TableCell>

                    <TableCell>
                      {el.rooms}
                    </TableCell>

                    <TableCell>
                      {el.Ex_ADL}
                    </TableCell>

                    <TableCell>
                      {el.CWB}
                    </TableCell>

                    <TableCell>
                      {el.CWOB}
                    </TableCell>

                    <TableCell>
                      {el.comp_Child}
                    </TableCell>

                    <TableCell>
                      {el.checkIn}
                    </TableCell>

                    <TableCell>
                      {el.checkOut}
                    </TableCell>

                    <TableCell>
                      {el.guestChoice}
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
      <button className='bg-blue-600 px-1 py-2 rounded-xl text-white' onClick={updateData}>click To update</button>
    </div>
  )
}

export default RoomBookingForm