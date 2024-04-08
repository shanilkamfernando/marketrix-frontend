import React, { useState } from "react";
import { Modal, Button } from "@creativehub/marketrix-ui"; 
import AvatarVideoModal from "./AvatarVideoModal";

function AvatarEditModal({ onClose, modifyAvatar, deleteAvatar, avatarInfo }) {
  const [isOpenVideo, setIsOpenVideo] = useState(false);

  const viewVideo = () => {
    setIsOpenVideo(true);
  };

  const closeVideoModal = () => {
    setIsOpenVideo(false);
    onClose();
  };

  return (
    <div className="w-full">
      <Modal
        background="#fff"
        borderRadius="8px"
        boxShadow="0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 12px 16px -4px rgba(16, 24, 40, 0.10)"
        height="100%"
        onClose={onClose} // Close the modal on request
        show
        transition="2.5s ease-out"
        visibility="visible"
        width="100%"
      >
        <div className="!font-semibold flex relative">
          <Button
            iconMargin={8}
            alignItems="center"
            background="#ffffff"
            borderRadius="8px 8px 0 0"
            color="#595f4f"
            border="1px solid"
            direction="row"
            display="flex"
            flexDirection="row"
            fontSize="0.875rem"
            gap="13px"
            hoverColor="#F3F4F6"
            justifyContent="left"
            label="Modify"
            iconSize={"16px"}
            paddingBottom={8}
            paddingTop={8}
            paddingLeft={12}
            paddingRight={12}
            width={"100%"}
            fontWeight={"600px"}
            icon={"EditWritePen"}
            onClick={modifyAvatar}
          />
        </div>
        <div className="!font-semibold flex relative">
          <Button
            iconMargin={12}
            width={"100%"}
            alignItems="center"
            background="#ffffff"
            borderRadius="0px"
            color="#595f4f"
            border="1px solid"
            direction="row"
            display="flex"
            flexDirection="row"
            fontSize="0.875rem"
            gap="13px"
            hoverColor="#F3F4F6"
            justifyContent="left"
            label="View"
            iconSize={"16px"}
            paddingBottom={8}
            paddingTop={8}
            paddingLeft={12}
            paddingRight={12}
            fontWeight={"600px"}
            icon={"faUseroutlined"} //need to include the play button
            onClick={viewVideo}
          />
        </div>
        <div className="!font-semibold flex relative">
          <Button
            iconMargin={12}
            width={"100%"}
            alignItems="center"
            background="#ffffff"
            borderRadius="0 0 8px 8px"
            color="#595f4f"
            border="1px solid"
            direction="row"
            display="flex"
            flexDirection="row"
            fontSize="0.875rem"
            gap="13px"
            hoverColor="#F3F4F6"
            icon="Delete"
            justifyContent="left"
            label="Delete"
            iconSize={"16px"}
            paddingBottom={8}
            paddingTop={8}
            paddingLeft={12}
            paddingRight={12}
            fontWeight={"600px"}
            onClick={deleteAvatar}
          />
        </div>
      </Modal>
      {isOpenVideo && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center w-full">
          <div className="p-5 ">
            <AvatarVideoModal
              onClose={closeVideoModal}
              Height="50vh"
              // videoLink={`/videos/avatar/${avatarInfo?.pre_defined_avatar_id}.mp4`}
              videoLink={avatarInfo?.video_url}
              avatarInfo={avatarInfo}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AvatarEditModal;
