import React, { useEffect, useContext, useState } from "react";

import { AiOutlineVideoCamera } from "react-icons/ai";
import Image from "next/image";
import { Button } from "@creativehub/marketrix-ui";

//COMPONENTS
import InnerHeader from "@/components/Headers/InnerHeader/InnerHeader";
import IconSideNavBar from "@/components/SideNavBar/IconSideNavBar/IconSideNavBar";
import MMeetNavBar from "@/components/SideNavBar/MMeetNavBar/MMeetNavBar";
import NewPitchModal from "@/components/Modals/PitchModal/NewPitchesModal";
import PitchCard from "@/components/Cards/PitchCard/PitchCard";
import RightNavPitchCard from "@/components/RightNavBar/RightNavPitchCard/RightNavPitchCard";
import FeaturedIcon from "@/components/IconStyle/FeaturedIcon/FeaturedIcon";
import NotAvailble from "@/components/NotAvailableOverlay/NotAvailable";
import SchedulePitchModal from "@/components/Modals/SchedulePitchModal/SchedulePitchModal";

import { AuthContext } from "@/auth/authContext";

function Pitches() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("pitch");
  const [screenStatus, setScreenStatus] = useState(true);
  const toggleModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [selectedButton, setSelectedButton] = useState("Pitches");
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const schedulePitch = () => {
    setIsScheduleOpen(true);
  };

  const closeSchedule = () => {
    setIsScheduleOpen(false);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
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
  const { isAdmin, proStatus } = authContext;
  return (
    <div className="flex w-full h-screen">
      <NotAvailble
        loading={screenStatus}
        messageOveraly="Coming soon"
        position="left-[20%] w-[80%] bg-gray-200"
      />
      <div className="w-[5%]">
        <IconSideNavBar
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
        />
      </div>
      <div className="w-[15%]" onClick={closeModal}>
        <MMeetNavBar
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
        />
      </div>

      <div className="w-[80%] overflow-auto scrollbar-hide">
        <div className=" w-[100%] p-[1rem]">
          <InnerHeader
            mainTitle="My Pitches"
            subpara=""
            buttonText="New Pitch"
            buttonIcon={"VideoCamPlus"}
            onClick={toggleModal}
          />
        </div>
        <div className="grid grid-cols-12 relative m-3 pb-5 h-[90vh]">
          {/* the commented section we should implement it if there are no any ppitches to display */}

          {/* <div className="w-full h-[90vh] col-span-12 ">
            <div className="flex justify-center items-center h-[100%]  rounded-lg border ">
              <div className=" flex jus items-center flex-col ">
                <FeaturedIcon imageIcon={"/images/meet/video.svg"}/>
                <div className="pt-2 mtx-subtitle1 !font-semibold text-[#101828]">
                  No meetings found
                </div>
                <div className="w-[60%] text-center text-[#667085] mtx-body2 ">
                  Your search “Landing page design” did not match any projects.
                  Please try again.
                </div>
                <div className="pt-6">
                  <Button
                    alignItems="center"
                    background="#ffffff"
                    border="1px solid"
                    borderColor="#D0D5DD"
                    color="#344054"
                    fontSize="14px"
                    direction="row"
                    display="flex"
                    gap="0.5rem"
                    icon="Video camera"
                    flexDirection="row"
                    justifyContent="center"
                    label="Start Pitch"
                    size="sm"
                    lineHeight="20px"
                    hoverColor="#F9F5FF"
                  />
                </div>
              </div>
            </div>
          </div> */}

          {/* when the meetings are displayed */}
          <div className="2xl:col-span-9 col-span-8 overflow-y-auto ">
            <div className="w-[100%]">
              <div className=" h-[25rem] overflow-y-scroll-hidden">
                <div
                  className="overflow-y-scroll-hidden grid gap-y-[0.5rem]"
                  onClick={closeModal}
                >
                  <PitchCard />
                </div>
              </div>
            </div>
          </div>

          <div
            className="2xl:col-span-3 col-span-4 px-[1rem] overflow-auto scrollbar-hide"
            onClick={closeModal}
          >
            <div className="overflow-y-scroll-hidden">
              <RightNavPitchCard
                PitchTitle="Project Phoenix: Kickoff Session"
                PitchDescription="providing innovative and customer-focused solutions, 
           and has invested in technology to enhance its digital banking capabilities."
              />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="absolute top-[4rem] right-[1rem]">
          <NewPitchModal onClose={toggleModal} schedlueClick={schedulePitch} />
        </div>
      )}

      {isScheduleOpen && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="p-5">
            <SchedulePitchModal onClose={closeSchedule} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Pitches;
