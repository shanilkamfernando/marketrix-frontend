import React from "react";
import Image from "next/image";

function FeaturedIcon({ imageIcon, outerBgColor, innerBgColor }) {
  return (
    <div>
      <div
        className={`${outerBgColor} p-[10px] rounded-full w-[50px] h-[50px] `}
      >
        <div
          className={`${innerBgColor} p-[10px]  rounded-full w-[30px] h-[30px] flex justify-center items-center`}
        >
          <Image src={imageIcon} width={26} height={26} alt={"iconDisplayed"} />
        </div>
      </div>
    </div>
  );
}

export default FeaturedIcon;
