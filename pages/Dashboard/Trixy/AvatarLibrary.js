// import React from 'react'

// function AvatarLibrary() {
//   return (
//     <div>AvatarLibrary</div>
//   )
// }

// export default AvatarLibrary

import React, { useEffect, useContext, useState } from "react";

//COMPONENTS
import IconSideNavBar from "@/components/SideNavBar/IconSideNavBar/IconSideNavBar";
import NotAvailble from "../../../components/NotAvailableOverlay/NotAvailable.js";

import { AuthContext } from "@/auth/authContext";
import TrixyNavBar from "@/components/SideNavBar/TrixyNavBar/TrixyNavBar.js";
import AvatarPage from "@/components/AvatarPage/AvatarPage.js";
import AvatarLibraryPage from "@/components/AvatarPage/AvatarLibraryPage.js";
import { selectAvatarState } from "@/store/avatarSlice";
import { useSelector } from "react-redux";
function AvatarLibrary() {
  const [selectedIcon, setSelectedIcon] = useState("Avatars");
  const [screenStatus, setScreenStatus] = useState(true);

  const avatar = useSelector(selectAvatarState);
  useEffect(() => {
    console.log("avatar", avatar);
    const handleKeyPress = (event) => {
      // Check if the key pressed is the "Enter" key (key code 13)
      if (event.keyCode === 88) {
        setScreenStatus(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
  }, []);

  const [selectedButton, setSelectedButton] = useState("Avatar");

  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null; // Or show some loading/error message when the context is not available yet.
  }

  const { proStatus, isLoggedIn } = authContext;
  return (
    <>
      {isLoggedIn && (
        <div className="flex w-full h-screen">
          {/* <NotAvailble
            loading={screenStatus}
            messageOveraly="Coming soon"
            position="left-[20%] w-[80%] bg-gray-200"
          /> */}
          {/* {!proStatus && (
        <>
          <NotAvailble loading={screenStatus} messageOveraly="Coming soon"  position="left-[20%] w-[80%] bg-gray-200" />
        </>
      )} */}

          <div className="w-[5%] bg-slate-800">
            <IconSideNavBar
              selectedIcon={selectedIcon}
              setSelectedIcon={setSelectedIcon}
            />
          </div>

          <div className="w-[15%]">
            <TrixyNavBar
              selectedButton={selectedButton}
              setSelectedButton={setSelectedButton}
            />
          </div>
          <div className="w-[80%] overflow-auto scrollbar-hide  ">
            <div className="grid grid-cols-1 overflow-y-auto h-[100vh] ">
              <div className=" flex justify-center py-[1rem] ">
                <div className="xl:w-[65%] w-[50%]">
                  <AvatarLibraryPage savedAvatar={avatar} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AvatarLibrary;
