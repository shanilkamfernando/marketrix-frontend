import React, { use, useContext, useEffect, useState } from "react";
import {
  ColorPicker,
  Button,
  MouseOver,
  Card,
  Toggle,
  Avatar,
} from "@creativehub/marketrix-ui";
import { BsCheckCircleFill } from "react-icons/bs";
import { FiFlag } from "react-icons/fi";
import {
  TbColumns3,
  TbColorFilter,
  TbVectorTriangle,
  TbClockHour3,
} from "react-icons/tb";
import { RiEye2Line } from "react-icons/ri";
import { MdEmergencyRecording } from "react-icons/md";
import { PiBrowser } from "react-icons/pi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { loadState } from "@/store/localStorage";
import {
  apiCallTriggered,
  loadingTriggered,
  selectActionTrigger,
  liveConnectTriggered,
} from "@/store/actionSlice";
import { useDispatch, useSelector } from "react-redux";
import Tenant from "@/pages/api/admin/tenants";
import { AuthContext } from "@/auth/authContext";
import MarketrixLive from "../MarketrixLive/MarketrixLive";
import { useRouter } from "next/router";
function LiveSettingsPage({
  setIsUpdateUrlOpen,
  setIsUpdateInquiryOpen,
  setIsUpdateMliveForm,
  setIsUpdateButtonPositionOpen,
  setIsUpdatePopDelayOpen,
  setIsWidgetPopup,
  widgetVisible, // Widget visibility state
  widgetType, // Widget type state
  recordActive,
}) {
  const [domain, setDomain] = useState("Creativehub.global");
  const trigger = useSelector(selectActionTrigger);
  const [visibility, setVisibility] = useState(null);
  const [recordActiveStatus, setRecordActiveStatus] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const { packageName, checkUserLoggedIn } = authContext;
  const [recordAccess, setRecordAccess] = useState(false);

  const [upgradePackage, setUpgradePackage] = useState("");

  const [upgradeButton, setUpgradeButton] = useState(false);
  useEffect(() => {
    // console.log("packageName___________", packageName);
    if (packageName === "free") {
      setUpgradePackage("Starter");
      setUpgradeButton(true);
      setRecordAccess(false);
    } else if (packageName === "starter") {
      setUpgradePackage("Pro");
      setUpgradeButton(true);
      setRecordAccess(true);
    } else if (packageName === "pro") {
      setUpgradePackage("Enterprise");
      setUpgradeButton(true);
      setRecordAccess(true);
    } else if (packageName === "enterprise") {
      setUpgradeButton(false);
      setRecordAccess(true);
    }

    // if (
    //   packageName === "starter" ||
    //   packageName === "pro" ||
    //   packageName === "enterprise"
    // ) {
    //   setRecordAccess(true);
    // } else {
    //   setRecordAccess(false);
    // }
  }, [packageName]);

  const openLiveConnect = () => {
    dispatch(liveConnectTriggered(true));
    router.push("/Dashboard/MLivePages/LiveTraffic");
  }
  const widgetVisibleToggle = (status) => {
    if (status === true) {
      setVisibility(false);
    } else {
      setVisibility(true);
    }
  };

  const recordActiveToggle = (status) => {
    if (status === true) {
      setRecordActiveStatus(false);
    } else {
      setRecordActiveStatus(true);
    }
  };

  const saveChanges = () => {
    const req = {
      widget_visible: visibility,
      recordActive: recordActiveStatus,
    };

    console.log("Save changes", req);

    //API CALL
    dispatch(loadingTriggered(true));
    Tenant.update_tenant(req).then((response) => {
      if (response?.data) {
        console.log("response", response);
        dispatch(loadingTriggered(false));
        dispatch(apiCallTriggered(true));
      } else {
        console.log("Error", response);
        dispatch(loadingTriggered(false));
        alert(response?.message);
      }
    });
  };

  const getWidgetType = (widgetType) => {
    switch (widgetType) {
      case "standard":
        return "Standard Widget";
      case "recorded":
        return "Pre-Recorded Widget";
      case "trixy":
        return "Trixy AI Widget";
      default:
        return "Standard Widget";
    }
  };

  useEffect(() => {
    setVisibility(widgetVisible);
  }, [widgetVisible]);

  useEffect(() => {
    setRecordActiveStatus(recordActive);
  }, [recordActive]);

  useEffect(() => {
    let domain = loadState("website_domain");
    if (domain) {
      setDomain(domain);
    } else {
      setDomain("Creativehub.global");
    }
  }, []);

  useEffect(() => {
    console.log("API CALL ", trigger.apiCallTriggered);
    let domain = loadState("website_domain");
    if (domain) {
      setDomain(domain);
    } else {
      setDomain("Creativehub.global");
    }
    dispatch(apiCallTriggered(false));
  }, [trigger.apiCallTriggered]);

  // useEffect(() => {}, [domain]);
  const handleUpdateurlClick = () => {
    setIsUpdateUrlOpen(true);
  };

  const redirectToSite = () => {
    window.open(domain, "_blank");
  };
  return (
    <div className="w-[100%] ">
      
      <div className="flex flex-col 2xl:gap-2">
        <div>
       
          <div className=" mtx-h6 pl-2 ">Widget Settings</div>

          {/* <div className="flex mtx-body2 mb-1 pl-2 text-[#667085]">
            Take full control and personlize your MLive button settings
          </div> */}
        </div>

        <div className="flex !font-medium mtx-body2 py-2">
          <div className="flex items-start w-[100%] ">
            <div className="w-[100%]">
              <div className="relative  w-[100%]">
                <Card
                  alignItems="center"
                  background="#F2F4F7"
                  border="1px solid #E4E7EC"
                  borderRadius="8px"
                  flexDirection="row"
                  hoverColor="#F3F4F6"
                  justifyContent="flex-start"
                >
                  <div className="flex items-center justify-between p-4">
                    <div className="flex gap-1 items-center">
                      <BsCheckCircleFill
                        size={20}
                        className="text-green-600 m-4"
                      />
                      <div className="flex flex-col  !font-bold mtx-body2 ">
                        <span className="cursor-pointer" onClick={redirectToSite}>{domain}</span>
                        <span className="flex !font-normal mtx-body2">
                          {/* If you change this URL, you won&#39;t receive new user
                          inquiries into the MLIVE dashboard. */}
                          The above is the connected URL to recieving MLive
                          traffic
                        </span>
                      </div>
                    </div>

                    <div>
                      <Button
                        alignItems="center"
                        background="#F2F4F7"
                        border="1px solid"
                        borderColor="#F2F4F7"
                        borderRadius="8px"
                        color="#667085"
                        direction="row"
                        disabledColor="#F2F4F7"
                        display="flex"
                        flexDirection="row"
                        focusColor="#F2F4F7"
                        fontSize="14px"
                        gap="8px"
                        icon="chevRight"
                        iconPosition="trailing"
                        justifyContent="center"
                        label="Set Up & Check Connnection"
                        size="sm"
                        onClick={openLiveConnect}
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex p-2">
          <div className="flex items-center text-[#344054] mtx-body1 !font-medium">
            General
          </div>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row text-[#344054] mtx-body2 !font-medium items-center justify-between w-[20%]">
            <div className="flex items-center">
              <FiFlag className="m-2" size={22} />
              Inquiry types
            </div>

            <div className="flex items-center">
              <MouseOver
                alignItems="center"
                background="black"
                borderRadius="8px"
                color="white"
                display="flex"
                fontWeight={"400"}
                fontSize="12px"
                width={"250px"}
                justifyContent="center"
                padding="8px 8px"
                position="absolute"
                text="You can set the number of inquiries you'd like to receive, making it easier to manage incoming requests."
                textAlign="center"
                className=""
              >
                <AiOutlineQuestionCircle className=" gap-2 cursor-pointer" />
              </MouseOver>
            </div>
          </div>

          <div className="w-[20%] flex justify-end">
            <Button
              alignItems="center"
              borderColor="#F2F4F7"
              borderRadius="8px"
              color="#667085"
              direction="row"
              disabledColor="#F2F4F7"
              display="flex"
              flexDirection="row"
              fontSize="12px"
              gap="8px"
              icon="chevRight"
              iconPosition="trailing"
              justifyContent="center"
              label="4 Added"
              size="sm"
              onClick={setIsUpdateInquiryOpen}
            />
          </div>
        </div>

        <div className="border-b-[0.5px]"></div>

        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row text-[#344054] mtx-body2 !font-medium items-center justify-between w-[20%]">
            <div className="flex items-center">
              <TbColumns3 className="m-2" size={22} />
              Manage Mlive form
            </div>

            <div className="flex items-center">
              <MouseOver
                alignItems="center"
                background="black"
                borderRadius="8px"
                color="white"
                display="flex"
                fontWeight={"400"}
                fontSize="12px"
                width={"250px"}
                justifyContent="center"
                padding="8px 8px"
                position="absolute"
                text="With this feature, you can control the number of input fields users need to complete in order to send their information to us."
                textAlign="center"
                className=""
              >
                <AiOutlineQuestionCircle className="gap-2 cursor-pointer" />
              </MouseOver>
            </div>
          </div>

          <div className="w-[20%] flex justify-end">
            <Button
              alignItems="center"
              borderColor="#F2F4F7"
              borderRadius="8px"
              color="#667085"
              direction="row"
              disabledColor="#F2F4F7"
              display="flex"
              flexDirection="row"
              fontSize="14px"
              gap="8px"
              icon="chevRight"
              iconPosition="trailing"
              justifyContent="center"
              label="Change"
              size="sm"
              onClick={setIsUpdateMliveForm}
            />
          </div>
        </div>

        <div className="border-b-[0.5px]"></div> */}

        {/* <div className="flex p-2">
          <div className="flex items-center text-[#344054] mtx-body1 !font-medium pt-3">
            Personlization
          </div>
        </div> */}

        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row text-[#344054] mtx-body2 !font-medium items-center justify-between w-[20%] ">
            <div className="flex items-center">
              <RiEye2Line className="m-2" size={22} />
              Widget Visibility
            </div>

            <div className="flex items-center">
              <MouseOver
                alignItems="center"
                background="black"
                borderRadius="8px"
                color="white"
                display="flex"
                fontWeight={"400"}
                fontSize="12px"
                width={"250px"}
                justifyContent="center"
                padding="8px 8px"
                position="absolute"
                text="Feel free to customize the Marketrix Live theme to align perfectly with your company's branding"
                textAlign="center"
                className=""
              >
                <AiOutlineQuestionCircle className="cursor-pointer" />
              </MouseOver>
            </div>
          </div>

          <div className="flex flex-row items-center  gap-3 w-[20%] justify-end">
            <div className="text-[#667085] text-[14px]">
              {/* Visible {widgetVisible}{" "} */}
              {widgetVisible ? <> Visible</> : <> In-Visible </>}
            </div>
            {/* <Toggle /> */}
            <Toggle
              isChecked={visibility}
              onChange={() => widgetVisibleToggle(visibility)}
            />

            {/* <ColorPicker
              backgroundColor="transparent"
              borderRadius="100%"
              color="#7F56D9"
              height="24px"
              onChange={() => {}}
              width="22px"
            /> */}

            {/* <Button
              alignItems="center"
              borderColor="#F2F4F7"
              borderRadius="8px"
              color="#667085"
              direction="row"
              disabledColor="#F2F4F7"
              display="flex"
              flexDirection="row"
              fontSize="14px"
              gap="8px"
              icon="chevRight"
              iconPosition="trailing"
              justifyContent="center"
              label="Change"
              size="sm"
            /> */}
          </div>
        </div>
        <div className="border-b-[0.5px]"></div>

        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row text-[#344054] mtx-body2 !font-medium items-center justify-between w-[20%] ">
            <div className="flex items-center">
              <PiBrowser className="m-2" size={22} />
              Widget Type
            </div>

            <div className="flex items-center">
              <MouseOver
                alignItems="center"
                background="black"
                borderRadius="8px"
                color="white"
                display="flex"
                fontWeight={"400"}
                fontSize="12px"
                width={"250px"}
                justifyContent="center"
                padding="8px 8px"
                position="absolute"
                text="Feel free to customize the Marketrix Live theme to align perfectly with your company's branding"
                textAlign="center"
                className=""
              >
                <AiOutlineQuestionCircle className="cursor-pointer" />
              </MouseOver>
            </div>
          </div>

          <div className="flex flex-row items-center w-[35%] justify-end">
            {/* <ColorPicker
              backgroundColor="transparent"
              borderRadius="100%"
              color="#7F56D9"
              height="24px"
              onChange={() => {}}
              width="22px"
            /> */}

            {/* <Avatar
              alt="Irosha Profile Pic"
              border="none"
              borderRadius="100%"
              width={"50px"}
              height={"50px"}
              image={"/images/profileImage.png"}
            /> */}

            <Button
              alignItems="center"
              borderColor="#F2F4F7"
              borderRadius="8px"
              color="#667085"
              direction="row"
              disabledColor="#F2F4F7"
              display="flex"
              flexDirection="row"
              fontSize="14px"
              gap="8px"
              icon="chevRight"
              iconPosition="trailing"
              justifyContent="center"
              label={getWidgetType(widgetType)}
              size="sm"
              onClick={setIsWidgetPopup}
            />
          </div>
        </div>
        <div className="border-b-[0.5px]"></div>

        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row text-[#344054] mtx-body2 !font-medium items-center justify-between w-[20%] ">
            <div className="flex items-center">
              <MdEmergencyRecording className="m-2" size={22} />
              Record Sessions
            </div>

            <div className="flex items-center">
              <MouseOver
                alignItems="center"
                background="black"
                borderRadius="8px"
                color="white"
                display="flex"
                fontWeight={"400"}
                fontSize="12px"
                width={"250px"}
                justifyContent="center"
                padding="8px 8px"
                position="absolute"
                text="Feel free to customize the Marketrix Live theme to align perfectly with your company's branding"
                textAlign="center"
                className=""
              >
                <AiOutlineQuestionCircle className="cursor-pointer" />
              </MouseOver>
            </div>
          </div>
          <div className="flex flex-row items-center  gap-3 w-[20%] justify-end">
            <div className="text-[#667085] text-[14px]">
              {recordActive ? <> Active</> : <> Inactive </>}
            </div>
            {/* <Toggle /> */}

            {recordAccess ? (
              <>
                <Toggle
                  isChecked={recordActiveStatus}
                  onChange={() => recordActiveToggle(recordActiveStatus)}
                />
              </>
            ) : (
              <>
                <div style={{ pointerEvents: "none" }} className="opacity-75">
                  <Toggle isChecked={recordActiveStatus} />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="border-b-[0.5px]"></div>

        {/* <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row text-[#344054] mtx-body2 !font-medium items-center justify-between w-[20%] ">
            <div className="flex items-center">
              <TbColorFilter className="m-2" size={22} />
              MLive color
            </div>

            <div className="flex items-center">
              <MouseOver
                alignItems="center"
                background="black"
                borderRadius="8px"
                color="white"
                display="flex"
                fontWeight={"400"}
                fontSize="12px"
                width={"250px"}
                justifyContent="center"
                padding="8px 8px"
                position="absolute"
                text="Feel free to customize the Marketrix Live theme to align perfectly with your company's branding"
                textAlign="center"
                className=""
              >
                <AiOutlineQuestionCircle className="cursor-pointer" />
              </MouseOver>
            </div>
          </div>

          <div className="flex flex-row items-center  w-[20%] justify-end">
            <ColorPicker
              backgroundColor="transparent"
              borderRadius="100%"
              color="#7F56D9"
              height="24px"
              onChange={() => {}}
              width="22px"
            />

            <Button
              alignItems="center"
              borderColor="#F2F4F7"
              borderRadius="8px"
              color="#667085"
              direction="row"
              disabledColor="#F2F4F7"
              display="flex"
              flexDirection="row"
              fontSize="14px"
              gap="8px"
              icon="chevRight"
              iconPosition="trailing"
              justifyContent="center"
              label="Change"
              size="sm"
            />
          </div>
        </div>

        <div className="border-b-[0.5px]"></div> */}

        {/* <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row text-[#344054] mtx-body2 !font-medium items-center w-[20%] justify-between">
            <div className="flex items-center">
              <TbVectorTriangle className="m-2" size={22} />
              Button Position
            </div>
            <div className="flex items-center">
              <MouseOver
                alignItems="center"
                background="black"
                borderRadius="8px"
                color="white"
                display="flex"
                fontWeight={"400"}
                fontSize="12px"
                width={"250px"}
                justifyContent="center"
                padding="8px 8px"
                position="absolute"
                text="you change change the mlive button position in your website screen"
                textAlign="center"
                className=""
              >
                <AiOutlineQuestionCircle className="cursor-pointer" />
              </MouseOver>
            </div>
          </div>
          <div className="flex flex-row items-center gap-1 w-[20%] justify-end">
            <Button
              alignItems="center"
              borderColor="#F2F4F7"
              borderRadius="8px"
              color="#667085"
              direction="row"
              disabledColor="#F2F4F7"
              display="flex"
              flexDirection="row"
              fontSize="14px"
              gap="8px"
              icon="chevDown"
              iconPosition="trailing"
              justifyContent="center"
              label="Bottom Right"
              size="sm"
              onClick={setIsUpdateButtonPositionOpen}
            />
          </div>
        </div>

        <div className="border-b-[0.5px]"></div> */}

        {/* <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row text-[#344054] mtx-body2 !font-medium items-center justify-between w-[20%]">
            <div className="flex items-center">
              <TbClockHour3 className="m-2" size={22} />
              Pop-Up Delay
            </div>

            <div className="flex items-center">
              <MouseOver
                alignItems="center"
                background="black"
                borderRadius="8px"
                color="white"
                display="flex"
                fontWeight={"400"}
                fontSize="12px"
                width={"250px"}
                justifyContent="center"
                padding="8px 8px"
                position="absolute"
                text="Specify the delay time for the button to pop up after a user visits your website and views this section."
                textAlign="center"
                className=""
              >
                <AiOutlineQuestionCircle className="ml-11 cursor-pointer" />
              </MouseOver>
            </div>
          </div>
          <div>
            <Button
              alignItems="center"
              borderColor="#F2F4F7"
              borderRadius="8px"
              color="#667085"
              direction="row"
              disabledColor="#F2F4F7"
              display="flex"
              flexDirection="row"
              fontSize="14px"
              gap="8px"
              icon="chevDown"
              iconPosition="trailing"
              justifyContent="center"
              label="After 30 seconds"
              size="sm"
              onClick={setIsUpdatePopDelayOpen}
            />
          </div>
        </div> */}

        <div className="flex flex-row justify-end items-center w-full  pt-3">
          <div className="flex  gap-[0.5rem]">
            <Button
              alignItems="center"
              background="white"
              border="1px solid"
              borderColor="#D0D5DD"
              borderRadius="8px"
              color="#344054"
              direction="row"
              display="flex"
              flexDirection="row"
              fontSize="14px"
              fontWeight="500"
              gap="8px"
              justifyContent="center"
              label="Cancel"
              hoverColor="#F3F4F6"
              size="custom"
              paddingLeft={15}
              paddingBottom={5}
              paddingTop={5}
              paddingRight={15}
            />
            <Button
              alignItems="center"
              background="#7F56D9"
              hoverColor="#6941C6"
              border="1px solid"
              borderColor="#7F56D9"
              borderRadius="8px"
              color="white"
              direction="row"
              display="flex"
              flexDirection="row"
              fontSize="14px"
              fontWeight="500"
              gap="8px"
              justifyContent="center"
              label="Save"
              size="custom"
              paddingLeft={35}
              paddingBottom={5}
              paddingTop={5}
              paddingRight={35}
              onClick={saveChanges}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveSettingsPage;
