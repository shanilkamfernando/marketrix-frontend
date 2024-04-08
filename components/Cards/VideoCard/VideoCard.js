import Image from "next/image";
import React from "react";
// import { Card, Button } from "@creativehub/marketrix-ui";

function VideoCard({ setIsVideoOpen }) {
  return (
    <div className="">
      <div
        className=" rounded-lg relative h-[250px]"
        style={{
          backgroundImage: `url('../../../images/settings/videoCardBg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="p-5 h-full flex flex-col justify-between  relative">
          <div className=" text-white 2xl:text-[22px] text-[20px] font-normal">
            {" "}
            Let’s get started
          </div>

          <div
            className=" flex justify-center absolute left-[50%] top-[50%] ml-[-30px] mt-[-30px] cursor-pointer hover:scale-[80%] transition duration-500 ease-out hover:ease-in"
            onClick={setIsVideoOpen}
          >
            <Image
              src={"/images/settings/playBtn.svg"}
              alt="play Button"
              width={48}
              height={48}
            />
          </div>

          <div className="text-white text-[14px] text-left font-normal">
            {/* Instantly connect with website visitors interactively using
            MarketrixLive, Deepen engagements with MarketrixMeet&apos;s video
            pitches, And embrace a world where anyone can sell */}
            Instantly connect with website visitors interactively using Marketrix Live, deepen engagements with Marketrix Meet&apos;s video pitches and embrace a world where anyone can sell.
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
