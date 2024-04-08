import { useEffect, useRef, useState } from "react";

const TestComp = () => {
  const [stopTalking, setStopTalking] = useState(true);
  const [currentSpeechText, setCurrentSpeechText] = useState("");
  const [lastSpeechText, setLastSpeechText] = useState("");
  const [slienceCount, setSlienceCount] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const avatarVidRef = useRef(null);
  const audioPlayer = useRef(new Audio());
  const recognition = useRef(
    new (window.SpeechRecognition || window.webkitSpeechRecognition)()
  );

  useEffect(() => {
    recognition.current.continuous = true;
    recognition.current.interimResults = true;

    recognition.current.onresult = (event) => {
      console.log("Speech recognition result:", event.results);
      const speechText = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");

      setCurrentSpeechText(speechText);

      setTimeout(() => {
        setLastSpeechText(speechText);
      }, 300);
    };

    recognition.current.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.current.onsoundend = () => {
      console.log("speech is ended");
    };

    recognition.current.onend = () => {
      if (stopTalking) return;

      clearInterval(intervalId);
      console.log("Speech recognition ended", currentSpeechText);
      sendSpeechText(currentSpeechText);
    };

    audioPlayer.current.addEventListener("playing", () => {
      clearTimeout(audioPlayer.current.timeout);
      talkingState();
      console.log("Playing");
    });

    audioPlayer.current.addEventListener("ended", () => {
      clearTimeout(audioPlayer.current.timeout);
      listenState();
      if (stopTalking) return;
      startFunc();
    });

    return () => {
      recognition.current.onresult = null;
      recognition.current.onerror = null;
      recognition.current.onsoundend = null;
      recognition.current.onend = null;

      audioPlayer.current.removeEventListener("playing", () => {});
      audioPlayer.current.removeEventListener("ended", () => {});
    };
  }, [stopTalking, intervalId, currentSpeechText]);

  const startFunc = () => {
    setStopTalking(false);
    console.log("recognition.current.start();", recognition.current);
    recognition.current.start();
    clearTimeout(audioPlayer.current.timeout);
    listenState();

    setIntervalId(
      setInterval(() => {

       
        if (
          lastSpeechText &&
          currentSpeechText &&
          lastSpeechText === currentSpeechText
        ) {
          console.log("stop talking");
          clearTimeout(audioPlayer.current.timeout);
          setSlienceCount((prevCount) => prevCount + 1);
          process();
        } else {
          console.log("talking");
          audioPlayer.current.timeout;
        }
      }, 500)
    );
  };

  const process = () => {
    if (slienceCount > 2) recognition.current.stop();
  };

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

      audioPlayer.current.setAttribute("controls", "");
      audioPlayer.current.src = audioBlobURL;
      audioPlayer.current.play();
    } catch (error) {
      console.error("Error fetching data:", error.message);
      // Handle error appropriately
    }
  };

  const endFunc = () => {
    setStopTalking(true);
    recognition.current.stop();
    clearInterval(intervalId);
    stopAvatar();
    console.log("Conversation is over!");
  };

  const talkingState = () => {
    avatarVidRef.current.play();
    avatarVidRef.current.currentTime = 4;

    audioPlayer.current.timeout = setTimeout(() => {
      avatarVidRef.current.pause();
      talkingState();
    }, 3500);
  };

  const listenState = () => {
    avatarVidRef.current.play();
    avatarVidRef.current.currentTime = 0;

    audioPlayer.current.timeout = setTimeout(() => {
      avatarVidRef.current.pause();
      listenState();
    }, 3000);
  };

  const stopAvatar = () => {
    console.log("stop avatar");
    clearTimeout(audioPlayer.current.timeout);
    avatarVidRef.current.pause();
  };

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

export default TestComp;
