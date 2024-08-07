"use client"
import { useState } from 'react';
import React from 'react'
import { Props } from "../Itinerary/page";
import { useRouter } from "next/navigation";
import DeskNav from '@/components/Custom/Navbar/DeskNav';
import { ChevronDown, ChevronUp } from 'lucide-react';

const page = (props: Props)  => {
  const [name, setName] = useState('');
  const [points, setPoints] = useState('');
  const [filledDate, setFilledDate] = useState('');
  const [bookedDate, setBookedDate] = useState('');
  const [dateActive, setDateActive] = useState(false);
  const router = useRouter()
  const handleUpdate = async () => {
    try {
      const requestBody = {
        name,
        points,
      };

      const response = await fetch(`/api/guest/user/${props.params.salesid}`, { // Use the ID in the API endpoint
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        router.push("/sales")
      } else {
        const errorMessage = await response.text();
      }
    } catch (error) {
      console.error('Error updating guest:', error);
    }
  };

  const handleDeleteUpdate = async () => {
    try {
      const requestBody = {
        name,
        points,
        filledDate,
        bookedDate
      };

      const response = await fetch(`/api/guest/${props.params.salesid}`, { // Use the ID in the API endpoint
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        router.push("/sales")
      } else {
        const errorMessage = await response.text();
      }
    } catch (error) {
      console.error('Error updating guest:', error);
    }
  };
  return (
    <div>
             
            <div className='flex items-center justify-center'>
          <div className=' flex flex-col w-2/5 p-4 space-y-4  rounded-xl shadow-xl'>
            <div>
              <p className='text-xl font-bold'>Edit Sales Requisition Form</p>
              <p className='text-m font-light'>Make Sales Requisition form for edit guest</p>
            </div>
            <label className='font-light text-sm'>Guest Name</label>
           
      <input
        type="text"
        placeholder="Enter Guest Name"
        value={name}
        className=' rounded-xl border border-gray-800 px-1 py-2'
        onChange={(e) => setName(e.target.value)}
      />
   <label className='font-light text-sm'>Guest Points</label>
      <input
        type="text"
        placeholder="Enter Guest Points"
        value={points}
        className=' rounded-xl border border-gray-800 px-1 py-2'
        onChange={(e) => setPoints(e.target.value)}
      />

    {
      dateActive ?  <button onClick={(e)=>setDateActive((current)=>!current)}>Click to close Date </button> :  <button onClick={(e)=>setDateActive((current)=>!current)}>Click to update Date </button>
    }
      {/* <button onClick={(e)=>setDateActive((current)=>!current)}>Click to update Date</button> */}
      {
        dateActive ? <div className='flex flex-col space-y-4'>
          
          <label className='font-light text-sm'>Guest Filled Date</label>
      <input type="date" placeholder='Filled Date'  className=' p-1 rounded-xl w-48 border border-black' value={filledDate} onChange={(e) => setFilledDate(e.target.value)} />
      <label className='font-light text-sm'>Guest Booked Date</label>
      <input type="date" placeholder='Booked Date'  className='p-1 rounded-xl w-48 border border-black' value={bookedDate} onChange={(e) => setBookedDate(e.target.value)}/>
      <button className='w-48 ml-96 bg-blue-500 px-1 py-1 rounded-xl' onClick={handleDeleteUpdate}> Update  Guest</button>
       <p className='text-red-800'>only name and point is editable <br /> evrery data you have already put will be lost and you have to start again putting data</p>
        </div> : ""
      }
      {
        dateActive ? "":<button className='w-48 ml-96 bg-blue-500 px-1 py-1 rounded-xl' onClick={handleUpdate}>Update Guest</button>
      } 
      
    
 
    </div>
   
    </div>
        </div>
  )
}

export default page