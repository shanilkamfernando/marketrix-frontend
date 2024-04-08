import Link from "next/link";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { FiEdit3 } from "react-icons/fi";

function BackBtnHeader({ avatarName, avatarDesc }) {
  const BackToPreviousPage = () => {
    window.history.back();
  };
  return (
    <div className="flex items-center gap-4 justify-start">
      <div className="">
        <div>
          <BiArrowBack size={24} onClick={BackToPreviousPage} />
        </div>
      </div>
      <div className="">
        <div className="flex items-center justify-start gap-3">
          <div className="text-[#101828] font-semibold text-[1rem]">
            {avatarName} - {avatarDesc || "The Sales Avatar"}
          </div>
          <div>
            <FiEdit3 size={22} color="#667085" />
          </div>
        </div>
        <div className="text-[#667085] text-[14px]">Draft</div>
      </div>
    </div>
  );
}

export default BackBtnHeader;
