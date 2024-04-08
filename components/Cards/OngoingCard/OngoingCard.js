import React, { useEffect, useState } from "react";
import OngoingGridCard from "../OngoingGridCard/OngoingGridCard";

import {
  getTimeAgo,
  getUserImage,
  getUserName,
  removeObjectFromArray,
} from "../../../helpers/helpers";

import {
  Avatar,
  Badge,
  Card,
  Button,
  Modal,
  AvatarIntials,
} from "@creativehub/marketrix-ui";
import InquiryGridCard from "../InquiryGridCard/InquiryGridCard";

// interface Ongoing {
//   website_domain: string;
//   checked: Boolean;
//   name: string;
//   user_email: string;
//   work_email: string;
//   company: string;
//   message: string;
//   company_logo: string;
//   inquiry_status: string;
//   inquiry_type: string;
//   createdAt: string;
//   updatedAt: string;
//   badgeBgColor: string;
//   badgeTextColor: string;
//   country_logo: string;
//   country: string;
//   phone_no: string;
//   browser_logo: string;
//   id: number;
//   call_duration: string;
// }

function OngoingCard({
  inquiryButtonHandle,
  getOngoingInquiries,
  gridView,
  users,
  tableData,
  handleViewInquiryCallParent,
  deleteInquiryCallParent,
}) {
  const [isHovered, setIsHovered] = useState(false); // State to track hover state
  const [hoveredRow, setHoveredRow] = useState(-1); // State to track hovered row index
  const [isOpenModal, setIsOpenModal] = useState([]);

  const handleMouseEnter = (index) => {
    if (hoveredRow !== -1 && hoveredRow !== index) {
      closeModal(hoveredRow); // Close the modal of the previously hovered row
    }
    setHoveredRow(index);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setHoveredRow(-1);
    setIsHovered(false);
  };

  const openModal = (index) => {
    setIsOpenModal((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = true;
      return updatedState;
    });
  };

  const closeModal = (index) => {
    setIsOpenModal((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = false;
      return updatedState;
    });
  };

  const deleteInquiry = async () => {
    deleteInquiryCallParent();
  };

  return (
    <>
      {gridView ? (
        <div className=" grid grid-cols-2 gap-2">
          {tableData.map((inquiry, index) => {
            return (
              <InquiryGridCard
                key={index}
                name={inquiry?.name}
                userName={getUserName(inquiry?.user_id, users)}
                email={inquiry?.email}
                createdAt={inquiry?.createdAt}
                currentUrl={inquiry?.currentUrl}
                websiteDomain={inquiry?.website_domain}
                message={inquiry?.message}
                browser={inquiry?.visitor_info?.browser}
                windowWidth={inquiry?.visitor_info?.windowWidth}
                country={inquiry?.country}
                handleViewInquiry={() => handleViewInquiryCallParent(inquiry)}
                connectButtonHandle={() => inquiryButtonHandle()}
                gridCardType="ongoing"
                viewInquiryButtonVisible={true}
              />
            );
          })}
        </div>
      ) : (
        <>
          <div className="border border-gray-300 rounded-lg overflow-x-auto !font-medium">
            <table className="w-full border-collapse">
              <tbody>
                {tableData.map((inquiry, index) => {
                  const isModalOpen = isOpenModal[index] || false;
                  return (
                    <tr
                      className={`border-b border-gray-300 text-[14px]  font-normal hover:bg-[#D0D5DD] hover:ease-in hover:duration-200 ${
                        inquiry.checked === false &&
                        "bg-[#7F56D9] !font-bold text-[#F9F5FF]"
                      } cursor-default`}
                      key={index}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleViewInquiryCallParent(inquiry)}
                    >
                      <>
                        <td className="text-left  p-[0.5rem] ">
                          {inquiry?.name?.length <= 11
                            ? inquiry?.name
                            : inquiry?.name?.substr(0, 11) + "..."}
                        </td>
                        <td className="text-left ">{inquiry?.company}</td>
                        <td className=" p-[0.5rem]">
                          <Badge
                            backgroundColor="#F2F4F7"
                            borderRadius={4}
                            color="#344054"
                            hoverColor="#F2F4F7"
                            text={inquiry?.inquiry_type}
                            width={80}
                            height={20}
                            fontSize="14px"
                            type={"inquiry"}
                          />
                        </td>
                        <td className="text-left  p-[0.5rem] ">
                          {inquiry?.message?.length <= 25
                            ? inquiry?.message
                            : inquiry?.message?.substr(0, 22) + "..."}
                        </td>
                        <td className="items-start  p-[0.5rem] ">
                          <Badge
                            backgroundColor={inquiry?.badgeBgColor}
                            borderRadius={16}
                            color={inquiry?.badgeTextColor}
                            hoverColor="#00FF00"
                            text={inquiry?.inquiry_status}
                            width={80}
                            height={20}
                            fontSize="14px"
                            type={"status"}
                            subtype={inquiry?.inquiry_status}
                          />
                        </td>

                        <td className="items-center   p-[0.5rem]">
                          {inquiry?.user_id && (
                            <>
                              {getUserImage(inquiry?.user_id, users) != "" ? (
                                <>
                                  <Avatar
                                    border="none"
                                    borderRadius="100%"
                                    height="30px"
                                    image={getUserImage(
                                      inquiry?.user_id,
                                      users
                                    )}
                                    width="30px"
                                  />
                                </>
                              ) : (
                                <>
                                  <AvatarIntials
                                    background="#F9F5FF"
                                    borderRadius="100%"
                                    color="#7F56D9"
                                    fontSize="14px"
                                    height="30px"
                                    name={getUserName(inquiry?.user_id, users)}
                                    width=" 30px"
                                  />
                                </>
                              )}
                            </>
                          )}
                        </td>

                        <td className="text-left  p-[0.5rem] ">
                          {getTimeAgo(inquiry?.createdAt)}
                        </td>

                        <td className=" min-w-[30px] h-fixed">
                          {hoveredRow === index && (
                            <Button
                              border=""
                              borderRadius="8px"
                              color="#667085"
                              icon="more-Dots-Vertical"
                              iconSize="20px"
                              paddingLeft={2}
                              paddingRight={2}
                              alignItems="center"
                              display="flex"
                              flexDirection="row"
                              justifyContent="end"
                              onClick={() => openModal(index)}
                            />
                          )}

                          {/* Conditionally render the modal */}
                          {isModalOpen && (
                            <div className="fixed z-5">
                              <Modal
                                background="#fff"
                                borderRadius="5px"
                                boxShadow="0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 12px 16px -4px rgba(16, 24, 40, 0.10)"
                                height="100%"
                                onClose={() => closeModal(index)} // Close the modal on request
                                show
                                transition="2.5s ease-out"
                                visibility="visible"
                                width="100%"
                              >
                                {/* Modal content goes here */}
                                <Button
                                  alignItems="center"
                                  background="#ffffff"
                                  borderRadius="5px"
                                  color="#595f4f"
                                  border="1px solid"
                                  direction="row"
                                  disabledColor="#E9D7FE"
                                  display="flex"
                                  flexDirection="row"
                                  fontSize="14px"
                                  hoverColor="#e9e4f4"
                                  icon="Delete"
                                  justifyContent="center"
                                  label="Delete Inquiry"
                                  width="100%"
                                  height="100%"
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
                        </td>
                      </>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

export default OngoingCard;
