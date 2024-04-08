import React, { FC } from "react";
import {
  Modal,
  Avatar,
  Button,
  AvatarIntials,
} from "@creativehub/marketrix-ui";

// interface DeleteContactProps {
//   onClose: () => void;

//   Name: string;
//   email: string;
//   logoImage: string;
//   deleteUser: any;
// }

function DeleteMember({
  onClose,
  Name,
  email,
  logoImage,
  deleteUser,
}) {
  return (
    <div className="w-full ">
      <Modal
        background="white"
        borderRadius="7px"
        boxShadow="-2rem 2rem 2rem rgba(0, 0, 0, 0.2)"
        filter="blur(0)"
        onClose={onClose}
        opacity="1"
        show
        transform="scale(1)"
        transition="2.5s ease-out"
        visibility="visible"
        width="500px"
      >
        <div className="w-full">
          <div className="flex flex-col justify-between px-4 py-5">
            <div className="text-[#344054] mtx-subtitle1 !font-bold mb-3">
              Are you sure you want to delete this user ?
            </div>
            <div className="flex items-center justify-start gap-4 ">
              {logoImage ? (
                <Avatar
                  border="none"
                  borderRadius="50%"
                  height="40px"
                  image={logoImage}
                  width="40px"
                />
              ) : (
                <AvatarIntials
                  background="#F9F5FF"
                  borderRadius="100%"
                  color="#7F56D9"
                  fontSize="16px"
                  height="40px"
                  name={Name || email}
                  width="40px"
                />
              )}
              <div className="text-[#344054] mtx-subtitle1 !font-semibold">
                <div>{Name}</div>
                <div className="text-[#667085] mtx-body2">{email}</div>
              </div>
            </div>
            <div className="flex justify-end mt-4 gap-3">
              <Button
                alignItems="center"
                background="white"
                border="1px solid"
                borderColor="#344054"
                borderRadius="8px"
                hoverColor="#F3F4F6"
                color="#344054"
                direction="row"
                display="flex"
                flexDirection="row"
                fontSize="16px"
                fontWeight="500"
                gap="8px"
                justifyContent="center"
                label="Cancel"
                size="md"
                onClick={onClose}
              />
              <Button
                alignItems="center"
                background="#7F56D9"
                hoverColor="#6941C6"
                border="1px solid"
                borderColor="#7F56D9"
                borderRadius="8px"
                color="white"
                direction="row"
                display="flex"
                flexDirection="row"
                fontSize="16px"
                fontWeight="500"
                gap="8px"
                justifyContent="center"
                label="Delete"
                size="md"
                onClick={deleteUser}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DeleteMember;
