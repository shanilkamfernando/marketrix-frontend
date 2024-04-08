// import { PitchCardProps } from "@/interfaces/PitchCard";
import {
  Card,
  Button,
  Avatar,
  AvatarGroup,
  Modal,
} from "@creativehub/marketrix-ui";
import React from "react";

function RightNavCompany({ PitchTitle, PitchDescription }) {
  const showModal = (isClicked) => {
    // Function to show modal
    if (isClicked) {
      <Modal show={true} onClose={() => showModal(false)} />;
    }
  };

  return (
    <div>
      <Card
        alignItems="flex-start"
        background="#F9FAFB"
        border="1px solid #E4E7EC"
        borderRadius="8px"
        display="flex"
        flexDirection="column"
        gap="24px"
        height=""
        hoverColor="#F3F4F6"
        justifyContent="space-between"
        left=""
        paddingBottom={15}
        paddingLeft={15}
        paddingRight={15}
        paddingTop={15}
        top=""
        width="100%"
      >
        <div className="justify-between w-full items-center">
          <div className="flex justify-between items-center">
            <div>
              <Avatar
                border="4px solid white"
                borderRadius="50%"
                height="64px"
                image="https://picsum.photos/300/300?random=3"
                width="64px"
              />
            </div>
            <div>
              <Button
                alignItems="center"
                background=" FFFFFF"
                border="1px solid"
                borderColor="D0D5DD;"
                color="#344054"
                direction="row"
                display="flex"
                flexDirection="row"
                icon="more-Dots"
                justifyContent="center"
                size="sm"
                onClick={() => showModal(true)}
                gap="8px"
                paddingBottom={12}
                paddingTop={12}
                paddingLeft={12}
                paddingRight={12}
                borderRadius="8px"
              />
            </div>
          </div>

          <div className="flex gap-10 justify-between w-full items-center pb-2">
            <div className="flex text-[#344054] mtx-subtitle1 !font-bold">
              Grayson Inc
            </div>
          </div>

          <div className=" grid gap-y-4  ">
            <div className="flex text-[#344054] mtx-label !font-medium justify-between border-b-2  border-#E4E7EC-100 py-1">
              <div>Contact</div>

              <div className="flex gap-2 justify-center  items-center">
                <div className="text-[#667085]  mtx-label !font-bold">
                  0112356356
                </div>
              </div>
            </div>

            <div className="flex text-[#344054] mtx-label !font-medium justify-between  border-b-2  border-#E4E7EC-100 py-1">
              Email
              <div className="flex gap-4 justify-center ml-20 items-center">
                <div className="text-[#667085]  mtx-label !font-bold">
                  hello@grayson.com
                </div>
              </div>
            </div>

            <div className="flex text-[#344054] mtx-label !font-medium justify-between  border-b-2  border-#E4E7EC-100 py-1">
              Website
              <div className="flex  justify-center ml-16 items-center">
                <div className="text-[#667085]  mtx-label !font-bold">
                  Grayson.com
                </div>
              </div>
            </div>
          </div>

          <div className="flex  text-[#344054] mtx-subtitle2 !font-bold py-5  justify-between items-center">
            Particpants
            <div className="flex  justify-center items-center">
              <div className="text-[#6941C6] text-sm font-semibold">
                Add new participants
              </div>
            </div>
          </div>

          <div className="grid gap-y-2">
            <div className="flex gap-9 justify-between w-full items-center">
              <div className="w-[100%]">
                <Card
                  alignItems="center"
                  background="#FFFFFF"
                  border="1px solid #E4E7EC"
                  borderRadius="8px"
                  display="flex"
                  flexDirection="row"
                  gap="109px"
                  height="72px"
                  paddingBottom={12}
                  paddingLeft={16}
                  paddingRight={16}
                  paddingTop={12}
                  width="100%"
                >
                  <div className="flex gap-4">
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
                </Card>
              </div>
            </div>

            <div className="flex gap-9 justify-between w-full items-center">
              <div className="w-[100%]">
                <Card
                  alignItems="center"
                  background="#FFFFFF"
                  border="1px solid #E4E7EC"
                  borderRadius="8px"
                  display="flex"
                  flexDirection="row"
                  gap="109px"
                  height="72px"
                  paddingBottom={12}
                  paddingLeft={16}
                  paddingRight={16}
                  paddingTop={12}
                  width="100%"
                >
                  <div className="flex gap-4">
                    <Avatar
                      border="none"
                      borderRadius="50%"
                      height="40px"
                      image="https://picsum.photos/300/300?random=4"
                      width="40px"
                    />

                    <div className="text-[#344054] mtx-subtitle1 !font-semibold">
                      Ahmed Stanton
                      <div className=" flex gap-2 text-[#667085] mtx-body2 ">
                        ahmed@combank.net
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div className="flex gap-9 justify-between w-full items-center">
              <div className="w-[100%]">
                <Card
                  alignItems="center"
                  background="#FFFFFF"
                  border="1px solid #E4E7EC"
                  borderRadius="8px"
                  display="flex"
                  flexDirection="row"
                  gap="109px"
                  height="72px"
                  paddingBottom={12}
                  paddingLeft={16}
                  paddingRight={16}
                  paddingTop={12}
                  width="100%"
                >
                  <div className="flex gap-4">
                    <Avatar
                      border="none"
                      borderRadius="50%"
                      height="40px"
                      image="https://picsum.photos/300/300?random=5"
                      width="40px"
                    />

                    <div className="text-[#344054] mtx-subtitle1 !font-semibold">
                      Ahmed Stanton
                      <div className=" flex gap-2 text-[#667085] mtx-body2 ">
                        ahmed@combank.net
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className="flex  text-[#344054] mtx-subtitle1 !font-bold py-5  justify-between items-center">
            Assigned member
            <div className="flex  justify-center items-center">
              <div className="text-[#6941C6] text-sm font-semibold">
                Add new member
              </div>
            </div>
          </div>

          <div className="grid gap-y-2">
            <div className="flex gap-9 justify-between w-full items-center">
              <div className="w-[100%]">
                <Card
                  alignItems="center"
                  background="#FFFFFF"
                  border="1px solid #E4E7EC"
                  borderRadius="8px"
                  display="flex"
                  flexDirection="row"
                  gap="109px"
                  height="72px"
                  paddingBottom={12}
                  paddingLeft={16}
                  paddingRight={16}
                  paddingTop={12}
                  width="100%"
                >
                  <div className="flex gap-4">
                    <Avatar
                      border="none"
                      borderRadius="50%"
                      height="40px"
                      image="https://picsum.photos/300/300?random=6"
                      width="40px"
                    />

                    <div className="text-[#344054] mtx-subtitle1 !font-semibold">
                      Kanishka
                      <div className=" flex gap-2 text-[#667085] mtx-body2 ">
                        kanishka@creativehub.global
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default RightNavCompany;
