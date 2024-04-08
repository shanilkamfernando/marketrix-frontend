import { Button, Input, MouseOver } from "@creativehub/marketrix-ui";
import Link from "next/link";
import React from "react";
//import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { BiFilter } from "react-icons/bi";

function MLiveHeader({ buttonName, buttonIcon, buttonFunction }) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center w-3/5">
        <div className="relative">
          <Input
            alignItems="center"
            alignment="left"
            background="#FFFFFF"
            border="1px solid #EBECF0"
            borderRadius="8px"
            boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
            color="#a49595"
            disabledBackgroundColor="#EBECF0"
            display="flex"
            flexDirection="row"
            height="44px"
            padding="10px 8px"
            placeholder="Search contact or company"
            type="search"
            width="500px"
          />
          <button
            type="button"
            className="absolute right-0 top-0 bottom-0 flex items-center pr-3"
          >
            <BiFilter className="text-gray-400" />
          </button>
        </div>
      </div>

      <div className=" flex gap-3 items-center ">
        <div>
          <MouseOver
            alignItems="center"
            background="#101828"
            borderRadius="8px"
            boxShadow="0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 12px 16px -4px rgba(16, 24, 40, 0.10)"
            color="#FFFFFF"
            display="flex"
            flexDirection="column"
            fontSize="12px"
            fontWeight="500px"
            height="30px"
            justifyContent="center"
            lineHeight="18px"
            padding="8px 8px"
            position="absolute"
            text="Notifications"
            textAlign="center"
          >
            <div className="gap-2 mb-2 items-center flex ">
              <Button
                background="#ffffff"
                border="1px solid"
                borderColor="#D0D5DD"
                borderRadius="8px"
                color="#667085"
                disabledColor="#E9D7FE"
                focusColor="#F4EBFF"
                fontSize="18px"
                gap="8px"
                hoverColor="#F3F4F6"
                icon="notifications"
                iconPosition="leading"
                paddingBottom={8}
                paddingLeft={8}
                paddingRight={8}
                paddingTop={8}
                size="custom"
              />
            </div>
          </MouseOver>
        </div>
        <div className="mb-2">
          <Button
            alignItems="center"
            background="white"
            border="1px solid"
            borderColor="#D0D5DD"
            borderRadius="8px"
            color="#344054"
            direction="row"
            disabledColor="#D0D5DD"
            display="flex"
            flexDirection="row"
            focusColor="#D0D5DD"
            fontSize="16px"
            fontWeight="500"
            gap="8px"
            hoverColor="#F3F4F6"
            icon={buttonIcon}
            iconPosition="leading"
            justifyContent="center"
            label={buttonName}
            size="md"
            onClick={buttonFunction}
          />
        </div>
      </div>
    </div>
  );
}

export default MLiveHeader;
