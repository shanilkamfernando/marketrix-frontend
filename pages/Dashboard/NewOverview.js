import React, { useEffect, useState, useRef } from "react";
import { loadState, loadStateSession } from "@/store/localStorage";
import RecordModel from "@/components/Modals/ProfileModal/RecordModel";
import InquiriesApi from "@/pages/api/admin/inquiries";
import { useRouter } from "next/router";
import IconSideNavBar from "@/components/SideNavBar/IconSideNavBar/IconSideNavBar";
import InnerHeader from "@/components/Headers/InnerHeader/InnerHeader";
import OverviewHeaderCard from "@/components/Cards/OverviewHeaderCard/OverviewHeaderCard";
import NewOverviewCard from "@/components/Cards/NewOverviewCard/NewOverviewCard";
import PreVideoCard from "@/components/Cards/PreVideoCard/PreVideoCard";
import VideoCard from "@/components/Cards/VideoCard/VideoCard";
//import Joyride, { STATUS } from "react-joyride";
import VideoModal from "@/components/Modals/LiveSettingsModals/VideoModal";
import LiveTrafficCard from "@/components/Cards/LiveTrafficCard/LiveTrafficCard";
import {
  loadingTriggered,
  selectActionTrigger,
  updateLiveTraffic,
} from "@/store/actionSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import LoggedInUserApi from "../api/admin/loggedInUser";

function NewOverview() {  
  const modalRef = useRef(null);
  const [gridView, setGridView] = useState(true);
  const [tenantName, setTenantName] = useState("Marketrix");
  const [isRecordOpen, setIsRecordOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [mLiveInquiriesCount, setMLiveInquiriesCount] = useState(0);
  const [mLiveConnectsCount, setMLiveConnectsCount] = useState(0);
  const [mLiveVisitorsCount, setMLiveVisitorsCount] = useState(0);
  const [userVideoSrc, setUserVideoSrc] = useState(null);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [currentMonth, setCurrentMonth] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("overview");
  const trigger = useSelector(selectActionTrigger);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleInnerHeaderButtonClick = () => {
    router.push("/Dashboard/MLivePages/LiveTraffic");
  };

  const [connectionStatus, setConnectionStatus] = useState(false);
  const getLiveCounts = async () => {
    const response = await InquiriesApi.getLiveCounts();
    if (response?.data) {
      setMLiveInquiriesCount(response?.data?.liveInquiries);
      setMLiveConnectsCount(response?.data?.liveConnects);
      return response?.data;
    } else {
      return [];
    }
  };

  const closeModal = () => {
    setIsRecordOpen(false);
  };

  const closeVideoModal = () => {
    setIsVideoOpen(false);
  };

  const getUserInfo = async () => {
    dispatch(loadingTriggered(true));
    await LoggedInUserApi.get().then((response) => {
      console.log("getUserInfo", response);
      if (response.status) {
        let userData = response.data;
        setUserVideoSrc(userData.video_url);

        //      setUserData(teamData);
        dispatch(loadingTriggered(false));
      }
    });
  };

  useEffect(() => {
    let tenantName = loadState("tenantName");
    if (tenantName) {
      setTenantName(tenantName);
    }

    const date = new Date();
    const month = date.toLocaleString("default", { month: "long" });
    setCurrentMonth(month);
  }, []);

  // useEffect(() => {
  //   let connectionStatusLocal = loadState("connection_status");
  //   if (connectionStatusLocal) {
  //     setConnectionStatus(connectionStatusLocal);
  //   }else{
  //     setConnectionStatus(false);
  //     alert("Please connect to your domain");
  //   }
  // }, []);

  useEffect(() => {
    getLiveCounts();
    getUserInfo();
  }, []);

  useEffect(() => {
    const data = loadStateSession("liveTraffic") || [];
    // console.log("visitors data", data.length);
    setMLiveVisitorsCount(data.length);
    dispatch(updateLiveTraffic(false));
  }, [trigger.updateLiveTrafficTriggered]);

  return (
    <div className="flex w-full h-screen">
      <div className="w-[5%]">
        <IconSideNavBar
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}  
        />
      </div>
      <div className="w-[95%] overflow-auto scrollbar-hide  ">
        <div className="w-[100%] p-[1rem]" id="">
          <InnerHeader
            mainTitle={tenantName + " Overview"}
            subpara=""
            buttonText="Start MLive"
            buttonIcon="Headphones"
            onClick={handleInnerHeaderButtonClick}
          />
        </div>
        <div className="px-[1rem]">
          <OverviewHeaderCard />
        </div>
        <div className="p-[1rem] grid grid-cols-6 gap-3 ">
          <div className="" id="step-1-1">
            <NewOverviewCard
              inquiryName="MLive Connects"
              iconName="phoneCall"
              inquryAmount={mLiveConnectsCount}
              buttonName="Connect with Live Traffic"
              btnLink={"/Dashboard/MLivePages/LiveTraffic"}
            />
          </div>
          <div className="" id="step-1-2">
            <NewOverviewCard
              inquiryName="MLive Inquiries"
              iconName="inbox"
              inquryAmount={mLiveInquiriesCount}
              buttonName="Connect with Live Inquiries"
              btnLink={"/Dashboard/MLivePages/LiveIncoming"}
            />
          </div>
          <div className="" id="step-1-3">
            <NewOverviewCard
              inquiryName="Current Visitors"
              iconName="user"
              inquryAmount={mLiveVisitorsCount}
              buttonName="Connect with Live Traffic"
              btnLink={"/Dashboard/MLivePages/LiveTraffic"}
            />
          </div>
          <div className=""  id="step-1-4">
            <PreVideoCard
              setIsRecordOpen={setIsRecordOpen}
              userVideoSrc={userVideoSrc}
            />
          </div>
          <div className="grid col-span-2">
            <VideoCard setIsVideoOpen={setIsVideoOpen} />
          </div>
        </div>

        <div className="p-[1rem]">
          <div className="mtx-h6 !font-semibold pb-[0.5rem] text-[#101828]">
            Live Visitors
          </div>
          <div
            className="scroll-smooth  grid gap-y-[0.5rem] overflow-hidden"
            id="step-5"
          >
            <LiveTrafficCard gridView={false} />
          </div>
        </div>
      </div>

      {isRecordOpen && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="p-5 ">
            <RecordModel
              onClose={closeModal}
              setRecordedVideo={setRecordedVideo}
            />

            {/* <AddMember
                  onClose={closeAdd}
                  roles={roles}
                /> */}
          </div>
        </div>
      )}

      {isVideoOpen && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="p-5 ">
            <VideoModal
              onClose={closeVideoModal}
              Height="50vh"
              videoLink={
                "https://player.vimeo.com/video/860045472?h=cbbb12ae29&amp;badge=0&amp;autopause=0&amp;quality_selector=1&amp;player_id=0&amp;app_id=58479"
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default NewOverview;
