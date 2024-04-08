import Image from "next/image";
import { Card } from "@creativehub/marketrix-ui";
import React from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import Link from "next/link";

function AvatarVideoCard({
  avatarVideo,
  avatarImg,
  avatarTitle,
  selectAvatar,
}) {
  return (
    <>
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
        <div className="flex flex-col justify-center p-2 gap-5">
          {/* <Link href={"/Dashboard/Trixy/AvatarEdit"}> */}
          <div
            className="w-[100%] lg:h-[170px] h-[155px] relative"
            onClick={selectAvatar}
          >
           
            {avatarImg && (
              <Image
                src={avatarImg}
                fill={true}
                className="rounded-lg border-[0.5px] border-[#D0D5DD]"
              />
            )}

            <div className="absolute top-0 left-0 pl-2 pt-2">
              <div className="bg-[#d3dae8] py-1 px-2 rounded-lg ">
                <input type="radio" value="avatar" size={32} />
              </div>
            </div>
          </div>
          {/* </Link> */}
          <div className=" flex justify-between items-start w-full">
            <div className="text-[#1D2939] font-semibold text-[1rem]">
              {avatarTitle}
            </div>
            <div className="cursor-pointer">
              <AiOutlinePlayCircle
                size={32}
                color="#98A2B3"
                className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300"
                onClick={avatarVideo}
              />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

export default AvatarVideoCard;
