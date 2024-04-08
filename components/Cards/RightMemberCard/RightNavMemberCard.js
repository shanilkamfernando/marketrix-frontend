// import { TeamCardProps } from "@/interfaces/TeamCard";
import {
  Card,
  Button,
  Avatar,
  AvatarGroup,
  Modal,
} from "@creativehub/marketrix-ui";
import React from "react";

function RightNavMember({ name, email, role, onViewButtonClick }) {
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
                hoverColor="#F3F4F6"
              />
            </div>
          </div>

          <div className="flex gap-10 justify-between w-full items-center pb-2">
            <div className="flex text-[#344054] mtx-subtitle1 !font-bold">
              Jonathan Higgins
            </div>
          </div>

          <div className=" grid gap-y-4  ">
            <div className="flex text-[#344054] mtx-label !font-medium justify-between border-b-2  border-#E4E7EC-100 py-1">
              <div>Name</div>

              <div className="flex gap-2 justify-center  items-center">
                <div className="text-[#667085] text-sm font-semibold">
                  {name} <span className="gap-2 mtx-label !font-bold">+</span>
                </div>
              </div>
            </div>

            <div className="flex text-[#344054] mtx-label !font-medium justify-between  border-b-2  border-#E4E7EC-100 py-1">
              Role
              <div className="flex gap-4 justify-center ml-20 items-center">
                <div className="text-[#667085] mtx-label !font-bold">
                  {role}
                </div>
              </div>
            </div>

            <div className="flex text-[#344054] mtx-label !font-medium justify-between  border-b-2  border-#E4E7EC-100 py-1">
              Email
              <div className="flex  justify-center ml-16 items-center">
                <div className="text-[#667085] text-sm font-semibold">
                  {email} <span className="gap-2 mtx-label !font-bold">*</span>
                </div>
              </div>
            </div>

            <div className="flex text-[#344054] mtx-label !font-medium justify-between  border-b-2  border-#E4E7EC-100 py-1">
              Phone
              <div className="flex  justify-center ml-16 items-center">
                <div className="text-[#6941C6]  mtx-label !font-bold">Add</div>
              </div>
            </div>

            <div className="flex text-[#344054] mtx-label !font-medium  justify-between  py-1">
              Added Date
              <div className="flex  justify-center ml-16 items-center">
                <div className="text-[#667085] text-sm font-semibold">
                  14 March 2021 : 16:52 PM{" "}
                  <span className="gap-2  mtx-label !font-bold">*</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default RightNavMember;
