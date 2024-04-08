import React from "react";
import Link from "next/link";
import { Button, Card } from "@creativehub/marketrix-ui";
import { MdOutlineMail } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

function LiveSettingAlert() {
  return (
    <div>
      {" "}
      <Card
        alignItems="center"
        background="#6941C6"
        border="1px solid #6941C6"
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
            <div className=" p-2 bg-[#9E77ED] text-white rounded-[10px]">
              <MdOutlineMail size={24} />
            </div>

            {/* <div className="flex flex-col text-white text-[14px]">
              <div className="!font-medium leading-6">
              Let’s complete your profile
              </div>
              <div className="!font-light">
              Add your pre-recorded video and change widget settings
              </div>
            </div> */}

            <div className="flex flex-col text-white text-[14px]">
              <div className="!font-medium leading-6">
                Marketrix Widget: Connection Pending
              </div>
              <div className="!font-light">
                Embed the provided code snippet into your website now and verify
                the connection to unlock Marketrix’s full potential.
              </div>
            </div>
          </div>
          <div className=" flex gap-3 items-center">
            <Link href="/Dashboard/SettingsPage/Account">
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
                  label="Go to settings"
                  size="sm"
                />
              </div>
            </Link>

            <div>
              <AiOutlineClose className="text-white" size={18} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default LiveSettingAlert;
