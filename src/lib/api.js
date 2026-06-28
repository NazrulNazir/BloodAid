'use server'

import { revalidatePath } from "next/cache";

export const getDistrict = async ()=>{
    const res = await fetch(`http://localhost:5000/districts`);
    return res.json();
}


export const getUpazila = async ()=>{
    const res = await fetch(`http://localhost:5000/upazilas`);
    return res.json();
}

export const recentDonationRequest = async ()=>{
    const res = await fetch(`http://localhost:5000/recentDonationRequest`);
    return res.json();
}

export const donationRequest = async ()=>{
    const res = await fetch(`http://localhost:5000/donationRequest`);
    return res.json();
}

// DELETE
export const recentDonationDel = async (donationDelete) => {

    const res = await fetch(
        `http://localhost:5000/recentDonationRequest/${donationDelete}`,
        {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            }
        }
    );

    const data = await res.json();
    console.log(data);
    if (data.deletedCount > 0) {
        revalidatePath('/dashboard/donor');
        return {
            success: true,
            message: 'Deleted Successfully',
        }
    }

    return data;
};