import React from 'react'
import { IParams } from "../../page";
import FiberBoat from '../../ViewPage/FiberBoat/page';
import FiberBoatForm from '../../Components/EditForm/FiberBoat';
const page = ( { params }: { params: IParams }) => {
  return (
    <div>
      <FiberBoat params={params}/>
      <FiberBoatForm id={params.salesid}/>
    </div>
  )
}

export default page