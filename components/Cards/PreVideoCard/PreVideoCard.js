import React from "react";
import { RiVideoChatLine } from "react-icons/ri";
import { Card, Button } from "@creativehub/marketrix-ui";
import Link from "next/link";

function PreVideoCard({ setIsRecordOpen, userVideoSrc }) {
  return (
    <div className="hover:shadow-md rounded-lg hover:duration-700">
      <Card
        alignItems="center"
        background="#F9FAFB"
        border="1px dashed #667085"
        borderRadius="8px"
        flexDirection="row"
        hoverColor=""
        borderColor="gray"
        justifyContent="flex-start"
        paddingBottom={10}
        paddingLeft={10}
        paddingRight={10}
        paddingTop={10}
        height="250px"
      >
        <div className="flex flex-col gap-4 justify-start  ">
          <div className="2xl:w-[80px] 2xl:h-[80px] w-[60px] h-[60px] rounded-full relative">
            <video
              src={userVideoSrc || "../../../images/settings/movie.mp4"}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-full transform scaleX-[-1] 2xl:p-[5px] p-[3px] bg-[#8256C7]"
              style={{ transform: "scaleX(-1)" }}
            />
          </div>
          <div className="2xl:text-[14px] text-[13px] text-[#667085] 2xl:pb-5 pb-2">
            Let&apos;s incorporate your pre-recorded video so that visitors can
            view it while attempting to connect with you.
          </div>

          <div>
          <Link href="/Dashboard/SettingsPage/Account">
            {/* <Link href="" onClick={setIsRecordOpen}> */}
              <div className="flex gap-2 border-b-[1px] border-[#8256C7] pb-1 2xl:w-[55%] w-[70%]">
                <div>
                  <RiVideoChatLine size={24} color="#8256C7" />
                </div>
                <div className="text-[#8256C7] 2xl:text-[16px] text-[14px] font-medium">
                  Add video clip
                </div>
              </div>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default PreVideoCard;
