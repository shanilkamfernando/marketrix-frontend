import React, { useEffect, useState } from "react";
import {
  Accordion1,
  Button,
  URLInput,
  CodeDisplay,
} from "@creativehub/marketrix-ui";
import { FaChevronRight } from "react-icons/fa";
import { BsCheckCircle, BsCheckCircleFill } from "react-icons/bs";
import { BsCheckLg } from "react-icons/bs";
import { useRouter } from "next/router";
import LoadingIcon from "../Loading/LoadingIcon";
import Tenant from "@/pages/api/admin/tenants";
import { loadState } from "@/store/localStorage";
import { setDomain } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { apiCallTriggered } from "@/store/actionSlice";

function WizardAccordion({ type, index }) {
  const [mainSymbol, setMainSymbol] = useState("3 steps left");
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

  // const app_id = loadState("app_id")

  const dispatch = useDispatch();

  useEffect(() => {
    setAppId(loadState("app_id") || "");
    setAppKey(loadState("app_secret") || "");
    setWebsiteDomain(loadState("website_domain") || "");
  }, []);

  // const urlInputChange = (value: any) => {
  //   console.log("urlInputChange", value)
  //   setUrlInputValue(value)
  //   setIsFirstAccordionCompleted(false)
  // }
  const handleContinueFirstAccordion = async () => {
    if (urlInputValue.trim() === "") {
      setErrorMessage("Please enter a valid URL.");
      return;
    }

    setErrorMessage("");
    setIsFirstAccordionCompleted(true);
    setActiveAccordionIndex(1);
    await saveDomainUrl(urlInputValue);

    setMainSymbol("2 Steps left");
  };

  const handleContinueSecondAccordion = () => {
    setIsSecondAccordionCompleted(true);
    setMainSymbol("Completed");

    console.log("handleContinueSecondAccordion mainSymbol", mainSymbol);
    console.log("handleContinueSecondAccordion type", type); //type is console log as em
    if (mainSymbol == "Completed" && type == "onboarding") {
      router.push("/Dashboard/MLivePages/LiveTraffic");
    }
  };

  const handleShowComponent = async () => {
    setMainSymbol("1 step left");
    setIsLoading(true);

    if (websiteDomain == "") {
      window.open(websiteDomain, "_blank");
      return;
    }

    ///Simulating a delay of 2 seconds before showing the "Connected" text and the "Continue" button

    // setTimeout(() => {
    //   setShowComponent(true);
    //   setIsLoading(false);
    // }, 2000);
  };

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
  const saveDomainUrl = async (url) => {
    if (url === "") {
      alert("Please enter a valid URL");
    } else {
      const req = {
        website_domain: url,
      };
      //API CALL
      // alert(url);

      Tenant.update_tenant(req).then((response) => {
        if (response?.data) {
          dispatch(setDomain(response.data));
          setShowComponent(true);
          setIsLoading(false);
          dispatch(apiCallTriggered(true));
        } else {
          alert(response?.message);
        }
      });
    }
  };

  const codeValue2 = `
    <script>
      window.marketrixLiveSettings = {
        api_base: "https://api-live.marketrix.io",
        app_id: "JhYhjksete"
      };
    </script>

    <script>
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = '...';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'marketrix-jssdk'));
    </script>
  `;

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
    <div className="w-[100%]">
      <div className="!font-bold mtx-h4 mb-4">Your quick start guide</div>
      <div>
        <Accordion1
          mainSymbol={
            <div
              className={`!font-semibold mtx-subtitle1 flex items-center ${
                mainSymbol === "Completed" ? "text-green-500" : ""
              }`}
            >
              {mainSymbol === "Completed" ? (
                <div>
                  <BsCheckCircleFill className="mr-1 text-green-500 " />
                  {mainSymbol}
                </div>
              ) : (
                mainSymbol
              )}
            </div>
          }
          subSymbol={
            <div className="flex items-center">
              <FaChevronRight />
            </div>
          }
          items={[
            {
              title: [
                <div
                  className="!font-bold mtx-subtitle1 flex items-center"
                  key={index}
                >
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/cotton/64/cursor--v2.png"
                    alt="cursor--v2"
                    color="black"
                  />
                  <span className="ml-2">
                    Get ready to connect with your visitors
                  </span>
                </div>,
              ],
              children: [
                {
                  content: (
                    <div className="flex flex-col items-start justify-items-start mr-8 gap-4 ">
                      <div className=" !font-medium mtx-subtitle1 text-[#344054] text-left gap-2">
                        Please enter the domain name(s) of the website(s) where
                        you <br /> would like to use Marketrix Live. Example
                        :&nbsp;
                        <span>
                          <a href="#" className="underline">
                            www.example.com, <br />
                          </a>
                        </span>
                        <span>
                          <a href="#" className="underline">
                            www.anotherexample.com
                          </a>
                        </span>
                      </div>

                      <div className="flex flex-col gap-4 w-[100%]">
                        <URLInput
                          placeholder="Companyname.com"
                          // onChange={(e) => urlInputChange(e)}
                          onChange={setUrlInputValue}
                          required={true}
                          disabled={isFirstAccordionCompleted}
                        />
                        <div className="flex flex-row !font-bold text-sm  text-[#D92D20]">
                          {errorMessage}
                        </div>
                      </div>
                      <div className="flex gap-4">
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
                          disabled={isFirstAccordionCompleted}
                          gap="8px"
                          hoverColor="#6941C6"
                          justifyContent="center"
                          label="Continue"
                          size="md"
                          onClick={handleContinueFirstAccordion}
                        />
                      </div>
                    </div>
                  ),
                  title: (
                    <div className="!font-semibold mtx-subtitle1 text-[#1D2939] flex items-center">
                      {isFirstAccordionCompleted ? (
                        <BsCheckCircle className="mr-2 text-green-500" />
                      ) : (
                        <BsCheckCircle className="mr-2" />
                      )}
                      <span className="ml-2">Add your website URL</span>
                    </div>
                  ),
                },

                {
                  content: (
                    <div className="flex flex-col gap-4 items-start justify-items-start mr-8">
                      <div className="flex !font-bold mtx-subtitle1 text-left">
                        Setting up the LiveConnect for visitors lets you contact
                        with people when they are on your website.
                      </div>

                      <div>
                        <div className="flex !font-medium mtx-subtitle1 text-[#1D2939] text-left">
                          1. Copy and paste this code snippet before the
                          &lt;body&gt; tag in every page you want the
                          LiveConnect to appear.
                        </div>
                        <div className="pt-[1.5rem]">
                          <CodeDisplay code={codeValue} />
                        </div>
                      </div>

                      <div>
                        <div className="flex !font-medium mtx-subtitle1  text-[#1D2939] text-left">
                          2. Once you completed, go to your website. your
                          LiveConnect button should appear in the position you
                          selected.
                        </div>

                        <div className="!font-normal mtx-subtitle1 ml-5 text-[#667085] text-left">
                          Don’t see LiveConnect on your website? Check our
                          &nbsp;
                          <span>
                            <a className="underline underline-offset-4">
                              troubleshooting blogs
                            </a>
                          </span>
                          &nbsp; or&nbsp;
                          <span>
                            <a className="underline underline-offset-4">
                              Contact us.
                            </a>
                          </span>
                        </div>
                      </div>

                      <div className="">
                        <div className="flex !font-medium mtx-subtitle1  text-[#1D2939] text-left">
                          3. Verify your LiveConnect is sending data to
                          Marketrix Live
                        </div>
                        <div className=" pt-[1.5rem]">
                          {!showComponent && (
                            <div className="flex items-center justify-start">
                              <Button
                                alignItems="center"
                                background="#F9F5FF"
                                border="1px solid"
                                borderColor="#F9F5FF"
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
                                onClick={handleShowComponent}
                              />
                              {isLoading && (
                                <div className="flex items-center ml-2">
                                  <LoadingIcon loaidngMessage={"Checking"} />
                                </div>
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
                                onClick={handleContinueSecondAccordion}
                              />

                              <div className="flex items-center ml-2">
                                <BsCheckLg className="text-green-500" />
                                <span className="ml-1 text-green-500">
                                  Connected
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ),
                  title: (
                    <div className="!font-semibold mtx-subtitle1 text-[#1D2939] flex items-center">
                      {isSecondAccordionCompleted ? (
                        <BsCheckCircle className="mr-2 text-green-500" />
                      ) : (
                        <BsCheckCircle className="mr-2" />
                      )}
                      <span className="ml-2">
                        Add LiveConnect to your website and test
                      </span>
                    </div>
                  ),
                },
              ],
            },
          ]}
          defaultOpenIndex={0}
          // Add this line to open the first nested accordion by default
        />
      </div>
    </div>
  );
}

export default WizardAccordion;
