import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar, Button, InputPlain } from "@creativehub/marketrix-ui";
import AvatarWithMail from "@/components/Avatar/avatarWithMail";
// import { BsArrowUpRight } from "react-icons/bs";
import {
  getBrowserLogo,
  getCountryLogo,
  getDeviceIcon,
  getTimeAgo,
} from "@/helpers/helpers";
import { loadState } from "@/store/localStorage";
import { startSessionCallLive } from "@/components/Cards/IncomingCard/apiCalls";
import router from "next/router";

function AgentBeforeConnecting() {
  const [user, setUser] = useState("Ajith");
  const [visitorName, setVisitorName] = useState("Shanilka");
  const [currentUrl, setCurrentUrl] = useState(
    "https://marketrix.io/mlive/pricing"
  );
  const [browser, setBrowser] = useState("Google Chrome");
  const [windowWidth, setWindowWidth] = useState(1920);
  const [windowHeight, setWindowHeight] = useState(1080);
  const [visitedTime, setVisitedTime] = useState("2 minutes ago");
  const [country, setCountry] = useState("United States");
  const [message, setMessage] = useState("How can I help you today?");
  const [queryObj, setQueryObj] = useState();

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = React.useRef(null);

  const connectButtonHandle = async () => {
    console.log("connectButtonHandle", queryObj);
    let inquiryId = queryObj?.inquiryId;
    await startSessionCallLive(inquiryId);

    let connectQuery = {
      inquiryId: queryObj?.inquiryId,
      adminToken: queryObj?.adminToken,
      userName: queryObj?.userName,
      userRole: queryObj?.userRole,
      domain: queryObj?.domain,
      meetingId: queryObj?.meetingId,
      token: queryObj?.token,
      userPosition: {},
      profileData: queryObj?.profileData,
      visitorSocketId: queryObj?.visitorSocketId,
      liveMeet: queryObj?.liveMeet,
      appId: queryObj?.appId,
      message: message,
    };
    console.log("connectQuery", connectQuery);

    const serialized = encodeURIComponent(JSON.stringify(connectQuery));
    const url = `${connectQuery.domain}?marketrix-meet=${serialized}`;

    if (windowHeight && windowWidth) {
      window.open(url, "", "width=" + windowWidth + ",height=" + windowHeight);
    }

    // router.push({
    //   pathname: "/Dashboard/MLivePages/LiveTraffic"
    // });
  };

  const toggleCam = () => {
    setIsCameraOn((prevIsCameraOn) => !prevIsCameraOn);
  };

  const toggleMic = () => {
    setIsMicrophoneOn((prevIsMicrophoneOn) => !prevIsMicrophoneOn);
  };

  const setWebCam = () => {
    console.log("isCameraOn", isCameraOn);
    console.log("isMicrophoneOn", isMicrophoneOn);

    const constraints = {
      video: isCameraOn,
      audio: isMicrophoneOn,
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        setStream(mediaStream);
        console.log("mediaStream", mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      })
      .catch((error) => {
        console.error("Error accessing the camera and microphone:", error);
      });
  };

  useEffect(() => {
    setWebCam();
  }, [isCameraOn, isMicrophoneOn]);

  useEffect(() => {
    const url = window.location.href;
    const queryString = new URL(url).searchParams.get("marketrix-meet");

    if (queryString != null) {
      const decodedString = decodeURIComponent(queryString);

      const liveData = JSON.parse(decodedString)?.liveData;

      if (liveData) {
        setVisitedTime(liveData?.visitedTime);
        setCurrentUrl(liveData?.currentUrl);
      } else {
        setVisitedTime(liveData?.createdAt);
        setCurrentUrl(JSON.parse(decodedString)?.domain);
      }

      const liveMeet = JSON.parse(decodedString)?.liveMeet;
      console.log("liveMeet___", liveMeet);
      setVisitorName(liveMeet?.name);
      setBrowser(liveMeet?.visitor_info?.browser);
      setWindowWidth(liveMeet?.visitor_info?.windowWidth);
      setWindowHeight(liveMeet?.visitor_info?.windowHeight);
      setCountry(liveMeet?.visitor_info?.country);
      setQueryObj(JSON.parse(decodedString));
    }

    let user = loadState("first_name") || loadState("logged_in_email");
    if (user) {
      setUser(user);
    }
  }, []);
  return (
    <div className=" h-screen p-10 w-[100%]">
      <div className=" flex justify-center items-start ">
        <div className="w-[50%] ">
          <div className="w-full flex justify-center items-center flex-col">
            <div className="mtx-h4 !font-medium w-[70%] text-center text-[#344054]">
              Hey {user}! You are going to connect with a user.
            </div>

            <div className="text-[#667085] mtx-subtitle1 pt-3">
              Your camera preview
            </div>
          </div>
          <div className="py-5">
            <div className="flex justify-center">
              {isCameraOn ? (
                <div className="w-[250px] h-[250px] overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted={!isMicrophoneOn}
                    className="w-full h-full object-cover rounded-full transform scaleX-[-1]"
                    style={{ transform: "scaleX(-1)" }}
                  />
                </div>
              ) : (
                <>
                  <Image
                    src="/images/live/cameraPreview.png"
                    alt="cameraPreview"
                    width={250}
                    height={250}
                  />
                </>
              )}
            </div>
          </div>
          <div className="w-[100%] flex  justify-center ">
            <div className="w-[50%]">
              <div className="text-[#344054] !font-medium mtx-body2">
                Your Message
              </div>
              <div className="pt-1">
                <InputPlain
                  placeholder="How can I help you today?"
                  width={"100%"}
                  padding={7}
                  borderRadius={"8px"}
                  border={"1px solid #D0D5DD"}
                  placeHolderColor={"#101828"}
                  boxShadow={"0px 1px 2px 0px rgba(16, 24, 40, 0.05)"}
                  onChange={(value) => {
                    setMessage(value);
                  }}
                  value={message}
                />
              </div>
              <div className=" pt-5 flex justify-between items-center">
                <div className="flex gap-5">
                  {isMicrophoneOn ? (
                    <>
                      <Button
                        alignItems="center"
                        background="white"
                        border="1px solid"
                        borderColor="#D0D5DD"
                        borderRadius="8px"
                        color="#667085"
                        focusColor="#F4EBFF"
                        fontSize="16px"
                        fontWeight="900"
                        gap="8px"
                        hoverColor="#F3F4F6"
                        icon="michrophoneIcon"
                        iconPosition="leading"
                        justifyContent="center"
                        label=""
                        paddingBottom={8}
                        paddingLeft={8}
                        paddingRight={8}
                        paddingTop={8}
                        size="custom"
                        onClick={toggleMic}
                      />
                    </>
                  ) : (
                    <>
                      <Button
                        alignItems="center"
                        background="white"
                        border="1px solid"
                        borderColor="#D0D5DD"
                        borderRadius="8px"
                        color="#667085"
                        focusColor="#F4EBFF"
                        fontSize="16px"
                        fontWeight="900"
                        gap="8px"
                        hoverColor="#F3F4F6"
                        icon="micOff"
                        iconPosition="leading"
                        justifyContent="center"
                        label=""
                        paddingBottom={8}
                        paddingLeft={8}
                        paddingRight={8}
                        paddingTop={8}
                        size="custom"
                        onClick={toggleMic}
                      />
                    </>
                  )}

                  {isCameraOn ? (
                    <>
                      <Button
                        alignItems="center"
                        background="white"
                        border="1px solid"
                        borderColor="#D0D5DD"
                        borderRadius="8px"
                        color="#667085"
                        focusColor="#F4EBFF"
                        fontSize="16px"
                        fontWeight="900"
                        gap="8px"
                        hoverColor="#F3F4F6"
                        icon="Video camera"
                        iconPosition="leading"
                        justifyContent="center"
                        label=""
                        paddingBottom={8}
                        paddingLeft={8}
                        paddingRight={8}
                        paddingTop={8}
                        size="custom"
                        onClick={toggleCam}
                      />
                    </>
                  ) : (
                    <>
                      {" "}
                      <Button
                        alignItems="center"
                        background="white"
                        border="1px solid"
                        borderColor="#D0D5DD"
                        borderRadius="8px"
                        color="#667085"
                        focusColor="#F4EBFF"
                        fontSize="16px"
                        fontWeight="900"
                        gap="8px"
                        hoverColor="#F3F4F6"
                        icon="videoOff"
                        iconPosition="leading"
                        justifyContent="center"
                        label=""
                        paddingBottom={8}
                        paddingLeft={8}
                        paddingRight={8}
                        paddingTop={8}
                        size="custom"
                        onClick={toggleCam}
                      />
                    </>
                  )}
                </div>
                <div className="w-[60%]">
                  <Button
                    alignItems="center"
                    background="#7F56D9"
                    border="1px solid"
                    borderColor="transparent"
                    color="#ffffff"
                    fontSize="16px"
                    fontWeight={"500"}
                    direction="row"
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    label="Connect"
                    paddingBottom={10}
                    paddingLeft={60}
                    paddingRight={60}
                    paddingTop={10}
                    width={"100%"}
                    size="custom"
                    hoverColor="#6941C6"
                    onClick={connectButtonHandle}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className=" w-[80%] m-10 ">
          <table className="w-full border-collapse hover:bg-gray-100 duration-150 delay-50">
            <tbody>
              <tr className={`text-[14px] text-[#1D2939] cursor-default`}>
                <>
                  <td className="text-left p-2 ">
                    <AvatarWithMail
                      personName={visitorName}
                      personEmail="" //for now i have include the avatar component.
                      personalImage="/images/profileImage.png" //here I have create a variable name. integrations needed to be done
                    />
                  </td>
                  <td className="text-left p-2 ">{browser}/ Direct</td>
                  <td className="text-left mx-2 my-5 flex gap-2 items-center">
                    <Image
                      src={getDeviceIcon(windowWidth)} //here also we should display the device image
                      width={24}
                      height={24}
                      alt=""
                    />

                    <Avatar
                      border="none"
                      borderRadius="50%"
                      height="24px"
                      image={getCountryLogo(country)}
                      width="24px"
                    />
                  </td>
                  <td className="text-left p-2  ">
                    <div className="flex gap-2 items-center ">
                      <Image
                        src={getBrowserLogo(browser)} //here also we should add the browser Image
                        width={24}
                        height={24}
                        alt=""
                      />
                      {currentUrl}
                      {/* <BsArrowUpRight /> */}
                    </div>
                  </td>
                  <td className="text-left p-2 ">{getTimeAgo(visitedTime)}</td>
                  {/* <td className="text-left p-2 ">{visitor?.id}</td>
              <td className="text-left p-2 ">{visitor?.cursorId}</td>
              <td className="text-left p-2 ">{visitor?.userRole}</td> */}
                </>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AgentBeforeConnecting;
