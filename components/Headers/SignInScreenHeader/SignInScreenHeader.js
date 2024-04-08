import React from "react";
import Image from "next/image";
import { Button } from "@creativehub/marketrix-ui"; 
import Link from "next/link";

function SignInScreenHeader({ text, textButton, buttonLink }) {
  return (
    <div className=" p-5">
      {/* header of the login screen */}
      <div className="flex justify-between items-center ">
        <Link href="https://marketrix.io/">
          <div className="flex gap-2">
            <div className="gap-9">
              <Image
                src="/images/mainLogoBlack.svg"
                alt="main logo"
                width={32}
                height={32}
              />
            </div>
            <div className="mtx-h6">marketrix</div>
          </div>{" "}
        </Link>

        <div className=" mtx-subtitle1 flex gap-1 items-center">
          {text}
          <span className="!font-semibold">
            <Link href={buttonLink} target="_self">
              <Button
                alignItems="center"
                background="transparent"
                border="0px solid"
                borderColor="transparent"
                borderRadius="8px"
                color="#6941C6"
                direction="row"
                disabledColor="transparent"
                display="flex"
                flexDirection="row"
                focusColor="transparent"
                fontSize="1rem"
                gap="8px"
                hoverColor="transparent"
                justifyContent="center"
                label={textButton}
                size="custom"
              />
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignInScreenHeader;
