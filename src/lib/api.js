"use server";

const session = await auth.api.getSession({
  headers: await headers(),
});
const user = session?.user;

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "./auth";

export const getDistrict = async () => {
  const res = await fetch(`http://localhost:5000/districts`);
  return res.json();
};

export const getUpazila = async () => {
  const res = await fetch(`http://localhost:5000/upazilas`);
  return res.json();
};

// gmail match kora data gula paya jabe
export const recentDonationRequest = async () => {
  const res = await fetch(
    `http://localhost:5000/recentDonationRequest/${user?.email}`,
  );
  return res.json();
};


// gmail match kora data gula pawa jabe
export const donationRequest = async () => {
  const res = await fetch(`http://localhost:5000/donationRequest/${user?.email}`);
  return res.json();
};

// all data pawa jabe
export const allDonationRequest = async () => {
  const res = await fetch(`http://localhost:5000/donationRequest`);
  return res.json();
};

// DELETE
export const recentDonationDel = async (donationDelete) => {
  const res = await fetch(
    `http://localhost:5000/recentDonationRequest/${donationDelete}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    },
  );

  const data = await res.json();
  console.log(data);
  if (data.deletedCount > 0) {
    revalidatePath("/dashboard/donor");
    return {
      success: true,
      message: "Deleted Successfully",
    };
  }

  return data;
};

// Details page
export const myDonationRequestDetails = async (donateId) => {
  const res = await fetch(`http://localhost:5000/donation-request/${donateId}`);

  return res.json();
};
