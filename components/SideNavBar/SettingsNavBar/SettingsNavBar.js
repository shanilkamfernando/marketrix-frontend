import React, { useContext, useState } from "react";
import { Button, SideNavigationBar } from "@creativehub/marketrix-ui";
import Link from "next/link";
import UpgradeToPro from "@/components/Cards/UpgradetoPro/UpdgradetoPro";
import { AuthContext } from "@/auth/authContext";

// interface SettingsNavBarProps {
//   selectedButton: string | null;
//   setSelectedButton: React.Dispatch<React.SetStateAction>;
// }

function SettingsNavBar({ selectedButton, setSelectedButton }) {
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const [meetingMinutesProgress, setMeetingMinutesProgress] = useState(30);

  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null; // Or show some loading/error message when the context is not available yet.
  }
  const { isAdmin } = authContext;

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
            <div className="text-[#000000] mtx-h5 !font-bold pt-1">
              Settings
            </div>
            <Link href="/Dashboard/SettingsPage/LiveSettings" target="_self">
              <div className=" flex items-center relative">
                <Button
                  alignItems="center"
                  color="#344054"
                  direction="row"
                  display="flex"
                  flexDirection="row"
                  fontSize="0.875rem"
                  gap="13px"
                  hoverColor="#f2f4f7"
                  icon="widget"
                  iconMargin={12}
                  iconPosition="leading"
                  justifyContent="start"
                  label="Widget Settings"
                  lineHeight="2px"
                  size="sm"
                  width="100%"
                  background={
                    selectedButton === "Widget Settings" ? "#E4E7EC" : "#FCFCFD"
                  } // Change background based on selection
                  onClick={() => handleButtonClick("Widget Settings")} // Set the selected button when clicked
                />
              </div>
            </Link>

            {isAdmin && (
              <>
                <Link href="/Dashboard/SettingsPage/Billing" target="_self">
                  <div className=" flex items-center relative ">
                    <Button
                      alignItems="center"
                      color="#344054"
                      direction="row"
                      display="flex"
                      flexDirection="row"
                      fontSize="0.875rem"
                      gap="13px"
                      hoverColor="#f2f4f7"
                      icon="billing"
                      iconMargin={12}
                      iconPosition="leading"
                      justifyContent="start"
                      label="Billing and Subscription"
                      lineHeight="2px"
                      size={"sm"}
                      width="100%"
                      background={
                        selectedButton === "Billing and Subscription"
                          ? "#E4E7EC"
                          : "#FCFCFD"
                      } // Change background based on selection
                      onClick={() =>
                        handleButtonClick("Billing and Subscription")
                      } // Set the selected button when clicked
                    />
                  </div>
                </Link>

                {/* <Link href="/Dashboard/SettingsPage/TeamMembers" target="_self">
                  <div className=" flex items-center relative">
                    <Button
                      alignItems="center"
                      color="#344054"
                      direction="row"
                      display="flex"
                      flexDirection="row"
                      fontSize="0.875rem"
                      gap="13px"
                      hoverColor="#E4E7EC"
                      icon="team"
                      iconMargin={12}
                      iconPosition="leading"
                      justifyContent="start"
                      label="Team Members"
                      lineHeight="2px"
                      size={"sm"}
                      width="100%"
                      background={
                        selectedButton === "Team Members"
                          ? "#E4E7EC"
                          : "#FCFCFD"
                      } // Change background based on selection
                      onClick={() => handleButtonClick("Team Members")} // Set the selected button when clicked
                    />
                  </div>
                </Link> */}
                {/* <div className="!font-medium flex items-center relative py-4">
                  MODULE SETTINGS
                </div> */}
              </>
            )}
            <Link href="/Dashboard/SettingsPage/Account" target="_self">
              <div className=" flex relative">
                <Button
                  alignItems="center"
                  color="#344054"
                  direction="row"
                  display="flex"
                  flexDirection="row"
                  fontSize="0.875rem"
                  gap="13px"
                  hoverColor="#f2f4f7"
                  icon="faUseroutlined"
                  iconMargin={12}
                  iconPosition="leading"
                  justifyContent="start"
                  label="Profile"
                  lineHeight="2px"
                  size={"sm"}
                  width="100%"
                  background={
                    selectedButton === "Profile" ? "#E4E7EC" : "#FCFCFD"
                  } // Change background based on selection
                  onClick={() => handleButtonClick("Profile")} // Set the selected button when clicked
                />
              </div>
            </Link>
          </div>

          <UpgradeToPro />
        </div>
      </SideNavigationBar>
    </div>
  );
}

export default SettingsNavBar;
