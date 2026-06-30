"use client";
import { useSession } from "@/lib/auth-client";
// import { modifyBooking } from '@/lib/data'
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GrEdit } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { myDonationRequestDetails } from "@/lib/api";

const EditDonationDetailsPage = () => {
  const [donations, setDonations] = useState({});

  // dynamic route id
  const { editDonationReq } = useParams();

  useEffect(() => {
    if (!editDonationReq) return;

    const donationFun = async () => {
      try {
        const donationDetails = await myDonationRequestDetails(editDonationReq);
        setDonations(donationDetails);
      } catch (error) {
        console.error(error);
      }
    };

    donationFun();
  }, [editDonationReq]);


  const router = useRouter();


  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newData = Object.fromEntries(formData.entries());

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/donation-request/Edit/${editDonationReq}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newData),
    });



    const data = await res.json();
    if (data.modifiedCount > 0) {
      toast.success("Edit Successfully");
      // redirect(`/dashboard/profile`)
      router.push(`/dashboard/donor/myDonationRequest`);
      router.refresh();
    } else {
      alert("something wrong..");
    }
  };
  return (
    <div className="mt-15">
      <div className="max-w-2xl mx-auto">
        <form action="" onSubmit={onSubmit} className="w-full">
          <div className="mb-10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-7">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">
                Edit Request
              </h2>
              <p className="text-gray-500 font-semibold">
                Update the details for this blood requirement.
              </p>
            </div>
            <div>
              {/* <span className="bg-red-100 px-6 py-2 rounded-full text-blue-500 font-semibold" >Current Status : {user?.status}</span> */}
              <Button slot="close" variant="secondary">
                Current Status : {donations.donationStatus}
              </Button>
            </div>
          </div>
          {/* <h1 className='text-3xl font-bold text-center text-green-600 mb-5'>update</h1> */}
          {/* <SigninGoogle></SigninGoogle> */}
          <fieldset className="fieldset flex flex-col gap-3 pr-5 sm:pr-0">
            <div className="flex flex-col gap-3 sm:gap-5">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full">
                  <p className="mb-2 text-gray-400">Recipient Name</p>
                  <input
                    defaultValue={donations.recipientName}
                    type="text"
                    name="recipientName"
                    className="input border border-gray-200 py-3 w-full"
                    placeholder="Facility Name"
                    required
                  />
                </div>
                <div className="w-full">
                  <p className="mb-2 text-gray-400">Hospital Name</p>
                  <input
                    defaultValue={donations.hospitalName}
                    className="input border border-gray-200 py-3 w-full"
                    type="text"
                    name="hospitalName"
                    placeholder="Hospital Name"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 flex-col sm:flex-row">
                <div className="w-full">
                  <p className="mb-2 text-gray-400">District</p>
                  <input
                    defaultValue={donations.recipientDistrict}
                    className="input border border-gray-200 w-full py-3"
                    type="text"
                    name="recipientDistrict"
                    placeholder="Enter district"
                    required
                  />
                </div>

                <div className="w-full">
                  <p className="mb-2 text-gray-400">Upazila</p>
                  <input
                    defaultValue={donations.recipientUpazila}
                    className="input border border-gray-200 w-full py-3"
                    type="text"
                    name="recipientUpazila"
                    placeholder="upazila"
                    required
                  />
                </div>
              </div>
              <div className="">
                <p className="mb-2 text-gray-400">Full Donations Address</p>
                <input
                  defaultValue={donations.fullAddress}
                  className="input border border-gray-200 w-full py-3"
                  type="text"
                  name="fullAddress"
                  placeholder="Full Address"
                  required
                />
              </div>
            </div>

            {/* <div className='flex gap-3'>
                                                <input defaultValue={user?.bloodGroup} className='input border border-gray-200' type="text" name='bloodGroup' placeholder='bloodGroup' required />
                                            </div> */}

            {/* <textarea defaultValue={booking.Description} className="w-80 h-25 resize-none border rounded-lg p-3 border-gray-200" name="Description" rows={6} placeholder='Description..' required></textarea> */}
          </fieldset>
          <div className="mt-5 flex justify-between pr-5 sm:pr-0">
            <div></div>
            <div className="flex gap-3">
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button
              type="submit"
                slot={"close"}
                className={"bg-red-400 rounded-md hover:bg-red-500"}
              >
                Update Request
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDonationDetailsPage;
