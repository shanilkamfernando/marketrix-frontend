// import LiveIntroduction from "@/components/LiveIntroduction/liveIntroduction";
import React, { useEffect, useState, useRef, use, useContext } from "react";
import IconSideNavBar from "@/components/SideNavBar/IconSideNavBar/IconSideNavBar";
// import MLiveIncomingNavBar from "@/components/SideNavBar/MLiveIncomingNavBar/MLiveIncomingNavBar";
import { Button, Card } from "@creativehub/marketrix-ui";
// import TwoButtonIcon from "@/components/Buttons/TwoButtonIcon/TwoButtonIcon";
import { AuthContext } from "@/auth/authContext";
// import LiveTrafficCard from "@/components/Cards/LiveTrafficCard/LiveTrafficCard";
import PageHeader from "@/components/Headers/PageHeader/PageHeader";
import Link from "next/link";
import NotAvailble from "@/components/NotAvailableOverlay/NotAvailable";

function LiveAgent() {
  const [gridView, setGridView] = useState(true);
  const [selectedIcon, setSelectedIcon] = useState("Agent");
  const [selectedButton, setSelectedButton] = useState(true);
  const [screenStatus, setScreenStatus] = useState(true);
  const handleGridViewChange = (value) => {
    if (value === true) {
      setGridView(true);
    } else {
      setGridView(false);
    }
  };

  const goNext = () => {};

  const authContext = useContext(AuthContext);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Check if the key pressed is the "Enter" key (key code 13)
      if (event.keyCode === 88) {
        setScreenStatus(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
  }, []);
  if (!authContext) {
    return null; // Or show some loading/error message when the context is not available yet.
  }
  const { isLoggedIn, proStatus } = authContext;

  return (
    <div>
      {isLoggedIn && (
        <>
          <div className="flex w-full  h-screen">
            {!proStatus && (
              <>
                <NotAvailble
                  loading={screenStatus}
                  messageOveraly="Coming soon"
                  position="left-[20%] w-[80%] bg-gray-200"
                />
              </>
            )}
            <div className="w-[5%] bg-slate-800">
              <IconSideNavBar
                selectedIcon={selectedIcon}
                setSelectedIcon={setSelectedIcon}
              />
            </div>

            <div className="w-full overflow-auto scrollbar-hide pt-8">
              <div className=" pl-[2rem] pt-2">
                <PageHeader BoldText="Marketix" RegularText="Circle" />
              </div>

              <div className="relative h-5/6 justify-center items-center flex">
                <div className="justify-center items-center flex flex-col 2xl:w-1/4 xl:w-3/5 w-4/6  text-center">
                  <div className=" w-96 h-96 bg-gray-100 rounded-full my-6">
                    {/* video  of the image content */}
                  </div>
                  <PageHeader
                    BoldText="Marketrix circle some good title need to add here"
                    RegularText=""
                  />
                  <p className="text-gray-500 font-semibold my-6 text-base px-5">
                    make digital experiences that are not just easy to use but
                    also exciting. My designs blend new ideas with simplicity,
                    making sure users have a great time. Enter a world where
                    smart design is king.
                  </p>

                  <Link href="/Dashboard/MLivePages/LiveSellers">
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
                      icon="rightArrow"
                      iconColor="#ffffff"
                      iconPosition="trailing"
                      justifyContent="center"
                      label="Get Started"
                      size="md"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LiveAgent;
