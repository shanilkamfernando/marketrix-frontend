import LoadingIcon from "../Loading/LoadingIcon";
import Image from "next/image";
import { selectActionTrigger } from "@/store/actionSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";


function LoadingGlobalOverlay() {
  const [loadingStatus, setLoadingStatus] = useState(true);
  const trigger = useSelector(selectActionTrigger);

  useEffect(() => {
    console.log("LOADING ", trigger.loadingTriggered);
    setLoadingStatus(trigger.loadingTriggered);
  }, [trigger.loadingTriggered]);

  return (
    <>
      {loadingStatus && (
        <div className="absolute bg-white  top-0 bottom-0 left-0 z-10 bg-opacity-75 w-full flex items-center justify-center">
          {/* <Loading />  */}
          <div className="flex flex-col ">
            <div className="flex flex-row gap-2">
              <div>
                <Image
                  src="../../../../images/mainLogoBlack.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </div>

              <div className="font-bold">markertix</div>
            </div>

            <LoadingIcon loaidngMessage="Loading" />
          </div>
        </div>
      )}
    </>
  );
}

export default LoadingGlobalOverlay;
