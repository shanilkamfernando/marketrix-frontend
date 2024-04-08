import React, { useState } from "react";
import { Modal, Button, InputPlain, TextArea } from "@creativehub/marketrix-ui";

// interface DelayProps {
//   onClose: () => void;
// }

function NewInquiry({ onClose }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Modal
        background="#fff"
        borderRadius="8px"
        boxShadow="0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 12px 16px -4px rgba(16, 24, 40, 0.10)"
        height=""
        onClose={onClose} // Close the modal on request
        show
        transition="2.5s ease-out"
        visibility="visible"
        width="100%"
      >
        <div className="w-full p-4">
          <div className="flex flex-col items-start justify-start">
            <div className="!font-bold mtx-h6 mt-2">
              Create new Inquiry Type
            </div>
            <div className="!font-normal mtx-body2 mt-2">
              This blog post has been Published. Team members <br /> will be
              able to edit this post and republish changes
            </div>

            <div className="!font-bold mtx-body2 mt-2 pr-4">Inquiry Type</div>
            <div className=" flex flex-row p-4 gap-4">
              <div>
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
                  errorMessageStyle={{
                    color: "red",
                  }}
                  flexDirection="row"
                  height="44px"
                  padding="8px 8px"
                  placeholder="Enter text"
                  type="text"
                  width="330px"
                />
              </div>
              <div className="pr-4 justify-center items-center">
                <Button
                  alignItems="center"
                  border="1px solid"
                  borderRadius="8px"
                  color="white"
                  direction="row"
                  disabledColor="#E9D7FE"
                  display="flex"
                  flexDirection="row"
                  focusColor="#F4EBFF"
                  fontSize="12px"
                  gap="8px"
                  icon="coloredCircle"
                  iconColor="#7F56D9"
                  justifyContent="center"
                  label=""
                  paddingBottom={10}
                  paddingLeft={10}
                  paddingRight={3}
                  paddingTop={10}
                />
              </div>
            </div>

            <div className="!font-bold mtx-body2 mt-2 pr-4">Description</div>
            <div className="m-4 mb-8">
              <TextArea
                background="#FFFFFF"
                border="1px solid #EBECF0"
                borderRadius="8px"
                color="black"
                disabledBackgroundColor="#EBECF0"
                width="390px"
                onChange={() => {}}
                placeholder="Enter a description"
              />
            </div>

            <div className="flex items-center justify-center mt-12  p-4">
              <div className="mx-4">
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
                  hoverColor="#F3F4F6"
                  fontSize="16px"
                  fontWeight="500"
                  gap="8px"
                  justifyContent="center"
                  label="Cancel"
                  size="custom"
                  paddingLeft={30}
                  paddingBottom={5}
                  paddingTop={5}
                  paddingRight={30}
                  onClick={onClose}
                />
              </div>
              <div className="mx-4">
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
                  label="Create"
                  size="custom"
                  paddingLeft={30}
                  paddingBottom={5}
                  paddingTop={5}
                  paddingRight={30}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default NewInquiry;
