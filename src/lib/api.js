"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "./auth";

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user;
}

// const { token } = await auth.api.getToken({
//   headers: await headers(),
// });


export const getDistrict = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/districts`);
  return res.json();
};

export const getUpazila = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/upazilas`);
  return res.json();
};

// gmail last 3 create data match kora gula paya jabe
export const recentDonationRequest = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  console.log('Recent Token :', token)
  const user = await getCurrentUser();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/recentDonationRequest/${user?.email}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  return res.json();
};
export const getPendingDonationRequests = async () => {
  // const user = await getCurrentUser();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/donationRequest/status/pending`,
  );
  return res.json();
};

// gmail match kora data gula pawa jabe
export const donationRequest = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const user = await getCurrentUser();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/donationRequest/${user?.email}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  return res.json();
};

// all data pawa jabe
export const allDonationRequest = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/donationRequest`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  return res.json();
};

export const allUser = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/allUser`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  return res.json();
};

// DELETE
export const recentDonationDel = async (donationDelete) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/recentDonationRequest/${donationDelete}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    },
  );

  const data = await res.json();
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
export const getDonationRequestDetails = async (donationId) => {

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  console.log('Details Page Token : ', token);


  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/donation-request/${donationId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );


  return res.json();
};

export const myDonationRequestDetails = async (donateId, email) => {
  // const { token } = await auth.api.getToken({
  //   headers: await headers(),
  // });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/donation-request/${email}/${donateId}`,
    // {
    //   cache: "no-store",
    //   headers: {
    //     authorization: `Bearer ${token}`,
    //   },
    // },
  );

  return res.json();
};


// myDonationRequestEdit
// export const donationReqEdit = async (editDonationReq, email)=> {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${email}/${editDonationReq}`);
//   return res.json();
// }