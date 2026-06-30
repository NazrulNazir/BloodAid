"use client";

import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export default function StatusInprogress({ donateReqId }) {
  const handleDonationStatus = async (status) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/donation-request/status/${donateReqId}`,
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
      redirect(`/donation-requests/${donateReqId}`)
    }
  };
  return (
    <div>
      <Modal>
        <Button className={"w-full py-7 rounded-lg text-lg bg-red-600"}>
          Donation
        </Button>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md">
              <Modal.CloseTrigger />
              <Modal.Header>
                {/* <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                  <Envelope className="size-5" />
                </Modal.Icon> */}
                <Modal.Heading className="text-2xl font-bold text-red-500">Confirm Donation</Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-muted">
                  Fill out the form below.
                </p>
              </Modal.Header>
              <Modal.Body className="p-6">
                <Surface variant="default">
                  <form className="flex flex-col gap-4">
                    <TextField
                      className="w-full"
                      name="name"
                      type="text"
                      variant="secondary"
                    >
                      <Label className="text-gray-500">Donor Name</Label>
                      <Input placeholder="Donor name" />
                    </TextField>
                    <TextField
                      className="w-full"
                      name="email"
                      type="email"
                      variant="secondary"
                    >
                      <Label className="text-gray-500">Donor Email</Label>
                      <Input placeholder="Donor email" />
                    </TextField>
                    <Modal.Footer>
                      <Button slot="close" variant="secondary">
                        Cancel
                      </Button>
                      <Button onClick={() => handleDonationStatus("inprogress")} className={'bg-red-500'} slot="close">Confirm Donation</Button>
                    </Modal.Footer>
                  </form>
                </Surface>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
