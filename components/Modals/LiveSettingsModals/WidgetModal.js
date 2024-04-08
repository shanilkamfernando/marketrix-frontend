import React, { useState } from "react";
import { Modal, Button, Avatar } from "@creativehub/marketrix-ui";
import SchedulePitchModal from "../SchedulePitchModal/SchedulePitchModal";
import { BiPencil } from "react-icons/bi";

import Tenant from "@/pages/api/admin/tenants";
import { useDispatch } from "react-redux";
import { apiCallTriggered, selectActionTrigger } from "@/store/actionSlice";
import { loadingTriggered } from "@/store/actionSlice";
import { setAvatarId } from "@/store/avatarSlice";
import Router from "next/router";
// interface popUpProps {
//   onClose: () => void;
//   setIsCustomizeDelayOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

function WidgetModal({
  onClose,
  setIsStandardWidget,
  setIsPreRecordedWidget,
  setIsAvatarWidget,
  activeUserVideoUrl,
  widgetType,
  logoUrl,
  widgetText,
  avatarModel,
  activeAvatar,
}) {
  // const [isStandardWidget, setIsStandardWidget] = useState(false);
  //   const [selectedButton, setSelectedButton] = useState(null);

  //   const handleButtonClick = (buttonLabel) => {
  //     if (selectedButton === buttonLabel) {
  //       setSelectedButton(null);
  //     } else {
  //       setSelectedButton(buttonLabel);
  //     }
  //   };
  const [isHoveredStandard, setHoveredStandard] = useState(false);
  const [isHoveredRecorded, setHoveredRecorded] = useState(false);
  const [isHoveredAvatar, setHoveredAvatar] = useState(false);
  const [selectedWidgetType, setSelectedWidgetType] = useState(widgetType);
  const dispatch = useDispatch();
  const router = Router;

  const redirectToAvatarModify = () => {
    dispatch(setAvatarId(activeAvatar));
    router.push("/Dashboard/Trixy/AvatarModify");
  };

  const handleCheckboxChange = (type) => {
    setSelectedWidgetType(type);
  };

  const save = () => {
    const req = {
      widget_type: selectedWidgetType,
    };
    //API CALL
    dispatch(loadingTriggered(true));
    Tenant.update_tenant(req).then((response) => {
      if (response?.data) {
        console.log("response", response);
        dispatch(loadingTriggered(false));
        dispatch(apiCallTriggered(true));
      } else {
        console.log("Error", response);
        dispatch(loadingTriggered(false));
        alert(response?.message);
      }
    });
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
        width="800px"
      >
        {/* Modal content goes here */}
        <div className="p-4">
          <div className="  flex justify-between items-center ">
            <div className="text-[18px] text-[#344054] font-medium">
              Select Widget Type  
            </div>
            <Button
              border=""
              borderRadius="8px"
              fontSize="12px"
              gap=""
              icon="close"
              size=""
              onClick={onClose}
            />
          </div>
        </div>
        <div className="border-b-2 border-gray-300"></div>

        <div className="p-4">
          <div className=" w-[100%] text-[#667085] text-[14px] pb-4">
            When you choose a style, they can engage and interact with you by
            clicking the chosen button style.
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div
              className={`bg-[#F5F5F5] p-2 rounded-lg border-solid border-[1px] border-[#D0D5DD] relative ${
                isHoveredAvatar ? "" : ""
              } `}
              onMouseEnter={() => setHoveredAvatar(true)}
              onMouseLeave={() => setHoveredAvatar(false)}
            >
              <div className="flex gap-8">
                <div>
                  <label className="container">
                    <input
                      type="checkbox"
                      checked={selectedWidgetType === "trixy"}
                      //checked={selectedWidgetType === "standard"}
                      onChange={() => handleCheckboxChange("trixy")}
                    />
                    <span className="checkmark !rounded-full border-2 border-[#98A2B3] !bg-white !top-[2px]"></span>
                  </label>
                </div>
                <div className="text-[16px] text-[#1D2939] font-medium">
                  AI Avatar Widget{" "}
                </div>
                {isHoveredAvatar && (
                  <button className="absolute top-2 right-2 text-[#1D2939] px-2 py-1 text-[20px]">
                    <BiPencil onClick={redirectToAvatarModify} />
                  </button>
                )}
              </div>

              <div className=" h-[175px] flex justify-center items-center">
                {avatarModel && (
                  <>
                    <div className="w-[135px] h-[135px] rounded-full relative">
                      <video
                        src={
                          avatarModel?.video_url ||
                          "../../../images/settings/movie.mp4"
                        }
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover rounded-full transform scaleX-[-1] p-[5px] bg-[#8256C7]"
                        style={{ transform: "scaleX(-1)" }}
                      />
                    </div>

                    {/* {avatarModel.model_name}
                    {avatarModel.agent_name}
                    {avatarModel.agent_description}
                    {avatarModel.gender}
                    {avatarModel.image_url}
                    {avatarModel.video_url} */}
                  </>
                )}
              </div>
            </div>

            <div
              className={`bg-[#F5F5F5] p-2 rounded-lg border-solid border-[1px] border-[#D0D5DD] relative
              ${isHoveredStandard ? "" : ""} `}
              onMouseEnter={() => setHoveredStandard(true)}
              onMouseLeave={() => setHoveredStandard(false)}
            >
              <div className={` flex justify-between `}>
                <div className="flex gap-8">
                  <div>
                    <label className="container">
                      <input
                        type="checkbox"
                        checked={selectedWidgetType === "standard"}
                        //  checked={selectedWidgetType === "recorded"}
                        onChange={() => handleCheckboxChange("standard")}
                      />
                      <span className="checkmark !rounded-full border-2 border-[#98A2B3] !bg-white !top-[2px]"></span>
                    </label>
                  </div>
                  <div className="text-[16px] text-[#1D2939] font-medium">
                    Standard Widget{" "}
                  </div>

                  {isHoveredStandard && (
                    <button className="absolute top-2 right-2 text-[#1D2939] px-2 py-1 text-[20px]">
                      <BiPencil onClick={setIsStandardWidget} />
                    </button>
                  )}
                </div>
                <div></div>
              </div>

              <div className=" h-[175px] flex justify-center items-center">
                <div className="bg-[#e5e7eb]  border-[2px] border-[#d1d5db]  flex gap-3 items-center p-2 rounded-full">
                  <div>
                    {" "}
                    <Avatar
                      alt="Irosha Profile Pic"
                      border="none"
                      borderRadius="100%"
                      width={"40px"}
                      height={"40px"}
                      image={logoUrl || "/images/mainLogoBlack.svg"}
                    />
                  </div>

                  <div className="text-[#1D2939] font-medium text-[16px]">
                    {widgetText}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`bg-[#F5F5F5] p-2 rounded-lg border-solid border-[1px] border-[#D0D5DD] relative ${
                isHoveredRecorded ? "" : ""
              } `}
              onMouseEnter={() => setHoveredRecorded(true)}
              onMouseLeave={() => setHoveredRecorded(false)}
            >
              <div className="flex gap-8">
                <div>
                  <label className="container">
                    <input
                      type="checkbox"
                      checked={selectedWidgetType === "recorded"}
                      //checked={selectedWidgetType === "standard"}
                      onChange={() => handleCheckboxChange("recorded")}
                    />
                    <span className="checkmark !rounded-full border-2 border-[#98A2B3] !bg-white !top-[2px]"></span>
                  </label>
                </div>
                <div className="text-[16px] text-[#1D2939] font-medium">
                  Pre-Recorded Widget{" "}
                </div>

                {isHoveredRecorded && (
                  <button className="absolute top-2 right-2 text-[#1D2939] px-2 py-1 text-[20px]">
                    <BiPencil onClick={setIsPreRecordedWidget} />
                  </button>
                )}
              </div>
              <div className=" h-[175px] flex justify-center items-center">
                <div className="w-[135px] h-[135px] rounded-full relative">
                  <video
                    src={
                      activeUserVideoUrl || "../../../images/settings/movie.mp4"
                    }
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover rounded-full transform scaleX-[-1] p-[5px] bg-[#8256C7]"
                    style={{ transform: "scaleX(-1)" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 items-center pt-3  justify-end">
            <div className="">
              <Button
                alignItems="center"
                background="white"
                hoverColor="white"
                border="1px solid"
                borderColor="#D0D5DD"
                borderRadius="8px"
                color="#344054"
                direction="row"
                disabledColor="#F2F4F7"
                display="flex"
                flexDirection="row"
                focusColor="#F2F4F7"
                fontSize="16px"
                gap="5px"
                justifyContent="center"
                label="Cancel"
                size="custom"
                width="124px"
                paddingBottom={10}
                paddingLeft={18}
                paddingRight={18}
                paddingTop={10}
                onClick={onClose}
              />
            </div>
            <div className="">
              <Button
                alignItems="center"
                background="#7F56D9"
                border="1px solid"
                borderColor="#7F56D9"
                borderRadius="8px"
                hoverColor="#7F56D9"
                color="white"
                direction="row"
                disabledColor="#F2F4F7"
                display="flex"
                flexDirection="row"
                focusColor="#F2F4F7"
                fontSize="14px"
                gap="5px"
                width="124px"
                justifyContent="center"
                label="Save"
                size="custom"
                paddingBottom={10}
                paddingLeft={18}
                paddingRight={18}
                paddingTop={10}
                //   disabled={!videoSrcStatus}
                onClick={save}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default WidgetModal;
