import React, { useState } from "react";
import IconSideNavBar from "@/components/SideNavBar/IconSideNavBar/IconSideNavBar";
import SettingsNavBar from "@/components/SideNavBar/SettingsNavBar/SettingsNavBar";
import BillingPage from "@/components/BillingPage/BillingPage";
import PricingCard from "@/components/Cards/PricingCard/PricingCard";
import { Tabs } from "@creativehub/marketrix-ui";
import ComparingTable from "@/components/SubscriptionPage/ComparingTable";

function Pricing() {
  const [selectedButton, setSelectedButton] = useState("Profile");
  const [selectedIcon, setSelectedIcon] = useState("settings");

  return (
    <div className="flex w-full h-screen">
      <div className="w-[5%] bg-slate-800">
        <IconSideNavBar
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
        />
      </div>
      <div className="w-[95%] overflow-auto scrollbar-hide py-5 2xl:px-[10rem] px-[2rem] flex justify-center">
        <div className="w-full ">
          <div className="flex flex-col items-center pt-5 pb-14">
            <div className="text-[#101828] font-semibold 2xl:text-[40px] text-[32px] tracking-[-0.96px] pb-1">
              Plans that fit your scale
            </div>
            <div className="text-[#667085] 2xl:text-[20px] text-[18px]">
              Simple, transparent pricing that grows with you. Try any plan free
              for 30 days.
            </div>
          </div>

          {/* <div className="  items-center justify-center px-64 pb-10 ">
            <Tabs
              leftText="Monthly Billing"
              onChange={() => {}}
              rightText="Annual Billing"
            />
          </div> */}
          <div className="grid grid-cols-4 gap-3 pb-5">
            <div className="">
              <PricingCard
                startPackTitle="Free"
                price={"$0"}
                month={"per month"}
                paragrapgh={"To Quick Start for Faster Deal Closures"}
                btnLabel="Current Plan"
              />
            </div>
            <div className="">
              <PricingCard
                startPackTitle="Starter"
                price={"$29"}
                month={"per month"}
                paragrapgh={
                  "For small teams looking to drive business scalability."
                }
                btnLabel="Upgrade"
              />
            </div>
            <div className="">
              <PricingCard
                startPackTitle="Professional "
                price={"$99"}
                month={"per month"}
                paragrapgh={"Optimal Collaboration and Maximum Efficiency."}
                btnLabel="Upgrade"
              />
            </div>
            <div className="">
              <PricingCard
                startPackTitle="Enterprise"
                paragrapgh={
                  "Customized Solution for Enterprise Excellence. Contact sales for pricing and plan your tailored requirements."
                }
                btnLabel="Contact Sales"
              />
            </div>
          </div>

          <div>
            <div className="flex flex-col items-center pt-5 pb-14">
              <div className="text-[#101828] font-semibold 2xl:text-[40px] text-[32px] tracking-[-0.96px] pb-1">
                Compare our plans and find yours
              </div>
              <div className="text-[#667085] 2xl:text-[20px] text-[18px]">
                Simple, transparent pricing that grows with you. Try any plan
                free for 30 days.
              </div>
            </div>

            <div>
              <ComparingTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
