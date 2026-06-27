'use server'

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