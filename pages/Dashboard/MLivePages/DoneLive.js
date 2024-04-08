import CongratulationContent from "@/components/CongratulationContent/congratulationContent";
import IconSideNavBar from "@/components/SideNavBar/IconSideNavBar/IconSideNavBar";
import React, { useState } from "react";

function DoneLive() {
  const [selectedIcon, setSelectedIcon] = useState(null);
  return (
    <div className="flex w-full">
      <div className="w-[5%]">
        <IconSideNavBar
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
        />
      </div>
      <div className="w-[95%]">
        <CongratulationContent
          mainImage="/images/live/congradulationImage.png"
          mainTitle="Congratulations! 🎉 You have successfully added Marketrix live into your website"
          LinkTitle="creativehub.global"
        />
      </div>
    </div>
  );
}

export default DoneLive;
