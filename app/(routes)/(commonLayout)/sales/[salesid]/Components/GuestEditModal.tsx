"use client"
import { useEffect, useState } from 'react';
import React from 'react'
import { useRouter } from "next/navigation";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { getSingleGuest } from '@/actions/getSingleGuest';
import { toast } from '@/components/ui/use-toast';
import moment from "moment";

const GuestEditModal = ({ id }: { id: string }) => {
    const [name, setName] = useState('');
    const [points, setPoints] = useState('');
    const [filledDate, setFilledDate] = useState('');
    const [bookedDate, setBookedDate] = useState('');
    const [dateActive, setDateActive] = useState(false);
    const router = useRouter()

    useEffect(() => {
        (async () => {
            try {
                let response: any = await fetch(`/api/guest/${id}`, {
                    method: 'GET'
                })
                if (response === null) {
                    toast({
                        title: "Guest not found",
                        variant: "destructive"
                    })
                }

                response = await response.json();
                setName(response?.name);
                setPoints(response?.points);
                setFilledDate(moment(response?.filledDate).utc().format('YYYY-MM-DD'));
                setBookedDate(moment(response?.bookedDate).utc().format('YYYY-MM-DD'));

                console.log(response);
            } catch (error: any) {
                toast({
                    title: error.message,
                    variant: "destructive"
                })
            }

        })()
    }, []);
    const handleUpdate = async () => {
        try {
            const requestBody = {
                name,
                points,
            };

            const response = await fetch(`/api/guest/user/${id}`, { // Use the ID in the API endpoint
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                router.refresh()
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

            const response = await fetch(`/api/guest/${id}`, { // Use the ID in the API endpoint
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                router.refresh()
            } else {
                const errorMessage = await response.text();
            }
        } catch (error) {
            console.error('Error updating guest:', error);
        }
    };
    return (

        <DialogContent className="  bg-white sm:max-w-[600px]">
            <DialogHeader className="pb-4">
                <DialogTitle>Edit Sales Requisition Form</DialogTitle>
                <DialogDescription>
                    Make Sales Requisition form for editing guests
                </DialogDescription>
            </DialogHeader>

            <label className='font-light text-sm'>Guest Name</label>
            <input
                type="text"
                placeholder="Enter Guest Name"
                value={name}
                className='rounded-xl border border-gray-800 px-1 py-2'
                onChange={(e) => setName(e.target.value)}
            />
            <label className='font-light text-sm'>Guest Points</label>
            <input
                type="text"
                placeholder="Enter Guest Points"
                value={points}
                className='rounded-xl border border-gray-800 px-1 py-2'
                onChange={(e) => setPoints(e.target.value)}
            />

            {dateActive ? (
                <button onClick={(e) => setDateActive((current) => !current)}>Click to close Date </button>
            ) : (
                <button onClick={(e) => setDateActive((current) => !current)}>Click to update Date </button>
            )}

            {dateActive ? (
                <div className='flex flex-col space-y-2'>
                    <div className='flex items-center gap-3 justify-evenly'>
                        <div className='flex justify-center flex-col'>

                            <label className='font-light text-sm'>Guest Filled Date</label>
                            <input
                                type="date"
                                placeholder='Filled Date'
                                className='p-1 rounded-xl w-48 border border-black'
                                value={filledDate}
                                onChange={(e) => setFilledDate(e.target.value)}
                            />
                        </div>
                        <div className='flex justify-center flex-col'>
                            <label className='font-light text-sm'>Guest Booked Date</label>
                            <input
                                type="date"
                                placeholder='Booked Date'
                                className='p-1 rounded-xl w-48 border border-black'
                                value={bookedDate}
                                onChange={(e) => setBookedDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className=' w-full flex justify-center'>
                        <Button className="bg-primary mt-5 mx-auto w-40" onClick={handleDeleteUpdate}>
                            Update Guest
                        </Button>
                    </div>
                    <p className='text-red-800'>Only name and point are editable. Every data you have already entered will be lost, and you'll have to start again putting data.</p>
                </div>
            ) : null}


            <DialogFooter>
                {dateActive ? null : (

                    <Button className="bg-primary" onClick={handleUpdate}>
                        Update Guest

                    </Button>
                )}

            </DialogFooter>
        </DialogContent>
    )
}

export default GuestEditModal;

// < DialogContent >
//     <div className='flex items-center justify-center'>
//         <div className='flex flex-col w-[80%] p-4 space-y-3 rounded-xl shadow-xl'>
//             <div>
//                 <p className='text-xl font-bold'>Edit Sales Requisition Form</p>
//                 <p className='text-m font-light'>Make Sales Requisition form for editing guests</p>
//             </div>
//             <label className='font-light text-sm'>Guest Name</label>
//             <input
//                 type="text"
//                 placeholder="Enter Guest Name"
//                 value={name}
//                 className='rounded-xl border border-gray-800 px-1 py-2'
//                 onChange={(e) => setName(e.target.value)}
//             />
//             <label className='font-light text-sm'>Guest Points</label>
//             <input
//                 type="text"
//                 placeholder="Enter Guest Points"
//                 value={points}
//                 className='rounded-xl border border-gray-800 px-1 py-2'
//                 onChange={(e) => setPoints(e.target.value)}
//             />

//             {dateActive ? (
//                 <button onClick={(e) => setDateActive((current) => !current)}>Click to close Date </button>
//             ) : (
//                 <button onClick={(e) => setDateActive((current) => !current)}>Click to update Date </button>
//             )}

//             {dateActive ? (
//                 <div className='flex flex-col space-y-4'>
//                     <label className='font-light text-sm'>Guest Filled Date</label>
//                     <input
//                         type="date"
//                         placeholder='Filled Date'
//                         className='p-1 rounded-xl w-48 border border-black'
//                         value={filledDate}
//                         onChange={(e) => setFilledDate(e.target.value)}
//                     />
//                     <label className='font-light text-sm'>Guest Booked Date</label>
//                     <input
//                         type="date"
//                         placeholder='Booked Date'
//                         className='p-1 rounded-xl w-48 border border-black'
//                         value={bookedDate}
//                         onChange={(e) => setBookedDate(e.target.value)}
//                     />
//                     <button className='w-48 ml-96 bg-blue-500 px-1 py-1 rounded-xl' onClick={handleDeleteUpdate}>Update Guest</button>
//                     <p className='text-red-800'>Only name and point are editable. Every data you have already entered will be lost, and you'll have to start again putting data.</p>
//                 </div>
//             ) : null}

//             {dateActive ? null : (
//                 <button className='w-48 ml-96 bg-blue-500 px-1 py-1 rounded-xl' onClick={handleUpdate}>Update Guest</button>
//             )}
//         </div>
//     </div>
// </DialogContent >