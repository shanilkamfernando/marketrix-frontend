// import { PitchCardProps } from "@/interfaces/PitchCard";
import {
  Card,
  Button,
  Avatar,
  AvatarGroup,
  Modal,
  Badge,
} from "@creativehub/marketrix-ui";
import React, { useState } from "react";

function RightNavPitchCard({ PitchTitle, PitchDescription }) {
  const [isHovered, setIsHovered] = useState(false);
  const showModal = (isClicked) => {
    // Function to show modal
    if (isClicked) {
      <Modal show={true} onClose={() => showModal(false)} />;
    }
  };

  return (
    <div className="!cursor-default">
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
        <div className=" justify-between w-full items-center">
          <div className=" flex  justify-between ">
            <div className="mtx-subtitle1 !font-bold dark:text-[#344054] pb-2 w-[70%]">
              {PitchTitle}
            </div>

            <div className="w-[30%] flex items-start justify-end ">
              <Button
                alignItems="center"
                background="#FFF"
                border="1px solid"
                borderColor="#D0D5DD"
                color="#344054"
                direction="row"
                boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                hoverColor="#F3F4F6"
                display="flex"
                flexDirection="row"
                icon="EditWritePen"
                iconSize="20px"
                justifyContent="center"
                size="custom"
                onClick={() => showModal(true)}
                lineHeight="10px"
                paddingBottom={8}
                paddingTop={8}
                paddingLeft={8}
                paddingRight={8}
              />
            </div>
          </div>

          <div className="flex gap-9 justify-between w-full items-center pb-2">
            <div className="flex text-[#667085] mtx-body2">
              {PitchDescription}
            </div>
          </div>

          <div className=" grid gap-y-2  ">
            <div className="flex text-[#344054] mtx-label !font-medium justify-between  border-b-[1px]  border-#E4E7EC-100 py-1">
              <div>Client (Company)</div>

              <div className="flex gap-2 justify-center  items-center">
                <Avatar
                  border="none"
                  borderRadius="50%"
                  height="24px"
                  image="https://picsum.photos/300/300?random=1"
                  width="24px"
                />

                <div className="text-[#667085] mtx-label !font-regular">
                  Elephant House
                </div>
              </div>
            </div>

            <div className="flex text-[#344054] mtx-label !font-medium justify-between   border-b-[1px]  border-#E4E7EC-100 py-1">
              Host
              <div className="flex gap-4 justify-center ml-20 items-center">
                <AvatarGroup
                  alt="Avatar"
                  borderRadius="200px"
                  images={[
                    "https://picsum.photos/200",
                    "https://picsum.photos/250",
                  ]}
                  size="24px"
                />

                <div className="text-[#667085] mtx-label !font-regular">
                  Ashan +1
                </div>
              </div>
            </div>

            <div className="flex text-[#344054] mtx-label !font-medium justify-between   border-b-[1px]  border-#E4E7EC-100 py-1">
              When
              <div className="flex  justify-center ml-16 items-center">
                <div className="text-[#667085] mtx-label !font-regular">
                  Monday, January 2023
                </div>
              </div>
            </div>

            <div className="flex  text-[#344054] mtx-label !font-medium justify-between  border-b-[1px]  border-#E4E7EC-100 py-1">
              Time
              <div className="flex  justify-center ml-20 items-center">
                <div className="text-[#667085] mtx-label !font-regular">
                  4.30 PM - 4.45 (IST)
                </div>
              </div>
            </div>

            <div className="flex  text-[#344054] mtx-label !font-medium justify-between py-1">
              Stage
              <div className="flex  justify-center ml-20 items-center">
                <div className="text-[#667085] mtx-label !font-semibold">
                  <Badge
                    backgroundColor="#FFF6ED"
                    borderRadius={16}
                    color="#C4320A"
                    fontSize="14px"
                    fontStyle="600"
                    height={24}
                    padding="1px"
                    subtype="custom"
                    text="Follow Up"
                    // width={85}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="  text-[#344054] mtx-subtitle2 !font-medium py-5  items-center">
            Add Particpants
          </div>

          <div className="grid gap-y-2 pb-[2rem]">
            <div className="flex gap-9 justify-between w-full items-center">
              <div className="w-[100%] pb-2">
                <div
                  className="pb-3"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Card
                    alignItems="center"
                    background="#FFFFFF"
                    border="1px solid #E4E7EC"
                    borderRadius="8px"
                    display="flex"
                    flexDirection="row"
                    height="auto"
                    paddingBottom={12}
                    paddingLeft={12}
                    paddingRight={12}
                    paddingTop={12}
                    width="100%"
                    hoverColor="#F3F4F6"
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex gap-3">
                        <Avatar
                          border="none"
                          borderRadius="50%"
                          height="40px"
                          image="https://picsum.photos/300/300?random=1"
                          width="40px"
                        />
                        <div className="text-[#344054] mtx-subtitle1 !font-semibold">
                          Hanna Kenter
                          <div className=" flex gap-2 text-[#667085] mtx-body2 ">
                            hanna@combank.net
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {isHovered && (
                          <>
                            <div>
                              <Button
                                alignItems="center"
                                background="#FFF"
                                border="1px solid"
                                borderColor="#D0D5DD"
                                color="#344054"
                                direction="row"
                                boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                                display="flex"
                                flexDirection="row"
                                icon="copy"
                                iconSize="16px"
                                justifyContent="center"
                                size="custom"
                                hoverColor="#F3F4F6"
                                // onClick={() => showModal(true)}
                                lineHeight="10px"
                                paddingBottom={8}
                                paddingTop={8}
                                paddingLeft={8}
                                paddingRight={8}
                              />
                            </div>
                            <div>
                              <Button
                                alignItems="center"
                                background="#FFF"
                                border="1px solid"
                                borderColor="#D0D5DD"
                                color="#344054"
                                direction="row"
                                boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                                display="flex"
                                flexDirection="row"
                                icon="Delete"
                                iconSize="16px"
                                justifyContent="center"
                                size="custom"
                                hoverColor="#F3F4F6"
                                // onClick={() => showModal(true)}
                                lineHeight="10px"
                                paddingBottom={8}
                                paddingTop={8}
                                paddingLeft={8}
                                paddingRight={8}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>

                <div
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Card
                    alignItems="center"
                    background="#FFFFFF"
                    border="1px solid #E4E7EC"
                    borderRadius="8px"
                    display="flex"
                    flexDirection="row"
                    height="auto"
                    paddingBottom={12}
                    paddingLeft={12}
                    paddingRight={12}
                    paddingTop={12}
                    width="100%"
                    hoverColor="#F3F4F6"
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex gap-3">
                        <Avatar
                          border="none"
                          borderRadius="50%"
                          height="40px"
                          image="https://picsum.photos/300/300?random=1"
                          width="40px"
                        />
                        <div className="text-[#344054] mtx-subtitle1 !font-semibold">
                          Hanna Kenter
                          <div className=" flex gap-2 text-[#667085] mtx-body2 ">
                            hanna@combank.net
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {isHovered && (
                          <>
                            <div>
                              <Button
                                alignItems="center"
                                background="#FFF"
                                border="1px solid"
                                borderColor="#D0D5DD"
                                color="#344054"
                                direction="row"
                                boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                                display="flex"
                                flexDirection="row"
                                icon="copy"
                                iconSize="16px"
                                justifyContent="center"
                                size="custom"
                                hoverColor="#F3F4F6"
                                // onClick={() => showModal(true)}
                                lineHeight="10px"
                                paddingBottom={8}
                                paddingTop={8}
                                paddingLeft={8}
                                paddingRight={8}
                              />
                            </div>
                            <div>
                              <Button
                                alignItems="center"
                                background="#FFF"
                                border="1px solid"
                                borderColor="#D0D5DD"
                                color="#344054"
                                direction="row"
                                boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                                display="flex"
                                flexDirection="row"
                                icon="Delete"
                                iconSize="16px"
                                justifyContent="center"
                                size="custom"
                                hoverColor="#F3F4F6"
                                // onClick={() => showModal(true)}
                                lineHeight="10px"
                                paddingBottom={8}
                                paddingTop={8}
                                paddingLeft={8}
                                paddingRight={8}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          <div className="flex pt-4 border-t-[1px]  ">
            <Button
              alignItems="center"
              background="#7F56D9"
              border="1px solid"
              borderColor="#D0D5DD"
              color="#fff"
              fontSize="16px"
              direction="row"
              display="flex"
              gap="0.5rem"
              iconColor={"#fff"}
              icon="Video camera"
              flexDirection="row"
              justifyContent="center"
              label="Start Pitch"
              size="sm"
              lineHeight="20px"
              hoverColor="#6941C6"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default RightNavPitchCard;
