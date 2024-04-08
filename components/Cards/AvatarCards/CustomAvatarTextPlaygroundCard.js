import React, { useEffect, useState } from "react";
import { Card, Button } from "@creativehub/marketrix-ui";
import Image from "next/image";
import AvatarEditModal from "@/components/Modals/AvatarModals/AvatarEditModal";
import VideoModalFocusMode from "@/components/Modals/LiveSettingsModals/VideoModalFocusMode";
import TestComp from "@/components/Modals/AvatarModals/TestComp";
import TestCompX from "@/components/Modals/AvatarModals/TestCompX";
import { loadState } from "@/store/localStorage";
import { capitalizeWords } from "@/helpers/helpers";
import spinner from "@/public/images/live/spinner.gif";
import WebcamMicToggle from "@/components/Modals/LiveSettingsModals/WebcamMicToggle ";

function CustomAvatarTextPlaygroundCard({
  avatarInfo,
  modifyAvatar,
  deleteAvatar,
  activeAvatarId,
}) {
  const [isOpenVideo, setIsOpenVideo] = useState(false);
  const [isDropdownModal, setIsDropdownModal] = useState(false);

  const [userName, setUserName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [childInput, setChildInput] = useState("");

  const updateAvatar = () => {
    setIsDropdownModal(true);
    // alert("Modify Avatar");
  };

  const triggerModifyAvatar = () => {
    setIsDropdownModal(false);
    modifyAvatar(avatarInfo);
  };

  const triggerDeleteAvatar = () => {
    setIsDropdownModal(false);
    deleteAvatar(avatarInfo);
  };

  const closeVideoModal = () => {
    setIsOpenVideo(false);
  };

  useEffect(() => {
    // load data from local storage
    console.log("avatarInfo", avatarInfo);
    setUserName(loadState("first_name") || "");
    setImageUrl(loadState("image_url") || {});
  }, []);

  return (
    <div className="relative w-[100%] hover:duration-700 hover:shadow-md rounded-lg">
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
          {avatarInfo?.image_url && (
            <Image
              // src={`/images/ai/${avatarInfo?.pre_defined_avatar_id}.png`}
              src={avatarInfo?.image_url}
              fill={true}
              className="rounded-lg border-[0.5px] border-[#D0D5DD] object-cover h-full"
            />
          )}

          <div className="absolute top-0 left-0  w-[100%] p-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center bg-white bg-opacity-75 rounded-md pr-1">
                <div className="text-black text-[0.75rem] p-1 ">
                  {avatarInfo?.agent_name}
                </div>
                {activeAvatarId === avatarInfo?.id && (
                  <div className="ml-1 h-3 w-3 bg-green-500 rounded-full"></div>
                )}
              </div>

              {/* <div className="text-black text-[0.75rem] bg-white bg-opacity-75 p-1 rounded-md">
                {avatarInfo?.agent_name}
              </div> */}
              {/* {activeAvatarId} {avatarInfo?.id} */}
              {avatarInfo.id != 0 && (
                <div>
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
                    onClick={updateAvatar}
                    disabled={avatarInfo?.model_status !== "succeeded"}
                  />
                </div>
              )}
            </div>

            {isDropdownModal && (
              <div className=" absolute top-10 right-[-2rem] z-[999]">
                <AvatarEditModal
                  onClose={() => setIsDropdownModal(false)}
                  modifyAvatar={triggerModifyAvatar}
                  deleteAvatar={triggerDeleteAvatar}
                  avatarInfo={avatarInfo}
                />
              </div>
            )}
          </div>

          <div className="absolute bottom-0 left-0  w-[100%] p-3">
            {avatarInfo?.model_status === "succeeded" ? (
              <>
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
              </>
            ) : (
              <div className="flex justify-between items-center">
                <div className="text-black text-[0.75rem] bg-white bg-opacity-75 p-1 rounded-md">
                  <div className="flex items-center">
                    {" "}
                    {/* Center the content vertically */}
                    <div>
                      <Image
                        src={spinner}
                        width={25}
                        height={25}
                        alt="spin"
                        className="mx-auto"
                      />
                      {/* mx-auto centers the Image horizontally */}
                    </div>
                    <div className="ml-2">
                      {" "}
                      {/* Add margin for separation */}
                      <span className="block">
                        {capitalizeWords(avatarInfo?.model_status)}...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
      {isOpenVideo && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center w-full z-20">
          <div className="p-5 ">
            {/* <WebcamMicToggle   onClose={closeVideoModal} /> */}
            <VideoModalFocusMode
              onClose={closeVideoModal}
              Height="50vh"
              avatarName={avatarInfo?.agent_name}
              avatarVideo={avatarInfo?.video_url}
              // avatarVideo={
              //   `/videos/avatar/${avatarInfo?.pre_defined_avatar_id}.mp4` ||
              //   `/videos/avatar/${avatarInfo?.pre_defined_avatar_id}.MP4`
              // }
              userName={userName}
              userImage={imageUrl}
              modelStatus={isOpenVideo}
              customisedAvatar={true}
              customisedGPTModelName={avatarInfo?.model_name}
              gender={avatarInfo?.gender}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomAvatarTextPlaygroundCard;
