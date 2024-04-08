import React, { useState } from "react";
import {
  Button,
  Modal,
  Dropdown,
  TextArea,
  TimeInput,
  EmailInput,
  InputPlain,
} from "@creativehub/marketrix-ui";
import CustomDatePicker from "@/components/CustomDatePicker/CustomDatePicker";

// interface SchedulePitch {
//   onClose: () => void;
// }

import "react-datepicker/dist/react-datepicker.css";
function SchedulePitchModal({ onClose }) {
  const handleDateSelect = (date) => {
    console.log("Selected date:", date);
  };

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
            <div className="text-[#344054] mtx-h4 !font-semibold mb-1 border-b-2 border-gray-200">
              First meeting Title
            </div>

            <div className="flex flex-row justify-between mt-4 ">
              <div className="">
                <label className="text-[#344054] mtx-body2 !font-bold mb-1">
                  Day
                </label>
                <div className="w-full">
                  <CustomDatePicker onSelectDate={handleDateSelect} />
                  as any
                </div>
              </div>
              <div className="">
                <label className="text-[#344054] mtx-body2 !font-bold mb-1">
                  From
                </label>
                <div className="flex">
                  <TimeInput onSelectTime={() => {}} />
                </div>
              </div>

              <div className="">
                <label className="text-[#344054] mtx-body2 !font-bold mb-1">
                  To
                </label>
                <div className="flex">
                  <TimeInput onSelectTime={() => {}} />
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-4 mt-4">
              <div className="flex flex-col items-start w-full ">
                <label className="text-[#344054] mtx-body2 !font-bold mb-1">
                  Timezone
                </label>
                <div className=" w-full">
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
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-4 mt-4">
              <div className="flex flex-col items-start w-full ">
                <label className="text-[#344054] mtx-body2 !font-bold mb-1">
                  Pitch Template
                </label>
                <label className="text-[#5c43ea] mtx-body2 !font-bold mb-1 underline">
                  Select a Template
                </label>
              </div>
            </div>

            <div className="flex flex-row gap-4 mt-4">
              <div className="flex flex-col items-start w-full ">
                <label className="text-[#344054] mtx-body2 !font-bold mb-1">
                  Company
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

            <div className="flex flex-row gap-4 mt-4 w-full">
              <div className="flex flex-col items-start w-full ">
                <label className="text-[#344054] mtx-body2 !font-bold mb-1">
                  Add Guest
                </label>
                <div className=" w-full">
                  <EmailInput
                    buttonText="Add"
                    inputPlaceholder="Enter emails seperated by comma"
                    onEmailsChange={() => {}}
                    receiptentImage="https://xsgames.co/randomusers/avatar.php?g=female"
                    value={[]}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-2 mt-2">
              <div className=" flex w-full pb-4">
                <TextArea
                  background="#FFFFFF"
                  border="1px solid #EBECF0"
                  borderRadius="8px"
                  color="black"
                  disabledBackgroundColor="#EBECF0"
                  height="100px"
                  outline="none"
                  onChange={() => {}}
                  placeholder="Enter a description"
                  width="95%"
                />
              </div>
            </div>
            <div className="flex flex-row gap-8 mt-10 justify-end">
              <div className="flex justify-end mt-12 gap-2 ">
                <Button
                  alignItems="center"
                  background="white"
                  border="1px solid"
                  borderColor="#D0D5DD"
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
                  size="custom"
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
                  label="Create"
                  size="custom"
                  paddingLeft={35}
                  paddingBottom={5}
                  paddingTop={5}
                  paddingRight={35}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SchedulePitchModal;
