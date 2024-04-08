import AvatarWithMail from "@/components/Avatar/avatarWithMail";
import InquiriesApi from "@/pages/api/admin/inquiries";
import {
  loadingTriggered,
  selectActionTrigger,
  updateLiveTraffic,
} from "@/store/actionSlice";
import { loadState, loadStateSession } from "@/store/localStorage";
import { Avatar, Button } from "@creativehub/marketrix-ui";
import Image from "next/image";
import React, {
  useEffect,
  useState,
  useImperativeHandle,
  useContext,
} from "react";
// import { BsArrowUpRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  capitalizeWords,
  formatTime,
  getBrowserLogo,
  getCountryLogo,
  getDeviceIcon,
  getTimeAgo,
  removeProtocol,
  removeQueryParamFromURL,
  trimURLToMaxLength,
} from "@/helpers/helpers";
import Link from "next/link";
import LiveTrafficeGridCard from "../LiveTrafficeGridCard/LiveTrafficeGridCard";
import router from "next/router";
import { startSessionCall } from "../IncomingCard/apiCalls";
import NoDataCardTable from "../NoDataCard/NoDataCardTable";
import { AuthContext } from "@/auth/authContext";
// interface VISITOR {
//   appId: any;
//   name: any;
//   designation: any;
//   company: any;
//   message: any;
//   email: any;
//   phone_no: any;
//   inquiry_type: any;
//   domain: any;
//   visitorDevice: any;
//   visitorSocketId: any;
//   country: any;
//   profileImg: any;
//   live_connect: Boolean;
// }

function LiveTrafficCard({ gridView, Height }) {
  const authContext = useContext(AuthContext);
  const { proStatus, checkUserLoggedIn, packageName } = authContext;

  const [liveVisitors, setLiveVisitors] = useState("");

  const dummyUsers = [
    {
      id: "1",
      userName: "John Doe",
      profileImg: "https://i.pravatar.cc/150?img=1",
      currentUrl: "https://www.google.com/",
      visitedTime: "2021-09-01T10:00:00.000Z",
      cursorId: "1",
      userRole: "visitor",
      visitorDevice: {
        browser: "Chrome",
        windowWidth: 1920,
        country: "Sri Lanka",
      },
    },
    {
      id: "2",
      userName: "John Doe",
      profileImg: "https://i.pravatar.cc/150?img=2",
      currentUrl: "https://www.google.com/",
      visitedTime: "2021-09-01T10:00:00.000Z",
      cursorId: "2",
      userRole: "visitor",
      visitorDevice: {
        browser: "Chrome",
        windowWidth: 1920,
        country: "Sri Lanka",
      },
    },
    {
      id: "3",
      userName: "John Doe",
      profileImg: "https://i.pravatar.cc/150?img=3",
      currentUrl: "https://www.google.com/",
      visitedTime: "2021-09-01T10:00:00.000Z",
      cursorId: "3",
      userRole: "visitor",
      visitorDevice: {
        browser: "Chrome",
        windowWidth: 1920,
        country: "Sri Lanka",
      },
    },
  ];

  const [domain, setDomain] = useState("");
  const [userRole, setUserRole] = useState("");
  const [profileImg, setProfileName] = useState("");
  const [userName, setUserName] = useState("");
  const [profileData, setProfileData] = useState({});
  const [appId, setAppId] = useState("marketrix");
  const trigger = useSelector(selectActionTrigger);

  const dispatch = useDispatch();

  useEffect(() => {
    const data = loadStateSession("liveTraffic") || [];
    console.log("TABLE LIVE VISITORS", data);
    const visitors = data.reverse();
    checkUserLoggedIn();
    //console.log("PROS STATUS ", proStatus);

    // visitors.forEach((visitor) => {
    //   if (
    //     (packageName === "starter" ||
    //       packageName === "pro" ||
    //       packageName === "enterprise") &&
    //     visitor.visitorDevice &&
    //     visitor?.ipData.country_name == "Sri Lanka"
    //   ) {
    //     // If proStatus is true and visitorDevice is present
    //     visitor.visitorDevice.country = "United States";
    //     visitor.ipData.country_name = "United States";
    //     visitor.ipData.timezone = "San Francisco";
    //   }
    // });
    setLiveVisitors(visitors);
    dispatch(updateLiveTraffic(false));
  }, [trigger.updateLiveTrafficTriggered]);

  useEffect(() => {
    // load data from local storage
    setDomain(loadState("website_domain") || "");
    setUserName(loadState("first_name") || loadState("logged_in_email") || "");
    setProfileData(loadState("profile_data") || {});
    setUserRole(loadState("user_role") || "admin");
    setAppId(loadState("app_id"));
  }, []);

  const connect = async (data) => {
    let visitor = {
      appId: data.appId,
      profileImg: "",
      name: data.userName,
      designation: "",
      company: "",
      message: "",
      email: "",
      phone_no: "",
      inquiry_type: "General",
      inquiry_status: "Ongoing",
      domain: domain,
      visitorDevice: data.visitorDevice,
      visitorSocketId: data.id,
      country: data.country,
      live_connect: true,
    };
    console.log("CONNECT", visitor);

    let meeting = await createMeeting(visitor);

    console.log("MEETING", meeting);

    const meetingId = meeting?.video_sdk?.meeting?.meetingId;
    const token = meeting?.video_sdk?.token;
    const visitorSocketId = meeting?.visitor_socket_id;

    let meetingInfoQuery = {
      inquiryId: meeting?.inquiry_id,
      adminToken: loadState("access_token"),
      userName: userName,
      userRole: userRole,
      domain: domain,
      meetingId: meetingId,
      token: token,
      userPosition: {},
      profileData: profileData,
      visitorSocketId: visitorSocketId || data.id,
      liveMeet: meeting,
      appId: appId || data.appId,
      liveData: data,
    };

    console.log("meetingInfoQuery", meetingInfoQuery);

    const serialized = encodeURIComponent(JSON.stringify(meetingInfoQuery));
    console.log("ID___________", meeting?.inquiry_id);
    //    await startSessionCall(meeting?.inquiry_id);

    router.push({
      pathname: "/Dashboard/MLivePages/AgentBeforeConnecting",
      query: { "marketrix-meet": serialized },
    });
  };

  const createMeeting = async (visitor) => {
    console.log("visitor.....", visitor);
    dispatch(loadingTriggered(true));
    let inquiry = {
      name: visitor.name,
      designation: visitor.designation,
      company: visitor.company,
      message: visitor.message,
      email: visitor.email,
      phone_no: visitor.phone_no,
      inquiry_type: visitor.inquiry_type,
      app_id: visitor.appId,
      visitor_info: visitor.visitorDevice,
      visitor_socket_id: visitor?.visitorSocketId,
      country: visitor?.country,
      live_connect: visitor?.live_connect,
    };

    return await InquiriesApi.createInquiry(inquiry)
      .then(async (res) => {
        console.log("InquiriesApi.createInquiry res", res);
        const meeting = res.data;
        dispatch(loadingTriggered(false));
        return meeting;
      })
      .catch((err) => {
        alert("ERROR");
        console.log(err);
      }); // error handling
  };

  // const modifiedURL = removeQueryParamFromURL("https://example.com/page?exampleParam=value&otherParam=123", "exampleParam");
  if (!authContext) {
    return null; // Or show some loading/error message when the context is not available yet.
  }
  return (
    <>
      {liveVisitors.length > 0 ? (
        <>
          {gridView ? (
            <>
              <div className=" grid grid-cols-3 gap-2 ">
                {liveVisitors.map((visitor, index) => {
                  return (
                    <LiveTrafficeGridCard
                      key={index}
                      id={visitor?.id}
                      userName={capitalizeWords(visitor?.userName)}
                      profileImg={visitor?.profileImg}
                      currentUrl={trimURLToMaxLength(visitor?.currentUrl, 30)}
                      visitedTime={visitor?.visitedTime}
                      cursorId={visitor?.cursorId}
                      userRole={visitor?.userRole}
                      browser={visitor?.visitorDevice?.browser}
                      windowWidth={visitor?.visitorDevice?.windowWidth}
                      country={visitor?.ipData?.country_name}
                      city={visitor?.ipData?.timezone}
                      connectButtonHandle={() => connect(visitor)}
                      utmCampaign={visitor?.utm?.utm_campaign}
                      utmContent={visitor?.utm?.utm_content}
                      utmMedium={visitor?.utm?.utm_medium}
                      utmSource={visitor?.utm?.utm_source}
                      utmTerm={visitor?.utm?.utm_term}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="border border-gray-300 rounded-lg overflow-x-auto  !font-medium">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="text-[12px] !font-medium border-b border-gray-300 text-left uppercase bg-[#F9FAFB] text-[#667085]">
                      <th className="p-2">Users</th>
                      <th className="p-2">Source/Medium</th>
                      <th className="p-2">Country</th>
                      <th className="p-2">Current URL</th>
                      <th className="p-2">Visited Time</th>

                      {/* <th className="p-2">Socket Id</th>
            <th className="p-2">cursor Id</th>
            <th className="p-2">Role</th> */}
                      <th className="p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {liveVisitors.map((visitor, index) => {
                      return (
                        <tr
                          className={`border-b border-gray-300 text-[14px] text-[#1D2939]
            ${
              visitor.checked === false && "bg-[#7F56D9] !font-bold"
            } cursor-default`}
                          key={index}
                        >
                          <>
                            <td className="text-left p-2 ">
                              <AvatarWithMail
                                personName={capitalizeWords(visitor?.userName)}
                                personEmail={visitor?.id} //for now i have include the avatar component.
                                personalImage={visitor?.profileImg} //here I have create a variable name. integrations needed to be done
                              />
                            </td>
                            <td className="text-left p-2 ">
                              {visitor?.visitorDevice?.browser} / Organic
                            </td>
                            <td className="text-left mx-2 my-5 flex gap-2 items-center">
                              <Image
                                src={getDeviceIcon(
                                  visitor?.visitorDevice?.windowWidth
                                )} //here also we should display the device image
                                width={24}
                                height={24}
                                alt=""
                              />

                              <Avatar
                                border="none"
                                borderRadius="50%"
                                height="24px"
                                image={getCountryLogo(
                                  visitor?.ipData?.country_name
                                )}
                                width="24px"
                              />
                            </td>
                            <td className="text-left p-2  ">
                              <div className="flex gap-2 items-center ">
                                <Image
                                  src={getBrowserLogo(
                                    visitor?.visitorDevice?.browser
                                  )} //here also we should add the browser Image
                                  width={24}
                                  height={24}
                                  alt=""
                                />
                                {trimURLToMaxLength(visitor?.currentUrl, 30)}

                                {/* <BsArrowUpRight /> */}
                              </div>
                            </td>
                            <td className="text-left p-2 ">
                              {getTimeAgo(visitor?.visitedTime)}
                            </td>
                            {/* <td className="text-left p-2 ">{visitor?.id}</td>
              <td className="text-left p-2 ">{visitor?.cursorId}</td>
              <td className="text-left p-2 ">{visitor?.role}</td> */}

                            <div className="mx-2 my-5">
                              <Button
                                alignItems="center"
                                gap={"2px"}
                                background="#FFFFFF"
                                border="1px solid"
                                borderColor="#D0D5DD"
                                hoverColor={"#F2F4F7"}
                                color="#344054"
                                fontSize={"14px"}
                                fontWeight={"500"}
                                display="flex"
                                label={"Connect"}
                                icon="Headphones"
                                iconSize={"14px"}
                                iconPosition="leading"
                                justifyContent="start"
                                size="custom"
                                paddingBottom={5}
                                paddingLeft={5}
                                paddingRight={5}
                                paddingTop={5}
                                onClick={() => connect(visitor)}
                              />
                              {/* </Link> */}
                            </div>
                          </>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="">
          <NoDataCardTable
            cardHeight={`2xl:h-[77vh] h-[74vh]`}
            message="No Website Visitors Active Right Now"
          />
        </div>
      )}
    </>
  );
}

export default LiveTrafficCard;
