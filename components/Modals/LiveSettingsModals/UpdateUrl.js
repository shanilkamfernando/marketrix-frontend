import React, { useState } from "react";
import { Modal, Button } from "@creativehub/marketrix-ui";
import WizardAccordion from "@/components/WizardAccordion/WizardAccordion";

// interface UpdateURLProps {
//   onClose: () => void;
// }

function UpdateUrl({ onClose }) {
  return (
    <div className=" flex items-center justify-center cursor-pointer p-[2rem] ">
      <Modal
        background="#fff"
        borderRadius="8px"
        boxShadow="0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 12px 16px -4px rgba(16, 24, 40, 0.10)"
        height=""
        onClose={onClose} // Close the modal on request
        show
        transition="2.5s ease-out"
        visibility="visible"
        width=""
      >
        <div className="relative p-[3rem] h-full overflow-hidden px-[2rem] py-[2rem]">
          <div className="absolute top-4 right-4">
            {" "}
            {/* Positioning wrapper */}
            <Button
              border=""
              borderRadius="8px"
              fontSize="12px"
              gap="8px"
              icon="close"
              size="sm"
              onClick={onClose}
            />
          </div>
          <div className="flex items-center justify-center max-w-[100%] max-h-[50%]">
            <div className="max-h-[90vh] overflow-y-auto pr-4 scrollbar-hide ">
              <WizardAccordion type="settings" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UpdateUrl;
