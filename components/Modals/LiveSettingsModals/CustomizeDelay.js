import React, { useState } from "react";
import {
  Modal,
  Button,
  Checkbox,
  DropDownRight,
} from "@creativehub/marketrix-ui";

// interface DelayProps {
//   onClose: () => void;
// }

function CustomizeDelay({ onClose }) {
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
        width="660px"
      >
        <div className="w-full p-4">
          <div className="flex flex-col items-start justify-start">
            <div className="!font-bold mtx-h6 mt-2">Customize Pop Up Delay</div>
            <div className="!font-normal mtx-body2 mt-2">
              Set Timed Activation for Mlive
            </div>

            <div className="!font-bold mtx-body2 mt-2 pr-4">Add Delay</div>

            <div className="flex items-start w-full pr-4 mt-4">
              <DropDownRight
                color="black"
                onChange={() => {}}
                options={[
                  {
                    label: "Second",
                    value: "00",
                  },
                  {
                    label: "Hour",
                    value: "60",
                  },
                ]}
                placeholder="Enter phone number"
              />
            </div>

            <div className="flex items-center justify-center mt-2  p-2">
              <div className="mx-4 items-center justify-center">
                <Button
                  alignItems="center"
                  background="white"
                  border="1px solid"
                  borderColor="#D0D5DD"
                  borderRadius="8px"
                  color="#344054"
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
                  label="Set"
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

export default CustomizeDelay;
