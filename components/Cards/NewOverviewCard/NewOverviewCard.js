import React from "react";
import { Card, Button } from "@creativehub/marketrix-ui";
import { FiInbox, FiPhoneCall, FiUser } from "react-icons/fi";
import Link from "next/link";

const iconMap = {
  inbox: FiInbox,
  phoneCall: FiPhoneCall,
  user: FiUser,
  // Add more icon mappings as needed
};

function NewOverviewCard({
  inquiryName,
  iconName,
  inquryAmount,
  buttonName,
  btnLink,
}) {
  const IconComponent = iconMap[iconName];

  return (
    <div className="hover:shadow-md rounded-lg hover:duration-700">
      <Card
        alignItems="center"
        background="#F9FAFB"
        border="1px solid #D0D5DD"
        borderRadius="8px"
        flexDirection="row"
        hoverColor=""
        borderColor="gray"
        justifyContent="flex-start"
        paddingBottom={15}
        paddingLeft={15}
        paddingRight={15}
        paddingTop={15}
        height="250px"
        
      >
        <div className=" flex flex-col justify-between ">
          <div className="flex gap-4 items-center pb-8 ">
            <div className="bg-[#F2F4F7] p-2 rounded-[100%]">
              {IconComponent && <IconComponent size={20} />}
            </div>
            <div className="text-[16px] text-[#101828]">{inquiryName}</div>
          </div>
          <div className="pb-10 text-[#101828] 2xl:text-[36px] text-[30px] font-semibold">
            {inquryAmount}
          </div>
          <div className="border-b-[1px] "></div>

          <div className="pt-2 flex justify-end">
            <Link href={`${btnLink}`}>
              <Button
                alignItems="center"
                background="white"
                hoverColor="white"
                border="2px solid #D0D5DD"
                borderColor="#F2F4F7"
                borderRadius="8px"
                color="#344054"
                direction="row"
                disabledColor="#F2F4F7"
                fontWeight="500"
                display="flex"
                flexDirection="row"
                focusColor="#F2F4F7"
                fontSize="14px"
                gap="5px"
                justifyContent="center"
                label={buttonName}
                size="sm"
                // onClick={setIsUpdateModifyModalOpen}
              />
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default NewOverviewCard;
