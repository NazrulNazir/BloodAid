import { Ellipsis } from "@gravity-ui/icons";
import { Button, Popover } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import RecentDonationDelete from "../RecentDonationDelete";
import DonationStatusAction from "./DonatinStatusAction";

const TablePopover = ({ item }) => {
  return (
    <div>
      <Popover>
        <Button isIconOnly variant="tertiary" className={"bg-background"}>
          <BsThreeDotsVertical />
        </Button>
        <Popover.Content className="max-w-64" offset={10}>
          <Popover.Dialog>
            <Popover.Arrow />

            {item.donationStatus === "pending" && (
              <div>
                <Popover.Heading>
                  <Link href={`/dashboard/donor/myDonationRequest/${item._id}`}>
                    View Details
                  </Link>
                </Popover.Heading>
                <div className="mt-2">
                  <RecentDonationDelete donationDelete = {item._id}/>
                </div>
              </div>
            )}

            {item.donationStatus === "inprogress" && (
              <DonationStatusAction item={item} />
            )}
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </div>
  );
};

export default TablePopover;
