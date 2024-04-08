import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@creativehub/marketrix-ui";
// import { CongratulationContentProps } from "@/interfaces/congatulationsContent";

function CongratulationContent({ mainImage, mainTitle, LinkTitle }) {
  return (
    <div className="flex justify-center items-center  min-h-screen  ">
      <div>
        <div className=" flex justify-center">
          <Image src={mainImage} alt="mainImage" width={300} height={500} />
        </div>
        <div className="flex justify-center ">
          <div className="text-center w-[50%]">
            <h5 className="!font-bold mtx-h5">
              {" "}
              {mainTitle}{" "}
              <span className="underline underline-offset-8 text-purple-700">
                <Link href="https://www.creativehub.global/" target="_blank">
                  {LinkTitle}
                </Link>
              </span>
            </h5>
          </div>
        </div>
        <div className="flex  justify-center pt-[2rem]">
          <Link href="/Dashboard/MLivePages/DoneLive" target="">
            <Button
              alignItems="center"
              background="#7F56D9"
              border="1px solid"
              borderColor="#6941C6"
              color="white"
              direction="row"
              disabledColor="#E9D7FE"
              display="flex"
              flexDirection="row"
              focusColor="#F4EBFF"
              hoverColor="#F3F4F6"
              justifyContent="center"
              label="Let’s see our visitors"
              size="md"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CongratulationContent;
