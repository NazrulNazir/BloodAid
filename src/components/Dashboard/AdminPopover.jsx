"use client";

import React from "react";
import { Button, Popover } from "@heroui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AdminPopover = ({ item }) => {
  const router = useRouter();

  // Role Update
  const handleRoleUpdate = async (role) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${item._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role,
          }),
        }
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success(`Role updated to ${role}`);
        router.refresh();
      } else {
        toast.error("Role update failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // Status Update
  const handleStatusUpdate = async (status) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${item._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success(`User ${status}`);
        router.refresh();
      } else {
        toast.error("Status update failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const nextRole = {
    Donor: "Volunteer",
    Volunteer: "Admin",
    Admin: "Donor",
  };

  return (
    <Popover>
      <Button isIconOnly variant="tertiary" className="bg-background">
        <BsThreeDotsVertical />
      </Button>

      <Popover.Content className="max-w-60">
        <Popover.Dialog>
          <Popover.Arrow />

          {/* Change Role */}
          <Popover.Heading>
            <button
              onClick={() => handleRoleUpdate(nextRole[item.role])}
              className="font-semibold hover:text-red-500"
            >
              Make {nextRole[item.role]}
            </button>
          </Popover.Heading>

          {/* Block / Unblock */}
          <div className="mt-3">
            <button
              onClick={() =>
                handleStatusUpdate(
                  item.status === "active" ? "blocked" : "active"
                )
              }
              className={`font-semibold ${
                item.status === "active"
                  ? "text-red-500"
                  : "text-green-600"
              }`}
            >
              {item.status === "active" ? "Block" : "Unblock"}
            </button>
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
};

export default AdminPopover;