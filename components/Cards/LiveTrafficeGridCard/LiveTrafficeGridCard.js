import { AvatarIntials, Avatar, Button } from "@creativehub/marketrix-ui";
import React from "react";
// import { BsArrowUpRight } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import {
  capitalizeWords,
  getBrowserLogo,
  getCountryLogo,
  getDeviceIcon,
  getTimeAgo,
} from "@/helpers/helpers";

function LiveTrafficeGridCard({
  id,
  userName,
  profileImg,
  currentUrl,
  visitedTime,
  cursorId,
  userRole,
  browser,
  windowWidth,
  country,
  city,
  connectButtonHandle,
  utmCampaign,
  utmContent,
  utmMedium,
  utmSource,
  utmTerm,
}) {
  const getUTM = () => {
    if (utmSource || utmCampaign) {
      return "UTM";
    } else {
      return "Organic";
    }
  };
  return (
    <div>
      <div className=" border-[1px] p-2 rounded-[12px] min-w-[345px]">
        <div className=" flex justify-between items-end pb-3">
          <div className=" flex gap-2 items-center ">
            <div>
              <AvatarIntials
                background="#F9F5FF"
                borderRadius="100%"
                color="#7F56D9"
                fontSize="16px"
                height="40px"
                name={userName}
                width=" 40px"
              />
            </div>

            <div className="mtx-body2">
              <div className=" !font-semibold">{userName}</div>
              <div className="text-[#98A2B3]">{id}</div>
            </div>
          </div>
          <div className="bg mtx-body2 text-[#344054]">
            {getTimeAgo(visitedTime)}
          </div>
        </div>

        <div className=" pb-4 flex items-center gap-2 pt-6">
          <div className="mtx-body2">{currentUrl}</div>
          <div className="!font-semibold">
            {/* <BsArrowUpRight /> */}
          </div>
        </div>
        <div className="pb-3 flex gap-3">
          <div>
            <Image
              src={getDeviceIcon(windowWidth)}
              width={24}
              height={24}
              alt=""
            />
          </div>
          <div>
            <Image
              src={getBrowserLogo(browser)}
              width={24}
              height={24}
              alt=""
            />
          </div>
          <div>
            <Avatar
              border="none"
              borderRadius="50%"
              height="24px"
              image={getCountryLogo(country)}
              width="24px"
            />
          </div>
          <div className="mtx-body2">
            {" "}
            {city}, {country}
          </div>
        </div>

        {/* <div className="mtx-body2 pb-3 flex gap-3">
            {utmCampaign && <div>Campaign:{utmCampaign}</div>}
            {utmContent && <div>Content:{utmContent}</div>}
            {utmMedium && <div>Medium:{utmMedium}</div>}
            {utmSource && <div>Source:{utmSource}</div>}
            {utmTerm && <div>Term:{utmTerm}</div>}
          </div> */}

        <div className="bg-[#D0D5DD] p-2 rounded-[8px] flex justify-between items-center ">
          <div className="!font-medium">
            {utmSource || utmCampaign ? (
              <>
                <Button
                  background="transparent"
                  border="1px solid"
                  fontSize="12px"
                  borderColor="transparent"
                  color="#344054"
                  label={
                    capitalizeWords(utmSource) +
                    "/" +
                    capitalizeWords(utmCampaign)
                  }
                  size="custom"
                  paddingBottom={2}
                  paddingLeft={2}
                  paddingRight={2}
                  paddingTop={2}
                />
              </>
            ) : (
              <>
                <Button
                  background="transparent"
                  border="1px solid"
                  fontSize="12px"
                  borderColor="transparent"
                  color="#344054"
                  label={"Organic"}
                  size="custom"
                  paddingBottom={2}
                  paddingLeft={2}
                  paddingRight={2}
                  paddingTop={2}
                />
              </>
            )}
          </div>
          <div className=" flex gap-1 items-center">
            <Button
              alignItems="center"
              gap={"2px"}
              background="#FFFFFF"
              border="1px solid"
              borderColor="transparent"
              hoverColor={"#F3F4F6"}
              color="#344054"
              fontSize={"12px"}
              fontWeight={"500"}
              display="flex"
              label={"Connect"}
              icon="Headphones"
              iconSize={"14px"}
              iconPosition="leading"
              justifyContent="start"
              size="custom"
              paddingBottom={5}
              paddingLeft={5}
              paddingRight={5}
              paddingTop={5}
              onClick={connectButtonHandle}
            />
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveTrafficeGridCard;
