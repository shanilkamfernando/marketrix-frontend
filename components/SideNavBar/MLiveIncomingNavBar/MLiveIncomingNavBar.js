import { SideNavigationBar, Button, Toggle } from "@creativehub/marketrix-ui";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { loadState, loadStateSession } from "@/store/localStorage";
import { API_URL_GLOBAL_SET } from "@/pages/api/env";
import { selectAuthState } from "@/store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectActionTrigger, updateLiveTraffic } from "@/store/actionSlice";
import { getLiveCounts } from "@/components/Cards/IncomingCard/apiCalls";
import UpgradeToPro from "@/components/Cards/UpgradetoPro/UpdgradetoPro";
//import Joyride, { STATUS } from "react-joyride";
const socketUrl = API_URL_GLOBAL_SET.SOCKET_URL;

// var socket: io.Socket<DefaultEventsMap, DefaultEventsMap>;

const getCursorLocation = async (event) => {
  let x = event.clientX;
  let y = event.clientY;
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  return { x, y, windowWidth, windowHeight };
};

// interface incomingDetails {
//   incomingAmount: number;
//   completedAmount: number;
// }

// interface incomingProps {
//   selectedButton: string | null;
//   setSelectedButton: React.Dispatch<React.SetStateAction>;
// }

function MLiveIncomingNavBar({ selectedButton, setSelectedButton }) {
  // Set the correct type for selectedButton
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const [mLive, setMlive] = useState(false); // MLive Toggle State
  const dispatch = useDispatch();

  const auth = useSelector(selectAuthState);

  const [LiveTrafficAmount, setLiveTrafficAmount] = useState(0);
  const [incomingAmount, setIncomingAmount] = useState();
  const [missedAmount, setMissedAmount] = useState();
  const [ongoingAmount, setOngoingAmount] = useState();
  const [completedAmount, setCompletedAmount] = useState();

  const [domain, setDomain] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [appId, setAppId] = useState("");
  const [live, setLive] = useState(false);
  const [visitorInfo, setVisitorInfo] = useState("");
  const [reqestComing, setReqestComing] = useState(false);

  const [liveMeet, setLiveMeet] = useState("");
  const [activeUsers, setActiveUsers] = useState("");

  const trigger = useSelector(selectActionTrigger);

  // MLive Toggle Function

  // const mLiveToggle = () => {
  //   if (mLive === false) {
  //     connectUserToSocket();
  //   } else {
  //     removeUserFromSocket();
  //   }
  // };

  // const getActiveUsers = () => {
  //   socket?.emit("getConnectedUsers", (response: any) => {
  //     if (response.status) {
  //       setActiveUsers(response.data);
  //     } else {
  //       alert("ERROR GET LIVE USERS");
  //     }
  //   });
  // };

  useEffect(() => {
    // load data from local storage
    setDomain(loadState("website_domain") || "");
    setUserName(loadState("first_name") || "");
    setImageUrl(loadState("image_url") || {});
    setUserRole(loadState("user_role") || "admin");
    setAppId(loadState("app_id") || "");
  }, []);

  // const connectUserToSocket = () => {
  //   if (domain != "") {
  //     console.log("connectUserToSocket");
  //     console.log("appId", appId);
  //     console.log("domain", domain);
  //     socket = io.connect(socketUrl, { query: { appId } });

  //     const userInfo = {
  //       userName: userName,
  //       domain: domain,
  //       role: userRole,
  //       imageUrl: imageUrl,
  //       appId: appId,
  //     };
  //     socket.emit("connectUser", userInfo, (callback: any) => {
  //       console.log("connectUser", callback);
  //       if (callback.status) {
  //         dispatch(toggleMliveStatus(true));
  //         getVisitorsInfo();
  //       } else {
  //         dispatch(toggleMliveStatus(false));
  //       }
  //     });
  //   }
  // };

  // const removeUserFromSocket = () => {
  //   if (domain != "" && socket?.id) {
  //     console.log("removeUserFromSocket", socket?.id);
  //     const userInfo = {
  //       id: socket?.id,
  //       userName: userName,
  //       domain: domain,
  //       role: userRole,
  //       imageUrl: imageUrl,
  //       appId: appId,
  //     };
  //     socket?.emit("removeUser", userInfo, (callback: any) => {
  //       if (callback.status) {
  //         dispatch(toggleMliveStatus(false));
  //         detectLiveTraffic([]);
  //         socket.close();
  //       }
  //     });
  //   }
  // };

  // const getVisitorsInfo = async () => {
  //   socket?.emit("getVisitorsInfo", (data: any) => {
  //     //      console.log("getVisitorsInfo", data);
  //     detectLiveTraffic(data);
  //   });
  // };

  const getCounts = async () => {
    let count = await getLiveCounts();
    setIncomingAmount(count.incomingNotChecked);
    setMissedAmount(count.missedNotChecked);
    setOngoingAmount(count.ongoing);
    setCompletedAmount(count.completed);
  };

  // const getOnlineUsers = async () => {
  //   socket?.emit("getOnLineUsers", (data: any) => {
  //     console.log("getOnlineUsers", data);
  //     setActiveUsers(data);
  //   });
  // }

  // useEffect(() => {
  //   socket?.on("VisitorRequestMeetToUser", async (data: any) => {
  //     console.log("Request Coming.... ", data);

  //     setTimeout(() => {
  //       setVisitorInfo(data);
  //       //   const liveMeet = await createMeeting(data); // create meeting
  //       dispatch(updateIncoming(true));
  //       setLiveMeet(liveMeet);
  //       setReqestComing(true);
  //     }, 1000);
  //   });

  //   socket?.on("emitLiveUsers", async (data: any) => {
  //     console.log("emitLiveUsers", data)
  //     setActiveUsers(data);
  //     // alert("emitLiveUsers")
  //   });

  //   //getActiveAgents

  //   socket?.on("emitVisitors", async (data: any) => {
  //     console.log("emitVisitors", data);
  //     detectLiveTraffic(data);
  //   });
  //   getActiveUsers();
  // }, [socket]);

  useEffect(() => {
    //connectUserToSocket()
    getCounts();
  }, [domain]);

  // const trigger = useSelector(selectActionTrigger);

  // useEffect(() => {
  //   console.log("trigger.mliveEnabled", trigger.mliveEnabled);
  //   if (trigger.mliveEnabled) {
  //     setMlive(true);
  //   } else {
  //     setMlive(false);
  //   }
  // }, [trigger.mliveEnabled]);

  // const detectLiveTraffic = async (data: any) => {
  //   console.log("NAV BAR LIVE VISITORS", data.length);
  //   setLiveTrafficAmount(data.length);
  //   saveStateSession("liveTraffic", data);
  //   dispatch(updateLiveTraffic(true));
  // };

  useEffect(() => {
    // const data = loadStateSession("liveTraffic");

    // if (data) {
    //   setLiveTrafficAmount(data.length);
    // }

    const counts = loadStateSession("counts");
    if (counts) {
      console.log("counts..", counts);
      setIncomingAmount(counts.incomingNotChecked);
      setMissedAmount(counts.missedNotChecked);
      setOngoingAmount(counts.ongoing);
      setCompletedAmount(counts.completed);
    }
  }, []);

  useEffect(() => {
    const data = loadStateSession("liveTraffic");
    if (data) {
      setLiveTrafficAmount(data.length);
      dispatch(updateLiveTraffic(false));
    }
  }, [trigger.updateLiveTrafficTriggered]);

  //testing purpose
  // const [{ run, steps }, setState] = useState({
  //   run: true,
  //   steps: [
  //     {
  //       content: (
  //         <>
  //           <h2 className="!font-bold">
  //             Welcome to Marketrix Live! <br />
  //             Here's where we track, manage, and improve how we talk to
  //             customers. Let's start the tour.
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
  //             Indicates the real-time activity.
  //           </h2>
  //         </>
  //       ),
  //       placement: "right",
  //       target: "#step-1",
  //       title: "Live Traffic",
  //     },
  //     {
  //       content: (
  //         <>
  //           <h2 className="text-[#667085]">
  //             This would typically show new incoming sessions or interactions
  //             that have not yet been responded to or are waiting to be
  //             processed.
  //           </h2>
  //         </>
  //       ),
  //       placement: "right",
  //       target: "#step-2",
  //       title: "Incoming",
  //     },
  //     {
  //       content: (
  //         <>
  //           <h2 className="text-[#667085]">
  //             This represents sessions or interactions that were not addressed.{" "}
  //           </h2>
  //         </>
  //       ),
  //       placement: "right",
  //       target: "#step-3",
  //       title: "Missed",
  //     },
  //     {
  //       content: (
  //         <>
  //           <h2 className="text-[#667085]">
  //             Shows the number of active sessions or interactions currently
  //             being handled.
  //           </h2>
  //         </>
  //       ),
  //       placement: "right",
  //       target: "#step-4",
  //       title: "Ongoing",
  //     },
  //     {
  //       content: (
  //         <>
  //           <h2 className="text-[#667085]">
  //             The sessions or interactions that have been successfully
  //             completed.
  //           </h2>
  //         </>
  //       ),
  //       placement: "right",
  //       target: "#step-5",
  //       title: "Completed",
  //     },
  //     {
  //       content: (
  //         <>
  //           <h2 className="text-[#667085]">
  //             This likely refers to the ability to review or replay past
  //             sessions.
  //           </h2>
  //         </>
  //       ),
  //       placement: "right",
  //       target: "#step-6",
  //       title: "Session Replay",
  //     },
  //   ],
  // });

  // const [forth, setforth] = useState(null);
  // useEffect(() => {
  //   setforth(true);
  // }, []);

  return (
    <div>
      {/* {forth ? (
        <Joyride
          run={run}
          steps={steps}
          hideCloseButton
          spotlightPadding={2}
          scrollToFirstStep
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
              Marketrix Live
            </div>

            <Link href="/Dashboard/MLivePages/LiveTraffic" target="_self">
              <div className=" flex relative">
                <Button
                  id="step-1"
                  alignItems="center"
                  background={
                    selectedButton === "LiveTraffic" ? "#E4E7EC" : "#FCFCFD"
                  } // Change background based on selection
                  onClick={() => handleButtonClick("LiveTraffic")} // Set the selected button when clicked
                  color="#344054"
                  direction="row"
                  display="flex"
                  flexDirection="row"
                  fontSize="0.875rem"
                  gap="13px"
                  hoverColor="#f2f4f7"
                  icon="live"
                  iconMargin={12}
                  iconPosition="leading"
                  justifyContent="start"
                  label="Live Traffic"
                  lineHeight="2px"
                  size="sm"
                  width="100%"
                />
                <div className="absolute right-2 bottom-0 top-0 flex items-center ">
                  <span className=" inline-flex items-center justify-center w-5 h-5  text-xs font-semibold text-gray-800 bg-[#F2F4F7] rounded-full">
                    {LiveTrafficAmount}
                  </span>
                </div>
              </div>
            </Link>

            <div className="border-[1px]"></div>

            <Link href="/Dashboard/MLivePages/LiveIncoming" target="_self">
              <div className=" flex relative">
                <Button
                  id="step-2"
                  alignItems="center"
                  background={
                    selectedButton === "IncomingQ" ? "#E4E7EC" : "#FCFCFD"
                  } // Change background based on selection
                  onClick={() => handleButtonClick("IncomingQ")} // Set the selected button when clicked
                  color="#344054"
                  direction="row"
                  display="flex"
                  flexDirection="row"
                  fontSize="0.875rem"
                  gap="13px"
                  hoverColor="#f2f4f7"
                  icon="incoming"
                  iconMargin={12}
                  iconPosition="leading"
                  justifyContent="start"
                  label="Incoming"
                  lineHeight="2px"
                  size="sm"
                  width="100%"
                />
                <div className="absolute right-2 bottom-0 top-0 flex items-center ">
                  <span className=" inline-flex items-center justify-center w-5 h-5  text-xs font-semibold text-gray-800 bg-[#F2F4F7] rounded-full">
                    {incomingAmount}
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/Dashboard/MLivePages/LiveMissed" target="_self">
              <div className=" flex relative">
                <Button
                  id="step-3"
                  alignItems="center"
                  background={
                    selectedButton === "Missing" ? "#E4E7EC" : "#FCFCFD"
                  } // Change background based on selection
                  onClick={() => handleButtonClick("Missing")} // Set the selected button when clicked
                  color="#344054"
                  direction="row"
                  display="flex"
                  flexDirection="row"
                  fontSize="0.875rem"
                  gap="13px"
                  hoverColor="#f2f4f7"
                  icon="missingIcon"
                  iconMargin={12}
                  iconPosition="leading"
                  justifyContent="start"
                  label="Missed"
                  lineHeight="2px"
                  size="sm"
                  width="100%"
                />
                <div className="absolute right-2 bottom-0 top-0 flex items-center ">
                  <span className=" inline-flex items-center justify-center w-5 h-5  text-xs font-semibold text-gray-800 bg-[#F2F4F7] rounded-full">
                    {missedAmount}
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/Dashboard/MLivePages/LiveOngoing" target="_self">
              <div className=" flex relative">
                <Button
                  id="step-4"
                  alignItems="center"
                  background={
                    selectedButton === "Ongoing" ? "#E4E7EC" : "#FCFCFD"
                  } // Change background based on selection
                  onClick={() => handleButtonClick("Ongoing")} // Set the selected button when clicked
                  color="#344054"
                  direction="row"
                  display="flex"
                  flexDirection="row"
                  fontSize="0.875rem"
                  gap="13px"
                  hoverColor="#f2f4f7"
                  icon="folderIcon"
                  iconMargin={12}
                  iconPosition="leading"
                  justifyContent="start"
                  label="Ongoing"
                  lineHeight="2px"
                  size="sm"
                  width="100%"
                />
                <div className="absolute right-2 bottom-0 top-0 flex items-center ">
                  <span className=" inline-flex items-center justify-center w-5 h-5  text-xs font-semibold text-gray-800 bg-[#F2F4F7] rounded-full">
                    {ongoingAmount}
                  </span>
                </div>
              </div>
            </Link>
            <Link href="/Dashboard/MLivePages/LiveCompleted" target="_self">
              <div className=" flex relative">
                <Button
                  id="step-5"
                  alignItems="center"
                  background={
                    selectedButton === "LiveCompleted" ? "#E4E7EC" : "#FCFCFD"
                  } // Change background based on selection
                  onClick={() => handleButtonClick("LiveCompleted")} // Set the selected button when clicked
                  color="#344054"
                  direction="row"
                  display="flex"
                  flexDirection="row"
                  fontSize="0.875rem"
                  gap="13px"
                  hoverColor="#f2f4f7"
                  icon="Completed"
                  iconMargin={12}
                  iconPosition="leading"
                  justifyContent="start"
                  label="Completed"
                  lineHeight="2px"
                  size="sm"
                  width="100%"
                />
                <div className="absolute right-2 bottom-0 top-0 flex items-center ">
                  <span className=" inline-flex items-center justify-center w-5 h-5  text-xs font-semibold text-gray-800 bg-[#F2F4F7] rounded-full">
                    {completedAmount}
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/Dashboard/MLivePages/SessionReplay" target="_self">
              <div className=" flex relative">
                <Button
                  id="step-6"
                  alignItems="center"
                  background={
                    selectedButton === "SessionReplay" ? "#E4E7EC" : "#FCFCFD"
                  } // Change background based on selection
                  onClick={() => handleButtonClick("SessionReplay")} // Set the selected button when clicked
                  color="#344054"
                  direction="row"
                  display="flex"
                  flexDirection="row"
                  fontSize="0.875rem"
                  gap="13px"
                  hoverColor="#f2f4f7"
                  icon="Completed"
                  iconMargin={12}
                  iconPosition="leading"
                  justifyContent="start"
                  label="Session Replay"
                  lineHeight="2px"
                  size="sm"
                  width="100%"
                />
                <div className="absolute right-2 bottom-0 top-0 flex items-center ">
                  <span className=" inline-flex items-center justify-center w-5 h-5  text-xs font-semibold text-gray-800 bg-[#F2F4F7] rounded-full">
                    {completedAmount}
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* <div>
            Active Agents
            {activeUsers?.map((user: any) => (<div>
              <div>{user.userName}</div>
            </div>))
            }
          </div> */}

          <br />

          {/* <div className="flex items-center justify-between pt-3 border-solid border-t-[0.5px] border-[#E4E7EC]">
            <div className="text-[#000000] mtx-subtitle1 !font-bold ">
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

          </div> */}
          <UpgradeToPro />
        </div>
      </SideNavigationBar>
    </div>
  );
}

export default MLiveIncomingNavBar;
