import React, { useEffect, useContext, useState } from "react";
import IconSideNavBar from "@/components/SideNavBar/IconSideNavBar/IconSideNavBar";
import TeamNavBar from "@/components/SideNavBar/TeamNavBar/TeamNavBar";
import Link from "next/link";
import { Button } from "@creativehub/marketrix-ui";
import HiringPipeline from "@/components/TeamsPage/HiringPipeline/HiringPipeline";
import NotAvailble from "@/components/NotAvailableOverlay/NotAvailable";
import { AuthContext } from "@/auth/authContext";
function HiringPage() {
  const [gridView, setGridView] = useState(false);
  const [tableData, setTableData] = useState([]);
  const handleGridViewChange = (value) => {
    if (value === true) {
      setGridView(true);
    } else {
      setGridView(false);
    }
  };
  const [selectedButton, setSelectedButton] = useState("HiringPipeline");
  const [selectedIcon, setSelectedIcon] = useState("Team");
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
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null; // Or show some loading/error message when the context is not available yet.
  }
  const { isAdmin, isLoggedIn, packageName, proStatus } = authContext;
  return (
    <>
      {isLoggedIn && (
        <div className="flex w-full h-screen">
          <NotAvailble
            loading={screenStatus}
            messageOveraly="Coming soon"
            position="left-[20%] w-[80%] bg-gray-200"
          />
          {/* {packageName === "free" && (
            <>
              <NotAvailble
                loading={screenStatus}
                messageOveraly="Coming soon.."
                position="left-[0%] w-[100%] bg-gray-100"
              />
            </>
          )} */}
          <div className="w-[5%] bg-slate-800">
            <IconSideNavBar
              selectedIcon={selectedIcon}
              setSelectedIcon={setSelectedIcon}
            />
          </div>
          <div className="w-[15%]">
            <TeamNavBar
              selectedButton={selectedButton}
              setSelectedButton={setSelectedButton}
            />
          </div>

          <div className="w-[80%] overflow-auto scrollbar-hide">
            <div>
              <div className="flex justify-end p-[1rem] text-[#1D2939] ">
                {/* <div className="flex gap-2 items-center">
              <div>
                <img
                  src="../../images/team/columns.svg"
                  width={20}
                  height={20}
                />
              </div>
              <div className="mtx-subtitle2">Board</div>
            </div> */}
                <div>
                  <Link href={"/Dashboard/MLivePages/LiveSellers"}>
                    <Button
                      alignItems="center"
                      background="#7F56D9"
                      border="1px solid"
                      borderColor="#6941C6"
                      borderRadius="8px"
                      color="white"
                      direction="row"
                      disabledColor="#E9D7FE"
                      display="flex"
                      flexDirection="row"
                      focusColor="#F4EBFF"
                      fontSize="16px"
                      gap="8px"
                      hoverColor="#5C3DA7"
                      icon="searchIcon"
                      iconColor="white"
                      iconPosition="leading"
                      justifyContent="center"
                      label="Find a seller"
                      size="sm"
                    />
                  </Link>
                </div>
              </div>
            </div>

            <>
              <div className="p-[1rem]">
                <HiringPipeline />
              </div>
            </>
          </div>
        </div>
      )}
    </>
  );
}

export default HiringPage;
