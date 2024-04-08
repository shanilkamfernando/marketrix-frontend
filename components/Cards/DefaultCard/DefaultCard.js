 
import { Avatar, Badge, Card } from "@creativehub/marketrix-ui";
import React from "react";

function DefaultCard(
  // {salesPitchName, salesTagName }: OverviewCardViewProps
  ) {
  return (
    <div>
      <div>
        <Card
          alignItems="center"
          background="#FFFFFF"
          border="0.5px solid #D0D5DD"
          borderColor="transparent"
          borderRadius="8px"
          display="flex"
          flexDirection="row"
          gap="12px"
          justifyContent="space-between"
          paddingBottom={20}
          paddingLeft={20}
          paddingRight={20}
          paddingTop={20}
        >
          <div className="flex justify-between w-full items-center">
            <div className="">
              <div className="mtx-subtitle2 text-[#667085] !leading-loose">
                
                Sales Pitch 
              </div>
              <div className="flex gap-4">
                <div>
                  <Avatar
                    border="none"
                    borderRadius="50%"
                    height="24px"
                    image="https://picsum.photos/300/300?random=1"
                    width="24px"
                  />
                </div>
                <div className="text-[#667085] mtx-label">
                  2 members of airtel have been invited
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div>
                {" "}
                <Badge
                  backgroundColor="#F2F4F7"
                  borderRadius={16}
                  color="#344054"
                  hoverColor="#00FF00"
                  // text={salesTagName}
                  text={"salesTag"}
                  width={89}
                />
              </div>
              <div className="!font-semibold mtx-body2 text-[#667085]">
                11:30 AM
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default DefaultCard;
