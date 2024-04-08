import React from "react";
import Image from "next/image";
import { Button } from "@creativehub/marketrix-ui";
import Link from "next/link";

function SwitchLoginScreen({ text, textButton, buttonLink, stepId }) {
  return (
    <div className=" p-5">
      {/* header of the login screen */}
      <div className="mtx-subtitle1 flex gap-2 justify-center items-center ">
        {text}
        <span className="!font-semibold">
          <Link href={buttonLink} target="_self">
            <Button
              id={stepId}
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
  );
}

export default SwitchLoginScreen;
