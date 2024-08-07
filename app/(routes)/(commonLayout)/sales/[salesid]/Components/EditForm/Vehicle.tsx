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
  place: string,
  service: string;
  ac_nonac: string;
  vehical_type: string;
}
const VehicalForm: FC<ItenaryInputProps> = ({ id }) => {
  const [recordInput, setRecordInput] = useState([])
  //   console.log(paramsid);

  const [apiData, setApiData] = useState<DataItem[]>([]);
  console.log(apiData);

  console.log(id);


  useEffect(() => {
    const fetchGuestInfo = async () => {
      try {
        // Fetch data from your Next.js API endpoint based on the provided reservationid
        const response = await fetch(`/api/Forms/Vehicle/${id}`);
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
      const response = await fetch(`/api/guest/EditFormdata/vehical/${id}`, {
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

  const handleInputVehicleTypeChange = (id: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, vehical_type: event.target.value };
      }
      return el;
    });
    setApiData(updatedData);
  };

  const handleInputPlaceChange = (id: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, place: event.target.value };
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

  const handleInputAcNoACChange = (id: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedData = apiData.map(el => {
      if (el.id === id) {
        return { ...el, ac_nonac: event.target.value };
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
      <div className='flex items-center justify-center'>Edit the Vehicle Data</div>
      {
        apiData?.map((el: any, i) => (
          <Dialog>
            <div key={i}>
              <Table className='gap-y-16 mb-10 border rounded-xl'>
                <DialogContent className="overflow-y-scroll max-h-[90vh] bg-white sm:max-w-[600px]">
                  <DialogHeader className="pb-4">
                    <DialogTitle>Edit Vehicle details</DialogTitle>
                    <DialogDescription>Edit a vehical details</DialogDescription>
                  </DialogHeader>
                  {/* <label className='w-48'>Enter place</label> <br />
        <input className='border w-48 border-black px-1 py-2 rounded-xl' type='text' value={el.place} onChange={(event)=>handleInputPlaceChange(el.id,event)}/>
        <label className='w-48'>Enter Service</label> <br />
        <input className='border w-48 border-black px-1 py-2 rounded-xl' type='text' value={el.service} onChange={(event)=>handleInputServiceChange(el.id,event)} />
        <label className='w-48'>Enter ac_nonac</label> <br />
        <input className='border w-48 border-black px-1 py-2 rounded-xl' type='text' value={el.ac_nonac}  onChange={(event)=>handleInputAcNoACChange(el.id,event)}/>
        <label className='w-48'>Enter vehical_type</label> <br />
        <input  className='border w-48 border-black px-1 py-2 rounded-xl' type='text' value={el.vehical_type}  onChange={(event)=>handleInputVehicleTypeChange(el.id,event)} /> */}

                  <div className='space-y-5'>

                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> Place</label> <br />
                      <select className=' border   rounded-md hover:border-blue-600 outline-none border-gray-400 w-full  px-2 py-3 font-light   hover:border-2  text-sm' value={el.place} onChange={(event) => handleInputPlaceChange(el.id, event)}>
                        <option value="PB">PB</option>
                        <option value="NL">NL</option>
                        <option value="HL">HL</option>
                        <option value="DP">DP</option>
                        <option value="RN">RN</option>
                        <option value="MY">MY</option>
                      </select>
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> Service</label> <br />
                      <select className=' border   rounded-md hover:border-blue-600 outline-none border-gray-400  w-full  px-2 py-3 font-light   hover:border-2  text-sm' value={el.service} onChange={(event) => handleInputServiceChange(el.id, event)}>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>

                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> AC/NON_AC</label> <br />
                      <select className=' border   rounded-md hover:border-blue-600 outline-none border-gray-400  w-full  px-2 py-3 font-light   hover:border-2  text-sm' value={el.ac_nonac} onChange={(event) => handleInputAcNoACChange(el.id, event)}>
                        <option value="AC">AC</option>
                        <option value="NON_AC">NON_AC</option>
                      </select>
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-semibold'> Vehicle Type</label> <br />
                      <select className=' border  hover:border-blue-600 rounded-md outline-none border-gray-400 w-full px-2 py-3 font-light  text-sm hover:border-2' value={el.vehical_type} onChange={(event) => handleInputVehicleTypeChange(el.id, event)} >
                        <option className='p-1' value="Two Wheeler">Two Wheeler</option>
                        <option className='p-1' value="Four Wheeler">Four Wheeler</option>
                      </select>
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
                      Place
                    </TableHead>
                    <TableHead className=' text-black'>
                      Service
                    </TableHead>
                    <TableHead className=' text-black'>
                      ac_nonac
                    </TableHead>
                    <TableHead className=' text-black'>
                      Vehical_Type
                    </TableHead>
                    <TableHead className=' text-black'>
                      Edit
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  <TableRow>
                    <TableCell>
                      {/* {apiData?.place} */}

                      {el.place}

                    </TableCell>
                    <TableCell>

                      {el.service}

                    </TableCell>
                    <TableCell>


                      {el.ac_nonac}

                    </TableCell>
                    <TableCell>
                      {/* {apiData?.vehical_type} */}


                      {el.vehical_type}

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

export default VehicalForm