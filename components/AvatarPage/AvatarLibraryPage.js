import React, { useEffect, useState } from "react";
import BackBtnHeader from "../Headers/BackBtnHeader/BackBtnHeader";
import AvatarVideoCard from "../Cards/AvatarCards/AvatarVideoCard";
import AvatarVideoCardJsonData from "./AvatarVideoCardJsonData.json";
import AvatarApi from "@/pages/api/admin/avatar";

import { setSelectedPredefinedAvatar } from "@/store/avatarSlice";
import { useDispatch } from "react-redux";
import Router from "next/router";
import AvatarVideoModal from "../Modals/AvatarModals/AvatarVideoModal";

function AvatarLibraryPage({ savedAvatar }) {
  const [isOpenVideo, setIsOpenVideo] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarsData, setAvatarsData] = useState([]);

  const router = Router;
  const dispatch = useDispatch();

  const getAllDemoAvatars = () => {
    console.log("GETTING ALL DEMO AVATARS");
    AvatarApi.get_all_demo_avatars().then((res) => {
      setAvatarsData(res.data);
      console.log("DEMO AVATARS", res.data);
    });
  };
  const getAvatarInfo = (avatar) => {
    setIsOpenVideo(true);
    console.log("AVATAR", avatar);
    setAvatar(avatar);
  };

  const selectAvatar = (avatar) => {
    console.log("SELECTED AVATAR", avatar);
    const pre_defined_avatar_id = avatar?.pre_defined_avatar_id;
    dispatch(setSelectedPredefinedAvatar(pre_defined_avatar_id));
    router.push("/Dashboard/Trixy/AvatarEdit");
  };
  const closeVideoModal = () => {
    setIsOpenVideo(false);
  };

  useEffect(() => {
    getAllDemoAvatars();
  }, []);
//
  return (
    <div className=" h-[90vh]">
      <div className="lg:pb-10 pb-8">
        <BackBtnHeader avatarName={savedAvatar?.avatarName}    avatarDesc={avatar?.avatarDesc} />
      </div>
      <div>
        <div className="pb-4 text-[#1D2939] font-bold">
          Select an Avatar from our Library{" "}
        </div>
        <div className="grid grid-cols-3 gap-3 ">
          {avatarsData.map((avatar, index) => {
            return (
              <div key={index}>
            
                <AvatarVideoCard
                  avatarVideo={() => getAvatarInfo(avatar)}
                  //avatarImg={`/images/ai/${avatar?.pre_defined_avatar_id}.png`}
                  avatarImg={avatar?.image_url}
                  avatarTitle={avatar?.agent_name}
                  selectAvatar={() => selectAvatar(avatar)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {isOpenVideo && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center w-full">
          <div className="p-5 ">
            <AvatarVideoModal
              onClose={closeVideoModal}
              Height="50vh"
              // videoLink={`/videos/avatar/${avatar?.pre_defined_avatar_id}.mp4`}
              videoLink={avatar?.video_url}
              avatarInfo={avatar}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AvatarLibraryPage;
