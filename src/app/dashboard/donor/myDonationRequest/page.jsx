import { donationRequest } from "@/lib/api";
import { Table } from "@heroui/react";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";

const myDonationRequestPage = async () => {
  console.log(Table);
  const donations = await donationRequest();
  return (
    <div className="mt-15 pr-3 px-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-700 mt-5">
          My Donation Requests
        </h1>
        <Table className=" bg-red-100">
          <Table.ScrollContainer>
            <Table.Content aria-label="Team members" className="min-w-150 ">
              <Table.Header className={"bg-red-100/70 rounded-md"}>
                <Table.Column isRowHeader>Recipient Name</Table.Column>
                <Table.Column>Recipient Location</Table.Column>
                <Table.Column>Donation Date</Table.Column>
                <Table.Column>Donation Time</Table.Column>
                <Table.Column>Blood Group</Table.Column>
                <Table.Column>Status</Table.Column>
                <Table.Column>Actions</Table.Column>
              </Table.Header>
              <Table.Body>
                {donations.map((item) => (
                  <Table.Row key={item._id}>
                    <Table.Cell
                      className={"font-semibold text-gray-500 bg-red-50"}
                    >
                      {item.recipientName}
                    </Table.Cell>
                    <Table.Cell
                      className={
                        "flex items-center gap-1 font-semibold text-gray-500 bg-red-50"
                      }
                    >
                      {" "}
                      <span className="text-lg font-bold text-red-400">
                        <IoLocationOutline />
                      </span>{" "}
                      {`${item.recipientUpazila}, ${item.recipientDistrict}`}
                    </Table.Cell>
                    <Table.Cell
                      className={"font-semibold text-gray-500 bg-red-50"}
                    >
                      {item.donationDate}
                    </Table.Cell>
                    <Table.Cell
                      className={"font-semibold text-gray-500 bg-red-50"}
                    >
                      {item.donationTime}
                    </Table.Cell>
                    <Table.Cell
                      className={"text-red-400 font-bold text-lg bg-red-50"}
                    >
                      {item.bloodGroup}
                    </Table.Cell>
                    <Table.Cell
                      className={"font-semibold text-orange-400 bg-red-50"}
                    >
                      {item.donationStatus}
                    </Table.Cell>
                    <Table.Cell
                      className={"font-semibold text-gray-500 bg-red-50"}
                    >
                      <BsThreeDotsVertical />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  );
};

export default myDonationRequestPage;
