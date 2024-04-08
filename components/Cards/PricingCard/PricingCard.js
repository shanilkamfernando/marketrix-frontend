// import PricingCardTitle from "@/components/Title/PricingCardTitle/PricingCardTitle";
import { Card, Button } from "@creativehub/marketrix-ui";
import React from "react";
import JsonDataPricing from "./JsonDataPricing.json";
import { BsCheckCircleFill } from "react-icons/bs";

function PricingCard({ startPackTitle, price, month, paragrapgh, btnLabel }) {
  return (
    <>
      <Card
        alignItems="center"
        background="#FFF"
        border="1px solid #E4E7EC"
        boxShadow={
          "0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 12px 16px -4px rgba(16, 24, 40, 0.10);"
        }
        borderRadius="8px"
        flexDirection="row"
        hoverColor="#fff"
        justifyContent="flex-start"
        paddingBottom={20}
        paddingLeft={20}
        paddingRight={20}
        paddingTop={20}
        height="600px"
      >
        {/* <PricingCardTitle /> */}
        <div className="text-[#101828]">
          <div className="font-semibold 2xl:mtx-h6 text-[18px]">
            {startPackTitle}
          </div>
          <div className="h-20">
            <div className="flex gap-1 items-end 2xl:pb-5 pb-3">
              <div className="2xl:mtx-h1 mtx-h2 !font-semibold">{price}</div>
              <div className="pb-1 text-[#667085] font-medium">{month}</div>
            </div>
          </div>

          <div className="2xl:mtx-subtitle1 mtx-subtitle2 !font-medium text-[#667085] h-20">
            {paragrapgh}
          </div>

          <div>
            <Button
              alignItems="center"
              background="#ffffff"
              border="1px solid"
              borderColor="#D0D5DD"
              borderRadius="8px"
              boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
              color="#344054"
              direction="row"
              disabledColor="#E9D7FE"
              display="flex"
              flexDirection="row"
              focusColor="#F4EBFF"
              fontSize="16px"
              fontWeight="500"
              gap="8px"
              hoverColor="#F9FAFB"
              justifyContent="center"
              label={btnLabel}
              size="md"
              width={"100%"}
            />
          </div>
        </div>
        <div className="border-b 2xl:py-5 py-3 "></div>
        <div className="2xl:py-5 py-3">
          <div className="uppercase font-semibold text-[#101828] text-[16px]">
            FEATURES
          </div>
          <div className="pt-5">
            {JsonDataPricing.members.map((member, index) => {
              return (
                <div className="" key={index}>
                  <div className="flex gap-2 pb-2">
                    <div>
                      <img src="/images/settings/checkIcon.svg" />
                    </div>
                    <div>{member.textpara}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </>
  );
}

export default PricingCard;
