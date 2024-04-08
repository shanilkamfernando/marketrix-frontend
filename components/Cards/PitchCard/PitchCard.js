import { AvatarGroup, Badge, Button, Card } from "@creativehub/marketrix-ui";
import React from "react";

function PitchCard() {

  const pitches = [
    {
      time: "12.30 PM",
      name: "Innovation Lab: Brainstorming Bonanza",
      status: "Upcoming",
    },
    {
      time: "05.00 PM",
      name: "Sales Pitch : Matt.co",
      status: "Upcoming",
    },
    {
      time: "06.30 PM",
      name: "Ten Four Network",
      status: "Reschedule",
    },
    {
      time: "07.00 PM",
      name: "Innovation Lab: Brainstorming Bonanza",
      status: "Upcoming",
    },
  ]
  return (
    <div className="border border-gray-300 rounded-lg overflow-x-auto !font-medium">
      <table className="w-full border-collapse">
        <tbody>

          {pitches.map((pitch, index) => {
            return (
              <tr key={index} className="border-b border-gray-300  text-[14px]  font-normal hover:bg-[#D0D5DD] hover:ease-in hover:duration-200 cursor-default ">

                <td className="text-left  p-[0.5rem] w-[15%] ">{pitch.time}</td>
                <td className="text-left  p-[0.5rem] w-[45%] ">
                  {pitch.name}
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
                <td className="text-left p-[0.5rem]  w-[15%] ">
                  {pitch.status}
                </td>
              </tr>)
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PitchCard;
