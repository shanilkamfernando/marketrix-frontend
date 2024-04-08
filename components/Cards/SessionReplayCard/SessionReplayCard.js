import React from "react";
import { AvatarIntials, Badge, Avatar } from "@creativehub/marketrix-ui";
import Image from "next/image";
import {
  getBrowserLogo,
  getCountryLogo,
  getDeviceIcon,
  getFormattedDate,
  getFormattedDateOnly,
  getFormattedTimeHM,
  getPlatformIcon,
  getTimeAgo,
} from "@/helpers/helpers";

const agents = [
  {
    name: "shanilka fernandp",
    email: "shanilka@gmail.com",
    sessionType: "Marketrix Agents",
  },
  //   {
  //     name: "shanilka fernandp",
  //     email: "shanilka@gmail.com",
  //     sessionType:"Marketrix Circles"
  //   },
  //   {
  //     name: "shanilka fernandp",
  //     email: "shanilka@gmail.com",
  //     sessionType:"Marketrix Circles"
  //   },
  //   {
  //     name: "shanilka fernandp",
  //     email: "shanilka@gmail.com",
  //     sessionType:"Trixy AI"
  //   },
];

function SessionReplayCard({
  setIsOpenVideo,
  sessionRecordings,
  setOpenedVideo,
}) {
  const openVideo = (session) => {
    setOpenedVideo(session);
  };
  return (
    <>
      {sessionRecordings.map((session, index) => (
        <div
          key={index}
          className="border-[1px] border-gray-200 h-auto hover:shadow-md bg-white rounded-xl  flex justify-between p-3"
        >
          <div className="px-2 items-start w-2/3">
            <div className=" flex justify-between items-center pb-2">
              <div className=" flex gap-2 items-center ">
                <div>
                  <AvatarIntials
                    background="#F9F5FF"
                    borderRadius="100%"
                    color="#7F56D9"
                    fontSize="16px"
                    height="40px"
                    name={session.name}
                    width=" 40px"
                  />
                </div>

                <div className="mtx-body2">
                  <div className=" !font-semibold">{session.name}</div>
                  <div className="text-[#98A2B3]">{session.email}</div>
                </div>
              </div>
            </div>
            <div>
              <Badge
                backgroundColor="#F2F4F7"
                borderRadius={16}
                color="#344054"
                fontStyle="500"
                hoverColor="#F2F4F7"
                text={session.inquiry_type}
                height={20}
                width={140}
                fontSize="14px"
                type={"inquiry"}
              />
            </div>
            <div className="py-1">
              <Badge
                backgroundColor="#F2F4F7"
                borderRadius={16}
                color="#344054"
                fontStyle="500"
                hoverColor="#F2F4F7"
                text={getFormattedDateOnly(session?.createdAt)}
                height={20}
                width={140}
                fontSize="14px"
                type={"inquiry"}
              />
            </div>
            <div className="py-1">
              <Badge
                backgroundColor="#F2F4F7"
                borderRadius={16}
                color="#344054"
                fontStyle="500"
                hoverColor="#F2F4F7"
                text={getFormattedTimeHM(session?.createdAt)}
                height={20}
                width={140}
                fontSize="14px"
                type={"inquiry"}
              />
            </div>
            {/* <div>
              <p className=" text-gray-500  2xl:text-sm text-xs py-2">
                {
                  "The TTL period expires, the resolver or client will discard the cached record and mak..."
                }
              </p>
            </div> */}

            <div className="pb-3 flex gap-3">
              <div>
                <Avatar
                  border="none"
                  borderRadius="50%"
                  height="24px"
                  image={getCountryLogo(session?.country)}
                  width="24px"
                />
              </div>
              <div>
                <Image
                  src={getDeviceIcon(session?.visitor_info?.windowWidth)}
                  width={24}
                  height={24}
                  alt=""
                />
              </div>
              <div>
                <Image
                  src={getBrowserLogo(session?.visitor_info?.browser)}
                  width={24}
                  height={24}
                  alt=""
                />
              </div>

              <div>
                <Image
                  src={getPlatformIcon(session?.visitor_info?.platform)}
                  width={24}
                  height={24}
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* <div className="absolute top-[50px] left-[40px]">
            {session?.sessionUrl}
              <img
                onClick={() => openVideo(session)}
                src="../../images/settings/playBtn.svg"
                width={48}
                height={48}
                alt="play Button"
                className=" w-50 h-full rounded-lg object-cover cursor-pointer"
              />
            </div> */}

          {/* {session?.sessionUrl && (
            <> */}

          <div
            className=" rounded-lg relative w-[200px]"
            style={{
              backgroundImage: `url('../../../images/settings/sessionReplayBg.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="p-5 h-full flex flex-col justify-between  relative">
              <div
                className=" flex justify-center absolute left-[50%] top-[50%] ml-[-30px] mt-[-30px] cursor-pointer hover:scale-[80%] transition duration-500 ease-out hover:ease-in"
                onClick={() => openVideo(session)}
              >
                <Image
                  src={"/images/settings/playBtn.svg"}
                  alt="play Button"
                  width={48}
                  height={48}
                />
              </div>
            </div>
          </div>

          {/* <div className="  flex justify-start items-start border-2 border-[#D0D5DD] rounded-lg relative">
                <video
                  src={session?.sessionUrl} 
                  muted
                  playsinline
                  className=" w-50 h-full rounded-lg object-cover  "
                  type="video/mp4" 
                />
                <div className="absolute  cursor-pointer top-[40%] left-[40%]">
                  <Image
                    onClick={() => openVideo(session)}
                    src={"/images/settings/playBtn.svg"}
                    alt="play Button"
                    width={48}
                    height={48}
                  />
                </div>{" "}
              </div> */}

          {/* </>
          )} */}
        </div>
      ))}
    </>
  );
}

export default SessionReplayCard;
