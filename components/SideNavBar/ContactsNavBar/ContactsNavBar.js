import UpgradeToPro from "@/components/Cards/UpgradetoPro/UpdgradetoPro";
import { SideNavigationBar, Button, Toggle } from "@creativehub/marketrix-ui";
import Link from "next/link";
import React, { useState } from "react";



function ContactsNavBar({
  contactsAmount,
  companiesAmount,
  selectedButton,
  setSelectedButton,
}) {
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <div>
      <SideNavigationBar
        background="#FCFCFD"
        display="flex"
        flexDirection="column"
        height="100vh"
        justifyContent="left"
        width="100%"
      >
        <div className=" flex flex-col justify-between h-[100vh] p-[1rem]">
          <div className="grid gap-y-[0.5rem]">
            <div className="text-[#000000] mtx-h6 !font-bold pt-1">
              {/* Contacts */}
              Contact
            </div>

            <Link href="/Dashboard/ContactPage/Contacts" target="_self">
              <div className="flex relative">
                <Button
                  alignItems="center"
                  background={
                    selectedButton === "Contacts" ? "#E4E7EC" : "#FCFCFD"
                  } // Change background based on selection
                  onClick={() => handleButtonClick("Contacts")} // Set the selected button when clicked
                  color="#344054"
                  direction="row"
                  display="flex"
                  flexDirection="row"
                  fontSize="0.875rem"
                  gap="13px"
                  hoverColor="#f2f4f7"
                  icon="Contacts"
                  iconMargin={12}
                  iconPosition="leading"
                  justifyContent="start"
                  label="Contacts"
                  lineHeight="2px"
                  size="sm"
                  width="100%"
                />
                <div className="absolute right-2 bottom-0 top-0 flex items-center">
                  <span className=" inline-flex items-center justify-center w-5 h-5  text-xs font-semibold text-gray-800 bg-[#F2F4F7] rounded-full">
                    {contactsAmount}
                  </span>
                </div>
              </div>
            </Link>
            <Link href="/Dashboard/ContactPage/Companies" target="_self">
              <div className="relative">
                <Button
                  alignItems="center"
                  background={
                    selectedButton === "Companies" ? "#E4E7EC" : "#FCFCFD"
                  } // Change background based on selection
                  onClick={() => handleButtonClick("Companies")} // Set the selected button when clicked
                  color="#344054"
                  direction="row"
                  display="flex"
                  flexDirection="row"
                  fontSize="0.875rem"
                  gap="13px"
                  hoverColor="#f2f4f7"
                  icon="building"
                  iconMargin={12}
                  iconPosition="leading"
                  justifyContent="start"
                  label="Companies"
                  lineHeight="2px"
                  size="sm"
                  width="100%"
                />
                <div className="absolute right-2 bottom-0 top-0 flex items-center ">
                  <span className=" inline-flex items-center justify-center w-5 h-5  text-xs font-semibold text-gray-800 bg-[#F2F4F7] rounded-full">
                    {companiesAmount}
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <UpgradeToPro />
        </div>
      </SideNavigationBar>
    </div>
  );
}

export default ContactsNavBar;
