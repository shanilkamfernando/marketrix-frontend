import { Button, SideNavigationBar } from "@creativehub/marketrix-ui";
import Link from "next/link";
import React, { useState } from "react";
import UpgradeToPro from "@/components/Cards/UpgradetoPro/UpdgradetoPro";

function MLiveNavBar() {
  return (
    <div className="">
      <SideNavigationBar
        background="#E4E7EC"
        display="flex"
        flexDirection="column"
        height="100vh"
        justifyContent="left"
        width="100%"
      >
        <div className=" flex flex-col justify-between h-[100vh] p-[1rem]">
          <div className="grid gap-y-[0.5rem]">
            <div className="text-[#000000] mtx-h6 !font-bold pt-1">
              Marketrix Live
            </div>

            <Link href="/Dashboard/NewOverview" target="_self">
              <div className="!font-semibold">
                <Button
                  alignItems="center"
                  background="linear-gradient(90deg, rgba(145,225,231,0.8940826330532213) 17%, rgba(247,187,208,0.9164915966386554) 50%)"
                  color="#000000"
                  direction="row"
                  display="flex"
                  flexDirection="row"
                  fontSize="0.875rem"
                  gap="13px"
                  hoverColor="linear-gradient(90deg, rgba(145,225,231,0.8940826330532213) 17%, rgba(247,187,208,0.9164915966386554) 100%)"
                  icon="star"
                  iconMargin={12}
                  iconPosition="leading"
                  justifyContent="start"
                  label="Setup MLive"
                  lineHeight="2px"
                  size="sm"
                  width="100%"
                />
              </div>
            </Link>
          </div>
          <UpgradeToPro />
        </div>
      </SideNavigationBar>
    </div>
  );
}

export default MLiveNavBar;
