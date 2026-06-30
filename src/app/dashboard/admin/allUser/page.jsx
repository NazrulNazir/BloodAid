import AdminPopover from "@/components/Dashboard/AdminPopover";
import TablePopover from "@/components/Dashboard/TablePopover";
import { allUser } from "@/lib/api";
import { Button, Popover, Table } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";

const AllUserPages = async () => {
  const donations = await allUser();
  return (
    <div className="mt-15 pr-3 px-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-700 mt-5">
          My Donation Requests
        </h1>
        <div className="mt-15 pr-3">
          <Table className="max-w-4xl mx-auto bg-red-100 border border-red-100">
            <Table.ScrollContainer>
              <Table.Content aria-label="Team members" className="min-w-150 ">
                <Table.Header className={"bg-red-100"}>
                  <Table.Column isRowHeader>User Profile</Table.Column>
                  {/* <Table.Column>Gmail Address</Table.Column> */}
                  <Table.Column>Gmail Address</Table.Column>
                  <Table.Column>Current Role</Table.Column>
                  <Table.Column>Status</Table.Column>
                  <Table.Column>Actions</Table.Column>
                </Table.Header>
                <Table.Body>
                  {donations.map((item) => (
                    <Table.Row className={"bg-red-50"} key={item._id}>
                      <Table.Cell
                        className={
                          "font-semibold text-gray-500 bg-red-50 flex justify-start item-center gap-2"
                        }
                      >
                        <Image
                          className="rounded-full"
                          width={50}
                          height={50}
                          src={item.image}
                          alt={item.role}
                        ></Image>
                        {item.name}
                      </Table.Cell>
                      <Table.Cell
                        className={"font-semibold text-gray-500 bg-red-50"}
                      >
                        {item.email}
                      </Table.Cell>
                      <Table.Cell
                        className={"font-semibold text-gray-500 bg-red-50"}
                      >
                        {item.role}
                      </Table.Cell>
                      <Table.Cell
                        className={`font-semibold ${item.status === "active" ? "text-green-600" : item.donationStatus === "inprogress" ? "text-blue-500" : item.donationStatus === "done" ? "text-green-600" : "text-red-500"} bg-red-50`}
                      >
                        {item.status}
                      </Table.Cell>
                      <Table.Cell
                        className={"font-semibold text-gray-500 bg-red-50"}
                      >
                        {/* Table Popover needed */}
                        {/* Table Popover needed */}
                        {/* <TablePopover item={item} /> */}
                        <AdminPopover item = {item}></AdminPopover>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AllUserPages;
