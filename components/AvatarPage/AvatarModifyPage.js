import React, { useEffect, useState } from "react";
import AvatarDesBanner from "../Banners/AvatarDesBanner/AvatarDesBanner";
import { TextArea, FileUploader, Button } from "@creativehub/marketrix-ui";
import { selectAvatarState } from "@/store/avatarSlice";
import { loadingTriggered } from "@/store/actionSlice";
import { useSelector } from "react-redux";
import QuestionAndAnswers from "./QuestionAndAnswers";
import AvatarApi from "@/pages/api/admin/avatar";
import Router from "next/router";
import { useDispatch } from "react-redux";
import VideoModalFocusMode from "../Modals/LiveSettingsModals/VideoModalFocusMode";
import { loadState } from "@/store/localStorage";
import Image from "next/image";
import spinner from "@/public/images/live/spinner.gif";
import { capitalizeWords } from "@/helpers/helpers";
import BackBtnHeaderModify from "../Headers/BackBtnHeaderModify/BackBtnHeaderModify";
import EditAvatarNameModal from "../Modals/AvatarModals/EditAvatarNameModal";

function AvatarModifyPage() {
  const avatarStore = useSelector(selectAvatarState);
  const [isModifyAvatar, setIsModifyAvatar] = useState(false);

  const [questionAndAnswers, setQuestionAndAnswers] = useState("");
  const [isOpenVideo, setIsOpenVideo] = useState(false);
  const [userName, setUserName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [avatarName, setAvatarName] = useState("");

  // const [edit, setEdit] = useState(false);
  const [avatar, setAvatar] = useState({});
  const dispatch = useDispatch();
  const router = Router;
  const getAvatar = () => {
    AvatarApi.get_avatar(avatarStore.avatarId).then((res) => {
      console.log("get_avatar", res.data);
      if (!res.data) {
        dispatch(loadingTriggered(false));
        router.push("/Dashboard/Trixy/Avatar");
        return;
      }
      dispatch(loadingTriggered(false));
      setAvatar(res.data);
      setAvatarName(res.data.agent_name);
      setQuestionAndAnswers(res.data.agent_knowledge);

      // setFetchedAvatar(res.data);
    });
  };

  const modifyAvatar = () => {
    console.log("Modify Avatar", avatar.id);
    console.log("Modify Avatar questionAndAnswers", questionAndAnswers);
    const reqData = {
      que_and_ans: questionAndAnswers,
    };

    console.log("Modify Avatar reqData", reqData);
    dispatch(loadingTriggered(true));
    AvatarApi.update_avatar(avatar.id, reqData).then((res) => {
      if (res.status === true) {
        dispatch(loadingTriggered(false));
        alert(res.message);
        getAvatar();
        // router.push("/Dashboard/Trixy/Avatar");
      } else {
        alert(res.message);
        dispatch(loadingTriggered(false));
      }
    });
  };

  const deleteAvatar = () => {
    console.log("Delete Avatar", avatar.id);
    const id = avatar.id;
    dispatch(loadingTriggered(true));
    AvatarApi.delete_avatar(id).then((res) => {
      if (res.status === true) {
        dispatch(loadingTriggered(false));
        alert(res.message);
        router.push("/Dashboard/Trixy/Avatar");
      } else {
        alert(res.message);
        dispatch(loadingTriggered(false));
      }
    });
  };

  const testAvatar = () => {
    setIsOpenVideo(true);
  };

  const closeVideoModal = () => {
    setIsOpenVideo(false);
  };

  useEffect(() => {
    // load data from local storage
    setUserName(loadState("first_name") || "");
    setImageUrl(loadState("image_url") || {});
  }, []);

  useEffect(() => {
    console.log("AvatarModifyPage avatarStore", avatarStore);
    getAvatar();
  }, []);

  return (
    <div className=" h-[90vh]">
      <div className="lg:pb-10 pb-8">
        <BackBtnHeaderModify
          avatarName={avatarName}
          setIsModifyAvatar={setIsModifyAvatar}
          avatarDesc={avatar?.agent_description}
        />
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <AvatarDesBanner
            avatarDescription={
              "Provide instructions here, detailing the behavior and interaction style of the avatar with users. Infuse the avatar with a unique personality through your guidance."
            }
            // avatarImage={"/images/ai/avatar01.png"}
            //avatarImage={`/images/ai/${avatar?.pre_defined_avatar_id}.png`}
            avatarImage={avatar?.image_url}
          />
        </div>
        <div>
          {questionAndAnswers && questionAndAnswers.length > 0 && (
            <>
              <QuestionAndAnswers
                onAdd={setQuestionAndAnswers}
                questionAndAnswers={questionAndAnswers}
                edit={true}
                avatarName={avatarName}
                avatarStatus={avatar?.model_status}
              />
            </>
          )}
        </div>

        <div className="text-[#667085] text-[14px] !font-normal">
          After adding knowledge and instructions, you can test your
          avatar&apos;s capabilities in Focus Mode on the playground. You can
          also make adjustments to the instructions if you want the avatar to
          focus on a specific area.
        </div>

        <div className="w-[100%]  flex justify-center pb-5">
          {avatar?.model_status === "succeeded" ? (
            <Button
              alignItems="center"
              background=" #6CE9A6"
              borderRadius="8px"
              color="#344054"
              direction="row"
              disabledColor="#E9D7FE"
              display="flex"
              flexDirection="row"
              focusColor="transparent"
              fontSize="18px"
              fontWeight="500"
              gap="8px"
              hoverColor="#32D583"
              icon="play"
              iconColor="#344054"
              iconPosition="leading"
              justifyContent="center"
              label="Test Avatar in Playground"
              size="md"
              onClick={testAvatar}
            />
          ) : (
            <>
              <div>
                <div className="flex flex-col">
                  <p className="text-left text-[#667085] text-[14px] !font-normal">
                    Kindly await, as the current status of your avatar is &apos;{" "}
                    {capitalizeWords(avatar?.model_status)}.&apos; Once the
                    process successfully concludes, an email notification will
                    be promptly dispatched to inform you of the outcome. We
                    appreciate your patience and understanding.
                  </p>
                  <div className="flex justify-center items-center">
                    <div className="text-[#344054] text-[1rem] bg-white bg-opacity-75 p-1 rounded-md">
                      <div className="flex items-center bg-[#6CE9A6] p-2 rounded-md">
                        <div>
                          <Image
                            src={spinner}
                            width={25}
                            height={25}
                            alt="spin"
                            className="mx-auto"
                          />
                        </div>
                        <div className="ml-2">
                          <span className="block">
                            {capitalizeWords(avatar?.model_status)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {avatar?.model_status === "succeeded" && (
          <>
            <div className="border-t-[1px] flex justify-end ">
              <div className="pt-2">
                <Button
                  background="transparent"
                  border="1px solid"
                  borderColor="transparent"
                  borderRadius="8px"
                  color="#B42318"
                  fontSize="14px"
                  fontWeight="500"
                  label="Delete Avatar"
                  size="md"
                  onClick={deleteAvatar}
                />
              </div>
              <div className="pt-2">
                <Button
                  background="#7F56D9"
                  border="1px solid"
                  borderColor="transparent"
                  borderRadius="8px"
                  color="white"
                  focusColor="#F4EBFF"
                  fontSize="14px"
                  fontWeight="500"
                  gap="8px"
                  hoverColor="#5C3DA7"
                  label="Save"
                  size="md"
                  onClick={modifyAvatar}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {isOpenVideo && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center w-full">
          <div className="p-5 ">
            {/* <TestComp/> */}
            {/* <TestCompX /> */}
            <VideoModalFocusMode
              onClose={closeVideoModal}
              Height="50vh"
              avatarName={avatarName}
              avatarVideo={avatar?.video_url}
              userName={userName}
              userImage={imageUrl}
              modelStatus={isOpenVideo}
              customisedAvatar={true}
              customisedGPTModelName={avatar?.model_name}
              gender={avatar?.gender}
            />
          </div>
        </div>
      )}

      {isModifyAvatar && (
        <div className=" fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center w-full">
          <EditAvatarNameModal
            onClose={() => setIsModifyAvatar(false)}
            avatar={avatar}
            getAvatar={getAvatar}
          />
        </div>
      )}
    </div>
  );
}

export default AvatarModifyPage;
