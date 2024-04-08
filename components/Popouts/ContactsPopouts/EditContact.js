import React from "react";
import {
  Modal,
  Avatar,
  Button,
  InputDropdown,
  InputPlain,
  Dropdown,
  ProPic,
} from "@creativehub/marketrix-ui";
import { BsCamera } from "react-icons/bs";

//import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

// interface EditContactProps {
//   onClose: () => void;
// }

function EditContact({ onClose }) {
  return (
    <div className="w-full">
      <Modal
        background="White"
        border="1px solid #ccc"
        borderRadius="7px"
        boxShadow="-2rem 2rem 2rem rgba(0, 0, 0, 0.2)"
        filter="blur(0)"
        height="100%"
        onClose={onClose}
        opacity="1"
        show
        transform="scale(1)"
        transition="2.5s ease-out"
        visibility="visible"
        width="31.25rem"
      >
        <div className="w-full">
          <div className="flex flex-col justify-between px-4 py-5">
            <div className="text-[#344054] mtx-h6 !font-bold mb-1">
              Update contact
            </div>
            <div className="flex items-start gap-4 relative w-[17%] ">
              {/* <Avatar
                border="none"
                borderRadius="50%"
                height="5rem"
                image="/images/live/iroshaProfilePic.png"
                width="5rem"
              /> */}
              {/* <div className="-bottom-1 right-0 absolute">
                <span className=" w-[32px] h-[32px] bg-white rounded-full cursor-pointer flex items-center justify-center border-2">
                  <BsCamera className="text-gray-500 md"  />
              
                </span>
              </div> */}
              <div className="flex flex-col max-w-20 max-h-20 rounded-full">
                <ProPic
                  defaultImgSrc="https://xsgames.co/randomusers/avatar.php?g=female"
                  onFileChange={() => {}}
                  avatarSize={"90%"}
                  buttonWidth={"40%"}
                  buttonHeight={"40%"}
                  iconSize={"20px"}
                />
              </div>
            </div>

            <div className="flex flex-row justify-between mt-4 ">
              <div className="">
                <label className="text-[#344054] mtx-body2 !font-bold mb-1">
                  First name
                </label>
                <div className="w-full">
                  <InputPlain
                    alignItems="center"
                    alignment="left"
                    background="#FFFFFF"
                    border="1px solid #EBECF0"
                    borderRadius="8px"
                    boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                    color="#000000"
                    disabledBackgroundColor="#EBECF0"
                    display="flex"
                    flexDirection="row"
                    height="24px"
                    padding="18px 14px"
                    placeholder="Nathan"
                    type="text"
                    width="100%"
                  />
                </div>
              </div>
              <div className="">
                <label className="text-[#344054] mtx-body2 !font-bold mb-1">
                  Last name
                </label>
                <div className="flex">
                  <InputPlain
                    alignItems="center"
                    alignment="left"
                    background="#FFFFFF"
                    border="1px solid #EBECF0"
                    borderRadius="8px"
                    boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                    color="#000000"
                    disabledBackgroundColor="#EBECF0"
                    display="flex"
                    flexDirection="row"
                    height="24px"
                    padding="18px 14px"
                    placeholder="Toberts"
                    type="text"
                    width="100%"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-4 mt-4">
              <div className="flex flex-col items-start w-full ">
                <label className="text-[#344054] mtx-body2 !font-bold mb-1">
                  Email address
                  <span className="text-red-500"> *</span>
                </label>
                <div className=" w-full">
                  <InputPlain
                    alignItems="center"
                    alignment="left"
                    background="#FFFFFF"
                    border="1px solid #EBECF0"
                    borderRadius="8px"
                    boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                    color="#000000"
                    disabledBackgroundColor="#EBECF0"
                    display="flex"
                    flexDirection="row"
                    height="24px"
                    padding="18px 14px"
                    placeholder="nathan.roberts@example.com"
                    type="email"
                    width="100%"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-4 mt-4">
              <div className="flex flex-col items-start w-full ">
                <label className="text-[#344054] mtx-body2 !font-bold mb-1">
                  Assign to a company
                  <span className="text-red-500"> *</span>
                </label>
                <div className="flex w-full">
                  <Dropdown
                    padding="10px"
                    border="1px solid #D0D5DD"
                    borderRadius="8px"
                    color="#344054"
                    height="44px"
                    onSelect={() => {}}
                    options={[
                      {
                        label: "Option 1",
                        value: "option1",
                      },
                      {
                        label: "Option 2",
                        value: "option2",
                      },
                      {
                        label: "Option 3",
                        value: "option3",
                      },
                    ]}
                    labelKey="label"
                    valueKey="value"
                    placeholder="Select"
                    width="100%"
                  />
                  <div></div>
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-4 mt-4">
              <div className="flex flex-col items-start w-full ">
                <label className="text-[#344054] mtx-body2 !font-bold mb-1">
                  Phone number
                  <span className="text-red-500"> *</span>
                </label>
                <div className="flex w-full">
                  <InputDropdown
                    color="black"
                    onChange={() => {}}
                    options={[
                      {
                        label: "USA",
                        value: "+1",
                      },
                      {
                        label: "India",
                        value: "+91",
                      },
                      {
                        label: "UK",
                        value: "+44",
                      },
                    ]}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-4 mt-4">
              <div className="flex flex-col items-start w-full ">
                <label className="text-[#344054] mtx-body2 !font-bold mb-1">
                  Job title
                </label>
                <div className=" w-full">
                  <InputPlain
                    alignItems="center"
                    alignment="left"
                    background="#FFFFFF"
                    border="1px solid #EBECF0"
                    borderRadius="8px"
                    boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                    color="#000000"
                    disabledBackgroundColor="#EBECF0"
                    display="flex"
                    flexDirection="row"
                    height="24px"
                    padding="18px 14px"
                    placeholder="Chief Technology officer"
                    type="text"
                    width="100%"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4 gap-3 ">
              <Button
                alignItems="center"
                background="white"
                border="1px solid"
                borderColor="#D0D5DD"
                borderRadius="8px"
                color="#344054"
                direction="row"
                display="flex"
                flexDirection="row"
                fontSize="16px"
                fontWeight="500"
                gap="8px"
                justifyContent="center"
                label="Cancel"
                size="custom"
                hoverColor="#F3F4F6"
                paddingLeft={15}
                paddingBottom={5}
                paddingTop={5}
                paddingRight={15}
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
                label="Save"
                size="custom"
                paddingLeft={35}
                paddingBottom={5}
                paddingTop={5}
                paddingRight={35}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default EditContact;
