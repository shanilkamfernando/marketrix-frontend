import React from "react";
import { Button } from "@creativehub/marketrix-ui";

function ComparingTable() {
  return (
    <div>
      <div className=" grid grid-cols-5 gap-4 pb-10">
        <div className="flex justify-start items-center"></div>

        <div className="flex justify-start items-center">
          <div className="text-[#101828]">
            <div className="h-18">
              <div className="flex gap-1 items-end 2xl:pb-5 pb-3">
                <div className="2xl:mtx-h1 mtx-h2 !font-semibold">$0</div>
                <div className="pb-1 text-[#667085] font-medium">per month</div>
              </div>
            </div>

            <div className="2xl:mtx-subtitle1 mtx-subtitle2 !font-medium text-[#667085] h-20">
              For individuals looking to manage customer inquiries
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
                disabledColor="#E4E7EC"
                disabled="true"
                display="flex"
                flexDirection="row"
                focusColor="#F4EBFF"
                fontSize="16px"
                fontWeight="500"
                gap="8px"
                hoverColor="#F9FAFB"
                justifyContent="center"
                label="Current Plan"
                size="sm"
                width={"100%"}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-start items-center ">
          {" "}
          <div className="text-[#101828]">
            <div className="h-18">
              <div className="flex gap-1 items-end 2xl:pb-5 pb-3">
                <div className="2xl:mtx-h1 mtx-h2 !font-semibold">$29</div>
                <div className="pb-1 text-[#667085] font-medium">per month</div>
              </div>
            </div>

            <div className="2xl:mtx-subtitle1 mtx-subtitle2 !font-medium text-[#667085] h-20">
              For small teams looking to manage customer inquiries.
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
                label="Upgrade"
                size="sm"
                width={"100%"}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-start items-center  ">
          {" "}
          <div className="text-[#101828]">
            <div className="h-18 ">
              <div className="flex gap-1 items-end 2xl:pb-5 pb-3">
                <div className="2xl:mtx-h1 mtx-h2 !font-semibold">$99</div>
                <div className="pb-1 text-[#667085] font-medium">per month</div>
              </div>
            </div>

            <div className="2xl:mtx-subtitle1 mtx-subtitle2 !font-medium text-[#667085] h-20">
              For large teams looking to manage customer inquiries.
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
                label="Upgrade"
                size="sm"
                width={"100%"}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-start items-end">
          <div className="text-[#101828]">
            <div className="h-18 ">
              {/* <div className="flex gap-1 items-end 2xl:pb-5 pb-3">
                <div className="2xl:mtx-h1 mtx-h2 !font-semibold">$99</div>
                <div className="pb-1 text-[#667085] font-medium">per month</div>
              </div> */}
            </div>

            <div className="2xl:mtx-subtitle1 mtx-subtitle2 !font-medium text-[#667085] h-20">
              For large teams looking to manage customer inquiries.
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
                label="Upgrade"
                size="sm"
                width={"100%"}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pb-10 ">
        <div className=" ">
          <table className=" w-full table-fixed place-items-center">
            <tr className="">
              <td className="text-[#6941C6] font-medium p-3">Overview</td>
            </tr>
            <tr className="bg-[#F9FAFB]">
              <td className="p-3">Live Inquiries</td>
              <td className="text-center">10 </td>
              <td className="text-center">Unlimited</td>
              <td className="text-center">Unlimited</td>
              <td className="text-center">Unlimited</td>
            </tr>
            <tr>
              <td className="p-3">Live Connects</td>
              <td className="text-center">10 </td>
              <td className="text-center">Unlimited</td>
              <td className="text-center">Unlimited</td>
              <td className="text-center">Unlimited</td>
            </tr>
            <tr className="bg-[#F9FAFB]">
              <td className="p-3">Number of seats</td>
              <td className="text-center">1</td>
              <td className="text-center">3</td>
              <td className="text-center">5</td>
              <td className="text-center">Custom</td>
            </tr>
            <tr className="">
              <td className="p-3 ">Marketrix Meet</td>
              <td className="!text-center p-3">
                <img
                  src="/images/settings/checkIconGreen.svg"
                  className="block mx-auto my-auto w-{24}"
                />
              </td>
              <td className=" p-3  ">
                <img
                  src="/images/settings/checkIconGreen.svg"
                  className="block mx-auto my-auto w-{24}"
                />
              </td>
              <td className=" p-3  ">
                <img
                  src="/images/settings/checkIconGreen.svg"
                  className="block mx-auto my-auto w-{24}"
                />
              </td>
              <td className=" p-3 ">
                <img
                  src="/images/settings/checkIconGreen.svg"
                  className="block mx-auto my-auto w-{24}"
                />
              </td>
            </tr>
            <tr className="bg-[#F9FAFB]">
              <td className="p-3">Pitch Templates</td>
              <td className="text-center">1</td>
              <td className="text-center">5</td>
              <td className="text-center">Unlimited</td>
              <td className="text-center">Unlimited </td>
            </tr>
            <tr>
              <td className=" p-3">Participant Minutes</td>
              <td className="text-center">200</td>
              <td className="text-center">4000</td>
              <td className="text-center">20000</td>
              <td className="text-center">Unlimited</td>
            </tr>
          </table>
        </div>
        <div className="border-t-[1px] border-[#E4E7EC] pb-10"></div>

        <div>
          <table className="w-full table-fixed ">
            <tr className="bg-yellow-200 "></tr>
            <tr>
              <td className="text-[#6941C6] font-medium p-3 ">
                Advanced Features
              </td>
            </tr>
            <tr className="bg-[#F9FAFB]">
              <td className="p-3">Custom Integrations</td>
              <td className="text-center">Basic</td>
              <td className="text-center">Advance</td>
              <td className="text-center">Advance</td>
              <td className="text-center">Advance</td>
            </tr>
            <tr>
              <td className="p-3">Dedicated Account Manager</td>
              <td className="text-center">-</td>
              <td className="text-center">-</td>
              <td className="text-center">-</td>
              <td className="flex justify-center p-3">
                <img src="/images/settings/checkIconGreen.svg" />
              </td>
            </tr>
            <tr className="bg-[#F9FAFB]">
              <td className="p-3">Customizable Pitch Templates</td>
              <td className="text-center">-</td>
              <td className="text-center">-</td>
              <td className="text-center">-</td>
              <td className="flex justify-center p-3">
                <img src="/images/settings/checkIconGreen.svg" />
              </td>
            </tr>
            <tr>
              <td className="p-3">White-Label Solutions</td>
              <td className="text-center">-</td>
              <td className="text-center">-</td>
              <td className="text-center">-</td>
              <td className="flex justify-center p-3">
                <img src="/images/settings/checkIconGreen.svg" />
              </td>
            </tr>
            <tr className="bg-[#F9FAFB]">
              <td className="p-3">
                Advanced Security <br /> Settings
              </td>
              <td className="text-center">-</td>
              <td className="text-center">-</td>
              <td className="text-center">-</td>
              <td className="flex justify-center p-3">
                <img src="/images/settings/checkIconGreen.svg" />
              </td>
            </tr>
            <tr>
              <td className="p-3">Advanced Analytics and reports</td>
              <td className="text-center">-</td>
              <td className="text-center">-</td>
              <td className="text-center">-</td>
              <td className="flex justify-center p-3 items-center ">
                <img src="/images/settings/checkIconGreen.svg" />
              </td>
            </tr>
          </table>
        </div>
        <div className="border-t-[1px] border-[#E4E7EC] pb-10"></div>
      </div>
    </div>
  );
}

export default ComparingTable;
