import { Avatar, AvatarIntials, Button } from "@creativehub/marketrix-ui";
import React from "react";
import Image from "next/image";
// import { BsArrowUpRight } from "react-icons/bs";

function CompletedGridCard({
  userName,
  userEmail,
  received_time,
  url_image,
  website_url,
  user_amount,
  message,
}) {
  // switch (type) {
  //   case "ongoing":
  //     <div></div>;
  //     break;

  //   case "completed":
  //     <div></div>;
  //     break;
  // }
  return (
    <div className=" border-[1px] p-2 rounded-[12px] min-w-[345px]">
      <div className=" flex justify-between items-end pb-3">
        <div className=" flex gap-2 items-center ">
          <div>
            <AvatarIntials
              background="#F9F5FF"
              borderRadius="100%"
              color="#7F56D9"
              fontSize="16px"
              height="40px"
              name="shanilka marhok"
              width=" 40px"
            />
          </div>

          <div className="mtx-body2">
            <div className=" !font-semibold">{userName}</div>
            <div className="text-[#98A2B3]">{userEmail}</div>
          </div>
        </div>
        <div className=" mtx-body2 text-[#344054]">{received_time}</div>
      </div>

      <div className=" pb-3 flex gap-3">
        <div className="bg-[#F2F4F7] w-fit py-1 px-2 rounded-[16px] flex items-center gap-2">
          <div>
            <Avatar
              border="none"
              borderRadius="50%"
              height="16px"
              image={url_image}
              width="16px"
            />
          </div>
          <div className="mtx-body2">{website_url}</div>
          <div className="!font-semibold">
            {/* <BsArrowUpRight /> */}
          </div>
        </div>
        <div className="">
          <Button
            background="#F2F4F7"
            border="1px solid"
            fontSize="14px"
            hoverColor={"#F3F4F6"}
            borderColor="transparent"
            borderRadius="16px"
            color="#344054"
            fontWeight={"500"}
            display="flex"
            icon="team"
            iconSize={"14px"}
            gap={"2px"}
            alignItems={"center"}
            justifyContent={"center"}
            label={user_amount}
            iconPosition="leading"
            size="custom"
            paddingBottom={2}
            paddingLeft={5}
            paddingRight={5}
            paddingTop={2}
          />
        </div>
      </div>
      <div className=" pb-4">
        <p className="mtx-body2 flex items-center text-[#344054]">{message}</p>
      </div>
      <div className="pb-3 flex gap-3">
        <div>
          <Image
            src="../../../../images/overview/US.svg"
            width={24}
            height={24}
            alt=""
          />
        </div>
        <div>
          <Image
            src="../../../../images/overview/device.svg"
            width={24}
            height={24}
            alt=""
          />
        </div>
        <div>
          <Image
            src="../../../../images/overview/chrome.svg"
            width={24}
            height={24}
            alt=""
          />
        </div>
        <div>
          <Image
            src="../../../../images/overview/microsoft.svg"
            width={24}
            height={24}
            alt=""
          />
        </div>
      </div>
      <div className="bg-[#E4E7EC] p-2 rounded-[8px] flex justify-between items-center">
        <div className="text-[#101828] text-[12px]">Completed</div>
        <div className=" flex gap-1 items-center">
          <Button
            alignItems="center"
            borderRadius="8px"
            gap={"2px"}
            background="#FFFFFF"
            border="1px solid"
            borderColor="transparent"
            hoverColor={"#F3F4F6"}
            color="#344054"
            fontSize={"12px"}
            fontWeight={"500"}
            display="flex"
            label={"View Inquiry"}
            icon="documentIcon"
            iconSize={"14px"}
            iconPosition="leading"
            justifyContent="start"
            size="custom"
            paddingBottom={5}
            paddingLeft={5}
            paddingRight={5}
            paddingTop={5}
          />
        </div>
      </div>
    </div>
  );
}

export default CompletedGridCard;
