import { Badge, Button, Card, Icon } from "@creativehub/marketrix-ui";
import React from "react";
import Image from "next/image";
import FeaturedIcon from "@/components/IconStyle/FeaturedIcon/FeaturedIcon";

function OverviewGraphCard({
  graphNumber,
  cardHeading,
  outerBgColor,
  imageIcon,
  innerBgColor,
}) {
  return (
    <div>
      <div>
        <Card
          alignItems="center"
          background="#FFFFFF"
          boxShadow={
            "0px 1.1534091234207153px 2.3068182468414307px 0px #1018280F, 0px 1.1534091234207153px 3.4602274894714355px 0px #1018281A"
          }
          borderColor="#E4E7EC"
          borderRadius="8px"
          display="flex"
          flexDirection="row"
          gap=""
          height="auto"
          justifyContent="space-between"
          left=""
          paddingBottom={15}
          paddingLeft={15}
          paddingRight={15}
          paddingTop={15}
          top=""
          width="100%"
        >
          <div className="w-full">
            <div className="flex items-start justify-between ">
              <div className="mtx-subtitle2">
                <FeaturedIcon
                  imageIcon={imageIcon}
                  outerBgColor={outerBgColor}
                  innerBgColor={innerBgColor}
                />
              </div>
              <div>
                <Button
                  alignItems="start"
                  background="transparent"
                  border="1px solid"
                  borderColor="transparent"
                  color="#98A2B3"
                  display="flex"
                  icon="more-Dots-Vertical"
                  iconPosition="leading"
                  justifyContent="start"
                  size="custom"
                />
              </div>
            </div>

            <div className="">
              <div className=" flex gap-2 items-center leading-loose">
                <div className="mtx-body1 text-[#667085] !font-semibold pt-3 ">
                  {cardHeading}
                </div>
              </div>

              <div className="flex justify-between items-center w-full pt-3">
                <div className="mtx-h5 !font-semibold">{graphNumber}</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default OverviewGraphCard;
