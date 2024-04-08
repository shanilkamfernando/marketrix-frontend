import LiveIntroduction from "@/components/LiveIntroduction/liveIntroduction";
import React, { useEffect, useState } from "react";
import IconSideNavBar from "@/components/SideNavBar/IconSideNavBar/IconSideNavBar";
import MLiveNavBar from "@/components/SideNavBar/MLiveNavBar/MLiveNavBar";
import { loadState } from "@/store/localStorage";
import Router from "next/router";

function Live() {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [domainNotExist, setDomainNotExist] = useState(false);

  useEffect(() => {
    const domain = loadState("website_domain");
    console.log("domain", domain);
    if (domain == null) {
      setDomainNotExist(true);
    } else {
      setDomainNotExist(false);
      Router.push("/Dashboard/MLivePages/LiveTraffic");
    }
  }, []);

  return (
    <>
      {domainNotExist && (
        <div className="flex w-full h-screen">
          <div className="w-[5%]">
            <IconSideNavBar
              selectedIcon={selectedIcon}
              setSelectedIcon={setSelectedIcon}
            />
          </div>
          <div className="w-[15%]">
            <MLiveNavBar />
          </div>
          <div className="w-[80%] ">
            <LiveIntroduction
              mainImage="https://www.youtube.com/watch?v=IA9aBV2-2SQ&list=RDIA9aBV2-2SQ&start_radio=1"
              mainTitle="Marketrix Live"
              mainPara="With Marketrix Live, businesses can engage visitors through,
        audio and video calls, co-browsing, and screen sharing to
        provide personalized support, assistance, and guidance."
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Live;
