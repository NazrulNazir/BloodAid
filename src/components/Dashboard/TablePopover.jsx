import { Ellipsis } from "@gravity-ui/icons";
import { Button, Popover } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import RecentDonationDelete from "../RecentDonationDelete";

const TablePopover = ({item}) => {
  console.log(item);
  return (
    <div>
      <Popover>
        <Button isIconOnly variant="tertiary" className={'bg-background'}>
          <BsThreeDotsVertical />
        </Button>
        <Popover.Content className="max-w-64" offset={10}>
          <Popover.Dialog>
            <Popover.Arrow />
            <Popover.Heading><Link href={'/dashboard/profile'}>View Details {
              item.donationStatus === 'pending' ?  'View Details' : 'Done'
            }</Link></Popover.Heading>
            <div className="mt-2 text-sm text-red-400 hover:text-red-500 font-semibold block">
              <RecentDonationDelete donationDelete = {item._id}/>
            </div>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </div>
  );
};

export default TablePopover;
