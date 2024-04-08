import { get } from "http";
import { useEffect, useRef } from "react";

const TestCompX = () => {
  const avatarVideo = document.getElementById("avatar-video");

  const avatarVidRef = useRef(null);

  // Start speech recognition
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;

  let stopTalking = true;
  let timeOut;
  let hearingTimeout;
  const audioPlayer = document.createElement("audio");
  let slienceCount = 0;
  let interval;

  function startFunc() {
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
      }, 300);
    };

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
        console.log("talking");
        hearingTimeout;
      }
    }, 500);

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
      sendSpeechText(currentSpeechText);
 
    };

    audioPlayer.addEventListener("playing", () => {
      clearTimeout(timeOut);
      talkingState();
      console.log("Playing");
    });

    audioPlayer.addEventListener("ended", () => {
      clearTimeout(timeOut);
      listenState();
      if (stopTalking) return;
     // startFunc();
    });
  }

  const sendSpeechText = async (currentSpeechText) => {
    try {
      

      const response = await fetch(
        "http://localhost:8080/avatar_openai/avatar_reply/get_reply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: currentSpeechText }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const audioData = await response.arrayBuffer();
      const blob = new Blob([audioData], { type: "audio/mpeg" });
      const audioBlobURL = URL.createObjectURL(blob);

      audioPlayer.setAttribute("controls", "");
      audioPlayer.src = audioBlobURL;
      audioPlayer.play();
    } catch (error) {
      console.error("Error fetching data:", error.message);
      // Handle error appropriately
    }
  };

  function endFunc() {
    stopTalking = true;
    recognition.stop();
    clearInterval(interval);
    stopAvatar();
    console.log("Converstion is over!");
  }

  function talkingState() {
    avatarVidRef.current.play(); 
    avatarVidRef.current.currentTime = 4; 

    timeOut = setTimeout(() => {
      avatarVidRef.current.pause(); 
      talkingState();
    }, 3500);
  }

  function listenState() {
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

  

  return (
    <div>
      <button onClick={startFunc} id="start-button">
        Start to Talk
      </button>
      <button onClick={endFunc} id="stop-button">
        Finish
      </button>
      <br />
      <span id="loading-text"></span>
      <div id="container"></div>

      <br />
      <video id="avatar-video" width="400px" ref={avatarVidRef}>
        <source src="/videos/avatar/avatar.MP4" />
      </video>
    </div>
  );
};

export default TestCompX;
