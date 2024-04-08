import { Button, Card } from "@creativehub/marketrix-ui";
import React from "react";
import Image from "next/image";
//import { AiOutlineClose } from "react-icons/ai";

function NoDataCardTable({ cardHeight, message }) {
  // const cardClassName = `h-[${cardHeight}]`;
  return (
    <div className="">
      <div className="flex ">
        <div className="w-[100%] border rounded-[8px] p-[1rem] ">
          <div
            className={`flex justify-center items-center flex-col ${cardHeight}`} 
          >
            <div>
              <Image
                src="../../../../images/live/DataonWay.svg"
                width={50}
                height={50}
                alt=""
              />
            </div>

            <div className="mtx-body1 text-[#667085] p-2 ">{message}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoDataCardTable;
