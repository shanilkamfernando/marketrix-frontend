import { AvatarIntials, Toggle, Avatar } from "@creativehub/marketrix-ui";
import { use, useEffect, useRef, useState } from "react";
import { API_URL_GLOBAL_SET } from "@/pages/api/env";
import * as io from "socket.io-client";
//import { DefaultEventsMap } from "@socket.io/component-emitter";
import { toggleMliveStatus } from "@/store/actionSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  loadState,
  loadStateSession,
  saveStateSession,
} from "@/store/localStorage";

import {
  selectActionTrigger,
  updateIncoming,
  updateLiveTraffic,
  updateActiveUsers,
  liveConnectTriggered,
} from "@/store/actionSlice";
import OnlineAgentsModal from "../Modals/OnlineAgentsModal/OnlineAgentsModal";
import WizardAccordionConnect from "../WizardAccordion/WizardAccordionConnect";
import { setConnectionStatus, setNewUser } from "@/store/authSlice";
import ConnectionStatusAlert from "../Banners/ConnectionStatus/ConnectionStatusAlert";
import ConnectionFailedAlert from "../Banners/ConnectionFailedAlert/ConnectionFailedAlert";
import ConnectionSuccessAlert from "../Banners/ConnectionSuccessAlert/ConnectionSuccessAlert";

const socketUrl = API_URL_GLOBAL_SET.SOCKET_URL;

var socket;

const MarketrixLive = () => {
  const dispatch = useDispatch();
  const [dashboardStatus, setDashboardStatus] = useState(true);
  const [mLive, setMlive] = useState(false); // MLive Toggle State
  const [domain, setDomain] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [email, setEmail] = useState("");
  const [appId, setAppId] = useState("");
  const [activeUsers, setActiveUsers] = useState("");
  const [connectionStatusNew, setConnectionStatusNew] = useState(false);
  const trigger = useSelector(selectActionTrigger);
  const [isAgenstModalOpen, setIsAgentsModalOpen] = useState(false);
  const [websiteDomain, setWebsiteDomain] = useState("");
  const [openedWindow, setOpenedWindow] = useState(null);

  const [liveConnectCheckModalOpen, setLiveConnectCheckModalOpen] =
    useState(false);

  const [connectionAlertModalOpen, setConnectionAlertModalOpen] =
    useState(false);

  const [connectionFailedModalOpen, setConnectionFailedModalOpen] =
    useState(false);

  const [connectionSuccessModalOpen, setConnectionSuccessModalOpen] =
    useState(false);

  const modalContainerRef = useRef(null);

  const handleViewAgentClick = () => {
    setIsAgentsModalOpen(true);
  };

  const mLiveToggle = () => {
    if (mLive === false) {
      connectUserToSocket();
    } else {
      removeUserFromSocket();
    }
  };

  const connectUserToSocket = () => {
    if (domain != "") {
      console.log("connectUserToSocket");
      console.log("appId", appId);
      console.log("domain", domain);
      socket = io.connect(socketUrl, { query: { appId } });

      const userInfo = {
        userName: userName,
        domain: domain,
        role: userRole,
        imageUrl: imageUrl,
        appId: appId,
        email: email,
      };

      console.log("userInfo_________", userInfo);
      socket.emit("connectUser", userInfo, (callback) => {
        console.log("connectUser", userInfo);
        if (callback.status) {
          dispatch(toggleMliveStatus(true));
          getVisitorsInfo();
        } else {
          dispatch(toggleMliveStatus(false));
        }
      });
    }
  };

  const checkConnectionStatus = () => {
    setLiveConnectCheckModalOpen(true);
    // setCheckConnectionStatus(true);
    // setIsLoading(true);

    // const url = `${websiteDomain}?check-connection=${true}`;
    // const newWindow = window.open(url, "_blank", "width=600,height=400");
    // setOpenedWindow(newWindow);
  };

  const openCheckConnectionModal = () => {
    setConnectionAlertModalOpen(false);
    setLiveConnectCheckModalOpen(true);
  };

  const removeUserFromSocket = () => {
    if (domain != "" && socket?.id) {
      console.log("removeUserFromSocket", socket?.id);
      const userInfo = {
        id: socket?.id,
        userName: userName,
        domain: domain,
        role: userRole,
        imageUrl: imageUrl,
        appId: appId,
        email: email,
      };
      socket?.emit("removeUser", userInfo, (callback) => {
        if (callback.status) {
          dispatch(toggleMliveStatus(false));
          detectLiveTraffic([]);
          socket.close();
        }
      });
    }
  };

  const getVisitorsInfo = async () => {
    socket?.emit("getVisitorsInfo", (data) => {
      detectLiveTraffic(data);
    });
  };

  const getOnlineUsers = async () => {
    socket?.emit("getOnLineUsers", (data) => {
      console.log("getOnlineUsers", data);
      setActiveUsers(data);
    });
  };
  //

  const detectLiveTraffic = async (data) => {
    console.log("NAV BAR LIVE VISITORS", data.length);
    // setLiveTrafficAmount(data.length);
    saveStateSession("liveTraffic", data);
    dispatch(updateLiveTraffic(true));
  };

  const getActiveUsers = () => {
    socket?.emit("getConnectedUsers", (response) => {
      if (response.status) {
        setActiveUsers(response.data);
        saveStateSession("activeUsers", response.data);
        dispatch(updateActiveUsers(true));
      } else {
        alert("ERROR GET LIVE USERS");
      }
    });
  };

  const connectionFailed = () => {
    // alert("Connection Failed");
    setConnectionFailedModalOpen(true);

    // setTimeout(() => {
    //   setLiveConnectCheckModalOpen(false);
    // }, 5000);
  };

  const connectionSuccess = () => {
    // alert("Connection Success");
    // setTimeout(() => {
    //   setLiveConnectCheckModalOpen(false);
    // }, 5000);
    setConnectionSuccessModalOpen(true);
  };

  useEffect(() => {
    // Define the function to be executed
    const checkConnectionStatus = () => {
      let connectionStatusLocal = loadState("connection_status");
      let newUserLocal = loadState("new_user");

      if (newUserLocal) {
        setLiveConnectCheckModalOpen(true);
        setConnectionStatusNew(false);
        setConnectionAlertModalOpen(true);
        //alert("Please connect to your domain! ");
      } else {
        if (connectionStatusLocal) {
          setConnectionStatusNew(connectionStatusLocal);
        } else {
          setConnectionStatusNew(false);
          // setConnectionAlertModalOpen(true);

          // alert(
          //   "Please connect to your domain! If you have already connected, please refresh the page."
          // );
        }
      }
    };

    // Run the function initially
    checkConnectionStatus();

    // Set up an interval to run the function every 10 seconds only if setConnectionStatusNew is false
    let intervalId;
    if (!setConnectionStatusNew) {
      intervalId = setInterval(checkConnectionStatus, 30000);
    }

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [setConnectionStatusNew]); // Dependency array includes setConnectionStatusNew

  // useEffect(() => {
  //   // Define the function to be executed

  //   const checkConnectionStatus = () => {
  //     let connectionStatusLocal = loadState("connection_status");
  //     let newUserLocal = loadState("new_user");

  //     if (newUserLocal) {
  //       setLiveConnectCheckModalOpen(true);
  //       setConnectionStatusNew(false);
  //       //alert("Please connect to your domain! ");
  //     } else {
  //       if (connectionStatusLocal) {
  //         setConnectionStatusNew(connectionStatusLocal);
  //       } else {
  //         setConnectionStatusNew(false);
  //         setConnectionAlertModalOpen(true);
  //         // alert(
  //         //   "Please connect to your domain! If you have already connected, please refresh the page."
  //         // );
  //       }
  //     }
  //   };

  //   // Run the function initially
  //   checkConnectionStatus();

  //   // Set up an interval to run the function every 10 seconds
  //   const intervalId = setInterval(checkConnectionStatus, 30000);

  //   // Clear the interval when the component is unmounted
  //   return () => clearInterval(intervalId);
  // }, []); // Empty dependency array means this useEffect runs only once when the component mounts
  // // ... rest of your component code

  // useEffect(() => {
  //   let connectionStatusLocal = loadState("connection_status");
  //   let newUserLocal = loadState("new_user");
  //   if (newUserLocal) {
  //     setLiveConnectCheckModalOpen(true);
  //     setConnectionStatusNew(false);
  //     //alert("Please connect to your domain! ");
  //   } else {
  //     if (connectionStatusLocal) {
  //       setConnectionStatusNew(connectionStatusLocal);
  //     } else {
  //       setConnectionStatusNew(false);
  //       setConnectionAlertModalOpen(true);
  //       // alert(
  //       //   "Please connect to your domain! If you have already connected, please refresh the page."
  //       // );
  //     }
  //   }
  // }, []);

  useEffect(() => {
    socket?.on("VisitorRequestMeetToUser", async (data) => {
      console.log("Request Coming.... ", data);

      setTimeout(() => {
        dispatch(updateIncoming(true));
      }, 1000);
    });

    socket?.on("emitLiveUsers", async (data) => {
      console.log("emitLiveUsers", data);
      setActiveUsers(data);
      // alert("emitLiveUsers")
    });

    socket?.on("emitVisitors", async (data) => {
      console.log("emitVisitors", data);
      if (data.length > 0) {
        dispatch(setNewUser(false));
        dispatch(setConnectionStatus(true));
      }
      detectLiveTraffic(data);
    });

    socket?.on("emitConnectionStatus", async (data) => {
      console.log(
        "___________EEEEEmitConnectionStatus_________",
        data?.connectionStatus
      );
      //setConnectionStatus(data?.connectionStatus);
      setConnectionStatusNew(data?.connectionStatus);
      dispatch(setConnectionStatus(data?.connectionStatus));
      dispatch(setNewUser(false));
    });

    getActiveUsers();
  }, [socket]);

  useEffect(() => {
    // load data from local storage
    setDomain(loadState("website_domain") || "");
    setUserName(loadState("first_name") || loadState("logged_in_email") || "");
    setImageUrl(loadState("image_url") || null);
    //setImageUrl("https://picsum.photos/200/300")
    setUserRole(loadState("user_role") || "admin");
    setEmail(loadState("logged_in_email") || "");
    setAppId(loadState("app_id") || "");
  }, []);

  useEffect(() => {
    setWebsiteDomain(loadState("website_domain") || "");
  }, []);

  useEffect(() => {
    connectUserToSocket();
  }, [domain]);

  useEffect(() => {
    //check
    if (trigger.mliveEnabled) {
      setMlive(true);
    } else {
      setMlive(false);
    }
  }, [trigger.mliveEnabled]);

  useEffect(() => {
    if (trigger.liveConnectTriggered) {
      //alert("liveConnectOpenTriggered");
      setLiveConnectCheckModalOpen(true);
      dispatch(liveConnectTriggered(false));
    }
  }, [trigger.liveConnectTriggered]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        modalContainerRef.current &&
        !modalContainerRef.current.contains(event.target)
      ) {
        setIsAgentsModalOpen(false);
     //   setLiveConnectCheckModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      {dashboardStatus && (
        <>
          <div className="">
            <div className="flex items-center justify-between  border-solid border-[#E4E7EC] gap-5">
              <div
                onClick={handleViewAgentClick}
                className="text-[#000000] mtx-subtitle1 !font-medium cursor-pointer flex items-center gap-2 "
              >
                Online Agents
                <span className=" inline-flex items-center justify-center w-5 h-5  text-xs font-semibold text-gray-800 bg-[#F2F4F7] rounded-full">
                  {activeUsers.length}
                </span>
              </div>

              <div
                className="text-[#000000] mtx-subtitle1 !font-medium cursor-pointer flex items-center gap-2"
                onClick={checkConnectionStatus}
              >
                Marketrix
                {mLive ? <> Live</> : <> Off</>}
              </div>

              {mLive ? (
                <>
                  <Toggle isChecked={mLive} onChange={() => mLiveToggle()} />{" "}
                </>
              ) : (
                <>
                  <Toggle isChecked={mLive} onChange={() => mLiveToggle()} />
                </>
              )}

              {isAgenstModalOpen && (
                <div
                  className="fixed right-56 top-12  z-10 p-4 mr-32"
                  ref={modalContainerRef}
                >
                  <OnlineAgentsModal
                    onClose={() => setIsAgentsModalOpen(false)}
                    activeUsers={activeUsers}
                  />
                </div>
              )}

              {liveConnectCheckModalOpen && (
                <div
                  className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-10"
                  ref={modalContainerRef}
                >
                  <WizardAccordionConnect
                    type="onboarding"
                    connectionStatus={connectionStatusNew}
                    onClose={() => setLiveConnectCheckModalOpen(false)}
                    setLiveConnectCheckModalOpen={setLiveConnectCheckModalOpen}
                    connectionFailedFunc={connectionFailed}
                    connectionSuccessFunc={connectionSuccess}
                  />
                </div>
              )}
            </div>
            {connectionAlertModalOpen && (
              <div
                className="fixed top-0 right-0 z-10 p-4 w-1/4"
                ref={modalContainerRef}
              >
                <ConnectionStatusAlert
                  onClose={() => setConnectionAlertModalOpen(false)}
                  buttonFunction={openCheckConnectionModal}
                  buttoneText="Check Connection"
                  mainMsg="Please check to your connection!"
                  subMsg="Integrate the widget script code into your website & Check connection."
                />
              </div>
            )}

            {connectionFailedModalOpen && (
              <>
                <div
                  className="fixed left-1/2  transform -translate-x-1/2 -translate-y-1/2 z-10 p-4  w-3/4"
                  ref={modalContainerRef}
                >
                  <ConnectionFailedAlert
                    onClose={() => setConnectionFailedModalOpen(false)}
                    buttonFunction={""}
                    buttoneText=""
                    mainMsg="Connection Failed!"
                    subMsg="Integrate the widget script code into your website & Check connection."
                  />
                </div>
              </>
            )}

            {connectionSuccessModalOpen && (
              <>
                <div
                  className="fixed left-1/2  transform -translate-x-1/2 -translate-y-1/2 z-10 p-4  w-3/4"
                  ref={modalContainerRef}
                >
                  <ConnectionSuccessAlert
                    onClose={() => setConnectionSuccessModalOpen(false)}
                    buttonFunction={""}
                    buttoneText=""
                    mainMsg="Connection Successful!"
                    subMsg="All set to go! Let's do Marketrix Live."
                  />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default MarketrixLive;
