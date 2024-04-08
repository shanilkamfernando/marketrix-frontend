import IconSideNavBar from "@/components/SideNavBar/IconSideNavBar/IconSideNavBar";
import { AuthContext } from "@/auth/authContext";
import React, { useEffect, useState, useRef, use, useContext } from "react";
import MLiveIncomingNavBar from "@/components/SideNavBar/MLiveIncomingNavBar/MLiveIncomingNavBar";
import TwoButtonIconWithTitle from "@/components/Buttons/TwoButtonIconWithTitle/TwoButtonIconWithTitle"; 
import Image from "next/image";
import SessionReplayCard from "@/components/Cards/SessionReplayCard/SessionReplayCard";
import SessionReplayModal from "@/components/Modals/SessionReplayModal";
import InquiriesApi from "@/pages/api/admin/inquiries";
import { useDispatch } from "react-redux";
import { loadingTriggered } from "@/store/actionSlice";
import { getCompletedInquiriesCall } from "@/components/Cards/IncomingCard/apiCalls";
import VideoModalSessionReplay from "@/components/Modals/LiveSettingsModals/VideoModalSessionReplay";

function SessionReplay({ name, email }) {
  const authContext = useContext(AuthContext);
  const { isLoggedIn, domainExist } = authContext;
  const [agents, setAgents] = useState([]);
  const [selectedButton, setSelectedButton] = useState("SessionReplay");
  const [selectedIcon, setSelectedIcon] = useState("SessionReplay");
  const [gridView, setGridView] = useState(false);
  const [openVideo, setIsOpenVideo] = useState(false);
  const [sessionRecordings, setSessionRecordings] = useState([]);
  const [openedVideo, setOpenedVideo] = useState("");
  const [selectedSession, setSelectedSession] = useState(null);

  const [tableData, setTableData] = useState([]);

  const dispatch = useDispatch();
  const handleGridViewChange = (value) => {
    if (value === true) {
      setGridView(true);
    } else {
      setGridView(false);
    }
  };

  const handleOpenVideo = (session) => {
    console.log("handleOpenVideo", session?.meeting_id);
    setSelectedSession(session);
    getSessionRecoring(session?.meeting_id); // ACTIVATE IF ERROR
    //  setIsOpenVideo(true);
    // setOpenedVideo(session?.sessionUrl);
  };
  // ACTIVATE IF ERROR
  const getSessionRecoring = async (meetingId) => {
    dispatch(loadingTriggered(true));
    const response = await InquiriesApi.getSessionRecording(meetingId);

    if (response?.data) {
      if (response?.data?.data?.length > 0) {
        const videoData = response?.data?.data?.[0];
        if (videoData?.file) {
          const file = videoData?.file;
          console.log("file URL", file?.fileUrl);
          dispatch(loadingTriggered(false));
          setIsOpenVideo(true);
          setOpenedVideo(file?.fileUrl);
        } else {
          dispatch(loadingTriggered(false));
          alert("No file found");
        }
      } else {
        dispatch(loadingTriggered(false));
        alert("No session recording data found");
      }
    } else {
      dispatch(loadingTriggered(false));
      alert("No recording found");
    }
  };
  const getCompletedInquiries = async () => {
    dispatch(loadingTriggered(true));
    let inquiries = await getCompletedInquiriesCall();
    dispatch(loadingTriggered(false));
    setTableData(inquiries);
  };

  const getRecordings = async () => {
    dispatch(loadingTriggered(true));
    const response = await InquiriesApi.getAllSessionRecordings();
    dispatch(loadingTriggered(false));

    if (response?.data) {
      setTableData(response?.data); // HAVE TO REMOVE ONE DATA
    } else {
      setTableData([]);
    }
  };
  const onClose = () => {
    setIsOpenVideo(false);
  };

  useEffect(() => {
    // console.log("getRecordings");
    //  getRecordings();
    getCompletedInquiries(); // ACTIVATE IF ERROR
  }, []);
  return (
    <div>
      {isLoggedIn && (
        <>
          <div className="flex w-full h-screen">
            <div className="w-[5%]">
              <IconSideNavBar
                selectedIcon={selectedIcon}
                setSelectedIcon={setSelectedIcon}
              />
            </div>
            <div className="w-[15%]">
              <MLiveIncomingNavBar
                selectedButton={selectedButton}
                setSelectedButton={setSelectedButton}
              />
            </div>
            <div className="w-[80%] overflow-auto scrollbar-hide ">
              <div>
                <div className=" ">
                  <div className="">
                    <TwoButtonIconWithTitle
                      headerTitle={"Session Replay"}
                      headerParagraph={"Recordings of past sessions"}
                      gridViewChange={handleGridViewChange}
                    />
                  </div>
                </div>

                <div className="relative grid grid-cols-3 gap-2 p-[1rem] ">
                  <SessionReplayCard
                    // setIsOpenVideo={setIsOpenVideo}
                    sessionRecordings={tableData}
                    setOpenedVideo={(e) => handleOpenVideo(e)}
                  />
                </div>
              </div>
            </div>

            {openVideo && (
              <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                <div className="p-5 "> 
                  <VideoModalSessionReplay
                    onClose={onClose}
                    Height="50vh"
                    videoLink={openedVideo}
                    selectedSession={selectedSession}
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default SessionReplay;
