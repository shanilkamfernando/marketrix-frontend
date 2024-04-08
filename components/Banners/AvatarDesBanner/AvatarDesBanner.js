import React from "react";
import Image from "next/image";

function AvatarDesBanner({ avatarDescription, avatarImage }) {
  return (
    <div className="w-full  bg-[#101828] rounded-2xl flex items-center justify-between">
      <div className="w-[80%] lg:p-8 p-5">
        <p className="w-[90%] text-white text-[1rem] !font-medium">
          {avatarDescription}
        </p>
      </div>
      <div className="w-[30%] lg:h-[170px] h-[155px] relative ">
        {avatarImage && (
          <Image src={avatarImage} fill={true} className="rounded-2xl " />
        )}
      </div>
    </div>
  );
}

export default AvatarDesBanner;
