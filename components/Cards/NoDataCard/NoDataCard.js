import { Button, Card } from "@creativehub/marketrix-ui";
import React from "react";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";

function NoDataCard() {
  return (
    <div className="h-screen">
      <div className="flex w-[100%] p-[1rem] justify-between items-center ">
        <div className=" w-[100%]">
          <Card
            alignItems="flex-start"
            background={
              "linear-gradient(90deg, hsla(214, 96%, 89%, 1) 0%, hsla(219, 93%, 89%, 1) 6%, hsla(248, 74%, 88%, 1) 16%, hsla(259, 72%, 86%, 1) 23%, hsla(268, 65%, 84%, 1) 29%, hsla(284, 58%, 80%, 1) 36%, hsla(315, 61%, 79%, 1) 44%, hsla(328, 73%, 81%, 1) 55%, hsla(338, 88%, 84%, 1) 62%, hsla(338, 88%, 84%, 1) 74%, hsla(313, 58%, 78%, 1) 85%, hsla(298, 52%, 76%, 1) 92%, hsla(299, 50%, 76%, 1) 100%)"
            }
            borderRadius="8px"
            flexDirection="column"
            gap="24px"
            hoverColor={
              "linear-gradient(90deg, hsla(214, 96%, 89%, 1) 0%, hsla(219, 93%, 89%, 1) 6%, hsla(248, 74%, 88%, 1) 16%, hsla(259, 72%, 86%, 1) 23%, hsla(268, 65%, 84%, 1) 29%, hsla(284, 58%, 80%, 1) 36%, hsla(315, 61%, 79%, 1) 44%, hsla(328, 73%, 81%, 1) 55%, hsla(338, 88%, 84%, 1) 62%, hsla(338, 88%, 84%, 1) 74%, hsla(313, 58%, 78%, 1) 85%, hsla(298, 52%, 76%, 1) 92%, hsla(299, 50%, 76%, 1) 100%)"
            }
            paddingLeft={10}
            paddingRight={10}
            paddingTop={5}
            paddingBottom={5}
            width="100%"
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div>
                  <Image
                    src="/images/live/FeaturedIcon.svg"
                    alt=""
                    width={48}
                    height={48}
                  />
                </div>
                <div className="mtx-body1 !font-semibold">
                  Let’s personalize your Marketrix Live Button
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div>
                  <Button
                    alignItems="center"
                    background={"rgba(255, 255, 255, 0.50)"}
                    borderColor="#D0D5DD"
                    borderRadius="8px"
                    color="#1D2939"
                    focusColor="#F4EBFF"
                    fontWeight={"500"}
                    fontSize="16px"
                    gap="8px"
                    hoverColor="#eae2ff"
                    justifyContent="center"
                    label="Customize MLive Button"
                    paddingBottom={8}
                    paddingLeft={8}
                    paddingRight={8}
                    paddingTop={8}
                    size="custom"
                  />
                </div>
                <div><AiOutlineClose className="text-white" /></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="flex px-[1rem] ">
        <div className="w-[100%] border rounded-[8px] p-[1rem] ">
            <div className="flex justify-center items-center flex-col 2xl:h-[88vh] h-[80vh] ">
            {/* <div></div> */}
            <div className="mtx-body1 text-[#667085]">Data on its way ...</div>
            </div>
           
        </div>
      </div>
    </div>
  );
}

export default NoDataCard;
