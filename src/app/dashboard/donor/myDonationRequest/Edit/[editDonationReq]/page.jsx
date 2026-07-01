"use client";

import { useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { myDonationRequestDetails } from "@/lib/api";

const EditDonationDetailsPage = () => {
  const { data } = useSession();
  const email = data?.user?.email;

  const { editDonationReq } = useParams();
  const router = useRouter();

  const [donations, setDonations] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email || !editDonationReq) return;

    const getDonation = async () => {
      try {
        // email আগে, id পরে
        const result = await myDonationRequestDetails(editDonationReq, email);

        setDonations(result);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load donation request");
      } finally {
        setLoading(false);
      }
    };

    getDonation();
  }, [editDonationReq, email]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newData = Object.fromEntries(formData.entries());

    console.log("Update Data:", newData);
    console.log("ID:", editDonationReq);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/donation-request/Edit/${editDonationReq}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Request Updated Successfully");
        router.push("/dashboard/donor/myDonationRequest");
      } else {
        toast.error("Nothing was updated");
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="mt-20 text-center text-lg font-semibold">Loading...</div>
    );
  }

  if (!donations) {
    return (
      <div className="mt-20 text-center text-red-500">
        Donation request not found.
      </div>
    );
  }

  return (
    <div className="mt-15">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={onSubmit} className="w-full">
          <div className="mb-10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-7">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">
                Edit Request
              </h2>

              <p className="text-gray-500 font-semibold">
                Update the details for this blood requirement.
              </p>
            </div>

            <Button variant="secondary">
              Current Status : {donations.donationStatus}
            </Button>
          </div>

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
                    required
                  />
                </div>

                <div className="w-full">
                  <p className="mb-2 text-gray-400">Hospital Name</p>

                  <input
                    defaultValue={donations.hospitalName}
                    type="text"
                    name="hospitalName"
                    className="input border border-gray-200 py-3 w-full"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full">
                  <p className="mb-2 text-gray-400">District</p>

                  <input
                    defaultValue={donations.recipientDistrict}
                    type="text"
                    name="recipientDistrict"
                    className="input border border-gray-200 py-3 w-full"
                    required
                  />
                </div>

                <div className="w-full">
                  <p className="mb-2 text-gray-400">Upazila</p>

                  <input
                    defaultValue={donations.recipientUpazila}
                    type="text"
                    name="recipientUpazila"
                    className="input border border-gray-200 py-3 w-full"
                    required
                  />
                </div>
              </div>

              <div>
                <p className="mb-2 text-gray-400">Full Donation Address</p>

                <input
                  defaultValue={donations.fullAddress}
                  type="text"
                  name="fullAddress"
                  className="input border border-gray-200 py-3 w-full"
                  required
                />
              </div>
            </div>
          </fieldset>

          <div className="mt-5 flex justify-between pr-5 sm:pr-0">
            <div></div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="secondary"
                onPress={() => router.back()}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-red-400 rounded-md hover:bg-red-500"
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
