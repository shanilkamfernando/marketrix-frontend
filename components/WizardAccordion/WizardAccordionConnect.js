import React, { useEffect, useState } from "react";
import {
  Accordion1,
  Button,
  URLInput,
  CodeDisplay,
  Modal,
} from "@creativehub/marketrix-ui";
import { FaChevronRight, FaRegWindowClose } from "react-icons/fa";
import { BsCheckCircle, BsCheckCircleFill } from "react-icons/bs";
import { BsCheckLg } from "react-icons/bs";
import { useRouter } from "next/router";
import LoadingIcon from "../Loading/LoadingIcon";
import Tenant from "@/pages/api/admin/tenants";
import { loadState } from "@/store/localStorage";
import { setDomain } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { apiCallTriggered } from "@/store/actionSlice";
import Link from "next/link";
import { setConnectionStatus } from "@/store/authSlice";
import { RiVideoChatLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

function WizardAccordionConnect({
  type,
  index,
  connectionStatus,
  onClose,
  connectionFailedFunc,
  connectionSuccessFunc,
}) {
  const [mainSymbol, setMainSymbol] = useState("2 steps left");
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(0);
  const [urlInputValue, setUrlInputValue] = useState("");
  const [isFirstAccordionCompleted, setIsFirstAccordionCompleted] =
    useState(false);
  const [isSecondAccordionCompleted, setIsSecondAccordionCompleted] =
    useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [snippetUrl, setSnippetUrl] = useState("");

  const router = useRouter();
  const [appId, setAppId] = useState("");
  const [appKey, setAppKey] = useState("");
  const [websiteDomain, setWebsiteDomain] = useState("");
  const [openedWindow, setOpenedWindow] = useState(null);
  const [checkConnectionStatus, setCheckConnectionStatus] = useState(false);
  // const app_id = loadState("app_id")

  const dispatch = useDispatch();

  useEffect(() => {
    setAppId(loadState("app_id") || "");
    setAppKey(loadState("app_secret") || "");
    setWebsiteDomain(loadState("website_domain") || "");
  }, []);

  const conitnueToMLive = () => {
    onClose();
    router.push("/Dashboard/MLivePages/LiveTraffic");
  };

  function convertToHttpsUrl(domain) {
    // Check if the domain starts with http:// or https://
    if (!domain.startsWith("http://") && !domain.startsWith("https://")) {
      // Prepend https:// if it doesn't start with either protocol
      domain = `https://${domain}`;
    }

    return `${domain}?check-connection=${true}`;
  }

  const checkConnection = async () => {
    setCheckConnectionStatus(true);
    setIsLoading(true);

    const url = convertToHttpsUrl(websiteDomain);
    console.log("checkConnection url_____", url);
    const newWindow = window.open(url, "_blank", "width=600,height=400");
    setOpenedWindow(newWindow);

    console.log(" newWindow", newWindow);
  };

  const checkConnection2 = () => {
    alert("Checking Connection - Need to implement");
  };

  const connectionSuccess = () => {
    if (openedWindow && !openedWindow.closed) {
      openedWindow.close();
      setShowComponent(true);
      setIsLoading(false);
      setCheckConnectionStatus(false);
      connectionSuccessFunc();
    }
  };
  const connectionFailed = () => {
    if (openedWindow && !openedWindow.closed) {
      openedWindow.close();
      setIsLoading(false);
      setCheckConnectionStatus(false);
      dispatch(setConnectionStatus(false));
      connectionFailedFunc();
    }
  };
  useEffect(() => {
    console.log("connectionStatus", connectionStatus);
    if (connectionStatus) {
      connectionSuccess();
    } else {
      connectionFailed();
    }
  }, [connectionStatus]);

  useEffect(() => {
    console.log("checkConnectionStatus_________", checkConnectionStatus);
    if (checkConnectionStatus) {
      setTimeout(() => {
        //   console.log("setTimeout connectionStatus", connectionStatus);
        //  console.log("setTimeout showComponent", showComponent);.

        if (checkConnectionStatus) {
          console.log(
            "setTimeout checkConnectionStatus",
            checkConnectionStatus
          );
          connectionFailed();
        }
      }, 10000);
    }
  }, [checkConnectionStatus]);

  const snippetCode = async () => {
    Tenant.snippetCode().then((response) => {
      if (response?.data) {
        console.log("Snippet URL:", response?.data);
        setSnippetUrl(response?.data);
      } else {
        alert(response?.message);
      }
    });
  };

  const codeValue = `
    <script
      // eslint-disable-next-line react/no-unknown-property
      marketrix-id="${appId}"
      // eslint-disable-next-line react/no-unknown-property
      marketrix-key="${appKey}"
      src="${snippetUrl}"> 
    </script>`;

  useEffect(() => {
    snippetCode();
  }, []);
  return (
    <Modal
      background="#ffffff"
      borderRadius="8px"
      border="1px solid #D0D5DD"
      borderColor="#D0D5DD"
      boxShadow="0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 12px 16px -4px rgba(16, 24, 40, 0.10)"
      height="100%"
      onClose={onClose} // Close the modal on request
      show
      transition="2.5s ease-out"
      visibility="visible"
      width="100%"
    >
      <div className="w-[100%] p-4 ">
        <div className=" flex w-full  ">
          <div className="w-[98%] !font-bold mtx-h7  mb-1">
            Add LiveConnect to your website{" "}
            {websiteDomain && <>({websiteDomain})</>} & Test
          </div>
          <div onClick={onClose} className="cursor-pointer p-2">
            {" "}
            <IoMdClose size={24} color="#000000" />
          </div>
        </div>

        <div className="!font-normal mtx-subtitle2  mb-2 text-[#667085] text-left">
          Setting up the LiveConnect for visitors lets you contact with people
          when they are on your website.
        </div>
        <div class="border border-gray-300 rounded-lg overflow-x-auto p-8">
          <div className="flex flex-col gap-2 items-start justify-items-start mr-8">
            {/* Comment: Center the code snippet in the modal with a new wrapper and class mx-auto */}
            <div className="mx-auto">
              <div>
                <div className="flex !font-medium mtx-subtitle1 text-[#1D2939] text-left">
                  1. Copy and paste this code snippet before the &lt;body&gt;
                  tag in every page you want the LiveConnect to appear.
                </div>
                <div className="pt-[1.5rem]">
                  <CodeDisplay code={codeValue} />
                </div>
              </div>

              <div>
                <div className="flex !font-medium mtx-subtitle1  text-[#1D2939] text-left">
                  2. Once you completed, go to your website. your LiveConnect
                  button should appear in the position you selected.
                </div>

                <div className="!font-normal mtx-subtitle1 ml-5 text-[#667085] text-left">
                  Don’t see LiveConnect on your website? Check our &nbsp;
                  <span>
                    <a className="underline underline-offset-4">
                      troubleshooting blogs
                    </a>
                  </span>
                  &nbsp; or&nbsp;
                  <span>
                    <a className="underline underline-offset-4">Contact us.</a>
                  </span>
                </div>
              </div>

              <div className="">
                <div className="flex !font-medium mtx-subtitle1  text-[#1D2939] text-left">
                  3. Verify your LiveConnect is sending data to Marketrix Live
                </div>
                <div className=" pt-[1.5rem]">
                  {!showComponent && (
                    <div className="flex items-center justify-start gap-2">
                      <Button
                        alignItems="center"
                        background="#F9F5FF"
                        border="1px solid"
                        borderColor="#6941C6"
                        borderRadius="8px"
                        color="#6941C6"
                        direction="row"
                        disabledColor="#E9D7FE"
                        display="flex"
                        flexDirection="row"
                        focusColor="#F4EBFF"
                        fontWeight="500px"
                        gap="8px"
                        hoverColor="#F9F5FF"
                        justifyContent="center"
                        label="Check Connection"
                        size="md"
                        onClick={checkConnection}
                        disabled={isLoading}
                        width="100%"
                      />

                      {isLoading ? (
                        <div className="flex items-center ml-2">
                          <LoadingIcon loaidngMessage={"Checking"} />
                        </div>
                      ) : (
                        <>
                          <Button
                            alignItems="center"
                            background="white"
                            border="1px solid"
                            borderColor="#D0D5DD"
                            borderRadius="8px"
                            color="black"
                            height="44px"
                            direction="column"
                            iconPosition="leading"
                            disabledColor="#E9D7FE"
                            display="flex"
                            flexDirection="row"
                            focusColor="transparent"
                            fontSize="16px"
                            gap="8px"
                            justifyContent="center"
                            label="Skip"
                            size="sm"
                            width="100%"
                            hoverColor={"#F3F4F6"}
                            //     onClick={conitnueToMLive}
                            onClick={onClose}
                          />
                        </>
                      )}
                    </div>
                  )}

                  {showComponent && (
                    <div className="flex items-center justify-start">
                      <Button
                        alignItems="center"
                        background="#7F56D9"
                        border="1px solid"
                        borderColor="#6941C6"
                        borderRadius="8px"
                        color="white"
                        direction="row"
                        disabledColor="#E9D7FE"
                        display="flex"
                        flexDirection="row"
                        focusColor="#F4EBFF"
                        fontWeight="500px"
                        gap="8px"
                        hoverColor="#6941C6"
                        justifyContent="center"
                        label="Continue"
                        size="md"
                        onClick={conitnueToMLive}
                      />

                      <div className="flex items-center ml-2">
                        <BsCheckLg className="text-green-500" />
                        <span className="ml-1 text-green-500">Connected</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default WizardAccordionConnect;
