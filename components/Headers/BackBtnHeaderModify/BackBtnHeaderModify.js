import Link from "next/link";
import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FiEdit3 } from "react-icons/fi";

function BackBtnHeaderModify({ avatarName, setIsModifyAvatar, avatarDesc }) {
  // const [name, setName] = useState(avatarName);
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
            {/* <input
              type="text"
              id="nameInput"
              value={avatarName}
              onChange={handleNameChange}
            />{" "}
            | The Sales Avatar */}
            {avatarName} - {avatarDesc || "The Sales Avatar"}
          </div>
          <div>
            <FiEdit3 size={22} color="#667085" onClick={setIsModifyAvatar} />
          </div>
        </div>
        <div className="text-[#667085] text-[14px]">Modify</div>
      </div>
    </div>
  );
}

export default BackBtnHeaderModify;
