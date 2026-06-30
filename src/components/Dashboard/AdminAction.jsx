"use client";

import toast from "react-hot-toast";

export default function AdminAction({ item }) {
  const handleDonationStatus = async (status) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/donation-request/status/${item._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          donationStatus: status,
        }),
      },
    );

    const data = await res.json();

    if (data.modifiedCount > 0) {
      toast.success("Updated");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 mt-2">
        <button
          onClick={() => handleDonationStatus("done")}
          className="text-green-600 hover:text-green-700 font-semibold"
        >
          Done
        </button>

        <button
          onClick={() => handleDonationStatus("canceled")}
          className="text-red-500 hover:text-red-600 font-semibold"
        >
          Cancel
        </button>
      </div>
    </>
  );
}
