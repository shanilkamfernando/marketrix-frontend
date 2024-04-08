import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  ProPic,
  InputPlain,
  Card,
  Avatar,
} from "@creativehub/marketrix-ui";
import { IoIosArrowBack } from "react-icons/io";
import SchedulePitchModal from "../SchedulePitchModal/SchedulePitchModal";
import Tenant from "@/pages/api/admin/tenants";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { apiCallTriggered, selectActionTrigger } from "@/store/actionSlice";
import { loadingTriggered } from "@/store/actionSlice";

// interface popUpProps {
//   onClose: () => void;
//   setIsCustomizeDelayOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

function StandardWidgetModal({
  onClose,
  setIsStandardWidget,
  logoUrl,
  widgetText,
  tenantId,
}) {
  //   const [selectedButton, setSelectedButton] = useState(null);

  //   const handleButtonClick = (buttonLabel) => {
  //     if (selectedButton === buttonLabel) {
  //       setSelectedButton(null);
  //     } else {
  //       setSelectedButton(buttonLabel);
  //     }
  //   };

  const [imageSrc, setImageSrc] = useState(null);
  const [inputWidgetText, setInputWidgetText] = useState(null);
  const [avatarSrc, setAvatarSrc] = useState(
    logoUrl || "/images/mainLogoBlack.svg"
  );
  const [avatarChanged, setAvatarChanged] = useState(false);
  //  const trigger = useSelector(selectActionTrigger);

  const dispatch = useDispatch();
  if (typeof window !== "undefined") {
    // Code that uses FormData
    imageFormData = new FormData();
    // ...
  }
  var imageFormData = new FormData();

  const fileChange = (e) => {
    console.log("File change E", e);
    console.log("File change", e);
    //    setImageSrc(e.target.files[0]);
  };
  const handleAvatarSrcChange = async (newAvatarSrc) => {
    console.log("Avatar source set:", newAvatarSrc);
    setAvatarSrc(newAvatarSrc);
    setAvatarChanged(true);
  };

  const imageUpload = async (userId) => {
    let preview = avatarSrc;
    // let id = "id"
    // console.log("preview", preview);
    // console.log("imageFormData Main", imageFormData);
    const fileName = `${userId}_tenant_logo`;
    //console.log("id", id)
    if (preview != "") {
      let blob = await fetch(preview).then((r) => r.blob());
      imageFormData.append("image", blob, fileName);
      // imageFormData.append('id', id);

      console.log("imageFormData", imageFormData.get("image"));
      console.log(
        "imageFormData NAME_______________",
        imageFormData.get("image").name
      );
    }

    if (imageFormData.get("image") != null) {
      return await Tenant.upload_tenant_logo(imageFormData).then(
        async (res) => {
          if (res.status) {
            console.log("upload_user_logo", res);
            setAvatarChanged(false);
            return res?.Url;
          }
        }
      );
    }
  };
  const save = async () => {
    const req = {
      widget_text: inputWidgetText,
      // logo_url: imageSrc,
    };

    var avatarUrl;
    if (avatarChanged) {
      avatarUrl = await imageUpload(tenantId);
      req.logo_url = avatarUrl;
    }

    // if (imageSrc) {
    //   const req = {
    //     widget_text: inputWidgetText,
    //     // logo_url: imageSrc,
    //   };
    // } else {
    //   const req = {
    //     widget_text: inputWidgetText,
    //   };
    // }

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

  useEffect(() => {
    setInputWidgetText(widgetText);
  }, [setIsStandardWidget]);
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
        width="625px"
      >
        {/* Modal content goes here */}
        <div className="p-4">
          <div className="  flex justify-between items-center ">
            <div className=" flex gap-2 items-center">
              <div>
                <IoIosArrowBack
                  className=" w-[24px] h-[24px] text-[#101828]"
                  onClick={onClose}
                />
              </div>
              <div className="text-[18px] text-[#344054] font-medium">
                You selected the
                <span className=" text-[#7F56D9] font-semibold">
                  Standard Widget
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
            <div className=" w-[60%] text-[#344054] text-[14px] pb-4 font-medium">
              Widget Logo
            </div>
            <div className="flex justify-center">
              <div className="w-[17%] ">
                <ProPic
                  avatarSize="100px"
                  defaultImgSrc={avatarSrc}
                  icon=""
                  iconSize="18"
                  onFileChange={(e) => {
                    fileChange(e);
                  }}
                  setAvatarSrc={handleAvatarSrcChange}
                />
              </div>
            </div>
          </div>

          <div>
            <div className=" w-[60%] text-[#344054] text-[14px] pt-4 pb-2  font-medium">
              Widget Text
            </div>
            <div className="flex justify-start">
              <div className="w-full">
                <InputPlain
                  alignItems="center"
                  alignment="left"
                  background="#FFFFFF"
                  border="1px solid #EBECF0"
                  borderRadius="8px"
                  boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                  color="#000000"
                  disabledBackgroundColor="#EBECF0"
                  display="flex"
                  errorMessageStyle={{
                    color: "red",
                  }}
                  flexDirection="row"
                  height="44px"
                  icon="none"
                  padding="16px 16px"
                  placeholder="Enter text"
                  type="text"
                  width="100%"
                  onChange={(value) => {
                    setInputWidgetText(value);
                  }}
                  value={inputWidgetText}
                />
              </div>
            </div>
          </div>

          <div>
            <div className=" w-[60%] text-[#344054] text-[14px] pt-4 pb-2  font-medium">
              Preview
            </div>
            <div className="flex justify-start">
              <div className="w-full">
                <Card
                  alignItems="center"
                  background="#F2F4F7"
                  border="1px solid #E4E7EC"
                  borderRadius="8px"
                  flexDirection="row"
                  hoverColor="#F3F4F6"
                  display="flex"
                  justifyContent="center"
                  paddingBottom={"10px"}
                  paddingLeft={"10px"}
                  paddingRight={"10px"}
                  paddingTop={"10px"}
                  height="142px"
                >
                  <div className="bg-[#e5e7eb]  border-[2px] border-[#d1d5db]  flex gap-3 items-center p-2 rounded-full">
                    <div>
                      {" "}
                      <Avatar
                        alt="Irosha Profile Pic"
                        border="none"
                        borderRadius="100%"
                        width={"40px"}
                        height={"40px"}
                        image={avatarSrc}
                      />
                    </div>

                    {inputWidgetText && (
                      <>
                        <div className="text-[#1D2939] font-medium text-[16px]">
                          {inputWidgetText}
                        </div>
                      </>
                    )}
                  </div>
                </Card>
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
                onClick={save}
                //   disabled={!videoSrcStatus}
                //   onClick={uploadVideoHandle}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default StandardWidgetModal;
