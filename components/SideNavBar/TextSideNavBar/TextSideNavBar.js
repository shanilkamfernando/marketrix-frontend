import { Button, SideNavigationBar, Card } from "@creativehub/marketrix-ui";
import Link from "next/link";
import React, { useState } from "react";

function TextSideNavBar() {
  return (
    <div className="bg-red-800">
      <SideNavigationBar
        alignItems="center"
        background="#ffffff"
        display="flex"
        flexDirection="column"
        height=""
        justifyContent="left"
        width=""
        // position="fixed"
      >
        <div className=" flex flex-col justify-between h-[100vh] p-[0.5rem]">
          <div className="grid gap-y-[10px]">
            {/* <div className="flex justify-start items-center pb-[0.5rem]">
                <div className="pr-[1rem]">
                  <Image
                    src="/images/mainLogoBlack.svg"
                    alt="main logo"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="mtx-h6 ">marketrix</div>
              </div> */}
            <Link href="/Dashboard/NewOverview" target="_self">
              <div className="!font-semibold">
                <Button
                  alignItems="center"
                  background="#FFFFFF"
                  color="#667085"
                  direction="row"
                  disabledColor="#E9D7FE"
                  display="flex"
                  flexDirection="row"
                  focusColor="#F9F5FF"
                  fontSize="0.875rem"
                  gap="13px"
                  hoverColor="#f2f4f7"
                  icon="Home"
                  iconMargin={12}
                  iconPosition="leading"
                  justifyContent="center"
                  label="Overview"
                  lineHeight="2px"
                  size="custom"
                  width="100%"
                  paddingBottom={10}
                  paddingLeft={10}
                  paddingRight={10}
                  paddingTop={10}
                />
              </div>
            </Link>

            <div className="text-[#667085] mtx-label !font-semibold">
              WORKSPACE
            </div>
            <Link href="/Dashboard/MmeetPages/Pitches" target="_self">
              <div className="!font-semibold">
                <Button
                  alignItems="center"
                  background="#FFFFFF"
                  color="#667085"
                  direction="row"
                  disabledColor="#E9D7FE"
                  display="flex"
                  flexDirection="row"
                  focusColor="#F4F8FC"
                  fontSize="0.875rem"
                  gap="13px"
                  height=""
                  hoverColor="#f2f4f7"
                  icon="Video camera"
                  iconMargin={12}
                  iconPosition="leading"
                  justifyContent="center"
                  label="Pitch"
                  lineHeight="2px"
                  size="custom"
                  width="100%"
                  paddingBottom={10}
                  paddingLeft={10}
                  paddingRight={10}
                  paddingTop={10}
                />
              </div>
            </Link>

            <div className="!font-semibold">
              <Button
                alignItems="center"
                background="#FFFFFF"
                color="#667085"
                direction="row"
                disabledColor="#E9D7FE"
                display="flex"
                flexDirection="row"
                focusColor="#F4F8FC"
                fontSize="0.875rem"
                gap="13px"
                height=""
                hoverColor="#f2f4f7"
                icon="Template"
                iconMargin={12}
                iconPosition="leading"
                justifyContent="center"
                label="Templates"
                lineHeight="2px"
                size="custom"
                width="100%"
                paddingBottom={10}
                paddingLeft={10}
                paddingRight={10}
                paddingTop={10}
              />
            </div>
            <Link href="/MmeetPages/Dashboard/Companies" target="_self">
              <div className="!font-semibold">
                <Button
                  alignItems="center"
                  background="#FFFFFF"
                  color="#667085"
                  direction="row"
                  disabledColor="#E9D7FE"
                  display="flex"
                  flexDirection="row"
                  focusColor="#F4F8FC"
                  fontSize="0.875rem"
                  gap="13px"
                  height=""
                  hoverColor="#f2f4f7"
                  icon="building"
                  iconMargin={12}
                  iconPosition="leading"
                  justifyContent="center"
                  label="Companies"
                  lineHeight="2px"
                  size="custom"
                  width="100%"
                  paddingBottom={10}
                  paddingLeft={10}
                  paddingRight={10}
                  paddingTop={10}
                />
              </div>
            </Link>
            <Link href="/MmeetPages/Dashboard/TeamMembers" target="_self">
              <div className="!font-semibold">
                <Button
                  alignItems="center"
                  background="#FFFFFF"
                  color="#667085"
                  direction="row"
                  disabledColor="#E9D7FE"
                  display="flex"
                  flexDirection="row"
                  focusColor="#F9F5FF"
                  fontSize="0.875rem"
                  gap="13px"
                  height=""
                  hoverColor="#f2f4f7"
                  icon="user"
                  iconMargin={12}
                  iconPosition="leading"
                  justifyContent="center"
                  label="Team Members"
                  lineHeight="2px"
                  size="custom"
                  width="100%"
                  paddingBottom={10}
                  paddingLeft={10}
                  paddingRight={10}
                  paddingTop={10}
                />
              </div>
            </Link>
            <div className="!font-semibold">
              <Button
                alignItems="center"
                background="#FFFFFF"
                color="#667085"
                direction="row"
                disabledColor="#E9D7FE"
                display="flex"
                flexDirection="row"
                focusColor="#F9F5FF"
                fontSize="0.875rem"
                gap="13px"
                height=""
                hoverColor="#f2f4f7"
                icon="Tag"
                iconMargin={12}
                iconPosition="leading"
                justifyContent="center"
                label="Deals"
                lineHeight="2px"
                size="custom"
                width="100%"
                paddingBottom={10}
                paddingLeft={10}
                paddingRight={10}
                paddingTop={10}
              />
            </div>

            <div className="!font-semibold">
              <Button
                alignItems="center"
                background="#FFFFFF"
                color="#667085"
                direction="row"
                disabledColor="#E9D7FE"
                display="flex"
                flexDirection="row"
                focusColor="#F9F5FF"
                fontSize="0.875rem"
                gap="13px"
                height=""
                hoverColor="#f2f4f7"
                icon="speedometer"
                iconMargin={12}
                iconPosition="leading"
                justifyContent="center"
                label="Team Performance"
                lineHeight="2px"
                size="custom"
                width="100%"
                paddingBottom={10}
                paddingLeft={10}
                paddingRight={10}
                paddingTop={10}
              />
            </div>
          </div>

          <div className=" grid gap-y-[10px] ">
            <div className="!font-semibold">
              <Button
                alignItems="center"
                background="#FFFFFF"
                color="#667085"
                direction="row"
                disabledColor="#E9D7FE"
                display="flex"
                flexDirection="row"
                focusColor="#F9F5FF"
                fontSize="0.875rem"
                gap="13px"
                height=""
                hoverColor="#f2f4f7"
                icon="LifeRing"
                iconMargin={12}
                iconPosition="leading"
                justifyContent="center"
                label="Support"
                lineHeight="2px"
                size="custom"
                width="100%"
                paddingBottom={10}
                paddingLeft={10}
                paddingRight={10}
                paddingTop={10}
              />
            </div>
            <div className="!font-semibold">
              <Button
                alignItems="center"
                background="#FFFFFF"
                color="#667085"
                direction="row"
                disabledColor="#E9D7FE"
                display="flex"
                flexDirection="row"
                focusColor="#F9F5FF"
                fontSize="0.875rem"
                gap="13px"
                height=""
                hoverColor="#f2f4f7"
                icon="Settings"
                iconMargin={12}
                iconPosition="leading"
                justifyContent="center"
                label="Settings"
                lineHeight="2px"
                size="custom"
                width="100%"
                paddingBottom={10}
                paddingLeft={10}
                paddingRight={10}
                paddingTop={10}
              />
            </div>

            {/* <Card
              alignItems="flex-start"
              backgroundColor="#F9F5FF"
              borderRadius="8px"
              display="flex"
              flexDirection="column"
              gap="24px"
              height=""
              hoverColor=" #F9F5FF"
              justifyContent="space-between"
              width="100%"
              paddingBottom={16}
              paddingLeft={20}
              paddingRight={20}
              paddingTop={16}
            >
              <div className=" justify-between w-full items-center">
                <div className=" flex mtx-subtitle2 !font-semibold dark:text-[#6941C6] pb-2 pr-2">
                  New features available!
                </div>

                <div className="flex gap-9 justify-between w-full items-center pb-2">
                  <div className="flex text-[#7F56D9] mtx-body2">
                    Check out the new dashboard view Pages and exports now load
                    faster.
                  </div>
                </div>
                <div>
                  <Image
                    src={Sideimage}
                    alt="Sidebar"
                    className="object-fill-scale-down h-20 w-50 rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex gap-4 justify-right text-[#7F56D9] mtx-body2">
                    Dismiss
                    <div className="text-[#7F56D9] mtx-body2 !font-semibold">
                      whats new?
                    </div>
                  </div>
                </div>
              </div>
            </Card> */}

            <hr />

            {/* <div className="flex gap-4">
              <Avatar
                border="none"
                borderRadius="50%"
                height="40px"
                image="https://picsum.photos/300/300?random=1"
                width="40px"
              />

              <div className="text-[#344054] mtx-subtitle2 !font-semibold">
                Jonathan Higgins
                <div className=" flex gap-2 text-[#667085] mtx-body2 ">
                  jon.creativehub@gmail.com
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </SideNavigationBar>
    </div>
  );
}

export default TextSideNavBar;
