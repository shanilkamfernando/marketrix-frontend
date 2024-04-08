import React, { useEffect, useState, useRef, use, useContext } from "react";
import IconSideNavBar from "@/components/SideNavBar/IconSideNavBar/IconSideNavBar";
import MLiveIncomingNavBar from "@/components/SideNavBar/MLiveIncomingNavBar/MLiveIncomingNavBar";
import { Button, Card } from "@creativehub/marketrix-ui";
import TwoButtonIconWithTitle from "@/components/Buttons/TwoButtonIconWithTitle/TwoButtonIconWithTitle";
import { AuthContext } from "@/auth/authContext";
import LiveTrafficCard from "@/components/Cards/LiveTrafficCard/LiveTrafficCard";


function LiveTraffic() {
  const [gridView, setGridView] = useState(true);
  const [selectedIcon, setSelectedIcon] = useState("incoming");
  const [selectedButton, setSelectedButton] = useState("LiveTraffic");
  const handleGridViewChange = (value) => {
    console.log("domainExist", domainExist);
    console.log("tenantExist", tenantExist);
    console.log("isLoggedIn", isLoggedIn);
    if (value === true) {
      setGridView(true);
    } else {
      setGridView(false);
    }
  };

  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null; // Or show some loading/error message when the context is not available yet.
  }
  const { isLoggedIn, domainExist, tenantExist } = authContext;

  return (
    <div>
      {isLoggedIn && (
        <>
          <div className="flex w-full h-screen">
            <div className="w-[5%]">
              <span>
                <IconSideNavBar
                  selectedIcon={selectedIcon}
                  setSelectedIcon={setSelectedIcon}
                />
              </span>
            </div>
            <div className="w-[15%]">
              <MLiveIncomingNavBar
                selectedButton={selectedButton}
                setSelectedButton={setSelectedButton}
              />
            </div>
            <div className="w-[80%] overflow-auto scrollbar-hide ">
              <div>
                <div className="">
                  <TwoButtonIconWithTitle
                    headerTitle={"Live Traffic"}
                    headerParagraph={
                      "Instantly meet and co-browse with your website visitors"
                    }
                    gridViewChange={handleGridViewChange}
                  />
                </div>

                <div className="grid grid-cols-12 relative pb-5 h-[85vh] p-[1rem]">
                  <div className="2xl:col-span-12 col-span-12  overflow-y-auto ">
                    <div className="w-[100%] ">
                      <div className=" ">
                        <div className="scroll-smooth  grid gap-y-[0.5rem] ">
                          <LiveTrafficCard gridView={gridView} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LiveTraffic;
