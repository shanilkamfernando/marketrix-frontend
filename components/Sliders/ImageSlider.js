import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AvatarVideoCardJsonData from "../../components/AvatarPage/AvatarVideoCardJsonData.json";
import AvatarVideoCardModified from "../Cards/AvatarCards/AvatarVideoCardModified";
import AvatarVideoModal from "../Modals/AvatarModals/AvatarVideoModal";

function ImageSlider({
  avatarsData,
  tenant,
  activeAvatarId,
  setActiveAvatarId,
}) {
  const [isOpenVideo, setIsOpenVideo] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarsList, setAvatarsList] = useState([]);
  const closeVideoModal = () => {
    setIsOpenVideo(false);
  };
  const getAvatarInfo = (avatar) => {
    setIsOpenVideo(true);
    console.log("AVATAR", avatar);
    setAvatar(avatar);
  };

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,

    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
  };

  const changeTheOrderOfAvatars = (activeAvatarId) => {
    const updatedAvatarsData = avatarsData.slice(); // Create a copy of the array

    // Find the index of the active avatar
    const activeAvatarIndex = updatedAvatarsData.findIndex(
      (avatar) => avatar.id === activeAvatarId
    );

    if (activeAvatarIndex !== -1) {
      // If the active avatar is found
      // Remove it from the current position and unshift it to the beginning
      const activeAvatar = updatedAvatarsData.splice(activeAvatarIndex, 1)[0];
      updatedAvatarsData.unshift(activeAvatar);
    }

    // Set the updated array to the state or wherever you are using it
    setAvatarsList(updatedAvatarsData); // Update the state or data source accordingly
  };

  useEffect(() => {
    setActiveAvatarId(tenant?.active_avatar);
    changeTheOrderOfAvatars(tenant?.active_avatar);

    console.log("tenant?.active_avatar  ", tenant?.active_avatar);
  }, [tenant]);

  return (
    <>
      {avatarsData.length > 3 ? (
        <Slider {...settings} className="flex gap-5">
          {avatarsList.map((avatar, index) => {
            return (
              <div key={index} className="px-1">
                <div>
                  {/* {activeAvatarId === avatar.id ? (
                      <>Active</>
                    ) : (
                      <>Not Active</>
                    )} */}

                  <AvatarVideoCardModified
                    avatarVideo={() => getAvatarInfo(avatar)}
                    avatarImg={avatar?.image_url}
                    // avatarImg={`/images/ai/${avatar?.pre_defined_avatar_id}.png`}
                    avatarTitle={avatar?.agent_name}
                    avatarId={avatar?.id}
                    activeAvatarId={activeAvatarId}
                    changeActiveId={setActiveAvatarId}
                    avatarStatus={avatar?.model_status}
                  />
                </div>
              </div>
            );
          })}
        </Slider>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-2">
            {avatarsList.map((avatar, index) => {
              return (
                <div key={index} className="px-1">
                  <div>
                    {/* {activeAvatarId === avatar.id ? (
                      <>Active</>
                    ) : (
                      <>Not Active</>
                    )} */}
                    <AvatarVideoCardModified
                      avatarVideo={() => getAvatarInfo(avatar)}
                      //avatarImg={`/images/ai/${avatar?.pre_defined_avatar_id}.png`}
                      avatarImg={avatar?.image_url}
                      avatarTitle={avatar?.agent_name}
                      avatarId={avatar?.id}
                      activeAvatarId={activeAvatarId}
                      changeActiveId={setActiveAvatarId}
                      avatarStatus={avatar?.model_status}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {isOpenVideo && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center w-full">
          <div className="p-5 ">
            <AvatarVideoModal
              onClose={closeVideoModal}
              Height="50vh"
              //videoLink={`/videos/avatar/${avatar?.pre_defined_avatar_id}.mp4`}
              videoLink={avatar?.video_url}
              avatarInfo={avatar}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ImageSlider;
