import React, { useEffect, useState, useRef, use, useContext } from "react";
import IconSideNavBar from "@/components/SideNavBar/IconSideNavBar/IconSideNavBar";
import IncomingCard from "@/components/Cards/IncomingCard/IncomingCard";
import MLiveIncomingNavBar from "@/components/SideNavBar/MLiveIncomingNavBar/MLiveIncomingNavBar";
//import { Inquiry } from "@/interfaces/inquiry";
import {
  getTimeAgo,
  getFormattedTimeHM,
  removeObjectFromArray,
  getUserName,
  getUserImage,
  getCountryLogo,
  getBrowserLogo,
} from "../../../helpers/helpers";
import { loadState, saveStateSession } from "@/store/localStorage";
import TwoButtonIconWithTitle from "@/components/Buttons/TwoButtonIconWithTitle/TwoButtonIconWithTitle";
import UsersApi from "@/pages/api/admin/users";
import { useDispatch } from "react-redux";
import { loadingTriggered, updateIncoming } from "@/store/actionSlice";
import {
  deleteInquiryCall,
  getLiveCounts,
  updateInquiry,
  startSessionCall,
  getIncomingInquiriesCall,
} from "@/components/Cards/IncomingCard/apiCalls";
import { AuthContext } from "@/auth/authContext";
import NoDataCardTable from "@/components/Cards/NoDataCard/NoDataCardTable";
import LiveInquiriesRightNav from "@/components/RightNavBar/LiveInquiriesRightNav";
import DeleteInquiry from "@/components/Popouts/DeleteInquiry";
function LiveIncoming() {
  const authContext = useContext(AuthContext);
  const [selectedIcon, setSelectedIcon] = useState("incoming");
  const [selectedButton, setSelectedButton] = useState(
    "IncomingQ"
  );
  const [inquiry, setInquiry] = useState({} );
  const [domain, setDomain] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [profileData, setProfileData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [count, setCount] = useState({});
  const [users, setUsers] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dispatch = useDispatch();
  const [gridView, setGridView] = useState(false);
  const [isDeleteInquiryOpen, setIsDeleteInquiryOpen] = useState(false);
  useEffect(() => {
    // load data from local storage
    setDomain(loadState("website_domain") || "");
    setUserName(loadState("first_name") || loadState("logged_in_email") || "");
    setProfileData(loadState("profile_data") || {});
    setUserRole(loadState("user_role") || "admin");
  }, []);

  useEffect(() => {
    getIncomingInquiries();
    getAllUsers();
  }, []);

  // useEffect(() => {

  //   const domain = loadState("website_domain");
  //   console.log("domain", domain);
  //   if (domain == null) {
  //     setDomainExist(false);
  //     Router.push("/Dashboard/MLivePages/Live")
  //   } else {
  //     setDomainExist(true);
  //   }
  // }, []);

  if (!authContext) {
    return null; // Or show some loading/error message when the context is not available yet.
  }
  const { isLoggedIn, domainExist } = authContext;

  const handleGridViewChange = (value) => {
    if (value === true) {
      setGridView(true);
    } else {
      setGridView(false);
    }
  };

  const handleViewInquiry = async (data) => {
    data.checked = true;
    console.log("handleViewInquiry", data);

    if (data?.user_id === null) {
      let updatedInquiry = await updateInquiry(data, data?.inquiry_id);
      console.log("updatedInquiry", updatedInquiry);

      setInquiry(updatedInquiry);
      await getCounts();
    } else {
      setInquiry(data);
    }

    console.log("handleViewInquiry", data);
  };

  const startSession = async (inquiry) => {
    console.log("START SESSION", inquiry);
    dispatch(loadingTriggered(true));
    const inquiryUpdated = await startSessionCall(inquiry?.inquiry_id);
    dispatch(loadingTriggered(false));
    console.log("START SESSION UPDATED", inquiryUpdated);
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
      message: "Hi, I am " + userName + " from " + domain + ".",
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

    // window.open(url, "_blank");
    if (windowHeight && windowWidth) {
      window.open(url, "", "width=" + windowWidth + ",height=" + windowHeight);
    }
  };

  const getIncomingInquiries = async () => {
    dispatch(loadingTriggered(true));
    let inquiries = await getIncomingInquiriesCall();
    dispatch(loadingTriggered(false));
    setTableData(inquiries);
    getCounts();
  };

  const getCounts = async () => {
    dispatch(loadingTriggered(true));
    let count = await getLiveCounts();
    dispatch(loadingTriggered(false));
    setCount(count);
    saveStateSession("counts", count);
  };

  const deleteInquiry = async () => {
    console.log("Inquiry", inquiry);
    let updatedTable = await removeObjectFromArray(tableData, inquiry); // remove the inquiry from the table data
    setTableData(updatedTable);
    dispatch(loadingTriggered(true));
    await deleteInquiryCall(inquiry?.id); // delete inquiry from database
    dispatch(loadingTriggered(false));
    //getCounts();
    setInquiry({}); // reset inquiry object
    setIsDeleteInquiryOpen(false);
  };

  const deleteConfirm = () => {
    setIsDeleteInquiryOpen(true);
  };

  const closeNotificationModal = () => {
    setIsNotificationOpen(false);
  };

  const getAllUsers = async () => {
    dispatch(loadingTriggered(true));
    const response = await UsersApi.get_user();
    if (response?.data) {
      setUsers(response?.data);
      dispatch(loadingTriggered(false));
    } else {
      dispatch(loadingTriggered(false));
      return [];
    }
  };

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
                      headerTitle={"New Inquiries"}
                      headerParagraph={
                        "Connect with incoming live inquiries from website visitors"
                      }
                      gridViewChange={handleGridViewChange}
                    />
                  </div>
                </div>
                {tableData.length > 0 ? (
                  <>
                    <div className="grid grid-cols-12 relative pb-5 h-[90vh]">
                      <div
                        className={` 2xl:col-span-9 col-span-8 pl-[1rem] pr-[0.2rem] overflow-y-auto `}
                      >
                        {/* <div className={`${gridView === true ? "2xl:col-span-12" : "2xl:col-span-9"} col-span-8 px-[1rem]`}> */}
                        <div className="w-[100%] ">
                          <div className="  ">
                            <div className="scroll-smooth grid gap-y-[0.5rem]">
                              <IncomingCard
                                users={users}
                                tableData={tableData}
                                getIncomingInquiries={getIncomingInquiries}
                                handleViewInquiryCallParent={handleViewInquiry}
                                deleteInquiryCallParent={deleteConfirm}
                                gridView={gridView}
                                inquiryButtonHandle={startSession}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {isDeleteInquiryOpen && (
                        <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                          <div className="p-5 ">
                            <DeleteInquiry
                              onClose={() => setIsDeleteInquiryOpen(false)}
                              deleteFunction={deleteInquiry}
                            />
                          </div>
                        </div>
                      )}

                      {/* {!gridView && ( */}
                      <div className="2xl:col-span-3 col-span-4 px-[1rem] overflow-auto scrollbar-hide">
                        <div className="overflow-y-scroll-hidden">
                          {Object.keys(inquiry).length != 0 ? (
                            <LiveInquiriesRightNav
                              personsName={inquiry?.name}
                              message={inquiry?.message}
                              inquiryType={inquiry?.inquiry_type}
                              incomingTime={getTimeAgo(inquiry?.createdAt)}
                              startTime={inquiry?.start_time}
                              endTime={inquiry?.end_time}
                              timewithNumber={getFormattedTimeHM(
                                inquiry?.createdAt
                              )}
                              userEmail={inquiry?.email}
                              workEmail={inquiry?.email}
                              companyLogo="/images/profileImage.png"
                              companyName={inquiry?.company}
                              countryLogo={getCountryLogo(inquiry?.country)}
                              countryName={inquiry?.country}
                              phoneNo={inquiry?.phone_no}
                              browserLogo={getBrowserLogo(
                                inquiry?.visitor_info?.browser
                              )}
                              browserName={inquiry?.visitor_info?.browser}
                              deviceName={inquiry?.visitor_info?.platform}
                              requestedEmail={inquiry?.website_domain}
                              networkStrength={
                                inquiry?.visitor_info?.networkEffectiveType +
                                " - " +
                                inquiry?.visitor_info?.networkDownlink +
                                " Mbps"
                              }
                              screenResolution={
                                inquiry?.visitor_info?.screenResolution
                              }
                              deleteInquiry={deleteInquiry}
                              userImage={getUserImage(inquiry?.user_id, users)}
                              agentName={getUserName(inquiry?.user_id, users)}
                              checked={inquiry?.checked} //for now i have implement the startsession function asin here they shows an error if i didnt implement the function as i have pass the prop as a fucntion
                              type={"incoming"}
                              inquiryButtonHandle={() => startSession(inquiry)}
                            />
                          ) : (
                            <div>
                              {/* <Card
                                alignItems="flex-start"
                                background="#F9FAFB"
                                border="1px solid #E4E7EC"
                                borderRadius="8px"
                                display=""
                                flexDirection="column"
                                gap="24px"
                                height="85vh"
                                hoverColor=" #F2F4F7"
                                justifyContent=""
                                left=""
                                paddingBottom={15}
                                paddingLeft={15}
                                paddingRight={15}
                                paddingTop={15}
                                top=""
                                width="100%"
                              >
                                <div className=" h-full flex justify-center items-center text-[#101828]  !font-regular">
                                  Tap an inquiry to unveil its details!
                                </div>
                              </Card> */}
                            </div>
                          )}
                        </div>
                      </div>
                      {/* )} */}
                    </div>
                  </>
                ) : (
                  <>
                    <NoDataCardTable
                      cardHeight={"h-[80vh]"}
                      message="No Incoming Inquiries"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LiveIncoming;
