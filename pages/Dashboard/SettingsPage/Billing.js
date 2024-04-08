import React, { useState } from "react";
import IconSideNavBar from "@/components/SideNavBar/IconSideNavBar/IconSideNavBar";
import MM from "@/components/SideNavBar/MMeetNavBar/MMeetNavBar";
import AccountPage from "@/components/AccountPage/AccountPage";
import SettingsNavBar from "@/components/SideNavBar/SettingsNavBar/SettingsNavBar";
import BillingPage from "@/components/BillingPage/BillingPage";

function Billing() {
  const [selectedButton, setSelectedButton] = useState(
    "Billing and Subscription"
  );
  const [selectedIcon, setSelectedIcon] = useState("settings");

  return (
    <div className="flex w-full h-screen">
      <div className="w-[5%] bg-slate-800">
        <IconSideNavBar
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
        />
      </div>
      <div className="w-[15%]">
        <SettingsNavBar
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
        />
      </div>
      <div className="w-[80%] overflow-auto scrollbar-hide  py-[1rem] px-[4rem] flex">
        <BillingPage />
      </div>
    </div>
  );
}

export default Billing;
