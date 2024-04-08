import {
  Avatar,
  AvatarIntials,
  Badge,
  Button,
} from "@creativehub/marketrix-ui";
import React from "react";
import Image from "next/image";
// import { BsArrowUpRight } from "react-icons/bs";
import {
  getBrowserLogo,
  getCountryLogo,
  getDeviceIcon,
  getTimeAgo,
  removeProtocol,
} from "@/helpers/helpers";

function InquiryGridCard({
  viewInquiryButtonVisible,
  userName,
  gridCardType,
  handleViewInquiry,
  name,
  email,
  createdAt,
  currentUrl,
  websiteDomain,
  message,
  browser,
  windowWidth,
  country,
  connectButtonHandle,
}) {
  return (
    // min-w-[345px]
    <div className=" border-[1px] p-2 rounded-[12px] ">
      <div className=" flex justify-between items-end pb-3">
        <div className=" flex gap-2 items-center ">
          <div>
            <AvatarIntials
              background="#F9F5FF"
              borderRadius="100%"
              color="#7F56D9"
              fontSize="16px"
              height="40px"
              name={name}
              width=" 40px"
            />
          </div>

          <div className="mtx-body2">
            <div className=" !font-semibold">{name}</div>
            <div className="text-[#98A2B3]">{email}</div>
          </div>
        </div>
        <div className="bg mtx-body2 text-[#344054]">
          {getTimeAgo(createdAt)}
        </div>
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
          <div className="mtx-body2">{removeProtocol(websiteDomain)}</div>
          <div className="!font-semibold">
            {/* <BsArrowUpRight /> */}
          </div>
        </div>
        <div className="">
          <Button
            background="#F2F4F7"
            border="1px solid"
            fontSize="14px"
            hoverColor={"#F2F4F7"}
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
            label="1-5"
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
          <Avatar
            border="none"
            borderRadius="50%"
            height="24px"
            image={getCountryLogo(country)}
            width="24px"
          />
        </div>
        <div>
          <Image
            src={getDeviceIcon(windowWidth)}
            width={24}
            height={24}
            alt=""
          />
        </div>
        <div>
          <Image src={getBrowserLogo(browser)} width={24} height={24} alt="" />
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

      {gridCardType === "incoming" && (
        <>
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
              {viewInquiryButtonVisible && (
                <>
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
                    onClick={handleViewInquiry}
                  />
                </>
              )}

              <Button
                alignItems="center"
                gap={"2px"}
                background="#FFFFFF"
                border="1px solid"
                borderColor="transparent"
                hoverColor={"#F2F4F7"}
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
                onClick={connectButtonHandle}
              />
            </div>
          </div>
        </>
      )}
      {gridCardType === "missed" && (
        <>
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
                onClick={handleViewInquiry}
              />
              <Button
                alignItems="center"
                gap={"2px"}
                background="#FFFFFF"
                border="1px solid"
                borderColor="transparent"
                hoverColor={"#F2F4F7"}
                color="#344054"
                fontSize={"12px"}
                fontWeight={"500"}
                display="flex"
                label={"Schedule"}
                icon="Headphones"
                iconSize={"14px"}
                iconPosition="leading"
                justifyContent="start"
                size="custom"
                paddingBottom={5}
                paddingLeft={5}
                paddingRight={5}
                paddingTop={5}
                onClick={connectButtonHandle}
              />
            </div>
          </div>
        </>
      )}
      {gridCardType === "ongoing" && (
        <>
          {" "}
          <div className="bg-[#E4E7EC] p-2 rounded-[8px] flex justify-between items-center">
            <div className="text-[#101828] flex gap-2 items-center font-semibold">
              <div>
                <Avatar
                  alt="Irosha Profile Pic"
                  border="none"
                  borderRadius="50%"
                  height="24px"
                  image={"/images/profileImage.png"}
                  width="24px"
                />
              </div>
              <div>
                <Badge
                  backgroundColor={"#F4F3FF"}
                  borderRadius={16}
                  color={"#5925DC"}
                  hoverColor="#00FF00"
                  text={`${userName} has taken `}
                  height={20}
                  fontSize="12px"
                />
              </div>
            </div>
            <div className=" flex gap-1 items-center">
              <Button
                alignItems="center"
                borderRadius="8px"
                gap={"3px"}
                background="#FFFFFF"
                border="1px solid"
                borderColor="transparent"
                hoverColor={"#F2F4F7"}
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
                onClick={handleViewInquiry}
              />
            </div>
          </div>
        </>
      )}
      {gridCardType === "completed" && (
        <>
          {" "}
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
                hoverColor={"#F2F4F7"}
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
                onClick={handleViewInquiry}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default InquiryGridCard;
