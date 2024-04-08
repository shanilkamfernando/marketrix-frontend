import React from "react";
import Link from "next/link";
import { Button } from "@creativehub/marketrix-ui";
// import { LiveIntroductionProps } from "@/interfaces/liveIntroduction";

function LiveIntroduction({ mainImage, mainTitle, mainPara }) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>
        <div className="flex justify-center">
          <video
            src={mainImage}
            width={"50%"}
            height={"30%"}
            controls
            className="rounded-md"
          />
        </div>
        <div className="flex justify-center">
          <div className="text-center w-[50%]">
            <h3 className="!font-bold mtx-h4 py-5">{mainTitle}</h3>
            <div className="pt-[1rem]">
              <p className="mtx-subtitle1 text-[#667085]">{mainPara}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-[2rem]">
          <Link href="/Dashboard/MLivePages/LiveWizardStep" target="">
            <Button
              alignItems="center"
              background="#ffffff"
              border="1px solid"
              borderColor="#D0D5DD"
              color="#344054"
              direction="row"
              disabledColor="#E9D7FE"
              display="flex"
              flexDirection="row"
              hoverColor="#F3F4F6"
              justifyContent="center"
              label="Let’s get started"
              size="md"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LiveIntroduction;
