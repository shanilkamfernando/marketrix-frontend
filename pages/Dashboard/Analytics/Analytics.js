"use client";
import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "@/auth/authContext";
import IconSideNavBar from "@/components/SideNavBar/IconSideNavBar/IconSideNavBar";
import AnalyticsPage from "@/components/AnalyticsPage/AnalyticsPage";
import NotAvailble from "@/components/NotAvailableOverlay/NotAvailable";

function Analytics() {
  const [selectedIcon, setSelectedIcon] = useState("Analytics");
  const [screenStatus, setScreenStatus] = useState(true);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Check if the key pressed is the "Enter" key (key code 13)
      if (event.keyCode === 88) {
        setScreenStatus(false);
      }
    };

   window.addEventListener("keydown", handleKeyPress);
  }, []);

  const [selectedButton, setSelectedButton] = useState("Analytics");
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null; // Or show some loading/error message when the context is not available yet.
  }

  const { proStatus, isLoggedIn } = authContext;

  return (
    <>
      {isLoggedIn && (
        <div className="flex w-full h-screen">
          <NotAvailble
            loading={screenStatus}
            messageOveraly="Coming soon"
            position=" left-[5%] w-[95%] bg-gray-200"
          />
          <div className="w-[5%] bg-slate-800">
            <IconSideNavBar
              selectedIcon={selectedIcon}
              setSelectedIcon={setSelectedIcon}
            />
          </div>
          <div className="w-[95%] overflow-auto scrollbar-hide">
            <div className="grid grid-cols-1 overflow-y-auto h-[100vh] ">
              <div className="flex justify-center py-[1rem]">
                <div className="xl:w-[65%] w-[50%] ">
                  <AnalyticsPage currentVisitors={56} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Analytics;
