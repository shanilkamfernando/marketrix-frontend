import IconSideNavBar from "@/components/SideNavBar/IconSideNavBar/IconSideNavBar";
import MLiveNavBar from "@/components/SideNavBar/MLiveNavBar/MLiveNavBar";
import WizardAccordion from "@/components/WizardAccordion/WizardAccordion";
import React, { useEffect, useState } from "react";
import { ProPic } from "@creativehub/marketrix-ui";
import Router from "next/router";
import { loadState } from "@/store/localStorage";
import WizardAccordionConnect from "@/components/WizardAccordion/WizardAccordionConnect";
import InnerHeader from "@/components/Headers/InnerHeader/InnerHeader";
import InnerHeaderConnect from "@/components/Headers/InnerHeader/InnerHeaderConnect";

function LiveWizardStep() {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [domainNotExist, setDomainNotExist] = useState(false);

  const [isType, setisType] = useState("onboarding");

  // useEffect(() => {
  //   const domain = loadState("website_domain");
  //   console.log("domain", domain);
  //   if (domain == null) {
  //     setDomainNotExist(true);
  //   } else {
  //     setDomainNotExist(false);
  //     Router.push("/Dashboard/MLivePages/LiveIncoming");
  //   }
  // }, []);

  const [connectionStatus, setConnectionStatus] = useState(false);

  const handleInnerHeaderButtonClick = () => {
    if (connectionStatus) {
      Router.push("/Dashboard/MLivePages/LiveIncoming");
    } else {
      alert("Please connect to your domain");
    }
  };

  return (
    <>
      {/* {domainNotExist && ( */}
      <div className="flex w-full h-screen">
        <div className="w-[5%] bg-slate-800">
          <IconSideNavBar selectedIcon={""} setSelectedIcon={setSelectedIcon} />
        </div>

        <div className="w-[15%]">
          <MLiveNavBar />
        </div>
        <div className="w-[80%] overflow-auto scrollbar-hide ">
          <div className="w-[100%] p-[1rem]">
            {/* <InnerHeaderConnect
              mainTitle={""}
              subpara=""
              buttonText="Start MLive"
              buttonIcon="Headphones"
              onClick={handleInnerHeaderButtonClick}
              setConnectionStatus={setConnectionStatus}
            /> */}
          </div>

          <div className="px-[3rem] py-[3rem]">
            {/* <WizardAccordionConnect
              type="onboarding"
              connectionStatus={connectionStatus}
            /> */}
          </div>

          {/* <WizardAccordion type="onboarding" /> */}
        </div>
      </div>
      {/* )} */}
    </>
  );
}

export default LiveWizardStep;
