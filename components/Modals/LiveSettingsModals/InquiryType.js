import React, { useState } from "react";
import { Modal, Button } from "@creativehub/marketrix-ui";
import SchedulePitchModal from "../SchedulePitchModal/SchedulePitchModal";

// interface inquiryProps {
//   onClose: () => void;
//   setIsNewInquiryOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

function InquiryType({ onClose, setIsNewInquiryOpen }) {
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
        {/* Modal content goes here */}
        <div className="!font-semibold flex relative">
          <Button
            iconMargin={8}
            alignItems="center"
            background="#ffffff"
            borderRadius="8px 8px 0 0"
            color="#595f4f"
            border="1px solid"
            direction="row"
            display="flex"
            flexDirection="row"
            fontSize="0.875rem"
            gap="13px"
            hoverColor="#F3F4F6"
            icon="coloredCircle"
            justifyContent="left"
            label="General Inquiry"
            iconColor="#ffa42d"
            iconSize={"16px"}
            paddingBottom={8}
            paddingTop={8}
            paddingLeft={12}
            paddingRight={12}
            width={"100%"}
            fontWeight={"600px"}
          />
        </div>
        <div className="!font-semibold flex relative">
          <Button
            iconMargin={12}
            width={"100%"}
            alignItems="center"
            background="#ffffff"
            borderRadius="0px"
            color="#595f4f"
            border="1px solid"
            direction="row"
            display="flex"
            flexDirection="row"
            fontSize="0.875rem"
            gap="13px"
            hoverColor="#F3F4F6"
            icon="coloredCircle"
            justifyContent="left"
            label="Pricing Inquiry"
            iconColor={"#509ccc"}
            iconSize={"16px"}
            paddingBottom={8}
            paddingTop={8}
            paddingLeft={12}
            paddingRight={12}
            fontWeight={"600px"}
          />
        </div>
        <div className="!font-semibold flex relative">
          <Button
            iconMargin={12}
            width={"100%"}
            alignItems="center"
            background="#ffffff"
            borderRadius="0px"
            color="#595f4f"
            border="1px solid"
            direction="row"
            display="flex"
            flexDirection="row"
            fontSize="0.875rem"
            gap="13px"
            hoverColor="#F3F4F6"
            icon="coloredCircle"
            justifyContent="left"
            label="Services Inquiry"
            iconColor={"red"}
            iconSize={"16px"}
            paddingBottom={8}
            paddingTop={8}
            paddingLeft={12}
            paddingRight={12}
            fontWeight={"600px"}
          />
        </div>
        {/* <div className="border-b-2"></div> */}
        <div className="!font-semibold flex relative">
          <Button
            iconMargin={12}
            width={"100%"}
            alignItems="center"
            background="#ffffff"
            borderRadius="0px"
            color="#595f4f"
            border="1px solid"
            direction="row"
            display="flex"
            flexDirection="row"
            fontSize="0.875rem"
            gap="13px"
            hoverColor="#F3F4F6"
            icon="coloredCircle"
            justifyContent="left"
            label="Technical Inquiry"
            iconColor={"#61b040"}
            iconSize={"16px"}
            paddingBottom={8}
            paddingTop={8}
            paddingLeft={12}
            paddingRight={12}
            fontWeight={"600px"}
          />
        </div>
        {/* <div className="border-b-2"></div> */}
        <div className="!font-semibold flex relative">
          <Button
            iconMargin={12}
            width={"100%"}
            alignItems="center"
            background="#ffffff"
            borderRadius="0 0 8px 8px"
            color="#595f4f"
            border="1px solid"
            direction="row"
            display="flex"
            flexDirection="row"
            fontSize="0.875rem"
            gap="13px"
            hoverColor="#F3F4F6"
            icon="plus"
            justifyContent="left"
            label="Create New"
            iconSize={"16px"}
            paddingBottom={8}
            paddingTop={8}
            paddingLeft={12}
            paddingRight={12}
            fontWeight={"600px"}
            onClick={setIsNewInquiryOpen}
          />
        </div>
      </Modal>
    </div>
  );
}

export default InquiryType;
