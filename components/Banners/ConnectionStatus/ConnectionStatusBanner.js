import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Card, Modal } from "@creativehub/marketrix-ui";
import { MdOutlineMail } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { TbPlugConnectedX } from "react-icons/tb";

function ConnectionStatusBanner({
  onClose,
  buttonFunction,
  buttoneText,
  mainMsg,
  subMsg,
}) {
  const checkConnection = () => {
    buttonFunction(); 
  };
  return (
    <div>
      <>
        <Modal
          background="#6941C6"
          borderRadius="8px"
          border="1px solid #6941C6"
          borderColor="#6941C6"
          boxShadow="0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 12px 16px -4px rgba(16, 24, 40, 0.10)"
          height="100%"
          onClose={onClose} // Close the modal on request
          show
          transition="2.5s ease-out"
          visibility="visible"
          width="100%"
        >
          <Card
           alignItems="center"
           background="6941C6"
           border="1px solid 6941C6"
           borderRadius="8px"
           flexDirection="row"
           hoverColor="#6941C6"
           boxShadow=" 0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 12px 16px -4px rgba(16, 24, 40, 0.10)"
           justifyContent="flex-start"
           paddingBottom={10}
           paddingLeft={10}
           paddingRight={10}
           paddingTop={10}
          >
            <div className="flex !font-bold mtx-body2 gap-3  justify-between items-center">
              <div className="flex gap-3 items-center">
                <div className="p-2 bg-[#9E77ED] text-white rounded-[10px]">
                  <TbPlugConnectedX size={24} />
                </div>

                <div className="flex flex-col text-white text-[14px]">
                  <div className="!font-medium leading-6">
                    {mainMsg}
                  </div>
                  <div className="!font-light">
                    {subMsg}
                  </div>
                </div>
              </div>
              <div className=" flex gap-3 items-center">
                {/* <Link href="/Dashboard/SettingsPage/Account"> */}
                <div>
                  <Button
                    alignItems="center"
                    background="white"
                    border="1px solid"
                    borderColor="white"
                    borderRadius="8px"
                    color="#6941C6"
                    direction="row"
                    disabledColor="#E9D7FE"
                    display="flex"
                    flexDirection="row"
                    focusColor="#F4EBFF"
                    fontWeight="500"
                    fontSize="14px"
                    gap="8px"
                    hoverColor="#F9FAFB"
                    justifyContent="center"
                    label={buttoneText}
                    size="sm"
                    onClick={checkConnection}
                  />
                </div>
                {/* </Link> */}

                <div>
                  <AiOutlineClose
                    className="text-white"
                    size={18}
                    onClick={onClose}
                  />
                </div>
              </div>
            </div>
          </Card>
        </Modal>{" "}
      </>
    </div>
  );
}

export default ConnectionStatusBanner;
