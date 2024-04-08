import React, { useState, useContext, use, useEffect } from "react";
import { Modal, Button, Progress, Badge } from "@creativehub/marketrix-ui";
import SchedulePitchModal from "../SchedulePitchModal/SchedulePitchModal";
import { useDispatch } from "react-redux";
import { removeAuthState } from "@/store/authSlice";
import NotAvailbleProfile from "@/components/NotAvailableOverlay/NotAvailableProfile";
import Router from "next/router";
import Link from "next/link";
import { AuthContext } from "@/auth/authContext";
import { capitalizeWords } from "@/helpers/helpers";

// interface ButtonProps {
//   onClose: () => void;
// }

function ProfileModal({ onClose, startTour }) {
  const [selectedButton, setSelectedButton] = useState(""); // Track the selected button
  const [meetingMinutesProgress, setMeetingMinutesProgress] = useState(10);
  const [liveConnectsProgress, setLiveConnectsProgress] = useState(10);
  const [liveInquiriesProgress, setLiveInquiriesProgress] = useState(10);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const dispatch = useDispatch();

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };
  const authContext = useContext(AuthContext);
  const { packageName, checkUserLoggedIn } = authContext;
  //  const packageName = "Enterprise";
  const [upgradePackage, setUpgradePackage] = useState("");

  useEffect(() => {
    // console.log("packageName___________", packageName);
    if (packageName === "free") {
      setUpgradePackage("Starter");
    } else if (packageName === "starter") {
      setUpgradePackage("Pro");
    } else if (packageName === "pro") {
      setUpgradePackage("Enterprise");
    }
  }, [packageName]);

  if (!authContext) {
    return null; // Or show some loading/error message when the context is not available yet.
  }
  const { removeAuthContext } = authContext;

  const signOut = () => {
    //alert("SIGN OUT")
    dispatch(removeAuthState());
    removeAuthContext();
    Router.push("/SignIn/AdminSignIn");
  };

  return (
    <div className="w-full">
      <Modal
        background="#fff"
        borderRadius="8px"
        boxShadow="0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 12px 16px -4px rgba(16, 24, 40, 0.10)"
        height="100%"
        onClose={onClose} // Close the modal on request
        show
        transition="2.5s ease-out"
        visibility="visible"
        width="100%"
      >
        <div className="flex items-start text flex-col w-full h-50% p-2 bg-[#F2F4F7] border border-purple-100 rounded-lg shadow dark:bg-[#F2F4F7] dark:border-[#F2F4F7]">
          {/* <NotAvailbleProfile loading={loadingStatus} messageOveraly="Not available in your current plan"/> */}
          <div className="flex gap-2 items-start text-[#344054] mtx-label !font-normal mb-4">
            <div>You are currently on</div>

            <div className=" ml-auto">
              <Badge
                backgroundColor="#FFF6ED"
                borderRadius={15}
                color="#C4320A"
                hoverColor="#00FF00"
                text={capitalizeWords(packageName) + " Plan"}
                width={95}
                height={20}
                fontSize="10px"
                type={"status"}
              />
            </div>
          </div>

          {/*           
          <div className="flex items-start justify-end text-[#344054] mtx-label !font-bold mb-2 gap-4">
            <div>Meeting Minutes</div>
            <div className="text-[#344054] mtx-label !font-bold pl-16">
              0/200
            </div>
          </div>

          <Progress
            value={meetingMinutesProgress}
            maxValue={100}
            barHeight={"10px"}
            barColor={"#6941C6"}
            containerClassName={{
              background: "#f1e9fd",
            }}
          />
          <div className="flex items-start justify-end text-[#344054] mtx-label !font-bold mb-2 gap-8">
            <div>Live Connects</div>
            <div className="text-[#344054] mtx-label !font-bold pl-16">
              0/10
            </div>
          </div>

          <Progress
            value={liveConnectsProgress}
            maxValue={10}
            barHeight={"10px"}
            barColor={"#6941C6"}
            containerClassName={{
              background: "#f1e9fd",
            }}
          />
          <div className="flex items-start justify-end text-[#344054] mtx-label !font-bold mb-2 gap-8">
            <div>Live Inquiries</div>
            <div className="text-[#344054] mtx-label !font-bold pl-16">
              0/10
            </div>
          </div>

          <Progress
            value={liveInquiriesProgress}
            maxValue={10}
            barHeight={"10px"}
            barColor={"#6941C6"}
            containerClassName={{
              background: "#f1e9fd",
            }}
          /> */}

          <div className="!font-semibold w-full mt-2">
            <Link href="/Dashboard/SettingsPage/Account" target="_self">
              <Button
                alignItems="start"
                background="none"
                color="#000000"
                borderRadius="0px"
                direction="row"
                display="flex"
                flexDirection="row"
                fontSize="0.875rem"
                gap="13px"
                hoverColor="#F9F5FF"
                icon="faUseroutlined"
                iconMargin={12}
                iconSize="20px"
                iconPosition="leading"
                justifyContent="start"
                label="View Profile"
                lineHeight="normal"
                paddingBottom={10}
                paddingTop={10}
                width="100%"
              />
            </Link>
          </div>

          <div className="!font-semibold w-full mt-2">
            {/* <Link href="/Dashboard/SettingsPage/Account" target="_self"> */}
            <Button
              alignItems="start"
              background="none"
              color="#000000"
              borderRadius="0px"
              direction="row"
              display="flex"
              flexDirection="row"
              fontSize="0.875rem"
              gap="13px"
              hoverColor="#F9F5FF"
              icon="info"
              iconMargin={12}
              iconSize="20px"
              iconPosition="leading"
              justifyContent="start"
              label="Product Tour"
              lineHeight="normal"
              paddingBottom={10}
              paddingTop={10}
              width="100%"
              onClick={startTour}
            />
            {/* </Link> */}
          </div>

          <div className="!font-semibold w-full mt-2">
            <Link href="/Dashboard/SettingsPage/Pricing" target="_self">
              <Button
                alignItems="start"
                background="none"
                color="#000000"
                borderRadius="0px"
                direction="row"
                display="flex"
                flexDirection="row"
                fontSize="0.875rem"
                gap="13px"
                hoverColor="#F9F5FF"
                icon="rocket"
                iconMargin={12}
                iconPosition="leading"
                justifyContent="start"
                label={"Upgrade to " + upgradePackage}
                lineHeight="normal"
                iconSize="20px"
                paddingBottom={10}
                paddingTop={10}
                width="100%"
              />
            </Link>
          </div>
          <div className="!font-semibold w-full mt-2">
            <Button
              alignItems="start"
              background="none"
              color="#000000"
              borderRadius="0px"
              direction="row"
              display="flex"
              flexDirection="row"
              fontSize="0.875rem"
              gap="13px"
              hoverColor="#F9F5FF"
              icon="signOutIcon"
              iconMargin={12}
              iconPosition="leading"
              justifyContent="start"
              label="Sign Out"
              lineHeight="normal"
              paddingBottom={10}
              paddingTop={10}
              width="100%"
              onClick={signOut}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ProfileModal;
