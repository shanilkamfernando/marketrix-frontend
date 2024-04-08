import {
    Avatar,
    AvatarIntials,
    Badge,
    Button,
    Card,
  } from "@creativehub/marketrix-ui";
  import React from "react";
  import Image from "next/image";
  // import { BsArrowUpRight } from "react-icons/bs";
  
  function IncomingGridCard() {
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
              <div className=" !font-semibold">shanilka fernando</div>
              <div className="text-[#98A2B3]">shanilka@gmail.com</div>
            </div>
          </div>
          <div className=" mtx-body2 text-[#344054]">10 seconds ago</div>
        </div>
  
        <div className=" pb-3 flex gap-3">
          <div className="bg-[#F2F4F7] w-fit py-1 px-2 rounded-[16px] flex items-center gap-2">
            <div>
              <Avatar
                border="none"
                borderRadius="50%"
                height="16px"
                image="../../../../images/dashboard/SideBar/SidebarImg.png"
                width="16px"
              />
            </div>
            <div className="mtx-body2">shanilka.com</div>
            <div className="!font-semibold">
              {/* <BsArrowUpRight/> */}
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
              label="10-50"
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
          <p className="mtx-body2 flex items-center text-[#344054]">
            The TTL period expires, the resolver or client will discard the cached
            record and mak...
          </p>
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
        <div className="bg-[#9A74D8] p-2 rounded-[8px] flex justify-between items-center">
          <div>
            <Button
              background="transparent"
              border="1px solid"
              fontSize="12px"
              borderColor="transparent"
              color="#F6FEF9"
              display="flex"
              icon="laptopIcon"
              iconSize={"14px"}
              gap={"4px"}
              iconColor={"#F6FEF9"}
              alignItems={"center"}
              justifyContent={"center"}
              label="Asking to connect"
              iconPosition="leading"
              size="custom"
              paddingBottom={2}
              paddingLeft={2}
              paddingRight={2}
              paddingTop={2}
            />
          </div>
          <div className=" flex gap-1 items-center">
            <Button
              background="transparent"
              border="1px solid"
              color="#F6FEF9"
              borderColor="transparent"
              display="flex"
              size="custom"
              borderRadius="8px"
              paddingBottom={2}
              paddingLeft={2}
              paddingRight={2}
              paddingTop={2}
              label="View Inquiry"
              fontSize={"12px"}
            />
            <Button
              alignItems="center"
              gap={"2px"}
              background="#FFFFFF"
              border="1px solid"
              borderColor="transparent"
              hoverColor={"#F3F4F6"}
              color="#344054"
              fontSize={"12px"}
              fontWeight={"500"}
              display="flex"
              label={"Start session"}
              icon="Headphones"
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
  
  export default IncomingGridCard;
  