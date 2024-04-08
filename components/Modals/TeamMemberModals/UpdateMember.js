import React, { FC, use, useEffect, useState } from "react";
import {
  Modal,
  Avatar,
  Button,
  Dropdown,
  AvatarIntials,
} from "@creativehub/marketrix-ui";

// interface DeleteContactProps {
//   onClose: () => void;
//   Name: string;
//   email: string;
//   logoImage: string;
//   roles: any[];
//   updateUser: any;
//   role: number;
// }

const UpdateMember = ({
  onClose,
  Name,
  email,
  logoImage,
  roles,
  updateUser,
  role,
}) => {
  const [selectedRole, setSelectedRole] = useState(
    undefined
  );
  const apply = () => {
    if (selectedRole) {
      updateUser({ role: selectedRole });
    }
  };
  useEffect(() => {
    setSelectedRole(role);
  }, [role]);

  return (
    <div className="w-full">
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
        <div className="w-full p-4">
          <div className="absolute top-0 right-0 m-2">
            <Button
              border="none"
              borderRadius="8px"
              fontSize="12px"
              gap="8px"
              icon="close"
              size="sm"
              onClick={onClose}
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="font-bold mtx-h6 mt-2 mb-2 justify-between">
              Update Member
            </div>

            <div className="border-b-2 mb-4"></div>
            <div className="flex flex-row justify-between gap-12 mt-4">
              <div className="flex items-center justify-start gap-4">
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

              <div className="ml-4">
                <Dropdown
                  border="none"
                  borderRadius="8px"
                  color="black"
                  outline="none"
                  height="44px"
                  onSelect={(e) => {
                    setSelectedRole(e.target.value);
                  }}
                  selectedValue={selectedRole}
                  optionStyles={{
                    borderRadius: "10px",
                    color: "black",
                    width: "30px",
                  }}
                  options={roles}
                  labelKey="description"
                  valueKey="id"
                  padding={"8px"}
                  placeholder="select an option"
                  width="100%"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4 gap-3">
              <div className="flex items-center justify-end">
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
                  label="Apply"
                  size="md"
                  onClick={apply}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateMember;
