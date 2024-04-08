import React from "react";
import { Card } from "@creativehub/marketrix-ui";
import { LuPlus } from "react-icons/lu";

function AvatarCreateCard({ openCreateCard }) {
  return (
    <div className="">
      <button onClick={openCreateCard} className="w-[100%]">
        {/* <Card
          alignItems="center"
          background="#FCFCFD"
          border="1px dashed  #667085"
          borderColor="transparent"
          borderRadius="16px"
          display="flex"
          flexDirection="row"
          height="175px"
          hoverColor="#F3F4F6"
          justifyContent="center"
          left=""
          paddingBottom={20}
          paddingLeft={20}
          paddingRight={20}
          paddingTop={20}
          width="100%"
          top=""
          gap={"20px"}
        > */}
        <div className="w-[100%] flex justify-center items-center border-dashed border-[1.5px] border-[#667085]  h-[200px] rounded-xl hover:bg-gray-100 ">
        <div className=" flex justify-center gap-1 items-center">
            <div>
              <LuPlus size={24} color="#101828" />
            </div>
            <div>Create your avatar</div>
          </div>
        </div>
        
        {/* </Card> */}
      </button>
    </div>
  );
}

export default AvatarCreateCard;
