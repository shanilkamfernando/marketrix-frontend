import React, { useEffect, useState } from "react";
import { Button, Card } from "@creativehub/marketrix-ui";
import { BsCheckCircleFill } from "react-icons/bs";
import Link from "next/link";

function BillingPage() {
  return (
    <div className="w-[100%]">
      <div className="flex flex-col gap-2">
        <div>
          <div className=" mtx-h6  text-gray-800">Billing & Subscription</div>
        </div>

        <div className="flex items-start w-[100%] !font-medium mtx-body2 py-10">
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
                <div className="flex gap-1 items-center ">
                  <BsCheckCircleFill size={20} className="text-green-600 m-4" />
                  <div className="flex flex-col  !font-bold mtx-body2 ">
                    <span className="text-gray-900">
                      Free Plan
                    </span>
                    <span className="flex !font-normal mtx-body2 text-gray-600">
                      Next Billing Date : - 
                    </span>
                  </div>
                </div>

                <div className="flex gap-5 items-center">
                  {/* <div className="">
                    <Button
                      alignItems="center"
                      background="transparent"
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
                      justifyContent="center"
                      label="Cancel Your Subscription"
                      size="sm"
                      // onClick={setIsUpdateUrlOpen}
                    />
                  </div> */}
                  <div className="">
                    <Link href={"/Dashboard/SettingsPage/Pricing"}>
                      <Button
                        alignItems="center"
                        background="transparent"
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
                        gap="3px"
                        icon="chevRight"
                        iconPosition="trailing"
                        justifyContent="center"
                        label="Update"
                        size="sm"
                        // onClick={setIsUpdateUrlOpen}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* <div className="">
          <div className="flex items-center text-[#344054] mtx-body1 !font-medium pb-5">
            Card Details
          </div>

          <div className="flex items-start w-[100%] !font-medium">
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
                <div
                  key={String(42)}
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex gap-1 items-center ">
                    <img
                      src="../../images/settings/cardIcon.svg"
                      width={20}
                      height={20}
                      className="m-4"
                    />
                    <div className="flex flex-col  !font-bold mtx-body2 ">
                      <span className="text-gray-900">Thimira Dulakshitha</span>
                      <span className="flex !font-normal mtx-body2 text-gray-600">
                        **** **** **** 2121
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-5 items-center">
                    <div className="">
                      <Button
                        alignItems="center"
                        background="transparent"
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
                        justifyContent="center"
                        label="Cancel Your Subscription"
                        size="sm"
                        // onClick={setIsUpdateUrlOpen}
                      />
                    </div>
                    <div className="">
                      <Button
                        alignItems="center"
                        background="transparent"
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
                        gap="3px"
                        icon="chevRight"
                        iconPosition="trailing"
                        justifyContent="center"
                        label="Manage card details"
                        size="sm"
                        // onClick={setIsUpdateUrlOpen}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default BillingPage;
