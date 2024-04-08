import React, { useEffect, useState } from "react";
import BackBtnHeader from "../Headers/BackBtnHeader/BackBtnHeader";
import AvatarDesBanner from "../Banners/AvatarDesBanner/AvatarDesBanner";
import { TextArea, FileUploader, Button } from "@creativehub/marketrix-ui";
import { selectAvatarState } from "@/store/avatarSlice";
import { useSelector } from "react-redux";
import QuestionAndAnswers from "./QuestionAndAnswers";
import AvatarApi from "@/pages/api/admin/avatar";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { loadingTriggered } from "@/store/actionSlice";

function AvatarEditPage() {
  const avatar = useSelector(selectAvatarState);
  const [questionAndAnswers, setQuestionAndAnswers] = useState(null);
  const [edit, setEdit] = useState(false);
  const [fileSrc, setFileSrc] = useState("");
  const router = Router;
  const dispatch = useDispatch();

  if (typeof window !== "undefined") {
    // Code that uses FormData
    avatarFormData = new FormData();
  }
  var avatarFormData = new FormData();

  const createAvatar = async () => {
    await appendData();
    dispatch(loadingTriggered(true));

    // AvatarApi.create_avatar_form_data(avatarFormData).then((res) => {
    //   console.log("create_avatar res", res);
    //   avatarFormData = new FormData();
    //   if (!res.data) {
    //     dispatch(loadingTriggered(false));
    //     return;
    //   }

    //   if (res.status) {
    //     dispatch(loadingTriggered(false));
    //     router.push("/Dashboard/Trixy/Avatar");
    //   } else {
    //     dispatch(loadingTriggered(false));
    //     alert("Error in creating avatar! " + res.message);
    //   }
    // });

    const data = {
      agent_name: avatar?.avatarName,
      agent_description: avatar?.avatarDesc,
      pre_defined_avatar_id: avatar?.preDefinedAvatar,
      que_and_ans: questionAndAnswers,
    };

    AvatarApi.create_avatar(data).then((res) => {
      console.log("create_avatar res", res);

      if (!res.data) {
        dispatch(loadingTriggered(false));
        return;
      }

      if (res.status) {
        dispatch(loadingTriggered(false));
        router.push("/Dashboard/Trixy/Avatar");
      } else {
        dispatch(loadingTriggered(false));
        alert("Error in creating avatar! " + res.message);
      }
    });
  };

  const handleFileUpload = (file) => {
    console.log("File uploaded:", file);
  };

  const handleFileSrcChange = async (newFileSrc) => {
    console.log("File source set:", newFileSrc);
    setFileSrc(newFileSrc);
  };

  const appendData = async () => {
    let blob = await fetch(fileSrc).then((r) => r.blob());
    avatarFormData.append("file", blob);
    avatarFormData.append("agent_name", avatar?.avatarName);
    avatarFormData.append("agent_description", avatar?.avatarDesc);
    avatarFormData.append("pre_defined_avatar_id", avatar?.preDefinedAvatar);
    avatarFormData.append("que_and_ans", JSON.stringify(questionAndAnswers));
  };

  return (
    <div className=" h-[90vh]">
      <div className="lg:pb-10 pb-8">
        <BackBtnHeader
          avatarName={avatar?.avatarName}
          avatarDesc={avatar?.avatarDesc}
        />
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <AvatarDesBanner
            avatarDescription={
              "Provide instructions here, detailing the behavior and interaction style of the avatar with users. Infuse the avatar with a unique personality through your guidance."
            }
            // avatarImage={"/images/ai/avatar01.png"}
            avatarImage={`/images/ai/${avatar?.preDefinedAvatar}.png`}
            // avatarImage={avatar?.image_url}
          />
        </div>
        <div>
          <QuestionAndAnswers
            onAdd={setQuestionAndAnswers}
            questionAndAnswers={questionAndAnswers}
            edit={edit}
            avatarName={avatar?.avatarName}
          />
        </div>

        {/* <div className="grid grid-cols-2 gap-3">
          <div className=" w-[100%]">
            <div className="text-[#344054] text-[1rem] pb-2">
              Custom Instructions
            </div>
            <div className=" w-full !relative">
              <TextArea
                background="white"
                border="1px solid #D0D5DD"
                borderRadius="8px"
                placeholder="What kind of things your avatar can perform and how does it behave when interact with website visitors? what should it avoid doing?"
                width="100%"
                onChange={() => {}}
                color="#667085"
                height="172px"
              />
            </div>
          </div>
          <div className=" w-[100%]">
            <div className="text-[#344054] text-[1rem] pb-2">Upload Files</div>
            <div>
              <FileUploader
                onFileUpload={handleFileUpload}
                setAvatarSrc={handleFileSrcChange}
              />
            </div>
          </div>
        </div> */}

        <div className="text-[#667085] text-[14px] !font-normal">
          After adding knowledge and instructions, you can test your
          avatar&apos;s capabilities in Focus Mode on the playground. You can
          also make adjustments to the instructions if you want the avatar to
          focus on a specific area.
        </div>

        {/* <div className="w-[100%]  flex justify-center pb-5">
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
          />
        </div> */}

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
              label="Delete Draft"
              size="md"
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
              onClick={createAvatar}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvatarEditPage;
