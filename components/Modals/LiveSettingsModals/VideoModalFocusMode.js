import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Toggle } from "@creativehub/marketrix-ui";
import {
  capitalizeWords,
  getFormattedDate,
  getFormattedDateOnly,
  getFormattedTimeHM,
} from "@/helpers/helpers";
import Link from "next/link";
import Image from "next/image";
import { BsMicMute } from "react-icons/bs";
import { BsMic } from "react-icons/bs";
import { FiCamera } from "react-icons/fi";
import { FiCameraOff } from "react-icons/fi";

import { API_URL_GLOBAL_SET } from "../../../pages/api/env";
import AvatarReplyApi from "@/pages/api/admin/avatarReply";
import * as io from "socket.io-client";
import { loadState } from "@/store/localStorage";
import LoadingIcon from "@/components/Loading/LoadingIcon";
import spinner from "@/public/images/live/spinner.gif";
import sound from "@/public/images/live/sound.gif";
const socketUrl = API_URL_GLOBAL_SET.SOCKET_URL;
var socket;

const baseURL = API_URL_GLOBAL_SET.API_END_POINT;

function VideoModalFocusMode({
  onClose,
  avatarName,
  avatarVideo,
  userName,
  userImage,
  customisedAvatar,
  customisedGPTModelName,
  gender,
}) {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
  const [stream, setStream] = useState(null);
  const [appId, setAppId] = useState("");
  const [avatarTalking, setAvatarTalking] = useState(null);
  const [avatarListening, setAvatarListening] = useState(null);
  const avatarVidRef = useRef(null);
  const avatarVidRefListening = useRef(null);
  const avatarVidRefTalking = useRef(null);

  const videoRefUser = useRef(null);
  const audioPlayer = useRef(new Audio());
  const audioPlayerWelcome = useRef(new Audio());

  const [responseLoading, setResponseLoading] = useState(false);

  let recognition = null;
  var audioArray = [];

  const [blobs, setBlobs] = useState([]);

  const toggleMic = () => {
    setIsMicrophoneOn((prevIsMicrophoneOn) => !prevIsMicrophoneOn);
  };

  const toggleCam = () => {
    setIsCameraOn((prev) => {
      if (prev && videoRefUser.current) {
        const tracks = videoRefUser.current.srcObject?.getTracks();
        if (tracks) {
          tracks.forEach((track) => track.stop());
        }
        videoRefUser.current.srcObject = null;
      }
      return !prev;
    });
  };

  const setWebCam = async () => {
    try {
      const constraints = {
        video: isCameraOn,
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(
        constraints
      );
      setStream(mediaStream);
      if (videoRefUser.current) {
        videoRefUser.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera and microphone:", error);
    }
  };

  // function stopAvatar() {
  //   console.log("stop avatar");
  //   avatarVidRef.current.pause();
  // }

  const endTheCall = () => {
    setBlobs([]);
    audioPlayer.current.pause();
    audioPlayer.current.currentTime = 0;

    stopSpeechRecognition();

    if (stream) {
      // Stop all tracks in the stream (including camera and microphone)
      stream.getTracks().forEach((track) => {
        track.stop();
      });

      // Disable camera and microphone
      const videoTracks = stream.getVideoTracks();
      const audioTracks = stream.getAudioTracks();

      videoTracks.forEach((track) => {
        track.enabled = false;
      });

      audioTracks.forEach((track) => {
        track.enabled = false;
      });

      // Optional: Clear the stream
      setStream(null);
    }

    // Additional cleanup or actions on call end
    onClose();
  };

  const welcomeTheUser = () => {
    //console.log("GENDER", gender);
    setAvatarTalking(true);
    audioPlayerWelcome.current.setAttribute("controls", "");
    if (gender === "female") {
      audioPlayerWelcome.current.src = "/audios/female.mp3";
    } else {
      audioPlayerWelcome.current.src = "/audios/male.mp3";
    }
    audioPlayerWelcome.current.play();
    //console.log("welcomeTheUser.............");

    audioPlayerWelcome.current.addEventListener("ended", function () {
      // Your function to run at the end of audio playback goes here
      // console.log("Audio playback ended");
      setAvatarTalking(false);
      // Call your function here
      startSpeechRecognition();
    });
  };

  const autoSwitchOnCam = () => {
    if (!isCameraOn) {
      setIsCameraOn(true);
    }
  };

  const connectUserToSocket = () => {
    if (appId != "") {
      // console.log("connectUserToSocket");
      // console.log("appId", appId);
      socket = io.connect(socketUrl, { query: { appId } });
    }
  };

  const startSpeechRecognition = () => {
    // Check if SpeechRecognition is supported
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      let currentSpeechText = "";
      let lastSpeechText = "";
      let hearingTimeout;
      let slienceCount = 0;
      let interval;

      // Initialize SpeechRecognition object
      recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();

      // Define event handlers
      recognition.onstart = () => {
        //   console.log("Speech recognition onstart");
      };

      recognition.onresult = function (event) {
        slienceCount = 0;

        currentSpeechText = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");

        // console.log(currentSpeechText)

        hearingTimeout = setTimeout(() => {
          lastSpeechText = currentSpeechText;
        }, 100);
      };

      interval = setInterval(() => {
        if (
          lastSpeechText &&
          currentSpeechText &&
          lastSpeechText == currentSpeechText
        ) {
          //   console.log("stop talking");
          clearTimeout(hearingTimeout);
          slienceCount += 1;
          process();
        } else {
          //   console.log("talking");
          hearingTimeout;
        }
      }, 300);

      recognition.onerror = (event) => {
        // Handle recognition errors
        console.error("Speech recognition onerror:", event.error);
      };

      recognition.onsoundend = (e) => {
        // console.log("speach is ended");
      };

      function process() {
        if (slienceCount > 2) recognition.stop();
      }

      recognition.onend = function () {
        // if (stopTalking) return;
        clearInterval(interval);
        //    console.log("Speech recognition ended", currentSpeechText);
        sendQuestionToSocket(currentSpeechText);
      };

      // Start recognition
      recognition.start();
    } else {
      console.error("Speech recognition not supported");
    }
  };

  const stopSpeechRecognition = () => {
    if (recognition) {
      // Stop recognition
      recognition.stop();
      //   console.log("Speech recognition stopped");
    }
  };

  const sendQuestionToSocket = (currentSpeechText) => {
    stopSpeechRecognition();
    try {
      const req = {
        text: currentSpeechText,
        // text: "Hello, how are u working",
        model: customisedGPTModelName,
        gender: gender,
      };
      //audioArray = [];
      setBlobs([]);
      console.log("currentSpeechText_____", currentSpeechText);

      socket.emit("questionReq", req, (callback) => {
        setResponseLoading(true);
        if (callback.status) {
          // console.log("RESP", callback.status);
        } else {
          //   console.log("RESP", callback.status);
        }
      });
    } catch {
      // Handle errors
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const startPlay = () => {
    var audios = blobs;
    // console.log("Audios__", audios);

    if (audios) {
      if (audios.length > 0) {
        setAvatarTalking(true);
        audioPlayer.current.setAttribute("controls", "");
        const audioURL = audios[0];
        audioPlayer.current.src = audioURL;
        audioPlayer.current.play();

        // Remove the first audio URL from the array once playback starts
        audios.shift();
        setBlobs(audios);

        audioPlayer.current.onended = () => {
          if (audios.length > 0) {
            // If there are more audio files in the array, play the next one
            startPlay();
          } else {
            // console.log("END_________  startPlay");
            setAvatarTalking(false);
            startSpeechRecognition();
          }
        };
      }
    }
  };

  const talkingState = () => {
    avatarVidRefTalking.current.play();
    avatarVidRefTalking.current.currentTime = 4;
    avatarVidRefTalking.current.loop = true;

    setTimeout(() => {
      if (avatarVidRefTalking.current) {
        avatarVidRefTalking.current.pause();
        talkingState();
      }
    }, 3500);
  };

  const listenState = () => {
    avatarVidRefListening.current.play();
    avatarVidRefListening.current.currentTime = 0;
    avatarVidRefListening.current.loop = true;

    setTimeout(() => {
      if (avatarVidRefListening.current) {
        avatarVidRefListening.current.pause();
        listenState();
      }
    }, 3000);
  };

  useEffect(() => {
    autoSwitchOnCam(); // Call the autoSwitchOnCam function when the component mounts
  }, []);
  useEffect(() => {
    setWebCam();
  }, [isCameraOn, isMicrophoneOn]);

  useEffect(() => {
    socket?.on("avatarRes", async (data) => {
      console.log("DATA SOCKET RESPONSE", data);
      const audioBufferData = data.audioBufferResponse;
      // Create a Blob from the Uint8Array
      const blob = new Blob([audioBufferData], { type: "audio/mpeg" });

      // Create a URL for the Blob
      const audioBlobURL = URL.createObjectURL(blob);

      var audios = blobs;
      audios.push(audioBlobURL);
      setBlobs(audios);
      setResponseLoading(false);
      //audioArray.push(audioBlobURL);

      // startPlay();
    });
  }, [socket]);

  useEffect(() => {
    console.log("Audio Array Changed...", blobs);
    startPlay();
  }, [blobs]);

  useEffect(() => {
    if (appId) {
      //  console.log("connectUserToSocket.. ", appId);

      connectUserToSocket();
      welcomeTheUser();
    }
  }, [appId]);

  useEffect(() => {
    // load data from local storage
    //console.log("Load APP ID....");
    setAppId(loadState("app_id") || "");
  }, []);

  useEffect(() => {
    console.log("Avatar STATUS......................", avatarTalking);

    if (avatarTalking == true) {
      if (avatarVidRefTalking.current) {
        talkingState();
      }
    }

    if (avatarTalking == false) {
      if (avatarVidRefListening.current) {
        listenState();
      }
    }
  }, [avatarTalking]);

  // useEffect(() => {
  //   if (responseLoading) {
  //     listenState();
  //   }
  // }, [responseLoading]);

  return (
    <div className="w-full">
      <Modal
        background="#fff"
        borderRadius="8px"
        boxShadow="0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 12px 16px -4px rgba(16, 24, 40, 0.10)"
        height=""
        onClose={onClose} // Close the modal on request
        show
        transition="2.5s ease-out"
        visibility="visible"
        width="1100px"
      >
        <div className="pt-[1rem] px-[1.5rem] flex justify-between items-center">
          {/* <div onClick={() => sendQuestionToSocket("Hello")}> TEST </div> */}

          {/* <div onClick={autoTriggerAvatar}> START </div>
        
          <div onClick={continuePlay}> continuePlay </div> */}
          <div>
            <Button
              border=""
              borderRadius="8px"
              fontSize="12px"
              gap=""
              icon="close"
              size=""
              onClick={endTheCall}
            />
          </div>
        </div>
        <div className="p-2">
          <div className="w-[100%]  bg-[#1D2939] rounded-2xl">
            <div className="grid grid-cols-2 gap-3 p-4  h-[500px]">
              <div className=" w-full relative bg-cover ">
                <div className=" h-[470px] rounded-md  overflow-hidden">
                  {!avatarTalking ? (
                    <>
                      {" "}
                      <video id="avatar-video" ref={avatarVidRefListening}>
                        <source src={avatarVideo} />
                      </video>
                    </>
                  ) : (
                    <>
                      {" "}
                      <video id="avatar-video" ref={avatarVidRefTalking}>
                        <source src={avatarVideo} />
                      </video>
                    </>
                  )}
                  {/* <video id="avatar-video" ref={avatarVidRef}>
                    <source src={avatarVideo} />
                  </video>

                  <video id="avatar-video" ref={avatarVidRefListening}>
                    <source src={avatarVideo} />
                  </video>

                  <video id="avatar-video" ref={avatarVidRefTalking}>
                    <source src={avatarVideo} />
                  </video> */}
                </div>
                {responseLoading ? (
                  <div className="absolute top-2 left-2 flex gap-1 bg-[#303335] rounded-2xl py-1 px-2 text-[#F9FAFB] font-medium text-[14px] items-center">
                    <div>
                      <div className=" flex items-center justify-center">
                        <Image
                          src={spinner}
                          width={15}
                          height={15}
                          alt="spin"
                        />
                        <span className="ml-1 mtx-subtitle2">Processing</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {avatarTalking ? (
                      <>
                        {" "}
                        <div className="absolute top-2 left-2 flex gap-1 bg-[#303335] rounded-2xl py-1 px-2 text-[#F9FAFB] font-medium text-[14px] items-center">
                          <div>
                            <div className=" flex items-center justify-center">
                              <Image
                                src={sound}
                                width={20}
                                height={20}
                                alt="sound"
                              />
                              {/* <span className="ml-1 mtx-subtitle2">
                                Speaking
                              </span> */}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {" "}
                        <div className="absolute top-2 left-2 flex gap-1 bg-[#303335] rounded-2xl py-1 px-2 text-[#F9FAFB] font-medium text-[14px] items-center">
                          <div>
                            <div className=" flex items-center justify-center">
                              <Image
                                src={sound}
                                width={20}
                                height={20}
                                alt="sound"
                              />
                              <span className="ml-1 mtx-subtitle2">
                                Listening
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}

                <div className="absolute bottom-2 left-2 flex gap-1 bg-[#303335] rounded-2xl py-1 px-2 text-[#F9FAFB] font-medium text-[14px] items-center">
                  <BsMic />
                  <div className="">{capitalizeWords(avatarName)}</div>
                </div>
              </div>

              <div className="w-full relative bg-cover">
                {isCameraOn ? (
                  <div className=" h-[470px] rounded-md  overflow-hidden">
                    <video
                      ref={videoRefUser}
                      autoPlay
                      playsInline
                      muted={!isMicrophoneOn}
                      className="w-full h-full object-cover   transform scaleX-[-1]"
                      style={{ transform: "scaleX(-1)" }}
                    />

                    <div className="absolute bottom-2 left-2 flex gap-1 bg-[#303335] rounded-2xl py-1 px-2 text-[#F9FAFB] font-medium text-[14px] items-center">
                      {isMicrophoneOn ? (
                        <BsMic color="white" />
                      ) : (
                        <BsMicMute color="white" />
                      )}

                      <div className="">{capitalizeWords(userName)}</div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* <Image
                      src={"/images/ai/focusmode2.jpg"}
                      className="rounded-md"
                      alt=""
                      fill
                    /> */}

                    <img
                      src={userImage || "/images/ai/focusmode2.jpg"}
                      className="rounded-md h-[470px] w-full object-cover"
                      alt=""
                    />

                    <div className="absolute bottom-2 left-2 flex gap-1 bg-[#303335] rounded-2xl py-1 px-2 text-[#F9FAFB] font-medium text-[14px] items-center">
                      {isMicrophoneOn ? (
                        <BsMic color="white" />
                      ) : (
                        <BsMicMute color="white" />
                      )}

                      <div className="">{capitalizeWords(userName)}</div>
                    </div>
                  </>
                )}
              </div>

              {/* <div className=" w-full relative bg-cover ">
                {" "}
                <Image
                  src={"/images/ai/focusmode2.jpg"}
                  className="rounded-md"
                  alt=""
                  fill
                />
                <div className="absolute bottom-2 left-2 flex gap-1 bg-[#303335] rounded-2xl py-1 px-2 text-[#F9FAFB] font-medium text-[14px] items-center">
                  <button onClick={toggleImage2}>
                    {isImage2 ? <BsMicMute /> : <BsMic />}
                  </button>

                  <div className="">{userName}</div>
                </div>
              </div> */}
            </div>
            <div className="flex justify-between items-center p-4">
              <div className="flex gap-2 items-center">
                <div className="text-white !font-light text-[13px]">
                  Powered by
                </div>
                <div>
                  <Link href="/Dashboard/NewOverview" target="">
                    <div className="flex justify-center items-center gap-1 text-white ">
                      <Image
                        src="/images/mainLogoBlack.svg"
                        alt="main logo"
                        width={24}
                        height={24}
                        className="rounded-lg font-semibold"
                      />
                      <div className="!font-light text-[12px]">marketrix</div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="bg-gray-600  p-2 flex gap-2 rounded-xl">
                <div className="bg-[#1D2939] p-2 rounded-lg">
                  <button onClick={toggleMic}>
                    {isMicrophoneOn ? (
                      <BsMic color="white" />
                    ) : (
                      <BsMicMute color="white" />
                    )}
                  </button>
                </div>

                <div className="bg-[#1D2939] p-2 rounded-lg">
                  <button onClick={toggleCam}>
                    {isCameraOn ? (
                      <FiCamera color="white" />
                    ) : (
                      <FiCameraOff color="white" />
                    )}
                  </button>
                </div>

                <button
                  className="flex gap-2 items-center bg-[#D92D20] p-2 rounded-lg"
                  onClick={endTheCall}
                >
                  <Image
                    src={"/images/ai/endCallIcon.svg"}
                    alt=""
                    width={18}
                    height={18}
                    className="rounded-md"
                  />
                  <div className="text-white text-[14px]">End Call</div>
                </button>
              </div>
              <div className="flex gap-2 items-center">
                {/* <div className="text-[12px] text-[#E3E3E3]">Focus Mode</div> */}
                <div>
                  {/* <Toggle
                  // isChecked={visibility}
                  // onChange={() => widgetVisibleToggle(visibility)}
                  /> */}
                </div>
              </div>
            </div>

            {/* <iframe
            src={
              videoLink
            }
            // frameborder="0"
            allow="autoplay"
            className="rounded-lg p-0  w-[900px] h-[520px]"
          />  */}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default VideoModalFocusMode;
