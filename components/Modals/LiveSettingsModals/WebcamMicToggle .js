import { Modal } from "@creativehub/marketrix-ui";
import React, { useState, useEffect, useRef } from "react";

const WebcamMicToggle = ({ onClose }) => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRefUser = useRef(null);

  useEffect(() => {
    const initializeMediaStream = async () => {
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

    initializeMediaStream();

    // Cleanup function to stop the media stream when the component unmounts
    return () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [isCameraOn]);

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

  const autoSwitchOnCam = () => {
    if (!isCameraOn) {
      setIsCameraOn(true);
    }
  };
  useEffect(() => {
    autoSwitchOnCam(); // Call the autoSwitchOnCam function when the component mounts
  }, []);
  return (
    <div>
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
        {/* Add modal content here if needed */}
        <video ref={videoRefUser} autoPlay playsInline />
        <div>
          <button onClick={toggleCam}>
            {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default WebcamMicToggle;
