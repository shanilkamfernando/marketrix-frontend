import UpgradeToPro from "@/components/Cards/UpgradetoPro/UpdgradetoPro";
import { Button, SideNavigationBar } from "@creativehub/marketrix-ui";
import Link from "next/link";
import React, { useState } from "react";
// interface SettingsNavBarProps {
//   selectedButton: string | null;
//   setSelectedButton: React.Dispatch<React.SetStateAction>;
// }

function MMeetNavBar({ selectedButton, setSelectedButton }) {
  // Set the correct type for selectedButton
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <div>
      <SideNavigationBar
        background="#FCFCFD"
        display="flex"
        flexDirection="column"
        height="100vh"
        justifyContent="left"
        width="100%"
      >
        <div className=" flex flex-col justify-between h-[100vh] p-[1rem]">
          <div className="grid gap-y-[0.5rem]">
            <div className="text-[#000000] mtx-h6 !font-bold pt-1">
              {/* Marketrix Meet */}
              Marketrix Meet
            </div>

            <Link href="/Dashboard/MmeetPages/Pitches" target="_self">
              <div className=" flex relative">
                <Button
                  alignItems="center"
                  background={
                    selectedButton === "Pitches" ? "#E4E7EC" : "#FCFCFD"
                  } // Change background based on selection
                  onClick={() => handleButtonClick("Pitches")} // Set the selected button when clicked
                  color="#344054"
                  direction="row"
                  display="flex"
                  flexDirection="row"
                  fontSize="0.875rem"
                  gap="13px"
                  hoverColor="#f2f4f7"
                  icon="Video camera"
                  iconMargin={12}
                  iconPosition="leading"
                  justifyContent="start"
                  label="Pitches"
                  lineHeight="2px"
                  size="sm"
                  width="100%"
                />
              </div>
            </Link>
            {/* <Link href="/MmeetPages/Dashboard/#" target="_self">
            <div className=" flex relative">
              <Button
                alignItems="center"
                background={
                  selectedButton === "Templates" ? "#E4E7EC" : "#FCFCFD"
                } // Change background based on selection
                onClick={() => handleButtonClick("Templates")} // Set the selected button when clicked
                color="#344054"
                direction="row"
                display="flex"
                flexDirection="row"
                fontSize="0.875rem"
                gap="13px"
                hoverColor="#F9F5FF"
                icon="Template"
                iconMargin={12}
                iconPosition="leading"
                justifyContent="start"
                label="Templates"
                lineHeight="2px"
                size="sm"
                width="100%"
              />
            </div>
          </Link> */}
          </div>

          {/* <div className="flex items-center justify-between pt-3 border-solid border-t-2 border-[#E4E7EC]">
          <div className="text-[#000000] mtx-subtitle1 !font-bold ">
            Marketrix Live
          </div>
          <Toggle isChecked={mLive} onClick={() => mLiveToggle()} />
        </div> */}

          <UpgradeToPro />
        </div>
      </SideNavigationBar>
    </div>
  );
}

export default MMeetNavBar;
