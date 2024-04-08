import React, { useEffect, useState } from "react";
import { Card, Button } from "@creativehub/marketrix-ui"; 
import Image from "next/image";
import AvatarEditModal from "@/components/Modals/AvatarModals/AvatarEditModal";
import VideoModalFocusMode from "@/components/Modals/LiveSettingsModals/VideoModalFocusMode";
import TestComp from "@/components/Modals/AvatarModals/TestComp";
import TestCompX from "@/components/Modals/AvatarModals/TestCompX";
import { loadState } from "@/store/localStorage";

function AvatarTextPlaygroundCard() {
  const [isOpenVideo, setIsOpenVideo] = useState(false);
  const [isDropdownModal, setIsDropdownModal] = useState(false);

  const [userName, setUserName] = useState("");
  const [imageUrl, setImageUrl] = useState({});

  const closeVideoModal = () => {
    setIsOpenVideo(false);
  };

  useEffect(() => {
    // load data from local storage
    setUserName(loadState("first_name") || "");
    setImageUrl(loadState("image_url") || {});
  }, []);

  return (
    <div className="relative w-[100%]">
      <Card
        background="#FCFCFD"
        border="none"
        borderColor="transparent"
        borderRadius="16px"
        flexDirection="row"
        height="200px"
        hoverColor="#F3F4F6"
        left=""
        width="100%"
        top=""
        gap={"20px"}
        boxShadow="rgba(0, 0, 0, 0.07)"
      >
        <div className="">
          <Image
            src={`/images/ai/MTX_AGENT_1.png`}
            fill={true}
            className="rounded-lg border-[0.5px] border-[#D0D5DD] object-cover h-full"
          />
          <div className="absolute top-0 left-0  w-[100%] p-3">
            <div className="flex justify-between items-center">
            <div className="  bg-[#7F56D9]  text-white text-[0.75rem]   bg-opacity-75 p-1 rounded-md">
                Trixy AI
              </div>
              {/* <div>
                <Button
                  alignItems="center"
                  background="rgba(255, 255, 255, 0.64)"
                  borderRadius="8px"
                  color="white"
                  direction="row"
                  disabledColor="#E9D7FE"
                  display="flex"
                  flexDirection="row"
                  focusColor="#F4EBFF"
                  fontSize="12px"
                  gap=""
                  hoverColor="#e6e6e6"
                  icon="more-Dots-Vertical"
                  iconColor="rgba(52, 64, 84, 1)"
                  iconPosition="leading"
                  justifyContent="center"
                  label=""
                  size="custom"
                  paddingBottom={5}
                  paddingTop={5}
                  paddingLeft={5}
                  paddingRight={5}
                  onClick={setIsDropdownModal}
                />
              </div> */}
            </div>
            {/* {isDropdownModal && (
              <div className=" absolute top-10 right-[-2rem] z-[999]">
                <AvatarEditModal />
              </div>
            )} */}
          </div>
          <div className="absolute bottom-0 left-0  w-[100%] p-3">
            <Button
              alignItems="center"
              background="#fdfdfd"
              border="1px solid #D0D5DD"
              borderColor="#D0D5DD"
              borderRadius="8px"
              color="#344054"
              direction="row"
              disabledColor="#E9D7FE"
              display="flex"
              flexDirection="row"
              focusColor="#F4EBFF"
              fontSize="14px"
              fontWeight="500"
              gap=""
              hoverColor="#f7f7f7"
              icon="none"
              iconColor="#000000"
              iconPosition="trailing"
              justifyContent="center"
              label="Test In Playground"
              size="sm"
              onClick={setIsOpenVideo}
            />
          </div>
        </div>

        {/* <div className=" flex justify-center gap-1 items-center">
          <div>
            <LuPlus size={24} color="#101828" />
          </div>
          <div>Create your avatar</div>
        </div> */}
      </Card>
      {isOpenVideo && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center w-full">
          <div className="p-5 ">
            {/* <TestComp/> */}
            {/* <TestCompX /> */}
            <VideoModalFocusMode
              onClose={closeVideoModal}
              Height="50vh"
              avatarName="Trixy AI"
              avatarVideo={`/videos/avatar/MTX_AGENT_1.MP4`}
              userName={userName}
              userImage={imageUrl}
              modelStatus={isOpenVideo}
              customisedAvatar={false}
              customisedGPTModelName="gpt-3"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AvatarTextPlaygroundCard;
