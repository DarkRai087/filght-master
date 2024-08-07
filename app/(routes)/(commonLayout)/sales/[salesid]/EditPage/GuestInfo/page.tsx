"use client"
import { Book, Building2, Plane, User2, Users2 } from 'lucide-react';
import React, { FC, useEffect, useState } from 'react'
import { IParams } from "../../page";
import DeskNav from '@/components/Custom/Navbar/DeskNav';
import GuestInfo from '../../Components/EditForm/GuestInfo';
type ItenaryInputProps = {
    paramsid: string;
  };

  interface GuestInformation {
    id: string;
    email: string;
    contact: string;
    Channel: string;
    assignedTo: string;
    service: string;
    category: string;
    guestType: string;
    vip: string;
    dateOfArrival: string;
    timeOfArrival: string;
    dateOfDeparture: string;
    timeOfDeparture: string;
    adult: number;
    adult12: number;
    ch512: number;
    ch35: number;
    infant: number;
    total: number;
    guestId: string;
  }
  
const Guest= ( { params }: { params: IParams })=> {
    const [apiData, setApiData] = useState<GuestInformation | null>(null);

    useEffect(() => {
      const fetchGuestInfo = async () => {
        try {
          // Fetch data from your Next.js API endpoint based on the provided reservationid
          const response = await fetch(`/api/Forms/guestInfo/${params.salesid}`);
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
    }, [params.salesid]); // Re-run effect when reservationid changes
  return (
    <>
        
       <GuestInfo id={params.salesid}/>
       {/* <GuestInfo/> */}
    <div className='  flex flex-col ml-32 '>
        
        <div className="flex gap-10  flex-col ">
        <div className="font-semibold items-center flex gap-4 text-xl text-primary">
                <div className=" shadow-xl p-2 bg-primary rounded-full">
                  <Book className="h-5 w-5  text-white" />
                </div>
                Basic Form data{" "}
              </div>
                  <div className="flex gap-2">
                    <p className="font-semibold">Assigned To : -</p>
                    <p>{apiData?.assignedTo}</p>
                  </div>    
              </div>


              <article className="bg-white space-y-4 p-4 shadow-md">
              <div className="font-semibold items-center flex gap-4 text-xl text-success">
                <div className="bg-success shadow-xl p-2 rounded-full">
                  <User2 className="h-5 w-5 text-white " />
                </div>
                Guest Info
              </div>
                <>
                  <p className="font-semibold">Contact No of guest: -</p>
                  <p>{apiData?.contact}</p>
                </>
                <>
                  <p className="font-semibold">Email of guest: -</p>
                  <p>{apiData?.email}</p>
                </>
            </article>


            <article className="bg-white space-y-4 p-4 shadow-md">
              <div className="font-semibold items-center flex gap-4 text-xl text-warning">
                <div className="bg-warning shadow-xl p-2 rounded-full">
                  <Building2 className="h-5 w-5 text-white " />
                </div>
                Services
              </div>
                <>
                  <p className="font-semibold">Channel: -</p>
                  <p>{apiData?.Channel}</p>
                </>
                <>
                  <p className="font-semibold">Servies for guest: -</p>
                  <p>{apiData?.service}</p>
                </>
                <>
                  <p className="font-semibold">VIP Courtesy: -</p>
                  <p>{apiData?.vip}</p>
                </>
            </article>


            <article className="bg-white space-y-4 p-4 shadow-md">
              <h1 className="font-semibold items-center flex gap-4 text-xl text-danger">
                <div className="bg-danger shadow-xl p-2 rounded-full">
                  <Plane className="h-5 w-5 text-white " />
                </div>
                Arrival and Departure
              </h1>

              <div className="flex items-center gap-2">
                  <>
                    <p className="font-semibold">Arrival Date: -</p>
                    <p>{apiData?.dateOfArrival}</p>
                  </>
                  <>
                    <p className="font-semibold">Arrival Time: -</p>
                    <p>{apiData?.timeOfArrival}</p>
                  </>
              </div>
              <div className="flex items-center gap-4">
                  <>
                    <p className="font-semibold">Departure Date: -</p>
                    <p>{apiData?.dateOfDeparture}</p>
                  </>
                  <>
                    <p className="font-semibold">Departure Time:- </p>
                    <p>{apiData?.timeOfDeparture}</p>
                  </>
              </div>
            </article>

            <article className="bg-white space-y-4 p-4 shadow-md">
              <h1 className="font-semibold items-center flex gap-4 text-xl text-purple-600">
                <div className=" bg-purple-600 shadow-xl p-2 rounded-full">
                  <Users2 className="h-5 w-5  text-white" />
                </div>
                Number of Guest:-
              </h1>
                <>
                  <p className="font-semibold">Total Adult: -</p>
                  <p>{apiData?.adult}</p>
                </>
                <>
                  <p className="font-semibold">Adult 12+: -</p>
                  <p>{apiData?.adult12}</p>
                </>

             
                <>
                  <p className="font-semibold">No of guest under 5-12 : -</p>
                  <p>{apiData?.ch512}</p>
                </>
              
              
                <>
                  <p className="font-semibold">No of guest under 3-5 : -</p>
                  <p>{apiData?.ch35}</p>
                </>
           
                      <>
                  <p className="font-semibold">Infant: -</p>
                  <p>{apiData?.infant}</p>
                </>
              

        
                <>
                  <p className="font-semibold">Total: -</p>
                  <p>{apiData?.total}</p>
                </>
              
            </article>
    </div>
    </>
  )
}
export default Guest