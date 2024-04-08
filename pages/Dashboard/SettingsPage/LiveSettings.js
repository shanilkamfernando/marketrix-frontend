import React, { useEffect, useState, useRef } from "react";
import IconSideNavBar from "@/components/SideNavBar/IconSideNavBar/IconSideNavBar";
import MM from "@/components/SideNavBar/MMeetNavBar/MMeetNavBar";
import LiveSettingsPage from "@/components/LiveSttingsPage/LiveSettingsPage";
import SettingsNavBar from "@/components/SideNavBar/SettingsNavBar/SettingsNavBar";
import UpdateUrl from "@/components/Modals/LiveSettingsModals/UpdateUrl";
import InquiryType from "@/components/Modals/LiveSettingsModals/InquiryType";
import ButtonPosition from "@/components/Modals/LiveSettingsModals/ButtonPosition";
import PopUpDelay from "@/components/Modals/LiveSettingsModals/PopUpDelay";
import MliveForm from "@/components/Modals/LiveSettingsModals/MliveForm";
import CustomizeDelay from "@/components/Modals/LiveSettingsModals/CustomizeDelay";
import NewInquiry from "@/components/Modals/LiveSettingsModals/NewInquiry";
import WidgetModal from "@/components/Modals/LiveSettingsModals/WidgetModal";
import StandardWidgetModal from "@/components/Modals/LiveSettingsModals/StandardWidgetModal";
import PreRecordedWidgetModal from "@/components/Modals/LiveSettingsModals/PreRecordedWidgetModal";

import UsersApi from "@/pages/api/admin/users";
import Tenant from "@/pages/api/admin/tenants";
import {
  apiCallTriggered,
  selectActionTrigger,
  liveConnectTriggered,
} from "@/store/actionSlice";
import { loadingTriggered } from "@/store/actionSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function LiveSettings() {
  const [selectedButton, setSelectedButton] = useState("Widget Settings");
  const [selectedIcon, setSelectedIcon] = useState("settings");
  const [isUpdateUrlOpen, setIsUpdateUrlOpen] = useState(false);
  const [isUpdateInquiryOpen, setIsUpdateInquiryOpen] = useState(false);
  const [isUpdateButtonPositionOpen, setIsUpdateButtonPositionOpen] = useState(
    false
  );
  const [isWidgetPopup, setIsWidgetPopup] = useState(false);
  const [isStandardWidget, setIsStandardWidget] = useState(false);
  const [isPreRecordedWidget, setIsPreRecordedWidget] = useState(false);
  const [isAvatarWidget, setIsAvatarWidget] = useState(false);
  const [isUpdatePopDelayOpen, setIsUpdatePopDelayOpen] = useState(false);
  const [isUpdateMliveForm, setIsUpdateMliveForm] = useState(false);
  const [issCustomizeDelayOpen, setIsCustomizeDelayOpen] = useState(false);
  const [isNewInquiryOpen, setIsNewInquiryOpen] = useState(false);
  const [userVideos, setUserVideos] = useState([]);
  const [tenant, setTenant] = useState(null);
  const [activeUserVideoUrl, setActiveUserVideoUrl] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);
  const [widgetText, setWidgetText] = useState(null);
  const [widgetType, setWidgetType] = useState(null);
  const [widgetColor, setWidgetColor] = useState(null);
  const [widgetVisible, setWidgetVisible] = useState(null);
  const [recordActive, setRecordActive] = useState(null);
  const [avatarModel, setAvatarModel] = useState(null);
  const trigger = useSelector(selectActionTrigger);
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const closeUrlModal = () => {
    setIsUpdateUrlOpen(false);
  };

  const closeStandardWidget = () => {
    setIsStandardWidget(false);
  };

  const closePreRecordedWidget = () => {
    setIsPreRecordedWidget(false);
  };

  const closeWidget = () => {
    setIsWidgetPopup(false);
  };

  const closeInquiry = () => {
    setIsUpdateInquiryOpen(false);
  };

  const closeMliveForm = () => {
    setIsUpdateMliveForm(false);
  };

  const closeButton = () => {
    setIsUpdateButtonPositionOpen(false);
  };

  const closePop = () => {
    setIsUpdatePopDelayOpen(false);
  };

  const closeModal = () => {
    setIsRecordOpen(false);
  };

  const closeDelay = () => {
    setIsCustomizeDelayOpen(false);
  };

  const closeNewInquiry = () => {
    setIsNewInquiryOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(e.target) &&
      !e.target.classList.contains("modal-trigger")
    ) {
      closeInquiry();
      closeButton();
      closePop();
      closeDelay();
      closeNewInquiry();
    }
  };

  const getAllUserVideos = async () => {
    dispatch(loadingTriggered(true));
    const response = await UsersApi.get_all_user_videos();
    if (response?.data) {
      console.log("getAllUsers", response?.data);
      setUserVideos(response?.data);
      dispatch(loadingTriggered(false));
    } else {
      dispatch(loadingTriggered(false));
      return [];
    }
  };
  const getTenant = () => {
    dispatch(loadingTriggered(true));
    Tenant.get_tenant().then((response) => {
      if (response?.data) {
        console.log("response", response.data);
        setActiveUserVideoUrl(response.data?.active_video_url);
        setLogoUrl(response.data?.logo_url);
        setWidgetText(response.data?.widget_text);
        setWidgetType(response.data?.widget_type);
        setWidgetVisible(response.data?.widget_visible);
        setRecordActive(response.data?.recordActive);
        setAvatarModel(response.data?.avatar_model);

        setTenant(response.data);
        dispatch(loadingTriggered(false));
        // dispatch(apiCallTriggered(true));
      } else {
        dispatch(loadingTriggered(false));
        alert(response?.message);
      }
    });
  };

  useEffect(() => {
    getAllUserVideos();
    getTenant();
    dispatch(apiCallTriggered(false));
  }, [trigger.apiCallTriggered]);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

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
      <div className="w-[80%]  overflow-auto scrollbar-hide  py-[1rem]  px-[4rem] flex">
        <LiveSettingsPage
          setIsUpdateMliveForm={setIsUpdateMliveForm}
          setIsUpdateUrlOpen={setIsUpdateUrlOpen}
          setIsUpdatePopDelayOpen={setIsUpdatePopDelayOpen}
          setIsUpdateInquiryOpen={setIsUpdateInquiryOpen}
          setIsUpdateButtonPositionOpen={setIsUpdateButtonPositionOpen}
          setIsWidgetPopup={setIsWidgetPopup}
          widgetVisible={widgetVisible}
          widgetType={widgetType}
          recordActive={recordActive}
        />
      </div>

      {isUpdateUrlOpen && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="p-5 ">
            <UpdateUrl onClose={closeUrlModal} />
          </div>
        </div>
      )}
      {isUpdateMliveForm && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="p-5">
            <MliveForm onClose={closeMliveForm} />
          </div>
        </div>
      )}

      {isUpdateInquiryOpen && (
        <div
          className="absolute top-[18rem] right-[4rem] flex justify-center items-center"
          ref={modalRef}
        >
          <div className="p-5 ">
            <InquiryType
              onClose={closeInquiry}
              setIsNewInquiryOpen={setIsNewInquiryOpen}
            />
          </div>
        </div>
      )}
      {isUpdateButtonPositionOpen && (
        <div
          className="absolute top-[31rem] right-[4rem] flex justify-center items-center"
          ref={modalRef}
        >
          <div className="p-5 ">
            <ButtonPosition onClose={closeButton} />
          </div>
        </div>
      )}
      {isUpdatePopDelayOpen && (
        <div
          className="absolute top-[34.5rem] right-[4rem] overflow-y-auto scrollbar-hide overscroll-none  items-center"
          ref={modalRef}
        >
          <div className="p-5 ">
            <PopUpDelay
              onClose={closePop}
              setIsCustomizeDelayOpen={setIsCustomizeDelayOpen}
            />
          </div>
        </div>
      )}

      {issCustomizeDelayOpen && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
          ref={modalRef}
        >
          <div className="p-5 ">
            <CustomizeDelay onClose={closeDelay} />
          </div>
        </div>
      )}

      {isNewInquiryOpen && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
          ref={modalRef}
        >
          <div className="p-5 ">
            <NewInquiry onClose={closeNewInquiry} />
          </div>
        </div>
      )}

      {isWidgetPopup && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
          ref={modalRef}
        >
          <div className="p-5 ">
            <WidgetModal
              onClose={closeWidget}
              setIsStandardWidget={setIsStandardWidget}
              setIsPreRecordedWidget={setIsPreRecordedWidget}
              setIsAvatarWidget={setIsAvatarWidget}
              activeUserVideoUrl={activeUserVideoUrl}
              widgetType={widgetType}
              logoUrl={logoUrl}
              widgetText={widgetText}
              avatarModel={avatarModel}
              activeAvatar={tenant?.active_avatar}
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
    </div>
  );
}

export default LiveSettings;
