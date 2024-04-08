import React, { useState } from "react";
import { Modal, Button, Checkbox } from "@creativehub/marketrix-ui";

// interface mLiveProps {
//   onClose: () => void;
// }

function MliveForm({ onClose }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Modal
        background="#fff"
        borderRadius="8px"
        boxShadow="0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 12px 16px -4px rgba(16, 24, 40, 0.10)"
        height=""
        onClose={() => console.log("close")} // Close the modal on request
        show
        transition="2.5s ease-out"
        visibility="visible"
        width="100%"
      >
        <div className="w-full p-4">
          <div className="flex flex-col items-start justify-start">
            <div className="!font-bold mtx-h6 mt-2">Manage MLive Inputs</div>
            <div className="!font-normal mtx-body2 mt-2">
              What Specific Information would you like to gather
              <br /> from visitors to your website?
            </div>

            <div className="flex items-center">
              <div className="mr-2">
                <Checkbox />
              </div>

              <div className="!font-semibold mtx-body2 ml-4 mt-5">
                Customer Name
              </div>
            </div>

            <div className="flex items-center">
              <div className="mr-2">
                <Checkbox />
              </div>

              <div className="!font-semibold mtx-body2 ml-4 mt-5">
                Work Email
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-2">
                <Checkbox />
              </div>

              <div className="!font-semibold mtx-body2 ml-4 mt-5">
                Company Size
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-2">
                <Checkbox />
              </div>

              <div className="!font-semibold mtx-body2 ml-4 mt-5">
                Inquiry Type
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-2">
                <Checkbox />
              </div>

              <div className="!font-semibold mtx-body2 ml-4 mt-5">
                Description
              </div>
            </div>

            <div className="flex items-center justify-center mt-2  p-2">
              <div className="mx-4">
                <Button
                  alignItems="center"
                  background="white"
                  border="1px solid"
                  borderColor="#D0D5DD"
                  borderRadius="8px"
                  color="#344054"
                  hoverColor="#F3F4F6"
                  direction="row"
                  display="flex"
                  flexDirection="row"
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
                  label="Apply"
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

export default MliveForm;
