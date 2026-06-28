"use client";

import EditProfile from "@/components/Dashboard/EditProfile";
import { useSession } from "@/lib/auth-client";
import { Avatar, Button, Card, Chip } from "@heroui/react";
import { FaEdit, FaMapMarkerAlt, FaTint, FaUser } from "react-icons/fa";

export default function ProfileForm({ onEdit }) {
  const { data } = useSession();
  const user = data?.user;
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 bg-red-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Profile <span className="text-red-500">Settings</span>
          </h1>

          <p className="text-default-500 mt-2">
            Manage your personal information and donor credentials.
          </p>
        </div>

        <EditProfile/>
      </div>

      {/* Main Card */}
      <Card className="overflow-hidden rounded-3xl border bg-red-50">
        {/* Cover */}
        <div className="relative h-44 bg-linear-to-r from-[#4b0008] via-[#72000d] to-[#4b0008] rounded-t-2xl">
          {/* Blood Group */}
          <div className="absolute right-4 md:right-8 bottom-4 md:-bottom-10 rounded-2xl shadow-lg border px-6 py-4 text-center bg-red-50">
            <p className="text-[10px] font-semibold tracking-widest text-red-500">
              BLOOD GROUP
            </p>

            <h2 className="text-4xl font-bold text-red-600">
              {user?.bloodGroup || "A+"}
            </h2>
          </div>
        </div>

        {/* Profile */}
        <div className="px-6 md:px-10 pb-10">
          {/* Avatar */}
          <div className="flex flex-col md:flex-row md:items-end gap-5 -mt-14">
            {/* <Avatar
              src={user?.image}
              className="w-28 h-28 md:w-32 md:h-32 border-4 border-white shadow-xl"
            /> */}
            <Avatar className="w-28 h-28 md:w-32 md:h-32 border-4 border-white shadow-xl">
            <Avatar.Image
              alt={user?.role}
              src={user?.image}
            />
            </Avatar>

            <div className="pb-2">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-3xl font-bold">{user?.name}</h2>

                <Chip color="success" size="sm" className="font-bold">
                  {user?.status}
                </Chip>
              </div>

              <p className="flex items-center gap-2 text-default-500 mt-2">
                <FaMapMarkerAlt className="text-red-500" />
                {user?.upazila}, {user?.district}
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="grid lg:grid-cols-3 gap-8 mt-10">
            {/* Left */}
            <div className="lg:col-span-2 space-y-8">
              {/* Personal */}
              <div>
                <h3 className="flex items-center gap-2 text-2xl font-bold mb-5">
                  <FaUser className="text-red-500" />
                  Personal Information
                </h3>

                <div className="grid sm:grid-cols-2 gap-5">
                  <InfoCard label="Full Name" value={user?.name} />

                  <InfoCard label="Email" value={user?.email} />
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="flex items-center gap-2 text-2xl font-bold mb-5">
                  <FaMapMarkerAlt className="text-red-500" />
                  Address Details
                </h3>

                <div className="grid sm:grid-cols-2 gap-5">
                  <InfoCard label="District" value={user?.district} />

                  <InfoCard label="Upazila" value={user?.upazila} />
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-5">
              <Card className="rounded-2xl p-6 border bg-red-50">
                <div className="flex items-center gap-2 mb-5">
                  <FaTint className="text-red-500" />

                  <h3 className="text-xl font-bold">Medical Profile</h3>
                </div>

                <p className="text-xs uppercase text-default-500">
                  Blood Group
                </p>

                <h2 className="text-4xl font-bold text-red-600 mt-2">
                  {user?.bloodGroup}
                </h2>
              </Card>

              <Card className="rounded-2xl p-6 border bg-red-50">
                <h3 className="text-xl font-bold mb-3">Eligible to Donate</h3>

                <p className="text-default-500 text-sm">
                  Your account is in good standing.
                  <br />
                  You are ready to save lives.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ---------- Small Component ---------- */

function InfoCard({ label, value }) {
  return (
    <div className="rounded-xl bg-default-100 p-4">
      <p className="text-xs uppercase tracking-wide text-default-500">
        {label}
      </p>

      <p className="font-semibold wrap-break-word">{value || "N/A"}</p>
    </div>
  );
}
