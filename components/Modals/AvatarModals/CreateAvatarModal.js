import React, { useEffect } from "react";
import { Modal, Button, Avatar, InputPlain } from "@creativehub/marketrix-ui";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { setAvatarNameAndDesc } from "@/store/avatarSlice";
import { useDispatch } from "react-redux";

function CreateAvatarModal({ onClose }) {
  const [avatarName, setAvatarName] = React.useState(null);
  const [avatarDescription, setAvatarDescription] = React.useState(null);
  const router = Router;
  const dispatch = useDispatch();
  const nextStep = () => {
    console.log("NEXT", avatarName, avatarDescription);

    if (avatarName && avatarName.trim() !== "") {
      if (!avatarDescription || avatarDescription.trim() == "") {
        const avatarDesc = null; 
        dispatch(setAvatarNameAndDesc({ avatarName, avatarDesc }));
      } else { 
        dispatch(setAvatarNameAndDesc({ avatarName, avatarDescription }));
      }

      router.push("/Dashboard/Trixy/AvatarLibrary");
    } else {
      alert("Please type a name for your avatar");
    }
  };

  useEffect(() => {}, []);
  return (
    <div className="w-full flex justify-center items-center">
      <Modal
        background="#fff"
        borderRadius="8px"
        boxShadow="0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 12px 16px -4px rgba(16, 24, 40, 0.10)"
        height="100%"
        onClose={""} // Close the modal on request
        show
        transition="2.5s ease-out"
        visibility="visible"
        width="625px"
      >
        <div className="lg:p-6 p-4">
          <div className="  flex justify-between items-center p-3 ">
            <div className="text-[18px] text-[#344054] font-medium">
              Create New Sales Avatar
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
          <div className="border-b-[1px] border-gray-300"></div>
          <div className="py-3 ">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <div className=" text-[#344054] mtx-body2 !font-medium ">
                  Name
                </div>
                <div className="">
                  <InputPlain
                    alignItems="center"
                    alignment="left"
                    background="#FFFFFF"
                    border="1px solid #EBECF0"
                    borderRadius="8px"
                    boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                    color="#667085"
                    display="flex"
                    errorMessageStyle={{
                      color: "red",
                    }}
                    flexDirection="row"
                    height="44px"
                    padding="16px 16px"
                    placeholder="John the Sales Avatar"
                    type="text"
                    width="100%"
                    onChange={(value) => {
                      setAvatarName(value);
                    }}
                    value={avatarName}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className=" text-[#344054] mtx-body2 !font-medium ">
                  Description
                </div>
                <div className="">
                  <InputPlain
                    alignItems="center"
                    alignment="left"
                    background="#FFFFFF"
                    border="1px solid #EBECF0"
                    borderRadius="8px"
                    boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                    color="#667085"
                    display="flex"
                    errorMessageStyle={{
                      color: "red",
                    }}
                    flexDirection="row"
                    height="44px"
                    padding="16px 16px"
                    placeholder="Add a short description about capabilities of your avatar"
                    type="text"
                    width="100%"
                    onChange={(value) => {
                      setAvatarDescription(value);
                    }}
                    value={avatarDescription}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-5 ">
              <div className=" rounded-lg p-2 flex flex-col gap-3 border-[1px] border-[#D0D5DD]">
                <div className=" w-[100%] flex justify-center relative">
                  <img
                    src="/images/ai/avatarBg.png"
                    alt="avatarBg"
                    className="object-fill"
                  />
                  <div className="absolute top-0 left-0 pl-2 pt-1 ">
                    <input type="radio" value="avatar" size={32} checked />
                  </div>
                </div>
                <div className="text-[#000000] font-medium">
                  Select from Avatar Library
                </div>
                <div className="text-[#667085] font-medium">
                  Select a suitable Avatar from our Library and deploy on your
                  site
                </div>
              </div>
              <div className="rounded-lg p-2 flex flex-col gap-3 border-[1px] border-[#F2F4F7] bg-[#D0D5DD] opacity-70">
                <div className=" w-[100%] flex justify-center">
                  <img
                    src="/images/ai/imageTwin.png"
                    alt="avatarBg"
                    className="object-fill"
                  />
                </div>
                <div className="text-[#000000] font-medium">Twin Avatar</div>
                <div className="text-[#667085] font-medium">
                  Upload your 30 Second video and create your own digital twin
                  avatar
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
                  width="100%"
                  paddingBottom={10}
                  paddingLeft={18}
                  paddingRight={18}
                  paddingTop={10}
                  onClick={onClose}
                />
              </div>
              <div className="">
                {/* <Link href={"/Dashboard/Trixy/AvatarLibrary"} hrefLang=""> */}
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
                  fontSize="16px"
                  gap="5px"
                  width="100%"
                  justifyContent="center"
                  label="Next"
                  size="custom"
                  paddingBottom={10}
                  paddingLeft={18}
                  paddingRight={18}
                  paddingTop={10}
                  //   disabled={!videoSrcStatus}
                  onClick={nextStep}
                />
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CreateAvatarModal;
