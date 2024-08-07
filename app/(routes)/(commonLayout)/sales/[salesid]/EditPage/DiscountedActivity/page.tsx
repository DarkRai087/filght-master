import React from 'react'
import { IParams } from "../../page";
import Discount from '../../ViewPage/DiscountedActivity/page';
import DiscountedForm from '../../Components/EditForm/DiscountedForm';
const page = ({ params }: { params: IParams }) => {
  return (
    <div className='space-y-8'>
      <Discount params={params} />
      <DiscountedForm id={params.salesid} />
    </div>
  )
}

export default page