"use client"

import { useEffect, useState } from "react";

interface UserData {
  id: string;
  role: string;
  // Add other properties if present in your actual data
}

export const SearchGuestInfo = () => {

  const [apiData, setApiData] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchGuestInfo = async () => {
      try {
        // Fetch data from your Next.js API endpoint based on the provided reservationid
        const response = await fetch(`/api/guest`);
        if (response.ok) {
          const data = await response.json();
          // Set the fetched data to the state
          const modifiedData:  UserData[]= data.users.map(({ id, role }: { id: string; role: string }) => ({ id, role }));
            setApiData(modifiedData);
        
        } else {
          throw new Error('Failed to fetch data');
        } 
      } catch (error) {
        // Handle errors if any
        console.error('Error fetching data:', error);
      }
    };

    fetchGuestInfo();
  }, []); // Re-run effect when reservationid changes
  console.log(apiData);
  return (
    <>
    <div>SearchGuestInfo</div>
    </>
  )
}
