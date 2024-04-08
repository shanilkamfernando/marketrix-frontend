// import { InnerHeaderProps } from "@/interfaces/innerHeader";
import React from "react";

function PageHeader({ BoldText, RegularText }) {
  return (
    <div>
      <p className="text-black text-xl w-max">
        <span className=" font-bold  ">{BoldText} </span>
        {RegularText}
      </p>
    </div>
  );
}

export default PageHeader;
