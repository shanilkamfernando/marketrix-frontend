import UpgradeToPro from "@/components/Cards/UpgradetoPro/UpdgradetoPro";
import { SideNavigationBar, Button, Toggle } from "@creativehub/marketrix-ui";
import Link from "next/link";
//import Joyride, { STATUS } from "react-joyride";
import React, { useContext, useEffect, useState } from "react";

function TrixyNavBar({ selectedButton, setSelectedButton }) {
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  // const [{ run, steps }, setState] = useState({
  //   run: true,
  //   steps: [
  //     {
  //       content: (
  //         <>
  //           <h2 className="!font-bold">
  //             Welcome to Avatars! <br />
  //             {/* Here's where we track, manage, and improve how we talk to
  //             customers. Let's start the tour. */}
  //           </h2>
  //         </>
  //       ),
  //       locale: {
  //         skip: (
  //           <>
  //             <b>SKIP</b>
  //           </>
  //         ),
  //       },
  //       placement: "center",
  //       target: "body",
  //     },
  //     {
  //       content: (
  //         <>
  //           <h2 className="text-[#667085]">
  //             This is where you can create or change your personal avatar. Your
  //             avatar is like your digital face in the app, so you can make it
  //             look just how you want.
  //           </h2>
  //         </>
  //       ),
  //       placement: "right",
  //       target: "#step-1",
  //       title: "Avatar",
  //     },
  //     {
  //       content: (
  //         <>
  //           <h2 className="text-[#667085]">
  //             Here, you can set up certain actions that make things happen
  //             automatically in the app. It's like creating shortcuts for tasks
  //             you do often.
  //           </h2>
  //         </>
  //       ),
  //       placement: "right",
  //       target: "#step-2",
  //       title: "Triggers",
  //     },
  //   ],
  // });

  // const [third, setthird] = useState(null);
  // useEffect(() => {
  //   setthird(true);
  // }, []);

  return (
    <div>
      {/* {third ? (
        <Joyride
          run={run}
          steps={steps}
          spotlightPadding={2}
          hideCloseButton
          scrollToFirstStep
          showSkipButton
          showProgress={true}
          continuous
          styles={{
            options: {
              primaryColor: "#7F56D9",
              textColor: "#101828",
              zIndex: 1000,
            },
          }}
        />
      ) : null} */}
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
            <div className="text-[#000000] mtx-h6 !font-bold flex gap-2 items-center pb-3">
              <div className="text-[#ffffff] mtx-h6 !font-bold bg-[#7F56D9] py-1 px-2 rounded-md">
                AI
              </div>
              <div>Avatars</div>
            </div>

            <Link href="/Dashboard/Trixy/Avatar" target="_self">
              <div className="flex relative">
                <Button
                  id="step-1"
                  alignItems="center"
                  background={
                    selectedButton === "Avatar" ? "#E4E7EC" : "#FCFCFD"
                  } // Change background based on selection
                  onClick={() => handleButtonClick("Avatar")} // Set the selected button when clicked
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
                  label="Avatar"
                  lineHeight="2px"
                  size="sm"
                  width="100%"
                />
              </div>
            </Link>
            <Link href="/Dashboard/Trixy/Triggers" target="_self">
              <div className="relative">
                <Button
                  id="step-2"
                  alignItems="center"
                  background={
                    selectedButton === "Triggers" ? "#E4E7EC" : "#FCFCFD"
                  } // Change background based on selection
                  onClick={() => handleButtonClick("Triggers")} // Set the selected button when clicked
                  color="#344054"
                  direction="row"
                  display="flex"
                  flexDirection="row"
                  fontSize="0.875rem"
                  gap="13px"
                  hoverColor="#f2f4f7"
                  icon="triggers"
                  iconMargin={12}
                  iconPosition="leading"
                  justifyContent="start"
                  label="Triggers"
                  lineHeight="2px"
                  size="sm"
                  width="100%"
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

export default TrixyNavBar;
