import Image from "next/image";
import { Card } from "@creativehub/marketrix-ui";
import React, { useEffect, useState } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import Link from "next/link";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { setAvatarId } from "@/store/avatarSlice";
import { capitalizeWords } from "@/helpers/helpers";
import spinner from "@/public/images/live/spinner.gif";
function AvatarVideoCardModified({
  avatarVideo,
  avatarImg,
  avatarTitle,
  avatarId,
  activeAvatarId,
  changeActiveId,
  avatarStatus,
}) {
  const [selectedValue, setSelectedValue] = useState(null);
  const router = Router;
  const dispatch = useDispatch();

  // Function to handle radio button click
  const handleRadioClick = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    changeActiveId(newValue);
    // Your additional logic here
    console.log("Radio button clicked! Value: " + newValue);
    console.log("Avatar ID: " + avatarId);
  };

  const redirectToAvatarModify = () => {
    if (avatarId) {
      dispatch(setAvatarId(avatarId));
      router.push("/Dashboard/Trixy/AvatarModify");
    } else {
      alert("You cannot modify this avatar. Please select another one.");
    }
  };
  useEffect(() => {
    setSelectedValue(avatarId);
  }, [activeAvatarId]);

  return (
    <div className="hover:duration-700 hover:shadow-md rounded-2xl">
      <Card
        alignItems="center"
        background="#F2F4F7"
        border="1px solid #D0D5DD"
        borderColor="transparent"
        borderRadius="16px"
        hoverColor="#F3F4F6"
        justifyContent="center"
        width="100%"
        // gap="16px"
      >
        <div className="flex flex-col justify-center p-2 gap-2">
          {/* <Link href={"/Dashboard/Trixy/AvatarModify"}> */}
          <div className="w-[100%] lg:h-[170px] h-[155px] relative">
            {avatarImg && (
              <Image
                src={avatarImg}
                fill={true}
                className="rounded-lg border-[0.5px] border-[#D0D5DD] cursor-pointer"
                onClick={redirectToAvatarModify}
              />
            )}

            <div className="absolute top-0 left-0 pl-2 pt-2">
              <div className="bg-[#d3dae8] py-[0.50rem] px-2 rounded-lg flex flex-col ">
                {/* {avatarId} - {activeAvatarId} */}
                <input
                  type="radio"
                  value={avatarId}
                  size={32}
                  checked={selectedValue == activeAvatarId}
                  onChange={handleRadioClick}
                />
              </div>
            </div>
          </div>
          {/* </Link> */}
          <div className=" flex justify-between items-start w-full">
            <div className="text-[#1D2939] font-semibold text-[1rem]">
              {avatarTitle}
            </div>
            {avatarStatus === "succeeded" ? (
              <>
                <div className="cursor-pointer">
                  <AiOutlinePlayCircle
                    size={32}
                    color="#98A2B3"
                    className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300"
                    onClick={avatarVideo}
                  />
                </div>
              </>
            ) : (
              <>
                {" "}
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
                          {capitalizeWords(avatarStatus)}...
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default AvatarVideoCardModified;
