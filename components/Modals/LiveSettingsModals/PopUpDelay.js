import React, { useState } from "react";
import { Modal, Button } from "@creativehub/marketrix-ui";
import SchedulePitchModal from "../SchedulePitchModal/SchedulePitchModal";

// interface popUpProps {
//   onClose: () => void;
//   setIsCustomizeDelayOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

function PopUpDelay({ onClose, setIsCustomizeDelayOpen }) {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonLabel) => {
    if (selectedButton === buttonLabel) {
      setSelectedButton(null);
    } else {
      setSelectedButton(buttonLabel);
    }
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
            justifyContent="left"
            label="After 10 Seconds"
            iconSize={"16px"}
            paddingBottom={8}
            paddingTop={8}
            paddingLeft={12}
            paddingRight={12}
            width={"100%"}
            fontWeight={"600px"}
            icon={selectedButton === "After 10 Seconds" ? "tick" : ""}
            onClick={() => handleButtonClick("After 10 Seconds")}
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
            justifyContent="left"
            label="After 30 Seconds"
            iconSize={"16px"}
            paddingBottom={8}
            paddingTop={8}
            paddingLeft={12}
            paddingRight={12}
            fontWeight={"600px"}
            icon={selectedButton === "After 30 Seconds" ? "tick" : ""}
            onClick={() => handleButtonClick("After 30 Seconds")}
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
            justifyContent="left"
            label="After 60 Seconds"
            iconSize={"16px"}
            paddingBottom={8}
            paddingTop={8}
            paddingLeft={12}
            paddingRight={12}
            fontWeight={"600px"}
            icon={selectedButton === "After 60 Seconds" ? "tick" : ""}
            onClick={() => handleButtonClick("After 60 Seconds")}
          />
        </div>
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
            label="Add Custom Delay"
            iconSize={"16px"}
            paddingBottom={8}
            paddingTop={8}
            paddingLeft={12}
            paddingRight={12}
            fontWeight={"600px"}
            onClick={setIsCustomizeDelayOpen}
          />
        </div>
      </Modal>
    </div>
  );
}

export default PopUpDelay;
