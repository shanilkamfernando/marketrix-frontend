import { Avatar, AvatarIntials } from "@creativehub/marketrix-ui";
import React from "react";

function InquiryCard({ userImage, agentName, inquiryMessage }) {
  return (
    <div className="bg-[#F2F4F7] rounded-lg px-[24px] py-[8px] border-solid border-[1px] border-[#D0D5DD]">
      <div className="flex gap-3 items-center">
        {userImage ? (
          <>
            <Avatar
              border="none"
              borderRadius="100%"
              height="30px"
              image={userImage}
              width="30px"
            />
          </>
        ) : (
          <>
            <AvatarIntials
              background="#F9F5FF"
              borderRadius="100%"
              color="#7F56D9"
              fontSize="16px"
              height="30px"
              name={agentName}
              width=" 30px"
            />
          </>
        )}

        <div className="mtx-label">
          {agentName} {inquiryMessage}
          {/* alongside you. */}
        </div>
      </div>
    </div>
  );
}

export default InquiryCard;
