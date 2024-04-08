import React, { useEffect, useState } from "react";
import LiveSettingAlert from "@/components/Banners/LiveSettingAlert/LiveSettingAlert";
import { loadState } from "@/store/localStorage";
import ConnectionStatusBanner from "@/components/Banners/ConnectionStatus/ConnectionStatusBanner";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { liveConnectTriggered } from "@/store/actionSlice";
function OverviewHeaderCard() {
  const dispatch = useDispatch();
  const [connectionAlertModalOpen, setConnectionAlertModalOpen] =
    useState(false);
  const router = useRouter();
  const [liveConnectCheckModalOpen, setLiveConnectCheckModalOpen] =
    useState(false);
  const openCheckConnectionModal = () => {
    dispatch(liveConnectTriggered(true));
    router.push("/Dashboard/MLivePages/LiveTraffic/");
  }; 

  useEffect(() => {
    let connectionStatusLocal = loadState("connection_status");
    let newUserLocal = loadState("new_user");
    if (newUserLocal) {
      setLiveConnectCheckModalOpen(true);

      //setLiveConnectCheckModalOpen(true);
      //setConnectionStatusNew(false);
      //alert("Please connect to your domain! ");
    } else {
      if (connectionStatusLocal) {
        //  setConnectionStatusNew(connectionStatusLocal);
      } else {
        //setConnectionStatusNew(false);
        setConnectionAlertModalOpen(true);
        // alert(
        //   "Please connect to your domain! If you have already connected, please refresh the page."
        // );
      }
    }
  }, []);

  return (
    <div>
      {/* <LiveSettingAlert/> */}
      {/* <ConnectionStatusAlert /> */}
      {liveConnectCheckModalOpen && <LiveSettingAlert />}
      {connectionAlertModalOpen && (
        <ConnectionStatusBanner
          onClose={() => setConnectionAlertModalOpen(false)}
          buttonFunction={openCheckConnectionModal}
          buttoneText="Check Connection"
          mainMsg="Marketrix Widget: Connection Pending"
          subMsg="Embed the provided code snippet into your website now and verify the connection to unlock Marketrix’s full potential."
        />
      )}
    </div>
  );
}

export default OverviewHeaderCard;
