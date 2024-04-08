import { Avatar, AvatarIntials } from "@creativehub/marketrix-ui";
import React from "react";

function AvatarWithMail({ personName, personEmail, personalImage }) {
  return (
    <div>
      {" "}
      <div className="flex gap-4 items-center">
        {/* <Avatar
          border="none"
          borderRadius="50%"
          height="40px"
          image={personalImage}
          width="40px"
        /> */}

        <AvatarIntials
          background="#F9F5FF"
          borderRadius="100%"
          color="#7F56D9"
          fontSize="16px"
          height="40px"
          name={personName}
          width=" 40px"
        />

        <div className="text-[#344054] mtx-subtitle1 !font-semibold">
          {personName}
          <div className=" flex gap-2 text-[#667085] mtx-body2 ">
            {personEmail}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvatarWithMail;
