import React, { useState, useEffect } from "react";

const Webcam = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(false);
  const [stream, setStream] = useState (null);
  const videoRef = React.useRef(null);

  useEffect(() => {
    const constraints = {
      video: isCameraOn,
      audio: isMicrophoneOn,
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        setStream(mediaStream);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      })
      .catch((error) => {
        console.error("Error accessing the camera and microphone:", error);
      });

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [isCameraOn, isMicrophoneOn]);

  return (
    <div>
      <h1>Webcam Viewer</h1>
      <div>
        <label>
          Camera:
          <input
            type="checkbox"
            checked={isCameraOn}
            onChange={() => setIsCameraOn(!isCameraOn)}
          />
        </label>
      </div>
      <div>
        <label>
          Microphone:
          <input
            type="checkbox"
            checked={isMicrophoneOn}
            onChange={() => setIsMicrophoneOn(!isMicrophoneOn)}
          />
        </label>
      </div>
      {isCameraOn && stream && (
        <div>
          <h2>Live Webcam Stream</h2>
          <video ref={videoRef} autoPlay playsInline muted={!isMicrophoneOn} />
        </div>
      )}
    </div>
  );
};

export default Webcam;
