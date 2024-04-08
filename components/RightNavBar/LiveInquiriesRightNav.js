import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Button,
  Avatar,
  Modal,
  ClipBoard,
  Badge,
  AvatarIntials,
} from "@creativehub/marketrix-ui";

import { BsLaptop } from "react-icons/bs";
import { BsCircleFill } from "react-icons/bs";
import { BiSignal3 } from "react-icons/bi";
// import { IncomingDashboardRightNav } from "@/interfaces/incomingRightNavBar";
import InquiryCard from "@/components/Cards/InquiryCard/InquiryCard";
import { getFormattedTimeMS } from "@/helpers/helpers";
import TimerComponent from "../Timer/TimerComponent";

function LiveInquiriesRightNav({
  personsName,
  message,
  inquiryType,
  incomingTime,
  timewithNumber,
  userEmail,
  workEmail,
  companyLogo,
  companyName,
  countryLogo,
  countryName,
  phoneNo,
  browserLogo,
  browserName,
  deviceName,
  requestedEmail,
  networkStrength,
  screenResolution,
  inquiryButtonHandle,
  deleteInquiry,
  userImage,
  agentName,
  checked,
  type,
  startTime,
  endTime,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const leftBracket = "\u0028";
  const rightBracket = "\u0029";
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const timeGap = (startTime) => {
    if (startTime != null) {
      const timeNow = new Date();
      const time = new Date(startTime);

      const timeDiff = timeNow.getTime() - time.getTime();

      const hours = String(Math.floor(timeDiff / (1000 * 60 * 60))).padStart(
        2,
        "0"
      );
      const minutes = String(
        Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
      ).padStart(2, "0");
      const seconds = String(
        Math.floor((timeDiff % (1000 * 60)) / 1000)
      ).padStart(2, "0");

      return hours + ":" + minutes + ":" + seconds;
    } else {
      return "00:00:00";
    }
  };
  switch (
    type //here still i havent created the completed and the ongoing design bottom part.
  ) {
    case "incoming":
      <div></div>;
      //incoming part
      break;
    case "ongoing":
      <div></div>;
      //ongoing part
      break;
    case "completed":
      <div></div>;
      // completed part
      break;
    default:
      <div>
        <div>
          <Card
            alignItems="flex-start"
            background="#F9FAFB"
            border="1px solid #E4E7EC"
            borderRadius="8px"
            display=""
            flexDirection="column"
            gap="24px"
            height="85vh"
            hoverColor=" #F2F4F7"
            justifyContent=""
            left=""
            paddingBottom={15}
            paddingLeft={15}
            paddingRight={15}
            paddingTop={15}
            top=""
            width="100%"
          >
            <div className=" h-full flex justify-center items-center text-[#101828]  !font-regular">
              Click an inquiry to view it’s information
            </div>
          </Card>
        </div>
      </div>;
      // here we will enter the card which displayed that we have no messages
      break;
  }

  return (
    <div>
      <Card
        alignItems="flex-start"
        background="#FFF"
        border="1px solid #E4E7EC"
        borderRadius="8px"
        display="flex"
        flexDirection="column"
        gap="24px"
        height=""
        justifyContent="space-between"
        left=""
        paddingBottom={15}
        paddingLeft={15}
        paddingRight={15}
        paddingTop={15}
        top=""
        width="100%"
      >
        <div className=" w-full items-center">
          <div className="pb-3">
            {
              checked &&
                (type === "incoming" || type === "missed" ? (
                  <InquiryCard
                    userImage={userImage}
                    agentName={agentName}
                    inquiryMessage="is viewing this inquiry."
                  />
                ) : type === "ongoing" ? (
                  // Render something specific for "ongoing" type
                  <InquiryCard
                    userImage={userImage}
                    agentName={agentName}
                    inquiryMessage="ongoing with the session"
                  />
                ) : type === "completed" ? null : null) // Handle other cases here if needed // Render nothing for "completed" type
            }
          </div>

          <div className="flex  items-center justify-between">
            <div className="flex gap-2 items-center ">
              <div className="">
                <AvatarIntials
                  background="#F9F5FF"
                  borderRadius="100%"
                  color="#7F56D9"
                  fontSize="16px"
                  height="40px"
                  name={personsName}
                  width=" 40px"
                />
              </div>

              <div className="text-[#344054]  w-full">
                <span className="!font-semibold mtx-subtitle2 text-[#344054]">
                  {personsName}
                </span>
                <span className="font-bold text-[#344054] mx-1">&#183;</span>
                <span className=" mtx-label text-[#344054]">
                  {incomingTime} {leftBracket}
                  {timewithNumber}
                  {rightBracket}
                </span>

                <div className=" flex gap-2 mtx-label text-[#667085] ">
                  {userEmail}
                </div>
              </div>
            </div>

            <div className="flex  flex-col items-end gap-4">
              <div className="flex flex-row ">
                <Button
                  alignItems="center"
                  background=" FFFFFF"
                  border="1px solid"
                  borderColor="#D0D5DD"
                  color="#344054"
                  direction="row"
                  // display="flex"
                  flexDirection="row"
                  boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                  iconSize="20px"
                  icon="more-Dots-Vertical"
                  justifyContent="center"
                  size="custom"
                  onClick={openModal}
                  gap="8px"
                  paddingBottom={8}
                  paddingTop={8}
                  paddingLeft={8}
                  paddingRight={8}
                  borderRadius="8px"
                />
              </div>
              {isModalOpen && (
                <div className="fixed right-0 mr-8 mt-12 ">
                  <Modal
                    background="#fff"
                    borderRadius="5px"
                    boxShadow="0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 12px 16px -4px rgba(16, 24, 40, 0.10)"
                    height="100%"
                    onClose={closeModal} // Close the modal on request
                    show
                    transition="2.5s ease-out"
                    visibility="visible"
                    width="100%"
                  >
                    <Button
                      alignItems="center"
                      background="#ffffff"
                      borderRadius="5px"
                      color="#595f4f"
                      border="1px solid"
                      direction=""
                      display="flex"
                      flexDirection="row"
                      fontSize="14px"
                      hoverColor="#e9e4f4"
                      icon="Delete"
                      justifyContent="center"
                      label="Delete"
                      size="custom"
                      paddingBottom={5}
                      paddingTop={5}
                      paddingLeft={10}
                      paddingRight={10}
                      onClick={() => deleteInquiry()}
                    />
                  </Modal>
                </div>
              )}
            </div>
          </div>

          <div className=" grid  " onClick={closeModal}>
            <div className="text-[#344054] mtx-subtitle1 !font-bold justify-between  pt-4">
              {inquiryType}
            </div>
            <div className=" mtx-label border-b-[1px]  !font-medium text-justify border-#E4E7EC-100 py-2 text-[#344054]">
              {message}
            </div>

            <div className="flex  text-[#344054] mtx-subtitle1 !font-bold py-3 justify-between items-center">
              Customer information
            </div>

            <div className="grid gap-y-2">
              <div className="flex  text-[#667085] mtx-subtitle2 !font-normal   justify-between items-center">
                Work Email
                <div className="flex gap-4 justify-center items-center">
                  <div className="text-[#1D2939] mtx-subtitle2 font-mediums">
                    <ClipBoard padding={2} text={workEmail} />
                  </div>
                </div>
              </div>

              <div className="flex text-[#667085] mtx-subtitle2 !font-normal justify-between items-center">
                Company
                <div className="flex justify-center items-center">
                  <div className="text-[#1D2939] mtx-subtitle2 font-medium flex items-center">
                    <Avatar
                      border="none"
                      borderRadius="50%"
                      height="24px"
                      image={companyLogo}
                      width="24px"
                    />
                    <span className="ml-1">{companyName}</span>
                  </div>
                </div>
              </div>

              <div className="flex text-[#667085] mtx-subtitle2 !font-normal justify-between items-center">
                Country
                <div className="flex justify-center items-center">
                  <div className="text-[#1D2939] mtx-subtitle2 font-medium flex items-center">
                    <Avatar
                      border="none"
                      borderRadius="50%"
                      height="24px"
                      image={countryLogo}
                      width="24px"
                    />

                    <span className="ml-1">United States</span>
                  </div>
                </div>
              </div>

              <div className="flex text-[#667085] mtx-subtitle2 !font-normal justify-between items-center border-b-[1px] border-#E4E7EC-100 pb-4 ">
                Phone
                <div className="flex justify-center items-center">
                  <div className="text-[#1D2939] mtx-subtitle2 font-medium flex items-center">
                    <span className="ml-1">{phoneNo}</span>
                  </div>
                </div>
              </div>

              <div className="flex text-[#667085] mtx-subtitle2 !font-normal justify-between items-center ">
                Browser
                <div className="flex justify-center items-center">
                  <div className="text-[#1D2939] mtx-subtitle2 font-medium flex items-center">
                    <Avatar
                      border="none"
                      borderRadius="50%"
                      height="24px"
                      image={browserLogo}
                      width="24px"
                    />

                    <span className="ml-1">{browserName}</span>
                  </div>
                </div>
              </div>

              <div className="flex text-[#667085] mtx-subtitle2 !font-normal justify-between items-center ">
                Device
                <div className="flex justify-center items-center">
                  <div className="text-[#1D2939] mtx-subtitle2 font-medium flex items-center">
                    <BsLaptop />

                    <span className="ml-1">{deviceName}</span>
                  </div>
                </div>
              </div>

              <div className="flex text-[#667085] mtx-subtitle2 !font-normal justify-between items-center ">
                Request from
                <div className="flex justify-center items-center">
                  <div className="text-[#1D2939] mtx-subtitle2 font-medium flex items-center">
                    <a className="ml-1 underline" href="mailto:">
                      {requestedEmail}
                    </a>

                    {/* <BsArrowUpRight /> */}
                  </div>
                </div>
              </div>

              <div className="flex text-[#667085] mtx-subtitle2 !font-normal justify-between items-center ">
                Network Strength
                <div className="flex justify-center items-center">
                  <div className="text-[#1D2939] mtx-subtitle2 font-medium flex items-center">
                    <BiSignal3 className="text-green-500" />
                    <span className="ml-1">{networkStrength}</span>
                  </div>
                </div>
              </div>

              <div className="flex text-[#667085] mtx-subtitle2 !font-normal justify-between items-center border-b-[1px] border-#E4E7EC-100 pb-6">
                Screen Resolution
                <div className="flex justify-center items-center">
                  <div className="text-[#1D2939] mtx-subtitle2 font-medium flex items-center">
                    <span className="ml-1">{screenResolution}</span>
                  </div>
                </div>
              </div>
            </div>

            {type === "incoming" && (
              <>
                <div className="pt-5">
                  <div className="w-[50%] ">
                    <Button
                      alignItems="center"
                      background="#7F56D9"
                      border="1px solid"
                      borderColor="#D0D5DD"
                      borderRadius="8px"
                      color="#ffffff"
                      direction="column"
                      disabledColor="transparent"
                      display="flex"
                      flexDirection="row"
                      focusColor="transparent"
                      fontSize="16px"
                      fontWeight="500"
                      gap="8px"
                      height="44px"
                      hoverColor="#7F56D9"
                      justifyContent="center"
                      label="Start Session"
                      size="sm"
                      width="100%"
                      onClick={() => inquiryButtonHandle()}
                    />
                  </div>
                </div>{" "}
              </>
            )}
            {type === "missed" && (
              <>
                <div className="pt-5">
                  <div className="w-[50%] ">
                    <Button
                      alignItems="center"
                      background="#7F56D9"
                      border="1px solid"
                      borderColor="#D0D5DD"
                      borderRadius="8px"
                      color="#ffffff"
                      direction="column"
                      disabledColor="transparent"
                      display="flex"
                      flexDirection="row"
                      focusColor="transparent"
                      fontSize="16px"
                      fontWeight="500"
                      gap="8px"
                      height="44px"
                      hoverColor="#7F56D9"
                      justifyContent="center"
                      label="Schedule Meet"
                      size="sm"
                      width="100%"
                      onClick={() => inquiryButtonHandle()}
                    />
                  </div>
                </div>{" "}
              </>
            )}
            {type === "ongoing" && (
              <>
                {" "}
                <div className="pt-5">
                  <div className="w-[100%] flex items-center">
                    <div className="text-red-500 shadow-lg mr-2">
                      <BsCircleFill size={10} />
                    </div>
                    <div className="!font-bold mtx-label text-black">
                      Ongoing session {timeGap(startTime)}
                    </div>
                  </div>
                  <div className="border-b-[0.5px] pt-4"></div>
                  <div className="pt-5">
                    <div
                      className="w-[30%] !font-bold cursor-pointer"
                      onClick={() => inquiryButtonHandle()}
                    >
                      <Badge
                        backgroundColor="#dff7e5"
                        borderRadius={16}
                        color="#2d9f64"
                        fontSize="10px"
                        fontStyle="bold"
                        height={32}
                        text="Marked as completed"
                        type="other"
                        width={130}
                      />
                    </div>
                  </div>
                </div>{" "}
              </>
            )}
            {type === "completed" && (
              <>
                {" "}
                <div className="pt-5">
                  <div className="w-[100%] ">
                    <div className="!font-bold mtx-label text-black pb-2">
                      Assignee
                    </div>
                    <div className="flex items-center pb-2">
                      {userImage ? (
                        <Avatar
                          alt="Irosha Profile Pic"
                          border="none"
                          borderRadius="50%"
                          height="32px"
                          image={userImage}
                          width="32px"
                        />
                      ) : (
                        <AvatarIntials
                          background="#F9F5FF"
                          borderRadius="50%"
                          color="#7F56D9"
                          fontSize="16px"
                          height="32px"
                          name={agentName}
                          width="32px"
                        />
                      )}
                      <div className="!font-normal mtx-label text-gray-500  pl-2">
                        {agentName}
                      </div>
                    </div>
                  </div>
                </div>{" "}
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default LiveInquiriesRightNav;
