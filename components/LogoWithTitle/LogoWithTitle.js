import React from "react";
import Image from "next/image";
//import { LogoWithTitle } from '@/interfaces/logoWithTitle'

function LogoWithTitle({ mainTitle, subPara1, subPara2 }) {
  return (
    <div>
      <div className="">
        <div className=" flex justify-center pb-2">
          <Image
            src="/images/mainLogoBlack.svg"
            alt="main logo"
            width={32}
            height={32}
          />
        </div>
        <div className="mtx-h4 w-full flex justify-center !font-semibold  pb-3">
          <div className=" text-[#101828] text-center w-[80%]">{mainTitle}</div>
        </div>
        <div className="items-center justify-center text-[#667085] mtx-body1 !font-normal">
          <p class="text-center">{subPara1}</p>
          <p class="text-center">{subPara2}</p>
        </div>
      </div>
    </div>
  );
}

export default LogoWithTitle;
