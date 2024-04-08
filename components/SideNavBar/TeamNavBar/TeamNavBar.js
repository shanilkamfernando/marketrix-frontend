import React, { useState, useEffect } from "react";
import { SideNavigationBar, Button } from "@creativehub/marketrix-ui";
import UpgradeToPro from "@/components/Cards/UpgradetoPro/UpdgradetoPro";
import Link from "next/link";
//import Joyride, { STATUS } from "react-joyride";

function TeamNavBar({ selectedButton, setSelectedButton }) {
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
  //             Welcome to Marketrix Team! <br />
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
  //             Click on "Team" to see your team members, add new ones, give them
  //             roles, or check how the team is doing. It's your main spot for
  //             team info.
  //           </h2>
  //         </>
  //       ),
  //       placement: "right",
  //       target: "#step-1",
  //       title: "Team",
  //     },
  //     {
  //       content: (
  //         <>
  //           <h2 className="text-[#667085]">
  //             The "Hiring Pipeline" lets you see where job applicants are in the
  //             hiring process, from just applied to almost hired, keeping
  //             everything clear and easy to follow.
  //           </h2>
  //         </>
  //       ),
  //       placement: "right",
  //       target: "#step-2",
  //       title: "Hiring Pipline",
  //     },
  //   ],
  // });

  // const [eightth, seteightth] = useState(null);
  // useEffect(() => {
  //   seteightth(true);
  // }, []);

  return (
    <div>
      {/* {eightth ? (
        <Joyride
          run={run}
          steps={steps}
          hideCloseButton
          spotlightPadding={2}
          scrollToFirstStep
          spotlightClicks={false}
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
            <div className="text-[#000000] mtx-h6 !font-bold">
              {/* Marketrix Meet */}
              Team
            </div>

            <Link href="/Dashboard/TeamPage/Team" target="_self">
              <div className=" flex relative">
                <Button
                  id="step-1"
                  alignItems="center"
                  background={
                    selectedButton === "TeamPage" ? "#E4E7EC" : "#FCFCFD"
                  } // Change background based on selection
                  onClick={() => handleButtonClick("TeamPage")} // Set the selected button when clicked
                  color="#344054"
                  direction="row"
                  display="flex"
                  flexDirection="row"
                  fontSize="0.875rem"
                  gap="13px"
                  hoverColor="#f2f4f7"
                  icon="team"
                  iconMargin={12}
                  iconPosition="leading"
                  justifyContent="start"
                  label="Team"
                  lineHeight="2px"
                  size="sm"
                  width="100%"
                />
              </div>
            </Link>

            <Link href="/Dashboard/TeamPage/HiringPage" target="_self">
              <div className=" flex relative">
                <Button
                  id="step-2"
                  alignItems="center"
                  background={
                    selectedButton === "HiringPipeline" ? "#E4E7EC" : "#FCFCFD"
                  } // Change background based on selection
                  onClick={() => handleButtonClick("HiringPipeline")} // Set the selected button when clicked
                  color="#344054"
                  direction="row"
                  display="flex"
                  flexDirection="row"
                  fontSize="0.875rem"
                  gap="13px"
                  hoverColor="#f2f4f7"
                  icon="suitcase"
                  iconMargin={12}
                  iconPosition="leading"
                  justifyContent="start"
                  label="Hiring Pipeline"
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

export default TeamNavBar;
