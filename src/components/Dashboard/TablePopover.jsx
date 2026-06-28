import { Ellipsis } from "@gravity-ui/icons";
import { Button, Popover } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import RecentDonationDelete from "../RecentDonationDelete";

const TablePopover = ({donationDelete}) => {
  return (
    <div>
      <Popover>
        <Button isIconOnly variant="tertiary" className={'bg-background'}>
          <BsThreeDotsVertical />
        </Button>
        <Popover.Content className="max-w-64" offset={10}>
          <Popover.Dialog>
            <Popover.Arrow />
            <Popover.Heading><Link href={'/dashboard/profile'}>View Details</Link></Popover.Heading>
            <div className="mt-2 text-sm text-red-400 hover:text-red-500 font-semibold block">
              <RecentDonationDelete donationDelete = {donationDelete}/>
            </div>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </div>
  );
};

export default TablePopover;
