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
  const [continueAudio, setContinueAudio] = useState(false);
  const [appId, setAppId] = useState("");
  var audioArray = [];

  const videoRefUser = useRef(null);
  const avatarVidRef = useRef(null);
  const audioPlayer = useRef(new Audio());

  // Start speech recognition

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;

  let stopTalking = true;
  let timeOut;
  let hearingTimeout;
  //  const audioPlayer = document.createElement("audio");
  let slienceCount = 0;
  let interval;

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

    // setIsCameraOn((prevIsCameraOn) => !prevIsCameraOn);
  };

  const toggleMic = () => {
    setIsMicrophoneOn((prevIsMicrophoneOn) => !prevIsMicrophoneOn);
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

  function startFunc() {
    console.log("Start function....");
    console.log("audioArray startFunc....", audioArray.length);

    // if (audioArray.length > 0) return;

    stopTalking = false;
    recognition.start();
    clearTimeout(timeOut);
    listenState();

    // Add event listeners
    recognition.onstart = function () {
      console.log("Speech recognition started");
    };

    let currentSpeechText = "";
    let lastSpeechText = "";

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

    if (audioPlayer.current) {
      interval = setInterval(() => {
        if (
          lastSpeechText &&
          currentSpeechText &&
          lastSpeechText == currentSpeechText
        ) {
          console.log("stop talking");
          clearTimeout(hearingTimeout);
          slienceCount += 1;
          process();
        } else {
          //   console.log("talking");
          hearingTimeout;
        }
      }, 300);
    }
    recognition.onerror = function (event) {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onsoundend = (e) => {
      console.log("speach is ended");
    };

    function process() {
      if (slienceCount > 2) recognition.stop();
    }

    recognition.onend = function () {
      if (stopTalking) return;
      clearInterval(interval);
      console.log("Speech recognition ended", currentSpeechText);

      if (audioPlayer.current) {
        sendQuestion(currentSpeechText);
      }
    };

    // if (audioPlayer.current) {
    //   console.log("WORKED___")
    //   audioPlayer.current.addEventListener("playing", () => {
    //     clearTimeout(timeOut);
    //     talkingState();
    //     console.log("Playing");
    //   });

    //   audioPlayer.current.addEventListener("ended", () => {
    //     console.log("ENDED");
    //     clearTimeout(timeOut);
    //     listenState();
    //     if (stopTalking) return;

    //     // console.log("continueAudio", continueAudio);
    //     console.log("AUDIOS LENGTH__________________", audioArray.length);

    //     if (audioArray.length > 0) {
    //       continuePlay();
    //     } else {
    //       startFunc();
    //     }
    //   });
    // }
  }

  function endFunc() {
    // audioPlayer.current = null;
    stopTalking = true;
    recognition.stop();
    clearInterval(interval);
    stopAvatar();
    console.log("Converstion is over!");
  }

  function talkingState() {
    console.log("TALKING STATE")
    avatarVidRef.current.play();
    avatarVidRef.current.currentTime = 4;

    timeOut = setTimeout(() => {
      avatarVidRef.current.pause();
      talkingState();
    }, 3500);
  }

  function listenState() {
    console.log("LISTEN STATE")
    avatarVidRef.current.play();
    avatarVidRef.current.currentTime = 0;

    timeOut = setTimeout(() => {
      avatarVidRef.current.pause();
      listenState();
    }, 3000);
  }

  function stopAvatar() {
    console.log("stop avatar");
    clearTimeout(timeOut);
    avatarVidRef.current.pause();
  }

  const sendSpeechText = async (currentSpeechText) => {
    try {
      var response;
      if (customisedAvatar) {
        response = await fetch(
          baseURL + "/avatar_openai/avatar_reply/get_custom_reply",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: currentSpeechText,
              model: customisedGPTModelName,
              gender: gender,
            }),
          }
        );
      } else {
        response = await fetch(
          baseURL + "/avatar_openai/avatar_reply/get_reply",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: currentSpeechText }),
          }
        );
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log(
        "response_____________________________________________________________________",
        response
      );
      const audioData = await response.arrayBuffer();

      console.log("audioData", audioData);
      const blob = new Blob([audioData], { type: "audio/mpeg" });
      const audioBlobURL = URL.createObjectURL(blob);

      audioPlayer.current.setAttribute("controls", "");
      audioPlayer.current.src = audioBlobURL;
      audioPlayer.current.play();
    } catch (error) {
      console.error("Error fetching data:", error.message);
      // Handle error appropriately
    }
  };

  const controller = new AbortController();
  const signal = controller.signal;

  const sendQuestion = async (currentSpeechText) => {
    try {
      const req = {
        text: "Hii..., who are you ? Explain",
        model: customisedGPTModelName,
        gender: gender,
      };

      try {
        // setContinueAudio(false);
        audioArray = [];
        const data = await AvatarReplyApi.get_loop_reply(req, { signal });
        //console.log(" data.continueStatus ", data.continueStatus);

        setContinueAudio(data.continueStatus);

        if (data.continueStatus) {
          continueAudioLoop(data.sentences);
        }
        const audioBufferData = data.audioBufferResponse;
        // Assuming audioBufferData is your object {type: 'Buffer', data: Array}
        const audioDataArray = audioBufferData.data;
        // Convert the array to a Uint8Array
        const uint8Array = new Uint8Array(audioDataArray);

        // Create a Blob from the Uint8Array
        const blob = new Blob([uint8Array], { type: "audio/mpeg" });

        // Create a URL for the Blob
        const audioBlobURL = URL.createObjectURL(blob);
        audioPlayer.current.setAttribute("controls", "");
        audioPlayer.current.src = audioBlobURL;
        audioPlayer.current.play();
      } catch (error) {
        console.error("Error fetching or playing audio:", error);
      }
    } catch (error) {
      // Handle errors
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const sendQuestion2 = async (currentSpeechText) => {
    try {
      const req = {
        text: currentSpeechText,
        model: customisedGPTModelName,
        gender: gender,
      };
      //console.log("WORKED");
      // socket.emit("hello", "world");
      audioArray = [];
      socket.emit("questionReq", req, (callback) => {
        console.log("questionReq", req);
        if (callback.status) {
          console.log("RESP", callback.status);
        } else {
          console.log("RESP", callback.status);
        }
      });

      socket.on("avatarRes", async (data) => {
        console.log("DATA SOCKET RESPONSE", data);
        const audioBufferData = data.audioBufferResponse;
        // Assuming audioBufferData is your object {type: 'Buffer', data: Array}
        const audioDataArray = audioBufferData.data;
        // Convert the array to a Uint8Array
        const uint8Array = new Uint8Array(audioDataArray);

        // Create a Blob from the Uint8Array
        const blob = new Blob([uint8Array], { type: "audio/mpeg" });

        // Create a URL for the Blob
        const audioBlobURL = URL.createObjectURL(blob);

        audioArray.push(audioBlobURL);

        //console.log("audioArray___________", audioArray);
        //  socket.to(meetingId).emit("meetingEnded");
      });
    } catch (error) {
      // Handle errors
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const continueAudioLoop = async (sentences) => {
    try {
      for (var i = 0; i < sentences.length; i++) {
        // Your loop body here

        const req = {
          model: customisedGPTModelName,
          gender: gender,
          text: sentences[i],
        };

        const data = await AvatarReplyApi.get_loop_reply_continue(req, {
          signal,
        });

        console.log("DATA API RESPONSE", data);
        // console.log("reply ", data.audioBufferResponse);

        //setContinueAudio(data.continueStatus);

        const audioBufferData = data.audioBufferResponse;
        // Assuming audioBufferData is your object {type: 'Buffer', data: Array}
        const audioDataArray = audioBufferData.data;
        // Convert the array to a Uint8Array
        const uint8Array = new Uint8Array(audioDataArray);

        // Create a Blob from the Uint8Array
        const blob = new Blob([uint8Array], { type: "audio/mpeg" });

        // Create a URL for the Blob
        const audioBlobURL = URL.createObjectURL(blob);

        audioArray.push(audioBlobURL);
      }

      //console.log("audioArray___________", audioArray);
    } catch (error) {
      // Handle errors
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const welcomeTheUser = () => {
    console.log("GENDER", gender);
    audioPlayer.current.setAttribute("controls", "");
    if (gender === "female") {
      audioPlayer.current.src = "/audios/female.mp3";
    } else {
      audioPlayer.current.src = "/audios/male.mp3";
    }
    audioPlayer.current.play();
    console.log("welcomeTheUser.............")
   // talkingState();

    // Add an event listener for the 'ended' event
    // audioPlayer.current.addEventListener("ended", function () {
    //   // Your function to run at the end of audio playback goes here
    //   console.log("Audio playback ended");
    //   listenState();
    //   // Call your function here
    //   startFunc();
    // });
  };

  const continuePlay = () => {
    if (audioArray.length > 0) {
      console.log("audioArray", audioArray);
      audioPlayer.current.setAttribute("controls", "");
      audioPlayer.current.src = audioArray[0];
      audioArray.shift();
      audioPlayer.current.play();
    }
  };

  const autoTriggerAvatar = async () => {
    // const message = "Hello, I am " + userName;
    // await sendSpeechText(message);
    //

    welcomeTheUser();
    // startFunc();
  };

  const endTheCall = () => {
    audioArray = [];
    controller.abort();
    console.log("API call aborted");
    audioPlayer.current.pause();
    audioPlayer.current.currentTime = 0;

    endFunc();

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

  const autoSwitchOnCam = () => {
    if (!isCameraOn) {
      setIsCameraOn(true);
    }
  };

  const connectUserToSocket = () => {
    if (appId != "") {
      console.log("connectUserToSocket");
      console.log("appId", appId);
      socket = io.connect(socketUrl, { query: { appId } });
    }
  };
  useEffect(() => {
    connectUserToSocket();
  }, [appId]);

  useEffect(() => {
    if (audioPlayer.current) {
      console.log("WORKED___");
      audioPlayer.current.addEventListener("playing", () => {
        clearTimeout(timeOut);
         talkingState();
        console.log("Playing");
      });

      audioPlayer.current.addEventListener("ended", () => {
        console.log("ENDED");
       clearTimeout(timeOut);
         listenState();
          if (stopTalking) return;

        // // console.log("continueAudio", continueAudio);
        // console.log("AUDIOS LENGTH__________________", audioArray.length);

        // if (audioArray.length > 0) {
        //   continuePlay();
        // } else {
        //   startFunc();
        // }
      });
    }
  });
  useEffect(() => {
    // load data from local storage
    setAppId(loadState("app_id") || "");
  }, []);

  useEffect(() => {
    autoSwitchOnCam(); // Call the autoSwitchOnCam function when the component mounts
  }, []);

  useEffect(() => {
    setWebCam();
  }, [isCameraOn, isMicrophoneOn]);

  useEffect(() => {
    //autoTriggerAvatar();
  }, []);

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
          <div onClick={autoTriggerAvatar}> START </div>
          <div onClick={sendQuestion}> TEST </div>
          <div onClick={() => sendQuestion2("How are you")}> TEST 2 </div>
          {/* <div onClick={sendQuestion}> TEST </div>
          <div onClick={continueAudioLoop}> CONTINUE </div> */}

          {/* <div onClick={autoTriggerAvatar}> START </div>

          {continueAudio ? <> X</> : <>Y</>} */}

          {/* <div onClick={() => sendSpeechText("How are you")}> TEST CUSTOM </div> */}

          <div>
            <Button
              border=""
              borderRadius="8px"
              fontSize="12px"
              gap=""
              icon="close"
              size=""
              onClick={onClose}
            />
          </div>
        </div>
        <div className="p-2">
          <div className="w-[100%]  bg-[#1D2939] rounded-2xl">
            <div className="grid grid-cols-2 gap-3 p-4  h-[500px]">
              <div className=" w-full relative bg-cover ">
                <div className=" h-[470px] rounded-md  overflow-hidden">
                  <video id="avatar-video" ref={avatarVidRef}>
                    <source src={avatarVideo} />
                  </video>
                </div>

                {/* <Image
                  src={"/images/ai/focusmode1.jpg"}
                  alt=""
                  fill
                  className="rounded-md"
                /> */}
                <div className="absolute bottom-2 left-2 flex gap-1 bg-[#303335] rounded-2xl py-1 px-2 text-[#F9FAFB] font-medium text-[14px] items-center">
                  <BsMic />

                  {/* <button onClick={toggleImage1}>
                    {isImage1 ? <BsMicMute /> : <BsMic />}
                  </button> */}

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

// await AvatarReplyApi.get_loop_reply(req).then(async (data) => {
//   console.log("get_loop_reply ", data);
//   console.log("reply ", data.audioBufferResponse);

//   const audioData = await data.audioBufferResponse();

//   console.log("audioData", audioData);
//   const blob = new Blob([audioData], { type: "audio/mpeg" });
//   const audioBlobURL = URL.createObjectURL(blob);

//   audioPlayer.current.setAttribute("controls", "");
//   audioPlayer.current.src = audioBlobURL;
//   audioPlayer.current.play();
// });

// const synth = window.speechSynthesis;
// const speech = new SpeechSynthesisUtterance(reply);
// speech.lang = "en-US";

// // Set the voice to a female one
// const voices = synth.getVoices();
// console.log(voices);

// const femaleVoice = voices.find(
//   (voice) =>
//     voice.lang === "en-US" &&
//     voice.name === "Microsoft Zira - English (United States)"
// );
// const maleVoice = voices.find(
//   (voice) =>
//     voice.lang === "en-US" &&
//     voice.name === "Microsoft David - English (United States)"
// );
// if (gender === "female") {
//   speech.voice = femaleVoice;
// } else {
//   speech.voice = maleVoice;
// }

// synth.speak(speech);

// clearTimeout(timeOut);
// talkingState();
// console.log("Playing");

// speech.onend = async function () {
//   console.log("Speech has ended");
//   clearTimeout(timeOut);
//   listenState();
//   if (stopTalking) return;
//   startFunc();
// };
