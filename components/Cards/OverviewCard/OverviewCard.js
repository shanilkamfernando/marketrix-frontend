import { AvatarGroup, Badge, Button, Card } from "@creativehub/marketrix-ui";
// import { OverviewCardViewProps } from "@/interfaces/overviewCard";
import React from "react";

function OverviewCard(
  // { salesPitchName, salesTagName }: OverviewCardViewProps
  ) {
  return (
    <div className="border border-gray-300 rounded-lg overflow-x-auto !font-medium">
      <table className="w-full border-collapse">
        <tbody>
          <tr className="border-b border-gray-300  text-[14px] font-normal hover:bg-[#D0D5DD] hover:ease-in hover:duration-200 cursor-default ">
            <td className="text-left  p-[0.5rem] w-[15%] ">12.30 PM</td>
            <td className="text-left  p-[0.5rem] w-[45%] ">
              Innovation Lab: Brainstorming Bonanza
            </td>
            <td className=" p-[0.5rem] w-[100%]  flex justify-end ">
              <Button
                alignItems="center"
                background="#fff"
                border="1px solid"
                borderColor="#D0D5DD"
                color="#344054"
                fontSize="14px"
                direction="row"
                display="flex"
                flexDirection="row"
                justifyContent="center"
                label="Start Pitch"
                size="sm"
                hoverColor="#F3F4F6"
              />
            </td>
            <td className="text-right p-[0.5rem]  w-[15%] ">Reschedule</td>
          </tr>

          <tr className="border-b border-gray-300  text-[14px]  font-normal hover:bg-[#D0D5DD] hover:ease-in hover:duration-200 cursor-default ">
            <td className="text-left  p-[0.5rem] w-[15%] ">05.00 PM</td>
            <td className="text-left  p-[0.5rem] w-[45%] ">
              Sales Pitch : Matt.co
            </td>
            <td className=" p-[0.5rem] w-[100%]  flex justify-end ">
              <Button
                alignItems="center"
                background="#fff"
                border="1px solid"
                borderColor="#D0D5DD"
                color="#344054"
                fontSize="14px"
                direction="row"
                display="flex"
                flexDirection="row"
                justifyContent="center"
                label="Start Pitch"
                size="sm"
                hoverColor="#F9FAFB"
              />
            </td>
            <td className="text-right p-[0.5rem]  w-[15%] ">Reschedule</td>
          </tr>

          <tr className="border-b border-gray-300  text-[14px] font-normal hover:bg-[#D0D5DD] hover:ease-in hover:duration-200 cursor-default ">
            <td className="text-left  p-[0.5rem] w-[15%] ">06.30 PM</td>
            <td className="text-left  p-[0.5rem] w-[45%] ">
              Ten Four Network
            </td>
            <td className=" p-[0.5rem] w-[100%]  flex justify-end ">
              <Button
                alignItems="center"
                background="#fff"
                border="1px solid"
                borderColor="#D0D5DD"
                color="#344054"
                fontSize="14px"
                direction="row"
                display="flex"
                flexDirection="row"
                justifyContent="center"
                label="Start Pitch"
                size="sm"
                hoverColor="#F3F4F6"
              />
            </td>
            <td className="text-right p-[0.5rem]  w-[15%] ">Reschedule</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OverviewCard;
