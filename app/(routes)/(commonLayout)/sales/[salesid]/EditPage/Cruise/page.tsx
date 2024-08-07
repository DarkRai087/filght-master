import React from 'react'
import Cruise from '../../ViewPage/Cruise/page'
import { IParams } from "../../page";
import CruiseForm from "../../Components/EditForm/Cruise";
const page = ({ params }: { params: IParams }) => {
  return (
    <div className='sapce-y-8'>
      <Cruise params={params} />
      {/* <div className='flex items-center justify-center'>User Form</div> */}
      <CruiseForm id={params.salesid} />
    </div>
  )
}

export default page