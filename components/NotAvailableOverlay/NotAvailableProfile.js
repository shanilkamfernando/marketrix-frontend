import { Loading } from "@creativehub/marketrix-ui";
import LoadingIcon from "../Loading/LoadingIcon";
import Image from "next/image";


function NotAvailbleProfile({ loading, messageOveraly }) {
  return (
    <>
      {loading && (
        <div className="absolute bg-white  top-5 bottom-[50%] left-5 right-5 w-[35]z-10 bg-opacity-75 flex items-center justify-center rounded-lg">
          {/* <Loading />  */}
          <div className="flex flex-col items-center ">
            <div className="flex flex-row gap-2"></div>
            <div className="flex items-center justify-center mtx-label !font-medium">
              {messageOveraly}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NotAvailbleProfile;
