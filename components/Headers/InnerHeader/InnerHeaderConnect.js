// import { InnerHeaderProps } from "@/interfaces/innerHeader";
import { Button, Icon } from "@creativehub/marketrix-ui";
import { FaSearch } from "react-icons/fa";
import React from "react";
import MarketrixLive from "@/components/MarketrixLive/MarketrixLive";

function InnerHeaderConnect({ mainTitle, subpara, buttonText, buttonIcon, onClick ,setConnectionStatus}) {
  
  const triggerFunc = (status)  => {
    console.log("triggerFunc_____________status",status)
    setConnectionStatus(status)
  }
  return (
    <div className="">
      <div className=" flex justify-between items-center ">
        <div>
          <div className="mtx-h6 !font-semibold text-[#101828]">{mainTitle}</div>
          <p className="text-gray-500">{subpara}</p>
        </div>
        <div className="flex items-center gap-7">
          <div>
            <MarketrixLive />
          </div>
          <div>
            <Button
              alignItems="center"
              background="white"
              border="1px solid"
              borderColor="#D0D5DD"
              color="#667085"
              gap="10px"
              direction="row"
              disabledColor="#E9D7FE"
              display="flex"
              fontSize="16px"
              fontWeight="500"
              flexDirection="row"
              focusColor="#F4EBFF"
              hoverColor="#F3F4F6"
              icon={buttonIcon}
              iconMargin={12}
              iconPosition="leading"
              justifyContent="center"
              label={buttonText}
              size="sm"
              onClick={onClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InnerHeaderConnect;
