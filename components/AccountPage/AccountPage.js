import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Input,
  InputPlain,
  Avatar,
  FileUploader,
  Dropdown,
  FileUploadButton,
} from "@creativehub/marketrix-ui";
// import Joyride, { STATUS } from "react-joyride";
import { BsCheckCircleFill } from "react-icons/bs";
import UserRolesApi from "@/pages/api/admin/usersRoles";
import Link from "next/link";
import LoggedInUserApi from "@/pages/api/admin/loggedInUser";
import UserApi from "@/pages/api/admin/users";
import { setProfile } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { addSpace } from "@/helpers/helpers";
import {
  loadingTriggered,
  apiCallTriggered,
  selectActionTrigger,
} from "@/store/actionSlice";
import { useSelector } from "react-redux";
import VideoUploadComponent from "../UploadVideo/UploadVideo";

function AccountPage({
  setIsRecordOpen,
  recordedVideo,
  setIsUpdateModifyModalOpen,
}) {
  const [avatarSrc, setAvatarSrc] = useState("/images/profileImage.png");
  const [videoSrc, setVideoSrc] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [avatarChanged, setAvatarChanged] = useState(false);
  //  const [videoChanged, setVideoChanged] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [country, setCountry] = useState("");
  const [timezone, setTimezone] = useState("");
  const [timeZoneString, setTimeZoneString] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState();
  const [roleName, setRoleName] = useState("");
  const [videoSrcStatus, setVideoSrcStatus] = useState(false);
  const [isVideoModified, setIsVideoModified] = useState(false);
  const [isRecordedVideo, setIsRecordedVideo] = useState(false);

  const dispatch = useDispatch();
  const trigger = useSelector(selectActionTrigger);
  if (typeof window !== "undefined") {
    // Code that uses FormData
    imageFormData = new FormData();
    videoFormData = new FormData();
    // ...
  }
  var imageFormData = new FormData();
  var videoFormData = new FormData();
  var videoForConverter = new FormData();

  const getUserInfo = async () => {
    //  const user =  loadState("profile_data")
    //  console .log("user", user)

    dispatch(loadingTriggered(true));
    await LoggedInUserApi.get().then((response) => {
      console.log("getUserInfo", response);
      if (response.status) {
        let userData = response.data;
        setLoggedInUser(userData);
        setFirstName(userData.firstname);
        setLastName(userData.lastname);
        setUserEmail(userData.email);
        setSelectedRole(userData.roleId);
        setRoleName(userData.role);
        setAvatarSrc(userData.image_url);
        setVideoSrc(userData.video_url);
        setCountry(userData.country);
        setTimezone(userData.time_zone);
        setTimeZoneString(userData.time_zone_string);

        //      setUserData(teamData);
        dispatch(loadingTriggered(false));
      }
    });
  };

  useEffect(() => {
    getUserInfo();
    console.log("trigger.apiCallTriggered________", trigger.apiCallTriggered);
    dispatch(apiCallTriggered(false));
  }, [trigger.apiCallTriggered]);

  const saveUserDetails = async () => {
    dispatch(loadingTriggered(true));
    var avatarUrl;
    let userId = loggedInUser?.user_Id;
    let user = {
      firstname: firstName,
      lastname: lastName,
      email: userEmail,
      role: selectedRole,
      image_url: avatarSrc,
      country: country,
      time_zone: timezone,
      time_zone_string: timeZoneString,
    };
    if (avatarChanged) {
      avatarUrl = await imageUpload(userId);
      user.image_url = avatarUrl;
    }

    //

    // console.log("saveUserDetails");
    // console.log("firstName", firstName);
    // console.log("lastName", lastName);
    // console.log("userEmail", userEmail);
    // console.log("selectedRole", selectedRole);

    console.log("user", userId, user);

    UserApi.update_user(user, userId).then(async (res) => {
      if (res.status) {
        console.log("RESPONSE", res.data);
        dispatch(setProfile(res.data));
        dispatch(loadingTriggered(false));
        dispatch(apiCallTriggered(true));
      }
    });
  };
  // const handleFileUpload = (base64Image: string) => {
  //   setAvatarSrc(base64Image);
  // };

  const imageUpload = async (userId) => {
    let preview = avatarSrc;
    // let id = "id"
    // console.log("preview", preview);
    // console.log("imageFormData Main", imageFormData);
    const fileName = `${userId}_profile_image`;
    //console.log("id", id)
    if (preview != "") {
      let blob = await fetch(preview).then((r) => r.blob());
      imageFormData.append("image", blob, fileName);
      // imageFormData.append('id', id);

      console.log("imageFormData", imageFormData.get("image"));
      console.log(
        "imageFormData NAME_______________",
        imageFormData.get("image").name
      );
    }

    if (imageFormData.get("image") != null) {
      return await UserApi.upload_user_logo(imageFormData).then(async (res) => {
        if (res.status) {
          console.log("upload_user_logo", res);
          setAvatarChanged(false);
          return res?.Url;
        }
      });
    }
  };

  const handleFileUpload = (file) => {
    console.log("File uploaded:", file);
  };

  const handleAvatarSrcChange = async (newAvatarSrc) => {
    console.log("Avatar source set:", newAvatarSrc);
    setAvatarSrc(newAvatarSrc);
    setAvatarChanged(true);
  };
  const videoUploadTrigger = async (userId) => {
    dispatch(loadingTriggered(true));
    console.log("videoSrc", videoSrc);
    let preview = videoSrc;
    console.log("preview", preview);
    const fileName = `${userId}_profile_video`;
    if (preview != "") {
      let blob = await fetch(preview).then((r) => r.blob());
      videoFormData.append("video", blob, fileName);
      console.log("videoFormData", videoFormData.get("video"));
    }

    if (videoFormData.get("video") != null) {
      console.log("videoFormData", videoFormData);
      console.log("videoFormData VIDEO", videoFormData.get("video"));
      return await UserApi.upload_user_video(videoFormData).then(
        async (res) => {
          if (res.status) {
            console.log("upload_user_video", res);
            //            setVideoChanged(false);
            dispatch(loadingTriggered(false));
            setIsVideoModified(false);
            return res?.Url;
          }
        }
      );
    }
  };
  const videoUploadTrigger2 = async (userId) => {
    let preview = videoSrc;
    console.log("preview", preview);
    const fileName = `${userId}_profile_video`;

    //const convertedVideo = await convertVideo()

    if (preview != "") {
      var blob = await fetch(preview).then((r) => r.blob());
      videoFormData.append("video", blob, fileName);
      // videoFormData.append("file", blob);
      // videoFormData.append("to", "mp4");
      // // videoFormData.append("compress", "");
      // videoFormData.append("token", "b26118c982f8911adf266b7d0bef4624");
    }

    if (videoFormData.get("video") != null) {
      // const videoFile = videoFormData.get("video");  // EQUAL SELECTED FILE
      // console.log("videoFile", videoFile);
      // videoForConverter.append("file", videoFile);
      // videoForConverter.append("to", "mp4");
      // videoForConverter.append("compress", "");
      // videoForConverter.append("token", "7f136e6a5e469b01c22a858aafa7f977");
      // const converted = await upload_user_video_to_converter(videoForConverter);
      // console.log("converted", converted);
      //  if (videoFormData.get("file") != null) {
      //      dispatch(loadingTriggered(false));
      dispatch(loadingTriggered(true));
      return await UserApi.upload_user_video(videoFormData).then(
        async (res) => {
          if (res.status) {
            console.log("upload_user_video", res);
            dispatch(loadingTriggered(false));
            setIsVideoModified(false);
            return res?.Url;
          }
        }
      );
    }
  };

  const upload_user_video_to_converter = async (body) => {
    console.log("upload_user_video_to_converter", body);

    try {
      const response = await fetch(
        "https://api-tasker.onlineconvertfree.com/api/upload",
        {
          method: "POST",

          body: body,
        }
      );
      const data = await response.json();

      if (response.ok) {
        console.log(
          "upload_user_video user data____________",
          data.CONVERTED_FILE
        );
        return data;
      } else {
        throw new Error(data.message || "Request failed");
      }
    } catch (error) {
      console.error("upload_user_video user data", error);

      if (error instanceof Error && error.message) {
        return { error: error.message };
      } else {
        return { error: "An unknown error occurred" };
      }
    }
  };
  // const handleVideoUpload = (file) => {};

  // const handleVideoSrcChange = async (newVideoSrc) => {
  //   setVideoChanged(true);
  // };

  const uploadVideoHandle = async () => {
    let user = { video_url: "" };
    let userId = loggedInUser?.user_Id;

    let videoUrl = await videoUploadTrigger(userId);
    console.log("videoUrl", videoUrl);
    user.video_url = videoUrl;
    dispatch(loadingTriggered(true));
    UserApi.update_user(user, userId).then(async (res) => {
      if (res.status) {
        console.log("RESPONSE", res.data);
        dispatch(setProfile(res.data));
        dispatch(loadingTriggered(false));
        dispatch(apiCallTriggered(true));
        setVideoSrc(null);
      }
    });
  };

  const getRoles = async () => {
    await UserRolesApi.get_roles().then((response) => {
      if (response) {
        console.log("ROLES", response.data);
        setRoles(response.data);
      } else {
        setRoles([]);
      }
    });
  };

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    console.log("videoSrc", videoSrc);
    if (videoSrc) {
      setVideoSrc(videoSrc);
      setVideoSrcStatus(true);
    } else {
      setVideoSrcStatus(false);
    }
  }, [videoSrc]);

  useEffect(() => {
    if (recordedVideo) {
      setVideoSrc(recordedVideo);
      setVideoSrcStatus(true);
    } else {
      setVideoSrcStatus(false);
    }
  }, [recordedVideo]);

  // useEffect(() => {

  //   if (videoSrc) {
  //     setVideoSrc(videoSrc);
  //     setVideoSrcStatus(true);
  //   } else {
  //     setVideoSrcStatus(false);
  //   }
  // }, [ trigger.apiCallTriggered]);
  // const [{ run, steps }, setState] = useState({
  //   run: true,
  //   steps: [
  //     {
  //       content: (
  //         <>
  //           <h2 className="!font-bold"> Welcome to Settings Account Page!</h2>
  //         </>
  //       ),
  //       locale: {
  //         skip: (
  //           <>
  //             <b>SKIP</b>
  //           </>
  //         ),
  //       },
  //       placement: "center",
  //       target: "body",
  //     },
  //     {
  //       content: (
  //         <>
  //           <h2 className="text-[#667085]">
  //             Here you can Record the Pre Recorded Video
  //           </h2>
  //         </>
  //       ),
  //       placement: "bottom",
  //       target: "#step-1",
  //       title: "Recording the Pre Recorded Video",
  //     },
  //     {
  //       content: (
  //         <>
  //           <h2 className="text-[#667085]">
  //             Here you can upload your Pre Recorded video
  //           </h2>
  //         </>
  //       ),
  //       placement: "left",
  //       target: "#step-2",
  //       title: "Uploading the Pre Recorded Video",
  //     },
  //     {
  //       content: (
  //         <>
  //           <h2 className="text-[#667085]">
  //             Here you can Modify the Pre Recorded Video
  //           </h2>
  //         </>
  //       ),
  //       placement: "left",
  //       target: "#step-3",
  //       title: "Modifiying the Pre Recorded Video",
  //     },
  //   ],
  // });
  useEffect(() => {
    if (recordedVideo) {
      setIsVideoModified(true);
    }
  }, [recordedVideo]);

  const [first, setfirst] = useState(null);
  useEffect(() => {
    setfirst(true);
  }, []);

  return (
    <div className="w-[100%]">
      {/* {first ? (
        <Joyride
          run={run}
          steps={steps}
          hideCloseButton
          scrollToFirstStep
          spotlightPadding={2}
          showSkipButton
          showProgress={true}
          continuous
          styles={{
            options: {
              primaryColor: "#7F56D9",
              textColor: "#101828",
              zIndex: 1000,
            },
          }}
        />
      ) : null} */}
      <div className="flex flex-col gap-3">
        <div>
          <div className=" mtx-h6 pl-2 ">Profile</div>

          {/* <VideoUploadComponent /> */}
          <div className="flex mtx-body2 mb-1 pl-2 text-[#667085]">
            Update your pre-recorded video, photo and personal details here
          </div>
        </div>

        <div className="border-b-[0.5px]"></div>
        <Card
          alignItems="center"
          background="#F2F4F7"
          border="1px solid #E4E7EC"
          borderRadius="8px"
          flexDirection="row"
          hoverColor="#F3F4F6"
          justifyContent="flex-start"
        >
          <div className="flex items-center justify-between p-4">
            <div className="flex gap-3 items-center ">
              <div className=" ">
                {/* {videoSrc} */}
                <div className="w-[100px] h-[100px] rounded-full overflow-hidden relative">
                  {videoSrc ? (
                    <>
                      {!isVideoModified ? (
                        <>
                          <video
                            src={videoSrc}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover rounded-full transform scaleX-[-1]"
                            style={{ transform: "scaleX(-1)" }}
                          />{" "}
                          {/* <div
                            className="w-[100px] h-[100px] rounded-full border-none"
                            style={{
                              backgroundImage: `url(${videoSrc})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }} 
                          /> */}
                        </>
                      ) : (
                        <>
                          {" "}
                          <video
                            src={videoSrc}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover rounded-full transform scaleX-[-1]"
                            style={{ transform: "scaleX(-1)" }}
                          />{" "}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center ">
                        <div className="2xl:w-[100px] 2xl:h-[100px] w-[80px] h-[80px] rounded-full bg-gray-200  border-gray-400 border-2">
                          <p className="text-gray-900 mtx-body2 !font-normal  flex 2xl:h-[100px] h-[80px] items-center justify-center">
                            Record Video
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-col  !font-bold mtx-body2 ">
                <span className="text-gray-900">Widget Clip</span>
                <span className="flex !font-normal mtx-body2 text-gray-500  w-[70%] pt-1">
                  When you engage with website visitors, they will first see
                  your pre-recorded video. If you don&apos;t modify or remove
                  your video clip, the default video will be played.
                </span>
              </div>
            </div>

            {/* <div className="flex gap-5 items-center">
                  <div className="">
                    <Button
                      alignItems="center"
                      background="white"
                      hoverColor="white"
                      border="1px solid"
                      borderColor="#F2F4F7"
                      borderRadius="8px"
                      color="#667085"
                      direction="row"
                      disabledColor="#F2F4F7"
                      display="flex"
                      flexDirection="row"
                      focusColor="#F2F4F7"
                      fontSize="14px"
                      gap="5px"
                      icon="circle-Dot"
                      iconPosition="leading"
                      justifyContent="center"
                      label="Record"
                      size="sm"
                      onClick={setIsRecordOpen}
                    />
                  </div>
                  <div className="">
                    <Button
                      alignItems="center"
                      background="white"
                      border="1px solid"
                      borderColor="#F2F4F7"
                      borderRadius="8px"
                      hoverColor="white"
                      color="#667085"
                      direction="row"
                      disabledColor="#F2F4F7"
                      display="flex"
                      flexDirection="row"
                      focusColor="#F2F4F7"
                      fontSize="14px"
                      gap="5px"
                      icon="upload"
                      iconPosition="leading"
                      justifyContent="center"
                      label="Upload"
                      size="sm"
                      disabled={!videoSrcStatus}
                      onClick={uploadVideoHandle}
                    />
                  </div> 
                </div> */}
            {videoSrc ? (
              <>
                <div className="flex gap-5 items-center">
                  <div className="">
                    {recordedVideo && isVideoModified ? (
                      <>
                        <Button
                          id="step-2"
                          alignItems="center"
                          background="white"
                          border="1px solid"
                          borderColor="#F2F4F7"
                          borderRadius="8px"
                          hoverColor="white"
                          color="#667085"
                          direction="row"
                          disabledColor="#F2F4F7"
                          display="flex"
                          flexDirection="row"
                          focusColor="#F2F4F7"
                          fontSize="14px"
                          gap="5px"
                          icon="upload"
                          iconPosition="leading"
                          justifyContent="center"
                          label="Upload"
                          size="sm"
                          disabled={!videoSrcStatus}
                          onClick={uploadVideoHandle}
                        />
                      </>
                    ) : (
                      <>
                        <Button
                          id="step-3"
                          alignItems="center"
                          background="white"
                          hoverColor="white"
                          border="1px solid"
                          borderColor="#F2F4F7"
                          borderRadius="8px"
                          color="#667085"
                          direction="row"
                          disabledColor="#F2F4F7"
                          display="flex"
                          flexDirection="row"
                          focusColor="#F2F4F7"
                          fontSize="14px"
                          gap="5px"
                          icon="chevDown"
                          iconPosition="trailing"
                          justifyContent="center"
                          label="Modify"
                          size="sm"
                          onClick={setIsUpdateModifyModalOpen}
                        />
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex gap-5 items-center">
                  <div className="">
                    <Button
                      id="step-1"
                      alignItems="center"
                      background="white"
                      hoverColor="white"
                      border="1px solid"
                      borderColor="#F2F4F7"
                      borderRadius="8px"
                      color="#667085"
                      direction="row"
                      disabledColor="#F2F4F7"
                      display="flex"
                      flexDirection="row"
                      focusColor="#F2F4F7"
                      fontSize="14px"
                      gap="5px"
                      icon="upload"
                      iconPosition="leading"
                      justifyContent="center"
                      label="Record"
                      size="sm"
                      onClick={setIsRecordOpen}
                    />
                  </div>
                  <div className="">
                    <Button
                      id="step-2"
                      alignItems="center"
                      background="white"
                      border="1px solid"
                      borderColor="#F2F4F7"
                      borderRadius="8px"
                      hoverColor="white"
                      color="#667085"
                      direction="row"
                      disabledColor="#F2F4F7"
                      display="flex"
                      flexDirection="row"
                      focusColor="#F2F4F7"
                      fontSize="14px"
                      gap="5px"
                      icon="upload"
                      iconPosition="leading"
                      justifyContent="center"
                      label="Upload"
                      size="sm"
                      disabled={!videoSrcStatus}
                      onClick={uploadVideoHandle}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </Card>

        <div className="flex  p-2">
          <div className="flex flex-row justify-between items-start w-full">
            <div className="flex items-center text-[#344054] mtx-body2 !font-medium ">
              Name
            </div>
            <div className="flex flex-row gap-5 !font-normal  w-[50%] text-[16px]">
              <InputPlain
                alignItems="center"
                alignment="left"
                background="#FFFFFF"
                border="1px solid #EBECF0"
                borderRadius="8px"
                boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                color="#101828"
                display="flex"
                errorMessageStyle={{
                  color: "red",
                }}
                flexDirection="row"
                height="44px"
                padding="16px 16px"
                placeholder="Olivia"
                type="text"
                // value={"Olivia"}
                width="100%"
                onChange={(value) => {
                  setFirstName(value);
                }}
                value={firstName}
              />

              <InputPlain
                alignItems="center"
                alignment="left"
                background="#FFFFFF"
                border="1px solid #EBECF0"
                borderRadius="8px"
                boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                color="#000000"
                disabledBackgroundColor="#EBECF0"
                display="flex"
                errorMessageStyle={{
                  color: "red",
                }}
                flexDirection="row"
                height="44px"
                padding="16px 16px"
                placeholder="Rhye"
                type="text"
                width="100%"
                // value={"Rhye"}
                onChange={(value) => {
                  setLastName(value);
                }}
                value={lastName}
              />
            </div>
          </div>
        </div>

        <div className="border-b-[0.5px]"></div>

        <div className="flex p-2">
          <div className="flex flex-row justify-between items-start w-full">
            <div className="flex items-center text-[#344054] mtx-body2 !font-medium  w-[50%]">
              Email Address
            </div>
            <div className="flex flex-row gap-4 !font-normal text-[16px]  w-[50%] z-0 ">
              <Input
                alignItems="center"
                alignment="left"
                background="#FFFFFF"
                border="1px solid #EBECF0"
                borderRadius="8px"
                boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                color="#667085"
                disabledBackgroundColor="#EBECF0"
                display="flex"
                flexDirection="row"
                height="44px"
                // value={"olivia@untitledui.com"}
                padding=""
                placeholder="olivia@untitledui.com"
                type="email"
                width="450px"
                onChange={(value) => {
                  setUserEmail(value);
                }}
                value={userEmail}
              />
            </div>
          </div>
        </div>

        <div className="border-b-[0.5px]"></div>

        <div className="flex  p-2">
          <div className="flex flex-row justify-between items-start w-full ">
            <div className="flex flex-col items-start text-[#344054] mtx-body2 !font-medium w-[50%]">
              Your photo
              <div className="flex mtx-body2 text-[#667085]">
                This will be displayed in your profile
              </div>
            </div>

            <div className="flex flex-row gap-4 w-[50%]">
              <Avatar
                alt="Irosha Profile Pic"
                border="none"
                borderRadius="100%"
                width={"50px"}
                height={"50px"}
                image={avatarSrc || "/images/profileImage.png"}
              />
              <div className=" w-3/4 ">
                <FileUploader
                  onFileUpload={handleFileUpload}
                  setAvatarSrc={handleAvatarSrcChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b-[0.5px]"></div>

        <div className="flex  p-2">
          <div className="flex flex-row justify-between items-start w-full">
            <div className="flex items-center text-[#344054] mtx-body2 !font-medium w-[50%]">
              Role
            </div>
            <div className="flex flex-row gap-4 w-[50%]">
              <div>
                {addSpace(roleName)}
                {/* <Dropdown
                  padding={2}
                  border="1px solid #D0D5DD"
                  borderRadius="8px"
                  color="black"
                  height="44px"
                  optionStyles={{
                    borderRadius: "10px",
                    width: "30px",
                  }}
                  options={roles}
                  labelKey="name"
                  valueKey="id"
                  width="450px"
                  onSelect={(e) => {
                    setSelectedRole(e.target.value);
                  }}
                  selectedValue={selectedRole}
                /> */}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="border-b-[0.5px]"></div> */}

        {/* <div className="flex p-2">
          <div className="flex flex-row justify-between items-start w-full">
            <div className="flex items-center text-[#344054] mtx-body2 !font-medium w-[50%]">
              Country
            </div>
            <div className="flex flex-row gap-4 w-[50%]">
              <div>
                <Dropdown
                  padding={2}
                  border="1px solid #D0D5DD"
                  borderRadius="8px"
                  color="black"
                  height="44px"
                  optionStyles={{
                    borderRadius: "10px",
                    width: "30px",
                  }}
                  options={[
                    {
                      label: "United States",
                      value: "United States",
                    },
                    {
                      label: "United Kingdom",
                      value: "United Kingdom",
                    },
                    {
                      label: "Canada",
                      value: "Canada",
                    },
                    {
                      label: "Australia",
                      value: "Australia",
                    },
                  ]}
                  labelKey="label"
                  valueKey="value"
                  width="450px"
                  onSelect={(e) => {
                    setCountry(e.target.value);
                  }}
                  selectedValue={country}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b-[0.5px]"></div>

        <div className="flex p-2">
          <div className="flex flex-row justify-between items-start w-full">
            <div className="flex items-center text-[#344054] mtx-body2 !font-medium w-[50%]">
              Timezone
            </div>
            <div className="flex flex-row gap-4 w-[50%]">
              <div>
                <Dropdown
                  padding={2}
                  border="1px solid #D0D5DD"
                  borderRadius="8px"
                  color="black"
                  height="44px"
                  onSelect={() => {}}
                  optionStyles={{
                    borderRadius: "10px",

                    width: "30px",
                  }}
                  options={[
                    {
                      label: "Pacific Time",
                      value: "Pacific Time",
                    },
                    {
                      label: "Option 2",
                      value: "option2",
                    },
                    {
                      label: "Option 3",
                      value: "option3",
                    },
                  ]}
                  labelKey="label"
                  valueKey="value"
                  placeholder="Pacific Time"
                  width="450px"
                />
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="border-b-[0.5px]"></div>
        <div className=" mtx-body2 text-[#D92D20] pt-3 cursor-pointer">
          Delete your account
        </div> */}
        <div className="flex !font-medium mtx-body2 p-2">
          <div className="flex flex-row justify-end items-center w-full">
            <div className="flex flex-row gap-2">
              <Button
                alignItems="center"
                background="white"
                border="1px solid"
                borderColor="#D0D5DD"
                borderRadius="8px"
                hoverColor="#F3F4F6"
                color="#344054"
                direction="row"
                display="flex"
                flexDirection="row"
                fontSize="14px"
                fontWeight="500"
                gap="8px"
                justifyContent="center"
                label="Cancel"
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
                onClick={saveUserDetails}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
