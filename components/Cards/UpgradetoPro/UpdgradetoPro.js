import React, { useContext, useDebugValue, useEffect, useState } from "react";
import { Badge, Progress, Button } from "@creativehub/marketrix-ui";
import Link from "next/link";
import { AuthContext } from "@/auth/authContext";
import { capitalizeWords } from "@/helpers/helpers";
function UpgradeToPro() {
  const authContext = useContext(AuthContext);
 const { packageName, checkUserLoggedIn } = authContext;
 //  const packageName = "Enterprise";
  const [upgradePackage, setUpgradePackage] = useState("");
  const [upgradeButton, setUpgradeButton] = useState(false);

  const [sessionMins, setSessionMins] = useState(200);
  const [totalSessionMins, setTotalSessionMins] = useState(0);
  const [recordingMins, setRecordingMins] = useState(200);
  const [totatlRecordingMins, setTotalRecordingMins] = useState(0);

  useEffect(() => {
    // console.log("packageName___________", packageName);
    if (packageName === "free") {
      setTotalRecordingMins(0);
      setTotalSessionMins(200);

      setUpgradePackage("Starter");
      setUpgradeButton(true);
    } else if (packageName === "starter") {
      setTotalRecordingMins(200);
      setTotalSessionMins(4000);
      setUpgradePackage("Pro");
      setUpgradeButton(true);
    } else if (packageName === "pro") {
      setTotalRecordingMins(1000);
      setTotalSessionMins(20000);
      setUpgradePackage("Enterprise");
      setUpgradeButton(true);
    } else if (packageName === "enterprise") {
      setUpgradeButton(false);
    }
  }, [packageName]);

  return (
    <div className="flex items-start text flex-col w-full h-50% p-2 bg-[#F2F4F7] border border-purple-100 rounded-lg shadow dark:bg-[#F2F4F7] dark:border-[#F2F4F7]">
      <div className="flex justify-between gap-2 items-start text-[#344054] mtx-label !font-normal mb-4  w-[100%]">
        <div>You are currently on the</div>

        <div className="!font-medium">
          <Badge
            backgroundColor="#F4F3FF"
            borderRadius={15}
            color="#5925DC"
            hoverColor="#00FF00"
            text={capitalizeWords(packageName) + " Plan"}
            width={85}
            height={20}
            fontSize="10px"
            type={"status"}
          />
        </div>
      </div>

      
      {/* <div className="flex items-start justify-end text-[#344054] mtx-label !font-normal mb-2">
        Participant Minutes
        <div className="text-[#344054] mtx-label !font-normal pl-4">
          {packageName === "free" && (
            <>
              {" "}
              {sessionMins}/{totalSessionMins}
            </>
          )}
          {packageName === "starter" && (
            <>
              {" "}
              {sessionMins}/{totalSessionMins}
            </>
          )}
          {packageName === "pro" && (
            <>
              {" "}
              {sessionMins}/{totalSessionMins}
            </>
          )}
          {packageName === "enterprise" && <> Unlimited</>}
        </div>
      </div>

      {(packageName == "free" ||
        packageName == "starter" ||
        packageName == "pro") && (
        <>
          <Progress
            barColor="Orange"
            barHeight={"8px"}
            maxValue={totalSessionMins}
            value={sessionMins}
            containerClassName={{
              background: "#f1e9fd",
            }}
          />
        </>
      )}

      <div className="flex items-start justify-end text-[#344054] mtx-label !font-normal mb-2 mt-2">
        {packageName === "free" ? (
          <> Session Recording is not available for this plan</>
        ) : (
          <>Session Recordings</>
        )}

        <div className="text-[#344054] mtx-label !font-normal pl-4">
          {packageName === "starter" && (
            <>
              {" "}
              {recordingMins}/{totatlRecordingMins}
            </>
          )}
          {packageName === "pro" && (
            <>
              {" "}
              {recordingMins}/{totatlRecordingMins}
            </>
          )}
          {packageName === "enterprise" && <> Unlimited</>}
        </div>
      </div>
      {(packageName == "starter" || packageName == "pro") && (
        <>
          <Progress
            barColor="Orange"
            barHeight={"8px"}
            maxValue={totatlRecordingMins}
            value={recordingMins}
            containerClassName={{
              background: "#f1e9fd",
            }}
          />
        </>
      )} */}

      <div className="!font-semibold w-full mt-2">
        {upgradeButton && (
          <>
            <Link href="/Dashboard/SettingsPage/Billing" target="_self">
              <Button
                alignItems="center"
                background="#FCFCFD"
                color="#000000"
                border="1px solid"
                direction="row"
                display="flex"
                flexDirection="row"
                fontSize="0.875rem"
                gap="13px"
                hoverColor="#F4F8FC"
                icon="rocket"
                iconMargin={12}
                iconPosition="leading"
                justifyContent="center"
                label={"Upgrade to " + upgradePackage}
                lineHeight="normal"
                paddingBottom={6}
                paddingTop={6}
                paddingLeft={5}
                paddingRight={5}
                width="100%"
              />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default UpgradeToPro;
