import InnerHeader from "@/components/Headers/InnerHeader/InnerHeader";
import React, { useEffect, useState, useRef } from "react";
import IconSideNavBar from "@/components/SideNavBar/IconSideNavBar/IconSideNavBar";
import MM from "@/components/SideNavBar/MMeetNavBar/MMeetNavBar";
import AccountPage from "@/components/AccountPage/AccountPage";
import ButtonPosition from "@/components/Modals/LiveSettingsModals/ButtonPosition";
import SettingsNavBar from "@/components/SideNavBar/SettingsNavBar/SettingsNavBar";
import AddMember from "@/components/Modals/TeamMemberModals/AddMember";
import RecordModel from "@/components/Modals/ProfileModal/RecordModel";
import ModifyModal from "@/components/Modals/LiveSettingsModals/ModifyModal";
import StandardWidgetModal from "@/components/Modals/LiveSettingsModals/StandardWidgetModal";
import WidgetModal from "@/components/Modals/LiveSettingsModals/WidgetModal";
import PreRecordedWidgetModal from "@/components/Modals/LiveSettingsModals/PreRecordedWidgetModal";

function Account() {
  const [selectedButton, setSelectedButton] = useState("Profile");
  const [selectedIcon, setSelectedIcon] = useState("settings");
  const [isRecordOpen, setIsRecordOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [isModifyModalOpen, setIsUpdateModifyModalOpen] = useState(false);
  const [isWidgetPopup, setIsWidgetPopup] = useState(false);
  const [isStandardWidget, setIsStandardWidget] = useState(false);
  const [isPreRecordedWidget, setIsPreRecordedWidget] = useState(false);
  const [activeUserVideoUrl, setActiveUserVideoUrl] = useState(null);
  const [widgetType, setWidgetType] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);
  const [widgetText, setWidgetText] = useState(null);
  const modalRef = useRef(null);

  const closeModal = () => {
    setIsRecordOpen(false);
  };
  const closeAdd = () => {
    setIsAddMemberOpen(false);
  };
  const closeButton = () => {
    setIsUpdateModifyModalOpen(false);
  };
  const closeButtonRecordOpen = () => {
    setIsRecordOpen(true);
    setIsUpdateModifyModalOpen(false);
  };
  const closeWidget = () => {
    setIsWidgetPopup(false);
  };
  const closeStandardWidget = () => {
    setIsStandardWidget(false);
  };
  const closePreRecordedWidget = () => {
    setIsPreRecordedWidget(false);
  };

  // const addMember = async (data) => {
  //   console.log("Adding member", data);
  //   dispatch(loadingTriggered(true));
  //   await UserApi.create_user(data).then((response) => {
  //     if (response.status) {
  //       console.log("Added user", response.data);
  //       dispatch(loadingTriggered(false));
  //       closeAdd();
  //       getAllUsers();
  //     } else {
  //       dispatch(loadingTriggered(false));
  //       console.log("Error adding user", response.data);
  //     }
  //   });
  // };
  const checkVideoSrc = () => {
    console.log("Video src", recordedVideo);
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-[5%] bg-slate-800">
        <IconSideNavBar
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
        />
      </div>
      <div className="w-[15%]">
        <SettingsNavBar
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
        />
      </div>
      <div className="w-[80%] overflow-auto scrollbar-hide  py-[1rem] px-[4rem] flex">
        <AccountPage
          setIsRecordOpen={setIsRecordOpen}
          recordedVideo={recordedVideo}
          setIsUpdateModifyModalOpen={setIsUpdateModifyModalOpen}
        />
        {/* <button onClick={checkVideoSrc}> TEST VIDEO SRC </button> */}
      </div>

      {isRecordOpen && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="p-5 ">
            <RecordModel
              onClose={closeModal}
              setRecordedVideo={setRecordedVideo}
              isRecordOpen={isRecordOpen}
            />

            {/* <AddMember
                  onClose={closeAdd}
                  roles={roles}
                /> */}
          </div>
        </div>
      )}
      {isWidgetPopup && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
          // ref={modalRef}
        >
          <div className="p-5 ">
            <WidgetModal
              onClose={closeWidget}
              setIsStandardWidget={setIsStandardWidget}
              setIsPreRecordedWidget={setIsPreRecordedWidget}
              activeUserVideoUrl={activeUserVideoUrl}
              widgetType={widgetType}
              logoUrl={logoUrl}
              widgetText={widgetText}
            />
          </div>
        </div>
      )}
      {isPreRecordedWidget && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
          ref={modalRef}
        >
          <div className="p-5 ">
            <PreRecordedWidgetModal
              onClose={closePreRecordedWidget}
              userVideos={userVideos}
              tenant={tenant}
            />
          </div>
        </div>
      )}
      {isStandardWidget && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
          ref={modalRef}
        >
          <div className="p-5 ">
            <StandardWidgetModal
              onClose={closeStandardWidget}
              logoUrl={logoUrl}
              widgetText={widgetText}
              tenantId={tenant?.id}
            />
          </div>
        </div>
      )}

      {isModifyModalOpen && (
        <div
          className="absolute top-[12.5rem] right-[4rem] flex justify-center items-center"
          ref={modalRef}
        >
          <div className="p-5 ">
            <ModifyModal
              onClose={closeButton}
              setIsRecordOpen={closeButtonRecordOpen}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
