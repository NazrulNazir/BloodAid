"use client";

import { useEffect, useState } from "react";

import { Button, Description, FieldError, Input, Label, ListBox, Select, TextField, } from "@heroui/react";

import { CalendarDays, Clock3, Droplets, Hospital, Mail, MapPin, User, } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { getDistrict, getUpazila } from "@/lib/api";

export default function CreateDonationRequest() {
  //==========================
  // Logged In User
  //==========================

 const { data: session } = useSession();

const user = session?.user;


  //==========================
  // States
  //==========================
  const [district, setDistrict] = useState("");
const [upazila, setUpazila] = useState("");

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [allUpazilas, setAllUpazilas] = useState([]);

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [selectedBlood, setSelectedBlood] = useState("");

  // const [selectedBlood, setSelectedBlood] = useState("");

  // use effect
useEffect(() => {
  const loadLocation = async () => {
    try {
      const districtData = await getDistrict();
      const upazilaData = await getUpazila();

      setDistricts(districtData);
      setAllUpazilas(upazilaData);
    } catch (error) {
      console.log(error);
    }
  };

  loadLocation();
}, []);

  //==========================
  // Submit
  //==========================

 const onSubmit = async (e) => {
  e.preventDefault();

  if (user.status === "blocked") {
    toast.error("Blocked users can't create donation requests.");
    return;
  }

  if (!selectedBlood) {
    toast.error("Please select a blood group.");
  return;
}

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  const donationRequest = {
    requesterName: user.name,
    requesterEmail: user.email,

    recipientName: data.recipientName,
    recipientDistrict: data.recipientDistrict,
    recipientUpazila: data.recipientUpazila,

    hospitalName: data.hospitalName,
    fullAddress: data.fullAddress,

    bloodGroup: data.bloodGroup,

    donationDate: data.donationDate,
    donationTime: data.donationTime,

    requestMessage: data.requestMessage,

    donationStatus: "pending",

    createdAt: new Date().toISOString(),
  };

  console.log(donationRequest);

  // API Example

  /*
  const res = await axiosSecure.post(
    "/donation-request",
    donationRequest
  );

  if (res.data.insertedId) {
    toast.success("Donation request created successfully.");
    e.target.reset();

    setBloodGroup("");
    setDistrict("");
    setUpazila("");

    setSelectedDistrict("");
    setSelectedUpazila("");

    setUpazilas([]);
  }
  */
};



  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Heading */}

      <div className="mb-10">
        <h2 className="text-3xl font-bold">Create Donation Request</h2>

        <p className="text-default-500 mt-2">
          Fill in the information below to request blood donation.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">

        {/* ===========================================
                      Requester Information
        =========================================== */}

        <div className="grid md:grid-cols-2 gap-5">
          {/* Requester Name */}

          <TextField isReadOnly>
            <Label>Requester Name</Label>

            <Input value={user?.name}  />
          </TextField>

          {/* Requester Email */}

          <TextField isReadOnly>
            <Label>Requester Email</Label>

            <Input value={user?.email}  />
          </TextField>
        </div>

        {/* ===========================================
                    Recipient Information
        =========================================== */}

        <div className="grid md:grid-cols-3 gap-5">
          {/* Recipient Name */}

          <TextField isRequired className="w-full" name="recipientName">
            <Label>Recipient Name</Label>

            <Input placeholder="Recipient Name" />

            <FieldError />
          </TextField>

          {/* District */}

          <div>
            <Select
              isRequired
              selectedKeys={selectedDistrict ? [selectedDistrict] : []}
              onSelectionChange={(key) => {
                const districtId = String(key);

                setSelectedDistrict(districtId);

                const districtObj = districts.find(
                  (d) => String(d.id) === districtId,
                );

                setDistrict(districtObj?.name || "");

                const filteredUpazilas = allUpazilas.filter(
                  (u) => Number(u.district_id) === Number(districtId),
                );

                setUpazilas(filteredUpazilas);

                setSelectedUpazila("");

                setUpazila("");
              }}
            >
              <Label>Recipient District</Label>

              <Select.Trigger>
                <Select.Value />

                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>
                  {districts.map((d) => (
                    <ListBox.Item key={d.id} id={d.id}>
                      {d.name}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            <input type="hidden" name="recipientDistrict" value={district} />
          </div>

          {/* Upazila */}

          <div>
            <Select
              isRequired
              selectedKeys={selectedUpazila ? [selectedUpazila] : []}
              onSelectionChange={(key) => {
                const upazilaId = String(key);

                setSelectedUpazila(upazilaId);

                const upazilaObj = upazilas.find(
                  (u) => String(u.id) === upazilaId,
                );

                setUpazila(upazilaObj?.name || "");
              }}
            >
              <Label>Recipient Upazila</Label>

              <Select.Trigger>
                <Select.Value />

                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>
                  {upazilas.map((u) => (
                    <ListBox.Item key={u.id} id={u.id}>
                      {u.name}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            <input type="hidden" name="recipientUpazila" value={upazila} />
          </div>
        </div>

        {/* ===========================================
                            Hospital
        =========================================== */}

        <TextField isRequired className="w-full" name="hospitalName">
          <Label>Hospital Name</Label>

          <Input
            placeholder="Dhaka Medical College Hospital"
            
          />

          <Description>Where the donor will donate blood.</Description>

          <FieldError />
        </TextField>

        {/* ===========================================
                            Address
          =========================================== */}

        <TextField isRequired className="w-full" name="fullAddress">
          <Label>Full Address</Label>

          <Input
            placeholder="Zahir Raihan Rd, Dhaka"
            
          />

          <Description>Enter the complete hospital address.</Description>

          <FieldError />
        </TextField>

        {/* part 3 */}

        {/* ===========================================
                          Blood Group
        =========================================== */}

        <div>
          <label className="text-sm font-medium text-gray-700">
            Blood Group
          </label>

          <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mt-2">
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
              <button
                key={group}
                type="button"
                onClick={() => setSelectedBlood(group)}
                className={`h-12 rounded-lg border text-sm font-semibold transition-all

        ${
          selectedBlood === group
            ? "bg-red-500 text-white border-red-500"
            : "bg-white border-gray-300 hover:border-red-400"
        }

        `}
              >
                {group}
              </button>
            ))}
          </div>
            {/* eta name change kora lagte pare */}
          <input
            type="hidden"
            name="bloodGroup"
            value={selectedBlood}
          />
        </div>

        {/* ===========================================
                    Date & Time
        =========================================== */}

        <div className="grid md:grid-cols-2 gap-5">
          <TextField isRequired name="donationDate">
            <Label>Donation Date</Label>

            <Input type="date" />

            <FieldError />
          </TextField>

          <TextField isRequired name="donationTime">
            <Label>Donation Time</Label>

            <Input type="time" />

            <FieldError />
          </TextField>
        </div>

        {/* ===========================================
        Request Message
=========================================== */}

        <div>
          <label className="text-sm font-medium mb-2 block">
            Request Message
          </label>

          <textarea
            name="requestMessage"
            placeholder="Explain why blood is needed..."
            rows={6}
          />
        </div>

        {/* ===========================================
        Important Notice
=========================================== */}

        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <h3 className="font-bold text-red-600">Important Notice</h3>

          <p className="text-sm text-gray-600 mt-2">
            Please provide accurate information. The donation request status
            will automatically be set to
            <span className="font-semibold text-red-600"> Pending</span>
            after submission.
          </p>
        </div>

        {/* ===========================================
        Submit Button
=========================================== */}

        <div className="flex justify-end">
          <Button type="submit" color="danger" className="px-10">
            Request Donation
          </Button>
        </div>
      </form>
    </div>
  );
}
