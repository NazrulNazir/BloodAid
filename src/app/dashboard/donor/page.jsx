import TablePopover from "@/components/Dashboard/TablePopover";
import Details from "@/components/DetailsPage";
import NoDonationRequest from "@/components/NoDonationRequest";
import { recentDonationRequest } from "@/lib/api";
import { Table } from "@heroui/react";
import Image from "next/image";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";

const DonorDashboardPage = async () => {
  const donationRequest = await recentDonationRequest();
  console.log("Donation Req-", donationRequest);
  console.log(donationRequest.length);

  const donationLength = donationRequest.length > 0;

  return (
    <div className="bg-red-50 h-screen">
      <div className="flex flex-col-reverse sm:flex-row justify-center items-center sm:justify-between bg-[#fce8e9] sm:px-15 pb-10 sm:pb-0 rounded-b-md">
        <div className="flex flex-col sm:order-0 justify-center sm:items-start px-10 text-center">
          <h3 className="text-xl font-bold text-gray-500">Welcome Back,</h3>
          <h3 className="text-4xl font-bold text-gray-800">Moments Hub</h3>
        </div>
        <div className="">
          <Image
            className="w-40 h-30 sm:w-60 sm:h-50"
            width={350}
            height={350}
            src={`/assets/dashboard-right.png`}
            alt="dashboard"
          ></Image>
        </div>
      </div>
      <div>
        {!donationLength ? (
          <NoDonationRequest />
        ) : (
          <div className="mt-15 pr-3">
            <Table className="max-w-4xl mx-auto bg-red-100 border border-red-100">
              <Table.ScrollContainer>
                <Table.Content aria-label="Team members" className="min-w-150 ">
                  <Table.Header className={'bg-red-100'}>
                    <Table.Column isRowHeader>Recipient Name</Table.Column>
                    <Table.Column>Recipient Location</Table.Column>
                    <Table.Column>Donation Date</Table.Column>
                    <Table.Column>Donation Time</Table.Column>
                    <Table.Column>Blood Group</Table.Column>
                    <Table.Column>Status</Table.Column>
                    <Table.Column>Actions</Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {donationRequest.map((item) => (
                      <Table.Row className={'bg-red-50'} key={item._id}>
                        <Table.Cell className={'font-semibold text-gray-500 bg-red-50'}>{item.recipientName}</Table.Cell>
                        <Table.Cell className={'flex items-center pt-5.5 gap-1 font-semibold text-gray-500 bg-red-50'}> <span className="text-lg font-bold text-red-400"><IoLocationOutline /></span> {`${item.recipientUpazila}, ${item.recipientDistrict}`}</Table.Cell>
                        <Table.Cell className={'font-semibold text-gray-500 bg-red-50'}>{item.donationDate}</Table.Cell>
                        <Table.Cell className={'font-semibold text-gray-500 bg-red-50'}>{item.donationTime}</Table.Cell>
                        <Table.Cell className={'text-red-400 font-bold text-lg bg-red-50'}>{item.bloodGroup}</Table.Cell>
                        <Table.Cell className={'font-semibold text-orange-400 bg-red-50'}>{item.donationStatus}</Table.Cell>
                        <Table.Cell className={'font-semibold text-gray-500 bg-red-50'}><TablePopover item = {item}/></Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          </div>
        )}
      </div>
      {/* <div>
        <Details/>
      </div> */}
    </div>
  );
};

export default DonorDashboardPage;
