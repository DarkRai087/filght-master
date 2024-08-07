"use client"
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React, { FC, useEffect, useState } from 'react'
type ItenaryInputProps = {
  id: string;
}

interface DataItem {
  id: number;
  Activies: string,
  time: string;
  date: string;
  complimentary: any;
  remark: string;
  vehical_type: string;
  service: boolean;
  amount: string;
  pax: string
}
const DiscountedForm: FC<ItenaryInputProps> = ({ id }) => {
  const [recordInput, setRecordInput] = useState([])
  //   console.log(paramsid);

  const [apiData, setApiData] = useState<DataItem[]>([]);
  console.log(apiData);


  useEffect(() => {
    const fetchGuestInfo = async () => {
      try {
        // Fetch data from your Next.js API endpoint based on the provided reservationid
        const response = await fetch(`/api/Forms/Complimentary/${id}`);
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
      const response = await fetch(`/api/guest/EditFormdata/discount/${id}`, {
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

  const handleInputActivitiesChange = (id: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, Activies: event.target.value };
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

  const handleInputDateChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, date: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputComplimentaryChange = (id: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const parsedValue = value === 'true';
    // const complimentaryText = value === 'true' ? 'Yes' : "No";
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, complimentary: parsedValue };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputRemarkChange = (id: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, remark: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputVehicleTypeChange = (id: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, vehical_type: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputServiceChange = (id: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const parsedValue = value === 'true';
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, service: parsedValue };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputAmountChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, amount: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputPaxChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, pax: event.target.value };
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
    <div className=' p-3'>
      <div className='flex items-center justify-center mb-4'>Edit the Discounted Form Data</div>
      {
        apiData?.map((el: any, i) => (
          <Dialog>
            <div key={i}>
              <Table className='gap-y-16 mb-10 border rounded-xl'>
                <DialogContent className="overflow-y-scroll max-h-[90vh] bg-white sm:max-w-[600px]">
                  <DialogHeader className="pb-4">
                    <DialogTitle>Edit Discounted Form details</DialogTitle>
                    <DialogDescription>Edit a Discounted Form details</DialogDescription>
                  </DialogHeader>
                  {/* <label className='w-48'> Date</label> <br />
                  <div className='w-48'>{el.date}</div>
                  <label className='w-48'>Enter Activity</label> <br />
                  <input className='border w-48 border-black px-1 py-2 rounded-xl' type='text' value={el.Activies} onChange={(event) => handleInputActivitiesChange(el.id, event)} />
                  <label className='w-48'>Enter time</label> <br />
                  <input className='border w-48 border-black px-1 py-2 rounded-xl' type='text' value={el.time} onChange={(event) => handleInputTimeChange(el.id, event)} />
                  <label className='w-48'>Enter date</label> <br />
                  <input className='border w-48 border-black px-1 py-2 rounded-xl' type='text' value={el.date} onChange={(event) => handleInputDateChange(el.id, event)} /> */}

                  {/* <input type='text' value={el.complimentary} onChange={(event)=>handleInputComplimentaryChange(el.id,event)} /> */}
                  {/* <label className='w-48'>Enter Complimentary</label> <br />
                  <select className='border w-48 border-black px-1 py-2 rounded-xl' value={el.complimentary.toString()} onChange={(event) => handleInputComplimentaryChange(el.id, event)} >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <label className='w-48'>Enter remark</label> <br />
                  <input className='border w-48 border-black px-1 py-2 rounded-xl' type='text' value={el.remark} onChange={(event) => handleInputRemarkChange(el.id, event)} />
                  <label className='w-48'>Enter Vehical Type</label> <br />
                  <input className='border w-48 border-black px-1 py-2 rounded-xl' type='text' value={el.vehical_type} onChange={(event) => handleInputVehicleTypeChange(el.id, event)} />
                  <label className='w-48'>Enter Service</label> <br />
                  <select className='border w-48 border-black px-1 py-2 rounded-xl' value={el.service.toString()} onChange={(event) => handleInputServiceChange(el.id, event)} >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <label className='w-48'>Enter amount</label> <br />
                  <input className='border w-48 border-black px-1 py-2 rounded-xl' type='text' value={el.amount} onChange={(event) => handleInputAmountChange(el.id, event)} />
                  <label className='w-48'>Enter Pax</label> <br />
                  <input className='border w-48 border-black px-1 py-2 rounded-xl' type='text' value={el.pax} onChange={(event) => handleInputPaxChange(el.id, event)} /> */}
                  {/* <input type='text' value={el.PNR}  onChange={(event)=>handleInputPNRChange(el.id,event)} /> */}

                  <div className='space-y-6'>
                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> Activities</label> <br />
                      <select className=' text-sm border w-full rounded-md border-gray-400 px-1 py-2 hover:border-blue-600 font-light outline-none hover:border-2' value={el.Activies} onChange={(event) => handleInputActivitiesChange(el.id, event)}>
                        <option value="Activity 1">Activity 1</option>
                        <option value="Activity 2">Activity 2</option>
                        <option value="Activity 3">Activity 3</option>
                      </select>
                    </div>

                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> Stay</label> <br />
                      <select className=' text-sm border w-full rounded-md border-gray-400 px-1 py-2 hover:border-blue-600 font-light outline-none hover:border-2' value={el.stay} onChange={(event) => handleInputVehicleTypeChange(el.id, event)}>
                        <option value="PB">PB</option>
                        <option value="NL">NL</option>
                        <option value="HL">HL</option>
                        <option value="DP">DP</option>
                        <option value="RN">RN</option>
                        <option value="MY">MY</option>
                      </select>
                    </div>

                    <div className='flex   space-x-12'>
                      <div className='space-y-2'>
                        <label className='text-sm font-semibold '> Time</label> <br />
                        <input type='time' className=' text-sm border w-60 rounded-md border-gray-400 px-1 py-2 hover:border-blue-600 font-light outline-none hover:border-2' value={el.time} onChange={(event) => handleInputTimeChange(el.id, event)} />
                      </div>
                      <div className='space-y-2'>
                        <label className='text-sm font-semibold'> Date </label> <br />
                        <input type='date' className='text-sm border w-60 rounded-md border-gray-400 px-1 py-2 hover:border-blue-600 font-light outline-none hover:border-2' value={el.date} onChange={(event) => handleInputDateChange(el.id, event)} />
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-semibold '> Pax</label> <br />
                      <input type='text' className='text-sm border w-full rounded-md border-gray-400 px-1 py-2 hover:border-blue-600 font-light outline-none hover:border-2' value={el.pax} onChange={(event) => handleInputPaxChange(el.id, event)} />
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-semibold '> Amount</label> <br />
                      <input type='text' className=' text-sm border w-full rounded-md border-gray-400 px-1 py-2 hover:border-blue-600 font-light outline-none hover:border-2' value={el.amount} onChange={(event) => handleInputAmountChange(el.id, event)} />
                    </div>

                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> Complimentary</label> <br />
                      <select className='text-sm border w-full rounded-md border-gray-400 px-1 py-2 hover:border-blue-600 font-light outline-none hover:border-2' value={el.complimentary} onChange={(event) => handleInputComplimentaryChange(el.id, event)}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>
                    </div>

                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> Paid Service</label> <br />
                      <select className=' text-sm border w-full rounded-md border-gray-400 px-1 py-2 hover:border-blue-600 font-light outline-none hover:border-2' value={el.service} onChange={(event) => handleInputServiceChange(el.id, event)}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>
                    </div>

                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> Remark</label> <br />
                      <textarea className=' text-sm border w-full rounded-md border-gray-400 px-1 py-2 hover:border-blue-600 font-light outline-none hover:border-2' rows={5} cols={50} value={el.remark} onChange={(event) => handleInputRemarkChange(el.id, event)} >

                      </textarea>
                    </div>
                  </div>


                  <DialogFooter>
                    <DialogClose>
                      <Button type="submit">Save changes</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>

                <TableHeader className='bg-[#F1F5F9]' >
                  <TableRow className=' '>
                    <TableHead className=' text-black'>
                      Time
                    </TableHead>
                    <TableHead className=' text-black'>
                      Activity
                    </TableHead>
                    <TableHead className=' text-black'>
                      Date
                    </TableHead>
                    <TableHead className=' text-black'>
                      Complimentary
                    </TableHead>
                    <TableHead className=' text-black'>
                      Stay
                    </TableHead>
                    <TableHead className=' text-black'>
                      Service
                    </TableHead>
                    <TableHead className=' text-black'>
                      Amount
                    </TableHead>
                    <TableHead className=' text-black'>
                      Pax
                    </TableHead>
                    <TableHead className=' text-black'>
                      Remark
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


                      {el.Activies}


                    </TableCell>
                    <TableCell>
                      {/* {apiData?.stay} */}


                      {el.date}


                    </TableCell>
                    <TableCell>
                      {/* {apiData?.service} */}


                      {el.complimentary.toString()}


                    </TableCell>
                    <TableCell>
                      {/* {apiData?.boattype} */}


                      {el.vehical_type}


                    </TableCell>
                    <TableCell>
                      {/* {apiData?.boattype} */}


                      {el.service.toString()}


                    </TableCell>
                    <TableCell>
                      {/* {apiData?.boattype} */}


                      {el.amount}


                    </TableCell>
                    <TableCell>
                      {/* {apiData?.boattype} */}


                      {el.pax}


                    </TableCell>
                    <TableCell>
                      {/* {apiData?.boattype} */}


                      {el.remark}


                    </TableCell>
                    <DialogTrigger onClick={() => GetDataByEdit(el.id)} className='border text-white  px-1 py-2 bg-blue-600 rounded-xl mt-2 ml-4' >

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

export default DiscountedForm