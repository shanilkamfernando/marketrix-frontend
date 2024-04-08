import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Button, Input, URLInput } from "@creativehub/marketrix-ui";
import ScreenInputField from "@/components/ScreenInputField/ScreenInputField";
import TermsandConditionIntro from "@/components/TermsandConditionIntro/TermsandConditionIntro";
import Tenant from "@/pages/api/admin/tenants";
import User from "@/pages/api/admin//users";
import Router from "next/router";
import { useDispatch } from "react-redux";
import {
  setAuthState,
  setTenantName,
  setDomain,
  setNewUser,
  setProductTourStatus
} from "@/store/authSlice";
import { loadingTriggered } from "@/store/actionSlice";
import { AuthContext } from "@/auth/authContext";

function AdminRegistrationOnboardingStep01() {
  const [company, setCompany] = useState("");
  const [websiteDomain, setWebsiteDomain] = useState("");
  const [validDomain, setValidDomain] = useState(false);
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const {
    setTenantStatus,
    checkUserStatus,
    domainExist,
    tenantExist,
  } = authContext;

  const handleCreateCompany = () => {
    const req = {
      name: company,
      website_domain: websiteDomain,
    };
    dispatch(loadingTriggered(true));
    Tenant.create_tenant(req).then((response) => {
      console.log("handleCreateCompany RESPONSE", response);
      var tenantId = response?.data?.id;
      if (tenantId) {
        dispatch(setTenantName(response?.data));
        dispatch(setDomain(response?.data));
        dispatch(loadingTriggered(false));
        console.log("handleCreateCompany tenantId", tenantId);
        handleAddTenant(tenantId);
      } else {
        dispatch(loadingTriggered(false));
        alert(response?.message);
      }
    });
  };

  const handleAddTenant = (tenantId) => {
    const req = {
      tenant_id: tenantId,
    };

    dispatch(loadingTriggered(true));

    User.add_tenant(req).then(async (response) => {
      console.log("handleAddTenant RESPONSE", response);

      if (response?.data) {
        dispatch(setAuthState(response.data));
        dispatch(loadingTriggered(false));
        dispatch(setNewUser(true));
        dispatch(setProductTourStatus(true));
        
        // saveState("connection_status", true);
        await setTenantStatus();

        Router.push("/SignUp/AdminRegistrationOnboardingStep02");
      } else {
        dispatch(loadingTriggered(false));
        alert(response?.message);
      }
    });
  };

  const checkValidDomain = (domain) => {
    let domainRegex = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}$/;
    let validDomain = domainRegex.test(domain);
    console.log("validDomain", validDomain);
    setValidDomain(true);
    // if (validDomain) {
    //   setValidDomain(true);
    // } else {
    //   setValidDomain(false);
    // }
  };
  useEffect(() => {
    checkUserStatus();
  }, []);

  useEffect(() => {
    checkValidDomain(websiteDomain);
  }, [websiteDomain]);

  return (
    <div className="">
      <div className=" flex justify-center items-center  h-[10vh]">
        <div className="flex gap-2 justify-center ">
          <div className="gap-9">
            <Image
              src="/images/mainLogoBlack.svg"
              alt="main logo"
              width={32}
              height={32}
            />
          </div>
          <div className="mtx-h6">marketrix</div>
        </div>
      </div>
      <div className="flex justify-center items-center h-[90vh]">
        <div className=" flex justify-center p-10 items-center">
          <div className="w-[60%]">
            <div className="flex ">
              <div className=" w-[60%] flex justify-center items-center  p-2">
                <div>
                  {" "}
                  <div className="mtx-h3 !font-semibold">
                    What’s name of your workspace?
                  </div>
                  <p className="pt-5 text-[#344054] mtx-subtitle1">
                    A workspace is a virtual environment where you can organize
                    your meetings, templates, teams, and sales pitches.
                  </p>
                  <div className=" pt-5">
                    <ScreenInputField
                      InputFieldName="Enter your company name"
                      InputFeildType="text"
                      InputFieldPlaceholder="CreativeHub"
                      onChangeInput={(value) => setCompany(value)}
                      value={company}
                    />
                  </div>
                  <div className=" pb-5">
                    {/* <div className="mb-2 text-[#344054] mtx-subtitle1">
                        Company Domain
                      </div>
                      <URLInput
                        placeholder="creativehub.global"
                        // onChange={(e) => urlInputChange(e)}
                        onChange={setWebsiteDomain}
                        required={true}
                      /> */}

                    <ScreenInputField
                      InputFieldName="Company Domain"
                      InputFeildType="text"
                      InputFieldPlaceholder="https://creativehub.global"
                      onChangeInput={(value) => setWebsiteDomain(value)}
                      value={websiteDomain}
                    />
                  </div>
                  {company && validDomain && (
                    <>
                      {" "}
                      <div>
                        <Button
                          alignItems="center"
                          background="#7F56D9"
                          border="1px solid"
                          borderColor="#6941C6"
                          borderRadius="8px"
                          color="white"
                          height="44px"
                          direction="column"
                          icon="building"
                          iconPosition="leading"
                          disabledColor="#E9D7FE"
                          display="flex"
                          flexDirection="row"
                          iconColor={"white"}
                          iconSize={"20px"}
                          focusColor="transparent"
                          fontSize="16px"
                          gap="8px"
                          hoverColor="#6941C6"
                          justifyContent="center"
                          label="Create your worksapce"
                          size="sm"
                          width="55%"
                          onClick={handleCreateCompany}
                        />
                      </div>{" "}
                    </>
                  )}
                  <div className="py-5">
                    <TermsandConditionIntro />
                  </div>
                </div>
              </div>
              <div className=" w-[40%] flex justify-center items-center p-2 ">
                <div className="">
                  <Image
                    src="/images/dashboard/onboardingStep01.png"
                    alt="main logo"
                    width={600}
                    height={500}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRegistrationOnboardingStep01;
