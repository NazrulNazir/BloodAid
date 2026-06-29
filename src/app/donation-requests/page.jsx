import { getPendingDonationRequests } from '@/lib/api'
import React from 'react'

const DonatinsRequest = async () => {
    const donations = await getPendingDonationRequests();
    console.log(donations)
  return (
    <div>
        {
            // donstions.map(data => <span key={data._id}>{data.length}</span>)
        }
    </div>
  )
}

export default DonatinsRequest