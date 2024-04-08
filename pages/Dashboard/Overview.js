import InnerHeader from "@/components/Headers/InnerHeader/InnerHeader";
import OverviewGraphCard from "@/components/Cards/OverviewGraphCard/OverviewGraphCard";
import React, { useEffect, useState } from "react";
import IconSideNavBar from "@/components/SideNavBar/IconSideNavBar/IconSideNavBar";
import CalenderComponent from "@/components/CalenderComponent/CalenderComponent";
import { loadState } from "@/store/localStorage";
import MeetingApi from "@/pages/api/admin/meetings";
import InquiriesApi from "@/pages/api/admin/inquiries";
import InquiryGridCard from "@/components/Cards/InquiryGridCard/InquiryGridCard";
import UsersApi from "@/pages/api/admin/users";
import { getUserName } from "@/helpers/helpers";
import NoDataCardTable from "@/components/Cards/NoDataCard/NoDataCardTable";
import { startSessionCall } from "@/components/Cards/IncomingCard/apiCalls";
import { useDispatch } from "react-redux";
import { updateIncoming } from "@/store/actionSlice";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectActionTrigger } from "@/store/actionSlice";
import Link from "next/link";

function Overview() {
  const [selectedIcon, setSelectedIcon] = useState("overview");
  const [tenantName, setTenantName] = useState("Marketrix");
  const [currentMonth, setCurrentMonth] = useState("");
  const [mLiveInquiriesCount, setMLiveInquiriesCount] = useState(0);
  const [mLiveConnectsCount, setMLiveConnectsCount] = useState(0);
  const [mLiveMeetsCount, setMLiveMeetsCount] = useState(0);
  const [lastIncoming, setLastIncoming] = useState([]);
  const [lastOngoing, setLastOngoing] = useState([]);
  const [users, setUsers] = useState([]);
  const [inquiry, setInquiry] = useState({});
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [profileData, setProfileData] = useState({});
  const visibleInquiryCounts = 3;

  const dispatch = useDispatch();

  useEffect(() => {
    let tenantName = loadState("tenantName");
    if (tenantName) {
      setTenantName(tenantName);
    }

    const date = new Date();
    const month = date.toLocaleString("default", { month: "long" });
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    // load data from local storage
    setUserName(loadState("first_name") || loadState("logged_in_email") || "");
    setProfileData(loadState("profile_data") || {});
    setUserRole(loadState("user_role") || "admin");
  }, []);

  const router = useRouter();
  const handleInnerHeaderButtonClick = () => {
    router.push("/Dashboard/MLivePages/LiveTraffic");
  };
  const getMeetCounts = async () => {
    const response = await MeetingApi.getMeetCounts();
    if (response?.data) {
      console.log("getMeetCounts", response?.data);
      setMLiveMeetsCount(response?.data?.meets);
      return response?.data;
    } else {
      return [];
    }
  };

  const getLiveCounts = async () => {
    const response = await InquiriesApi.getLiveCounts();
    if (response?.data) {
      // console.log("getLiveCounts", response?.data);
      setMLiveInquiriesCount(response?.data?.liveInquiries);
      setMLiveConnectsCount(response?.data?.liveConnects);
      return response?.data;
    } else {
      return [];
    }
  };

  const refreshInquiries = async () => {
    getLastIncoming();
    getLastOngoing();
  };
  const getLastIncoming = async () => {
    const status = "incoming";
    const page = 3;
    const pageSize = visibleInquiryCounts;
    const response = await InquiriesApi.getInquiriesByStatusPagination(
      status,
      page,
      pageSize
    );
    if (response?.data) {
      console.log("incoming", response?.data);
      setLastIncoming(response?.data);
      return response?.data;
    } else {
      return [];
    }
  };

  const getLastOngoing = async () => {
    const status = "ongoing";
    const page = 3;
    const pageSize = visibleInquiryCounts;
    const response = await InquiriesApi.getInquiriesByStatusPagination(
      status,
      page,
      pageSize
    );
    if (response?.data) {
      console.log("ongoing", response?.data);
      setLastOngoing(response?.data);
      return response?.data;
    } else {
      return [];
    }
  };

  const getAllUsers = async () => {
    const response = await UsersApi.get_user();
    if (response?.data) {
      console.log("getAllUsers", response?.data);
      setUsers(response?.data);
    } else {
      return [];
    }
  };

  const trigger = useSelector(selectActionTrigger);

  if (trigger.updateIncomingTableTriggered) {
    refreshInquiries();
  }

  const handleViewOngoingInquiryCallParent = (inquiry) => {};

  const handleViewIncomingInquiryCallParent = (inquiry) => {};

  const incomingInquiryButtonHandle = (inquiry) => {
    console.log("INQUIRY:", inquiry);
    startSession(inquiry);
  };

  const startSession = async (inquiry) => {
    console.log("START SESSION", inquiry);
    const inquiryUpdated = await startSessionCall(inquiry?.inquiry_id);
    setInquiry(inquiryUpdated);
    dispatch(updateIncoming(inquiryUpdated));

    // Extract the necessary data from the liveMeet object
    const domain = inquiryUpdated?.website_domain;
    const meetingId = inquiryUpdated?.video_sdk?.meeting?.meetingId;
    const token = inquiryUpdated?.video_sdk?.token;
    const visitorSocketId = inquiryUpdated?.visitor_socket_id;

    const appId = loadState("app_id") || "marketrix";

    let meetingInfoQuery = {
      inquiryId: inquiry?.inquiry_id,
      adminToken: loadState("access_token"),
      userName: userName,
      userRole: userRole,
      domain: domain,
      meetingId: meetingId,
      token: token,
      userPosition: {},
      profileData: profileData,
      visitorSocketId: visitorSocketId,
      liveMeet: inquiryUpdated,
      appId: appId,
    };

    console.log("START SESSION USER ", meetingInfoQuery);

    const serialized = encodeURIComponent(JSON.stringify(meetingInfoQuery));

    // router.push({
    //   pathname: "/Dashboard/MLivePages/AgentBeforeConnecting",
    //   query: { "marketrix-meet": serialized },
    // });

    let windowHeight = inquiryUpdated?.visitor_info?.windowHeight;
    let windowWidth = inquiryUpdated?.visitor_info?.windowWidth;

    const url = `${meetingInfoQuery.domain}?marketrix-meet=${serialized}`;
    window.open(url, "_blank");

    if (windowHeight && windowWidth) {
      window.open(url, "", "width=" + windowWidth + ",height=" + windowHeight);
    }
  };

  const ongoingInquiryButtonHandle = (inquiry) => {
    console.log("INQUIRY:", inquiry);
    // startSession(inquiry)
  };

  useEffect(() => {
    getMeetCounts();
    getLiveCounts();
    getAllUsers();
    refreshInquiries();
  }, []);

  return (
    <div className="flex w-full h-screen">
      <div className="w-[5%]">
        <IconSideNavBar
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
        />
      </div>

      <div className="w-[95%] overflow-auto scrollbar-hide">
        <div className=" w-[100%] p-[1rem] ">
          <InnerHeader
            mainTitle={tenantName + " Overview"}
            subpara=""
            buttonText="Start MLive"
            buttonIcon="VideoCamPlus"
            onClick={handleInnerHeaderButtonClick}
          />
        </div>
        <div className="grid grid-cols-12 h-[100%] ">
          <div className="2xl:col-span-10 col-span-9 p-[1rem] ">
            <div className="w-[100%] ">
              {/* <div>
                <Link href="/Dashboard/NewOverview" target="_blank">
                  shanilka
                </Link>
              </div> */}
              <div className=" grid grid-cols-3 gap-2 ">
                <div>
                  <OverviewGraphCard
                    graphNumber={mLiveInquiriesCount}
                    outerBgColor={"bg-[#FDF2FA]"}
                    innerBgColor={"bg-[#FCE7F6]"}
                    imageIcon={"/images/overview/headphones.svg"}
                    // imageIcon={"/images/overview/trending-up.svg"}
                    cardHeading={"Mlive Inquiries in " + currentMonth}
                  />
                </div>
                <div>
                  <OverviewGraphCard
                    outerBgColor={"bg-[#ECFDF3]"}
                    innerBgColor={"bg-[#D1FADF]"}
                    graphNumber={mLiveConnectsCount}
                    imageIcon={"/images/overview/phone_outgoing.svg"}
                    cardHeading={"MLive Connects in " + currentMonth}
                  />
                </div>
                <div>
                  <OverviewGraphCard
                    graphNumber={mLiveMeetsCount}
                    outerBgColor={"bg-[#F4F3FF]"}
                    innerBgColor={"bg-[#EBE9FE]"}
                    imageIcon={"/images/meet/video.svg"}
                    cardHeading={"MMeets in " + currentMonth}
                  />
                </div>

                <br />
              </div>

              <div>
                {/* <div className="2xl:col-span-8 col-span-7 ">
                  <div className="pb-5 mtx-h6">Upcoming pitches</div>
                  <div className="">
                    <Card
                      alignItems="center"
                      background="#F9FAFB"
                      hoverColor={"#F9FAFB"}
                      border="1px solid #D0D5DD"
                      borderColor="transparent"
                      borderRadius="8px"
                      // display="flex"
                      // flexDirection="row"
                      gap="12px"
                      width="100%"
                      justifyContent="space-between"
                      paddingBottom={10}
                      paddingLeft={10}
                      paddingRight={10}
                      paddingTop={10}
                    >
                      <PitchCard />
                    </Card>
                  </div>
                </div> */}

                <div className="pb-5">
                  <div className="pb-3 mtx-h6">Incoming Inquiries</div>
                  <div className="">
                    <div>
                      <div
                        className={` grid grid-cols-${visibleInquiryCounts} gap-2`}
                      >
                        {lastIncoming.map((inquiry, index) => {
                          return (
                            <>
                              <InquiryGridCard
                                key={index}
                                name={inquiry?.name}
                                userName={getUserName(inquiry?.user_id, users)}
                                email={inquiry?.email}
                                createdAt={inquiry?.createdAt}
                                currentUrl={inquiry?.currentUrl}
                                websiteDomain={inquiry?.website_domain}
                                message={inquiry?.message}
                                browser={inquiry?.visitor_info?.browser}
                                windowWidth={inquiry?.visitor_info?.windowWidth}
                                country={inquiry?.country}
                                handleViewInquiry={() =>
                                  handleViewIncomingInquiryCallParent(inquiry)
                                }
                                connectButtonHandle={() =>
                                  incomingInquiryButtonHandle(inquiry)
                                }
                                gridCardType="incoming"
                                viewInquiryButtonVisible={false}
                              />
                            </>
                          );
                        })}
                      </div>

                      {lastIncoming.length === 0 && (
                        <>
                          <NoDataCardTable
                            cardHeight={""}
                            message="No Incoming Inquiries"
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="pb-3 mtx-h6">Ongoing Inquiries</div>
                  <div className="">
                    <div>
                      <div
                        className={` grid grid-cols-${visibleInquiryCounts} gap-2`}
                      >
                        {lastOngoing.map((inquiry, index) => {
                          return (
                            <>
                              <InquiryGridCard
                                key={index}
                                name={inquiry?.name}
                                userName={getUserName(inquiry?.user_id, users)}
                                email={inquiry?.email}
                                createdAt={inquiry?.createdAt}
                                currentUrl={inquiry?.currentUrl}
                                websiteDomain={inquiry?.website_domain}
                                message={inquiry?.message}
                                browser={inquiry?.visitor_info?.browser}
                                windowWidth={inquiry?.visitor_info?.windowWidth}
                                country={inquiry?.country}
                                handleViewInquiry={() =>
                                  handleViewOngoingInquiryCallParent(inquiry)
                                }
                                connectButtonHandle={() =>
                                  ongoingInquiryButtonHandle(inquiry)
                                }
                                gridCardType="ongoing"
                                viewInquiryButtonVisible={false}
                              />
                            </>
                          );
                        })}
                      </div>

                      {lastOngoing.length === 0 && (
                        <>
                          <NoDataCardTable
                            cardHeight=""
                            message="No Ongoing Inquiries"
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="2xl:col-span-2 col-span-3 py-[1rem] pr-[1rem] ">
            <CalenderComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
