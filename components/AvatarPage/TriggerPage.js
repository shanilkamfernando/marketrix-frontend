import {
  Card,
  Toggle,
  MouseOver,
  Dropdown,
  Button,
} from "@creativehub/marketrix-ui";
import { FiInbox } from "react-icons/fi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Image from "next/image";
import VideoModal from "../Modals/LiveSettingsModals/VideoModal";
import React, { useEffect, useState } from "react";
import ImageSlider from "../Sliders/ImageSlider";
import { IoChatbubblesOutline } from "react-icons/io5";
import AvatarApi from "@/pages/api/admin/avatar";
import Tenant from "@/pages/api/admin/tenants";
import { loadingTriggered } from "@/store/actionSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import NoDataCardTable from "../Cards/NoDataCard/NoDataCardTable";

function TriggerPage({ setIsUpdateButtonPositionOpen }) {
  const [isOpenVideo, setIsOpenVideo] = useState(false);

  const [avatarsData, setAvatarsData] = useState([]);
  const [avatars, setAvatars] = useState([]);
  const [tenant, setTenant] = useState({});
  const [avatarStatus, setAvatarStatus] = useState(null);
  const [trixyStatus, setTrixyStatus] = useState(null);

  const [delayTime, setDelayTime] = useState(null);
  const dispatch = useDispatch();
  const getAllDemoAvatars = () => {
    console.log("GETTING ALL DEMO AVATARS");
    AvatarApi.get_all_demo_avatars().then((res) => {
      setAvatarsData(res.data);
      console.log("DEMO AVATARS", res.data);
    });
  };

  const getAllAvatars = async () => {
    dispatch(loadingTriggered(true));
    AvatarApi.get_all_avatars().then((res) => {
      console.log("get_all_avatars", res.data);
      if (!res.data) {
        dispatch(loadingTriggered(false));
        return;
      }
      if (res.data.length > 0) {
        // for(let i = 0; i < res.data.length; i++) {
        //   res.data[i].model_status = "failed";
        // }
        dispatch(loadingTriggered(false));
        console.log("get_all_avatars", res.data);
        setAvatars(res.data);
      } else {
        dispatch(loadingTriggered(false));
        setAvatars([]);
      }
    });
  };

  const getTenant = async () => {
    dispatch(loadingTriggered(true));
    Tenant.get_tenant().then((response) => {
      if (response?.data) {
        console.log("Tenant response", response.data);
        setTenant(response.data);
        //setAvatarStatus(response.data.avatar_status);
        if (response.data.avatar_status) {
          setAvatarStatus(true);
        }
        if (response.data.avatar_trigger_time) {
          setDelayTime(response.data.avatar_trigger_time);
        }

        dispatch(loadingTriggered(false));
      } else {
        dispatch(loadingTriggered(false));
        alert(response?.message);
      }
    });
  };

  const avatarStatusToggle = (status) => {
    if (status === true) {
      setAvatarStatus(false);
    } else {
      setAvatarStatus(true);
    }
  };
  const trixyStatusToggle = (status) => {
    if (status === true) {
      setTrixyStatus(false);
    } else {
      setTrixyStatus(true);
    }
  };

  const closeVideoModal = () => {
    setIsOpenVideo(false);
  };

  const [activeAvatarId, setActiveAvatarId] = useState();

  const saveChanges = () => {
    // console.log("SAVING CHANGES");
    // console.log("AVATAR STATUS", avatarStatus);
    // console.log("ACTIVE AVATAR ID", activeAvatarId);
    // console.log("DELAY TIME", delayTime);

    const req = {
      active_avatar: activeAvatarId,
      avatar_trigger_time: delayTime,
      avatar_status: avatarStatus,
    };

    // if (avatarStatus === false) {
    //   req.avatarStatus = avatarStatus;
    // } else {
    //   req.widget_type = "trixy";
    // }

    console.log("Save changes", req);

    //API CALL
    dispatch(loadingTriggered(true));
    Tenant.update_tenant(req).then((response) => {
      if (response?.data) {
        console.log("response", response);
        dispatch(loadingTriggered(false));
        getTenant();
        //dispatch(apiCallTriggered(true));
      } else {
        console.log("Error", response);
        dispatch(loadingTriggered(false));
        alert(response?.message);
      }
    });
  };

  const activateTrixy = () => {
    // dispatch(loadingTriggered(true));
    // Tenant.activate_trixy().then((response) => {
    //   if (response?.data) {
    //     console.log("response", response);
    //     dispatch(loadingTriggered(false));
    //     getTenant();
    //     //dispatch(apiCallTriggered(true));
    //   } else {
    //     console.log("Error", response);
    //     dispatch(loadingTriggered(false));
    //     alert(response?.message);
    //   }
    // });
  };

  useEffect(() => {
    getAllAvatars();
    getTenant();
  }, []);
  return (
    <div className="">
      <div className=" flex flex-col !font-Semibold mtx-h6 ">
        Configure
        <div className="!font-normal mtx-subtitle2 text-[#667085]">
          Customer inquiries that are currently being addressed
        </div>
      </div>
      <div className="flex flex-col gap-3 xl:pt-10 pt-8">
        <div className="font-semibold text-[16px]">Activate Trixy</div>
        <div>
          <Card
            alignItems="center"
            background="#F2F4F7"
            border="1px solid #E4E7EC"
            borderRadius="8px"
            flexDirection="row"
            hoverColor="#F3F4F6"
            justifyContent="flex-start"
            paddingBottom={12}
            paddingLeft={12}
            paddingRight={12}
            paddingTop={12}
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <Image
                  src={"/images/ai/triggerCard.svg"}
                  width={52}
                  height={52}
                />

                <div className="text-[#475467] font-normal">
                  {avatars.length > 0 ? (
                    <>
                      {" "}
                      Activate Trixy AI, Select one of the avatars below to
                      activate or
                    </>
                  ) : (
                    <> You currently don&apos;t have a generated avatar. </>
                  )}
                  <br />
                  <Link href="/Dashboard/Trixy/Avatar">
                    <span className="font-semibold underline underline-offset-4">
                      Generate New Avatar
                    </span>{" "}
                  </Link>
                  or{" "}
                  <span
                    className="font-semibold underline underline-offset-4"
                    onClick={activateTrixy}
                  >
                    Activate Trixy AI
                  </span>
                </div>

                {/* <div className="text-[#475467] font-normal">
                  To activate Trixy AI, you must complete a minimum of 3 modules
                  in{" "}
                  <span className="font-semibold underline underline-offset-4">
                    data feeding
                  </span>
                </div> */}
              </div>

              {/* <div>
                <Toggle
                //   isChecked={recordActiveStatus}
                //   onChange={() => recordActiveToggle(recordActiveStatus)}
                />
              </div> */}
            </div>
          </Card>
        </div>

        {tenant && avatars.length > 0 && (
          <>
            <div className="font-semibold text-[16px] pt-1">My Avatars</div>
            <div className="pt-1 pb-10">
              <ImageSlider
                avatarsData={avatars}
                tenant={tenant}
                activeAvatarId={activeAvatarId}
                setActiveAvatarId={setActiveAvatarId}
              />
            </div>
          </>
        )}

        {/* {!tenant.active_avatar && <>Trixy Time</>} */}
      </div>
      {avatars.length === 0 && (
        <div className="py-6">
          <NoDataCardTable
            cardHeight={"h-50"}
            message="Oops! It looks like no avatars have been created yet. How about adding a splash of personal flair? Create a brand new avatar and give it a spin! Click the 'Generate New Avatar' button and let your imagination run wild. We can't wait to see the unique avatar you come up with!"
          />
        </div>
      )}

      <div className="border-t-[1px]">
        <div className=" !font-semibold mtx-subtitle1 pt-3">
          Handoff
          <div className="!font-normal mtx-subtitle2 text-[#667085]">
            Choose how trixy will behave when it can&rsquo;t answer a question
            or when a visitor asks for operator help
          </div>
        </div>
        <div className="">
          <div className="mtx-subtitle2 font-semibold py-4">
            When MLive Sellers are Online
          </div>
          <div className="flex justify-between items-center w-full pt-2">
            <div className="flex flex-row text-[#344054] mtx-body2 !font-medium items-center justify-between w-[60%]">
              <div className="flex items-center gap-5 text-[#344054] ">
                <IoChatbubblesOutline className="" size={22} />
                Keep the All conversations on Trixy AI
              </div>
            </div>

            <div className="flex flex-row items-center  gap-3 w-[40%] justify-end ">
              <Toggle
                isChecked={avatarStatus}
                onChange={() => avatarStatusToggle(avatarStatus)}
              />
            </div>
          </div>

          {/* <div className="flex justify-between items-center w-full pt-2">
            <div className="flex flex-row text-[#344054] mtx-body2 !font-medium items-center justify-between w-[60%]">
              <div className="flex items-center gap-5 text-[#344054] ">
                <IoChatbubblesOutline className="" size={22} />
                Keep the All conversations on Trixy AI
              </div>
            </div>

            <div className="flex flex-row items-center  gap-3 w-[40%] justify-end ">
              <Toggle
                isChecked={trixyStatus}
                onChange={() => trixyStatusToggle(trixyStatus)}
              />
            </div>
          </div> */}

          <div className="flex justify-between items-center w-full pt-3">
            <div className="flex flex-row text-[#344054] mtx-body2 !font-medium items-center justify-between w-[60%] ">
              <div className="flex items-center gap-5 text-[#344054] w-[90%]">
                <FiInbox className="" size={22} />
                Handle all inquiries that online agents are unable to accept
                when ringing
              </div>
            </div>

            <div className="flex flex-row items-center  gap-3 w-[40%] justify-end">
              <div>
                <Dropdown
                  border="0px solid #D0D5DD"
                  borderRadius="8px"
                  color="#667085"
                  outline="none"
                  height="44px"
                  labelKey="name"
                  onSelect={(e) => {
                    setDelayTime(e.target.value);
                  }}
                  optionStyles={{
                    borderRadius: "10px",
                    color: "#667085",
                  }}
                  options={[
                    {
                      id: 1,
                      label1: "Option 1",
                      name: "",
                      opt: null,
                    },

                    {
                      id: 1,
                      label1: "Option 2",
                      name: "Answer after 5 Seconds",
                      opt: "5",
                    },
                    {
                      id: 1,
                      label1: "Option 2",
                      name: "Answer after 10 Seconds",
                      opt: "10",
                    },
                    {
                      id: 1,
                      label1: "Option 4",
                      name: "Answer after 15 Seconds",
                      opt: "15",
                    },
                    {
                      id: 2,
                      label1: "Option 5",
                      name: "Answer after 30 Seconds",
                      opt: "30",
                    },
                    {
                      id: 3,
                      label1: "Option 6",
                      name: "Answer after 60 Seconds",
                      opt: "60",
                    },
                  ]}
                  placeholder="select an option"
                  selectedValue={delayTime}
                  valueKey="opt"
                  width="100%"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end items-center w-full  pt-3">
          <div className="flex  gap-[0.5rem]">
            <Button
              alignItems="center"
              background="white"
              border="1px solid"
              borderColor="#D0D5DD"
              borderRadius="8px"
              color="#344054"
              direction="row"
              display="flex"
              flexDirection="row"
              fontSize="14px"
              fontWeight="500"
              gap="8px"
              justifyContent="center"
              label="Cancel"
              hoverColor="#F3F4F6"
              size="custom"
              paddingLeft={15}
              paddingBottom={5}
              paddingTop={5}
              paddingRight={15}
            />
            <Button
              alignItems="center"
              background="#7F56D9"
              hoverColor="#6941C6"
              border="1px solid"
              borderColor="#7F56D9"
              borderRadius="8px"
              color="white"
              direction="row"
              display="flex"
              flexDirection="row"
              fontSize="14px"
              fontWeight="500"
              gap="8px"
              justifyContent="center"
              label="Save"
              size="custom"
              paddingLeft={35}
              paddingBottom={5}
              paddingTop={5}
              paddingRight={35}
              onClick={saveChanges}
            />
          </div>
        </div>
      </div>
      {isOpenVideo && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center w-full z-999">
          <div className="p-5 ">
            <VideoModal
              onClose={closeVideoModal}
              Height="50vh"
              videoLink={""}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TriggerPage;
