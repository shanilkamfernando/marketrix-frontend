import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { BadgeInput, Button } from "@creativehub/marketrix-ui";
import ScreenInputField from "@/components/ScreenInputField/ScreenInputField";
import Link from "next/link";
import User from "@/pages/api/admin/users";
import Router from "next/router";
import { loadingTriggered } from "@/store/actionSlice";

import { useDispatch } from "react-redux";
import { loadState } from "@/store/localStorage";

function AdminRegistrationOnboardingStep02() {
  const emailsRef = useRef([]);
  const [emails, setEmails] = useState([]);
  const [tenantName, setTenantName] = useState("creativehub");
  const dispatch = useDispatch();
  const addTeamMembers = () => {
    console.log("emails", emails);

    if (emails.length == 0) {
      Router.push("/Dashboard/NewOverview");
    } else {
      const req = {
        emails: emails,
      };
      dispatch(loadingTriggered(true));
      User.add_users(req).then((response) => {
        if (response?.data) {
          dispatch(loadingTriggered(false));
          Router.push("/Dashboard/NewOverview");
        } else {
          dispatch(loadingTriggered(false));
          alert(response?.message);
        }
      });
    }
  };

  useEffect(() => { 
    setTenantName(loadState("tenantName") || "");
  }, []);

  return (
    <div className="">
      <div className="">
        <div className=" flex justify-center items-center  h-[10vh]">
          <div className="">
            {" "}
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
        </div>
        <div className="flex justify-center items-center h-[90vh]">
          <div className=" flex justify-center p-10 items-center">
            <div className="w-[60%]">
              <div className="flex ">
                <div className=" w-[60%] flex justify-center items-center  p-2">
                  <div>
                    {" "}
                    <div className="mtx-h3 !font-semibold">
                      Let&#39;s add your team members to {tenantName} 
                    </div>
                    <p className="pt-5 text-[#344054] mtx-subtitle1">
                      Get ready to unlock your team&#39;s full potential and
                      take your projects to the next level in this dynamic and
                      engaging community.
                    </p>
                    <div className=" py-5">
                      <div className="pb-2 text-[#344054] !font-medium">
                        Add team members
                        {/* (Maximum 3 for free plan) */}
                      </div>
                      <BadgeInput
                        buttonText="Add"
                        inputPlaceholder="johndoe@example.com"
                        // onEmailsChange={(value: any) => setEmails(value)}
                        // value={emails}
                        onEmailsChange={(emails) => {
                          setEmails(emails); // set the emails
                        }}
                        value={[]}
                      />
                      {/* <ScreenInputField
                        InputFieldName="Add team members (Maximum 3 for free plan)"
                        InputFeildType="email"
                        InputFieldPlaceholder="sajeevan@creativehub.global"
                      /> */}
                    </div>
                    <div className="flex gap-2">
                      <div className="w-[50%]">
                        {/* <Link href="/MLivePages/#" target="_self"> */}
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
                          focusColor="transparent"
                          fontSize="16px"
                          gap="8px"
                          iconColor={"white"}
                          iconSize={"20px"}
                          hoverColor="#6941C6"
                          justifyContent="center"
                          label="Continue"
                          size="sm"
                          width="100%"
                          disabled={emails.length == 0}
                          onClick={addTeamMembers}
                        />
                        {/* </Link> */}
                      </div>

                      <div className="w-[50%]">
                        <Link
                          href="/Dashboard/NewOverview/"
                          target="_self"
                        >
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
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" w-[40%] flex justify-center items-center  p-2">
                  <div className="">
                    <Image
                      src="/images/dashboard/onboardingStep02.svg"
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
    </div>
  );
}

export default AdminRegistrationOnboardingStep02;
