"use client";
import {
  Avatar,
  Button,
  MouseOver,
  SideNavigationBar,
} from "@creativehub/marketrix-ui";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Joyride, { STATUS } from "react-joyride";
import ProfileModal from "@/components/Modals/ProfileModal/ProfileModal";
import { loadState } from "@/store/localStorage";
import { setProductTourStatus } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

function IconSideNavBar({ selectedIcon, setSelectedIcon }) {
  // const backgroundColor = selectedIcon === "Avatars" ? "#E4E7EC" : "#F2F4F7";

  const loggedInUserImage = () => {
    let userImage = loadState("image_url");
    //console.log("userImage", userImage);
    if (userImage) {
      // console.log("YES", userImage);
      return userImage;
    } else {
      // console.log("NO", userImage);
      return "./../../../images/profile3.png";
    }
  };

  const handleButtonClick = (buttonName) => {
    setSelectedIcon(buttonName);
    //ERROR HERE
  };

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const modalContainerRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleAvatarClick = () => {
    setIsProfileModalOpen(true);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        modalContainerRef.current &&
        !modalContainerRef.current.contains(event.target)
      ) {
        setIsProfileModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // const [{ run, steps }, setState] = useState({
  //   run: true,
  //   steps: [
  //     {
  //       content: (
  //         <>
  //           <h2 className="!font-bold"> Welcome to Marketrix Product Tour</h2>
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
  //             Home is your Marketrix home 😉 where you can see a snapshot of
  //             everything
  //           </h2>
  //         </>
  //       ),
  //       placement: "right",
  //       target: "#step-1",
  //       title: "Home",
  //     },
  //     {
  //       content: (
  //         <>
  //           <h2 className="text-[#667085]">STEP 1 - 1</h2>
  //         </>
  //       ),
  //       placement: "right",
  //       target: "#step-1-1", // Use the parent div ID as the target
  //       title: "INSIDE HOME",
  //     },

  //     {
  //       content: (
  //         <>
  //           <h2 className="text-[#667085]">STEP 1 - 2</h2>
  //         </>
  //       ),
  //       placement: "right",
  //       target: "#step-1-2",
  //       title: "INSIDE HOME",
  //     },

  //     {
  //       content: (
  //         <>
  //           <h2 className="text-[#667085]">STEP 1 - 3</h2>
  //         </>
  //       ),
  //       placement: "right",
  //       target: "#step-1-3",
  //       title: "INSIDE HOME",
  //     },

  //     {
  //       content: (
  //         <>
  //           <h2 className="text-[#667085]">STEP 1 - 4</h2>
  //         </>
  //       ),
  //       placement: "right",
  //       target: "#step-1-4",
  //       title: "INSIDE HOME",
  //     },

  //     {
  //       content: (
  //         <>
  //           <h2 className="text-[#667085]">
  //             Connect with your website visitors realtime with Interactive Video
  //             Co-Browsing and Spot Meetings on the website itself
  //           </h2>
  //         </>
  //       ),
  //       placement: "right",
  //       target: "#step-2",
  //       title: "MLive",
  //     },
   
  //     {
  //       content: (
  //         <>
  //           <h2 className="text-[#667085]">
  //             Create an AI Sales Avatar to speak to your site visitors
  //           </h2>
  //         </>
  //       ),
  //       placement: "right",
  //       target: "#step-3",
  //       title: "Avatars",
  //     },
  //     {
  //       content: (
  //         <>
  //           <h2 className="text-[#667085]">This is your Analytics 🙂</h2>
  //         </>
  //       ),
  //       placement: "right",
  //       target: "#step-4",
  //       title: "Analytics",
  //     },
  //     {
  //       content: (
  //         <>
  //           <h2 className="text-[#667085]">
  //             Manage your Marketrix superheroes here
  //           </h2>
  //         </>
  //       ),
  //       placement: "right",
  //       target: "#step-5",
  //       title: "Team",
  //     },
  //     {
  //       content: (
  //         <>
  //           <h2 className="text-[#667085]">
  //             Recruit a Marketrix Agent to supercharge your sales team
  //           </h2>
  //         </>
  //       ),
  //       placement: "right",
  //       target: "#step-6",
  //       title: "Agents",
  //     },

  //     {
  //       content: (
  //         <>
  //           <h2 className="text-[#667085]">
  //             This is your Marketrix Settings 🙂
  //           </h2>
  //         </>
  //       ),
  //       placement: "right",
  //       target: "#step-7",
  //       title: "Settings",
  //     },
  //     {
  //       content: (
  //         <>
  //           <h2 className="text-[#667085]">Your profile can be managed here</h2>
  //         </>
  //       ),
  //       placement: "top",
  //       target: "#step-8",
  //       title: "Profile",
  //     },
  //   ],
  // });

  // const [first, setfirst] = useState(null);
  const triggerProductTour = () => {
    dispatch(setProductTourStatus(true));
    // setfirst(true);
    router.push("/Dashboard/NewOverview");
    // alert("TRIGGERED");
  };

  // const handleTourEnd = (data) => {
  //   const { status } = data;

  //   // console.log("handleTourEnd! status!", status);
  //   if (status === STATUS.FINISHED) {
  //     console.log("handleTourEnd! The tour is complete!");
  //     setfirst(false);
  //     dispatch(setProductTourStatus(false));
  //   }

  //   if (status === STATUS.SKIPPED) {
  //     console.log("handleTourEnd! The tour is skipped!");
  //     setfirst(false);
  //     dispatch(setProductTourStatus(false));
  //   }
  // };

  // useEffect(() => {
  //   let productTourStatus = loadState("product_tour_status");
  //   // let productTourStatus = true;
  //   console.log("productTourStatus", productTourStatus);
  //   if (productTourStatus) {
  //     setfirst(true);
  //   } else {
  //     setfirst(false);
  //   }
  //   // setfirst(true);
  // }, []);

  return (
    <div>
      {/* {first ? (
        <Joyride
          run={run}
          steps={steps}
          hideCloseButton
          scrollToFirstStep
          spotlightPadding={2}
          showSkipButton
          showProgress={true}
          continuous
          callback={handleTourEnd}
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
        alignItems="center"
        background="#F2F4F7"
        display="flex"
        flexDirection="column"
        height="100vh"
        justifyContent="center"
        width="100%"
      >
        <div className=" flex flex-col h-[100vh] py-[1rem] ">
          <div className="grid gap-y-[0.5rem] ">
            <Link href="/Dashboard/NewOverview" target="">
              <div className="flex justify-center">
                <Image
                  src="/images/mainLogoBlack.svg"
                  alt="main logo"
                  width={40}
                  height={40}
                />
              </div>
            </Link>

            <div className=" grid gap-y-1 h-full">
              <Link href="/Dashboard/NewOverview" target="">
                <Button
                  id="step-1"
                  width="100%"
                  alignItems="center"
                  border="0px solid"
                  borderColor="transparent"
                  color="#344054"
                  direction="column"
                  disabledColor="#E9D7FE"
                  display="flex"
                  flexDirection="column"
                  focusColor="#E4E7EC"
                  fontSize="12px"
                  hoverColor="#D0D5DD"
                  icon="Home"
                  iconPosition="leading"
                  justifyContent="center"
                  label="Home"
                  paddingBottom={8}
                  paddingLeft={8}
                  paddingRight={8}
                  paddingTop={8}
                  size="custom"
                  background={
                    selectedIcon === "overview" ? "#E4E7EC" : "#F2F4F7"
                  } // Change background based on selection
                  onClick={() => handleButtonClick("overview")} // Set the selected button when clicked
                />
              </Link>

              <Link href="/Dashboard/MLivePages/LiveTraffic" target="">
                <Button
                  id="step-2"
                  width="100%"
                  alignItems="center"
                  border="0px solid"
                  borderColor="transparen"
                  color="#344054"
                  direction="column"
                  disabledColor="#E9D7FE"
                  display="flex"
                  flexDirection="column"
                  focusColor="#E4E7EC"
                  fontSize="12px"
                  hoverColor="#D0D5DD"
                  icon="Headphones"
                  iconPosition="leading"
                  justifyContent="center"
                  label="MLive"
                  paddingBottom={8}
                  paddingLeft={8}
                  paddingRight={8}
                  paddingTop={8}
                  size="custom"
                  background={
                    selectedIcon === "incoming" ? "#E4E7EC" : "#F2F4F7"
                  } // Change background based on selection
                  onClick={() => handleButtonClick("incoming")} // Set the selected button when clicked
                />
              </Link>

              <Link href="/Dashboard/Trixy/Avatar" target="">
                <button
                  className="text-[12px] w-full items-center border-none text-[#344054] flex flex-col  ${isSelected ? 'selected' : 'not-selected'} justify-center rounded-lg p-2 "
                  id="step-3"
                  style={{
                    backgroundColor:
                      selectedIcon === "Avatars" ? "#E4E7EC" : "#F2F4F7",
                  }}
                  onClick={() => handleButtonClick("Avatars")}
                >
                  <Image
                    src={"/images/dashboard/SideBar/avatarIcon.svg"}
                    width={24}
                    height={24}
                    alt="avatar icon"
                  />
                  Avatars
                </button>
                {/* <Button
                  id="step-3"
                  width="100%"
                  alignItems="center"
                  border="0px solid"
                  borderColor="transparent"
                  color="#344054"
                  direction="column"
                  disabledColor="#E9D7FE"
                  display="flex"
                  flexDirection="column"
                  focusColor="#E4E7EC"
                  fontSize="12px"
                  hoverColor="#D0D5DD"
                  icon="avatar"
                  iconPosition="leading"
                  justifyContent="center"
                  label="Avatars"
                  paddingBottom={8}
                  paddingLeft={8}
                  paddingRight={8}
                  paddingTop={8}
                  size="custom"
                  background={
                    selectedIcon === "Avatars" ? "#E4E7EC" : "#F2F4F7"
                  } // Change background based on selection
                  onClick={() => handleButtonClick("Avatars")} // Set the selected button when clicked
                /> */}
              </Link>

              <Link href="/Dashboard/Analytics/Analytics" target="">
                <Button
                  id="step-4"
                  width="100%"
                  alignItems="center"
                  border="0px solid"
                  borderColor="transparen"
                  color="#344054"
                  direction="column"
                  disabledColor="#E9D7FE"
                  display="flex"
                  flexDirection="column"
                  focusColor="#E4E7EC"
                  fontSize="12px"
                  hoverColor="#D0D5DD"
                  icon="chartBar"
                  iconPosition="leading"
                  justifyContent="center"
                  label="Analytics"
                  paddingBottom={8}
                  paddingLeft={8}
                  paddingRight={8}
                  paddingTop={8}
                  size="custom"
                  background={
                    selectedIcon === "Analytics" ? "#E4E7EC" : "#F2F4F7"
                  } // Change background based on selection
                  onClick={() => handleButtonClick("Analytics")} // Set the selected button when clicked
                />
              </Link>
              <Link href="/Dashboard/TeamPage/Team" target="">
                <Button
                  id="step-5"
                  width="100%"
                  alignItems="center"
                  border="0px solid"
                  borderColor="transparen"
                  color="#344054"
                  direction="column"
                  disabledColor="#E9D7FE"
                  display="flex"
                  flexDirection="column"
                  focusColor="#E4E7EC"
                  fontSize="12px"
                  hoverColor="#D0D5DD"
                  icon="team"
                  iconPosition="leading"
                  justifyContent="center"
                  label="Team"
                  paddingBottom={8}
                  paddingLeft={8}
                  paddingRight={8}
                  paddingTop={8}
                  size="custom"
                  background={selectedIcon === "Team" ? "#E4E7EC" : "#F2F4F7"} // Change background based on selection
                  onClick={() => handleButtonClick("Team")} // Set the selected button when clicked
                />
              </Link>

              <Link href="/Dashboard/MLivePages/LiveSellers" target="">
                <Button
                  id="step-6"
                  width="100%"
                  alignItems="center"
                  border="0px solid"
                  borderColor="transparen"
                  color="#344054"
                  direction="column"
                  disabledColor="#E9D7FE"
                  display="flex"
                  flexDirection="column"
                  focusColor="#E4E7EC"
                  fontSize="12px"
                  hoverColor="#D0D5DD"
                  icon="agent"
                  iconPosition="leading"
                  justifyContent="center"
                  label="Agents"
                  paddingBottom={8}
                  paddingLeft={8}
                  paddingRight={8}
                  paddingTop={8}
                  size="custom"
                  background={selectedIcon === "Agents" ? "#E4E7EC" : "#F2F4F7"} // Change background based on selection
                  onClick={() => handleButtonClick("Agents")} // Set the selected button when clicked
                />
              </Link>

              {/* <Link href="/Dashboard/MmeetPages/Pitches" target="">
                <Button
                  width="100%"
                  alignItems="center"
                  border="0px solid"
                  borderColor="transparen"
                  color="#344054"
                  direction="column"
                  disabledColor="#E9D7FE"
                  display="flex"
                  flexDirection="column"
                  focusColor="#E4E7EC"
                  fontSize="12px"
                  hoverColor="#D0D5DD"
                  icon="Video camera"
                  iconPosition="leading"
                  justifyContent="center"
                  label="Meet"
                  paddingBottom={8}
                  paddingLeft={8}
                  paddingRight={8}
                  paddingTop={8}
                  size="custom"
                  background={selectedIcon === "pitch" ? "#E4E7EC" : "#F2F4F7"} // Change background based on selection
                  onClick={() => handleButtonClick("pitch")} // Set the selected button when clicked
                />
              </Link> */}

              {/* <Link href="/Dashboard/ContactPage/Contacts" target="">
                <Button
                  width="100%"
                  alignItems="center"
                  border="0px solid"
                  borderColor="transparen"
                  color="#344054"
                  direction="column"
                  disabledColor="#E9D7FE"
                  display="flex"
                  flexDirection="column"
                  focusColor="#E4E7EC"
                  fontSize="12px"
                  hoverColor="#D0D5DD"
                  icon="Contacts"
                  iconPosition="leading"
                  justifyContent="center"
                  label="Contact"
                  paddingBottom={8}
                  paddingLeft={8}
                  paddingRight={8}
                  paddingTop={8}
                  size="custom"
                  background={
                    selectedIcon === "contact" ? "#E4E7EC" : "#F2F4F7"
                  } // Change background based on selection
                  onClick={() => handleButtonClick("contact")} // Set the selected button when clicked
                />
              </Link> */}
            </div>
          </div>
          <div className="flex-grow"></div>
          <div className="grid gap-y-[1rem]">
            <Link href="/Dashboard/SettingsPage/LiveSettings" target="">
              <Button
                id="step-7"
                alignItems="center"
                border="0px solid"
                borderColor="transparen"
                color="#344054"
                direction="column"
                disabledColor="#E9D7FE"
                display="flex"
                flexDirection="column"
                focusColor="#E4E7EC"
                fontSize="12px"
                hoverColor="#D0D5DD"
                icon="Settings"
                iconPosition="leading"
                justifyContent="center"
                label="Settings"
                paddingBottom={8}
                paddingLeft={8}
                paddingRight={8}
                paddingTop={8}
                size="custom"
                background={selectedIcon === "settings" ? "#E4E7EC" : "#F2F4F7"} // Change background based on selection
                onClick={() => handleButtonClick("settings")} // Set the selected button when clicked
              />
            </Link>

            <div className="flex justify-center">
              <div
                onClick={handleAvatarClick}
                className="cursor-pointer"
                id="step-8"
              >
                <Avatar
                  border="none"
                  borderRadius="100%"
                  height="40px"
                  image={loggedInUserImage()}
                  width="40px"
                />
              </div>
            </div>

            {/* <div
              onClick={handleAvatarClick}
              className="cursor-pointer"
              id="step-1-1"
            >
              STEP 1-1
            </div> */}

            {isProfileModalOpen && (
              <div
                className="fixed bottom-0 left-14  w-64 z-10 p-4"
                ref={modalContainerRef}
              >
                <ProfileModal
                  onClose={() => setIsProfileModalOpen(false)}
                  startTour={triggerProductTour}
                />
              </div>
            )}
          </div>
        </div>
      </SideNavigationBar>
    </div>
  );
}

export default IconSideNavBar;
