import React, { useState } from "react";
import {
  Modal,
  Button,
  ProPic,
  Input,
  Card,
  Avatar,
} from "@creativehub/marketrix-ui";
import { IoIosArrowBack } from "react-icons/io";
import SchedulePitchModal from "../SchedulePitchModal/SchedulePitchModal";
import Tenant from "@/pages/api/admin/tenants";
import {
  apiCallTriggered,
  loadingTriggered,
  selectActionTrigger,
} from "@/store/actionSlice";
import { useDispatch } from "react-redux";
// interface popUpProps {
//   onClose: () => void;
//   setIsCustomizeDelayOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

function PreRecordedWidgetModal({
  onClose,
  setIsStandardWidget,
  userVideos,
  tenant,
}) {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const dispatch = useDispatch();
  const handleCheckboxChange = (index, videoDetails) => {
    console.log("Checkbox clicked", index, videoDetails);
    if (selectedVideoIndex === index) {
      // If the same checkbox is clicked again, unselect it
      setSelectedVideoIndex(null);
      setSelectedVideo(null);
    } else {
      // Otherwise, select the clicked checkbox
      setSelectedVideoIndex(index);
      setSelectedVideo(videoDetails.video_url);
    }
  };
  const saveVideo = () => {
    console.log("Save video", selectedVideo);
    if (selectedVideo) {
      const req = {
        active_video_url: selectedVideo,
      };
      //API CALL
      dispatch(loadingTriggered(true));
      Tenant.update_tenant(req).then((response) => {
        if (response?.data) {
          console.log("response", response);
          dispatch(apiCallTriggered(true));
          dispatch(loadingTriggered(false));
        } else {
          console.log("Error", response);
          alert(response?.message);
          dispatch(loadingTriggered(false));
        }
      });
      onClose();
    } else {
      alert("Please select a video");
    }
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
        width="957px"
      >
        {/* Modal content goes here */}
        <div className="p-4">
          <div className="  flex justify-between items-center ">
            <div className=" flex gap-2 items-center">
              <div>
                <IoIosArrowBack className=" w-[24px] h-[24px] text-[#101828]" />
              </div>
              <div className="text-[18px] text-[#344054] font-medium">
                You selected the
                <span className=" text-[#344054] font-bold">
                  {" "}
                  Pre Recorded Widget
                </span>
              </div>
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
          <div>
            <div className="flex justify-start">
              <div className="w-full">
                <Input
                  alignItems="center"
                  alignment="left"
                  background="#FFFFFF"
                  border="1px solid #EBECF0"
                  borderRadius="8px"
                  boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                  color="#101828"
                  disabledBackgroundColor="#EBECF0"
                  display="flex"
                  flexDirection="row"
                  height="44px"
                  padding="10px 8px"
                  placeholder="Search"
                  type="search"
                  width="100%"
                />
              </div>
            </div>
            <div className="pt-1 text-[#344054] font-medium text-[14px]">
              Search sellers pre recorded video and make it default
            </div>
          </div>

          <div className="py-5 grid grid-cols-4 gap-4 grid-flow-row auto-rows-{3}">
            {userVideos?.map((videoDetails, index) => (
              <div className="  rounded-lg" key={index}>
                <div className="relative">
                  {/* <div
                    className=" h-[200px] w-full rounded-[8px] object-cover"
                    style={{
                      backgroundImage: `url(${videoDetails.video_url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  /> */}
                  <video
                    src={videoDetails.video_url}
                    autoPlay
                    loop
                    playsInline
                    muted
                    className="w-full h-[200px] object-cover rounded-lg "
                    // style={{ transform: "scaleX(-1)" }}
                  />
                  <div className="absolute top-3 left-3  ">
                    {" "}
                    <label className="container">
                      <input
                        type="checkbox"
                        checked={selectedVideoIndex === index}
                        onChange={() =>
                          handleCheckboxChange(index, videoDetails)
                        }
                      />
                      <span className="checkmark !rounded-full border-2 border-[#98A2B3] !bg-white !top-[2px]"></span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
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
                label="Back"
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
                justifyContent="center"
                label="Save"
                size="custom"
                width="124px"
                paddingBottom={10}
                paddingLeft={18}
                paddingRight={18}
                paddingTop={10}
                onClick={saveVideo}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PreRecordedWidgetModal;
