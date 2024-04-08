import React, { useState, useRef, use, useEffect } from "react";
import { Modal, Button } from "@creativehub/marketrix-ui";

function RecordModel({ onClose, setRecordedVideo, isRecordOpen }) {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [webmData, setWebmData] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  let stream = null;

  const startCamera = async () => {
    try {
      setIsRecording(true);
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const closeModal = async () => {
    //await stopCamera();
    onClose();
  };
  const stopCamera = async () => {
    console.log("STOP", stream);
    if (stream) {
      console.log("STOP");
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };
  const startRecording = () => {
    setIsRecording(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        startTimer();

        const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
        mediaRecorderRef.current = recorder;

        const recordedChunks = [];

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunks.push(event.data);
          }
        };

        recorder.onstop = () => {
          const webmBlob = new Blob(recordedChunks, { type: "video/webm" });
          const webmVideoURL = URL.createObjectURL(webmBlob);

          setWebmData(webmVideoURL);
          setRecording(false);
          mediaRecorderRef.current = null;
        };

        recorder.start();
        setRecording(true);
      })
      .catch((error) => {
        console.error("Error accessing the webcam:", error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }

    // Access the video stream and turn off the camera
    if (videoRef.current.srcObject) {
      const videoTrack = videoRef.current.srcObject.getVideoTracks()[0];
      videoTrack.stop();
      setIsRecording(false);
      endTimer();
      setStepTwo(true);
      setStepOne(false);
    }
  };

  const useVideo = () => {
    console.log("webmData", webmData);
    setRecordedVideo(webmData);
    onClose();
    //videoUpload(21);
  };

  const retakeVideo = () => {
    setWebmData(null);
    setStepTwo(false);
    setStepOne(true);
  };

  const [timerValue, setTimerValue] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isTimerRunning && timerValue < 5) {
      interval = setInterval(() => {
        setTimerValue((prevValue) => Math.min(prevValue + 1, 5));
      }, 1000);
    } else if (isTimerRunning && timerValue === 5) {
      console.log("END", timerValue);
     stopRecording();
    }

    return () => clearInterval(interval);
  }, [isTimerRunning, timerValue]);

  const startTimer = () => {
    setTimerValue(1);
    setIsTimerRunning(true);
  };

  const endTimer = () => {
    setIsTimerRunning(false);
    // You can access the timerValue here for recording purposes
    console.log(`Recording stopped. Total time: ${formatTime(timerValue)}`);
  };
  const formatTime = (value) => {
    const minutes = Math.floor(value / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (value % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // useEffect(() => {
  //   startCamera();
  // }, [isRecordOpen]);

  // if (!isOpen) {
  //   return null;
  // }
  return (
    <div>
      <Modal
        background="white"
        borderRadius="8px"
        boxShadow="0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 12px 16px -4px rgba(16, 24, 40, 0.10)"
        height="100%"
        onClose={closeModal} // Close the modal on request
        show
        transition="2.5s ease-out"
        visibility="visible"
        width="500px"
      >
        <div>
          <div className=" p-2 flex justify-between items-center ">
            <div>Widget Clip</div>
            <Button
              border=""
              borderRadius="8px"
              fontSize="12px"
              gap=""
              icon="close"
              size=""
              onClick={closeModal}
            />
          </div>
          <div className="border-b-2 border-gray-300"></div>
          <div className="p-2 flex flex-col justify-center items-center"> 
            <div className="text-[14px] w-[60%] text-center pb-5 ">
              Record your slot video clip and save it when your trying to
              connect with a visitor, they can see you before they answer
            </div>

            <div>
              {stepOne && (
                <>
                  {isRecording ? (
                    <div className="w-[150px] h-[150px] overflow-hidden border-4 border-red-600 rounded-full">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover rounded-full transform scaleX-[-1]"
                        style={{ transform: "scaleX(-1)" }}
                      />
                    </div>
                  ) : (
                    <>
                      {!webmData && (
                        <div className="w-[150px] h-[150px] rounded-full border-4 border-gray-400 flex items-center justify-center"></div>
                      )}
                    </>
                  )}
                </>
              )}
              {stepTwo && (
                <>
                  {webmData && (
                    <>
                      <div className="w-[150px] h-[150px] overflow-hidden  border-4 border-[#8256C7] rounded-full">
                        <video
                          src={webmData}
                          autoPlay
                          loop
                          playsInline
                          className="w-full h-full object-cover rounded-full transform scaleX-[-1]"
                          style={{ transform: "scaleX(-1)" }}
                        />
                      </div>
                    </>
                  )}
                </>
              )}
            </div>

            <div>
              {stepOne && (
                <div className="mt-4">
                  {recording ? (
                    <div>
                      <Button
                        alignItems="center"
                        background="white"
                        hoverColor="#f9fafb"
                        border="1px solid"
                        borderColor="#D0D5DD"
                        borderRadius="8px"
                        color="#1D2939"
                        direction="row"
                        disabledColor="#F2F4F7"
                        display="flex"
                        flexDirection="row"
                        focusColor="#F2F4F7"
                        fontSize="14px"
                        gap="5px"
                        icon="coloredCircle"
                        iconColor="red"
                        iconPosition="leading"
                        justifyContent="center"
                        label={"Stop Recording " + `${formatTime(timerValue)}`}
                        size="sm"
                        onClick={stopRecording}
                      />
                    </div>
                  ) : (
                    <div className="">
                      <Button
                        alignItems="center"
                        background="white"
                        hoverColor="#f9fafb"
                        border="1px solid"
                        borderColor="#D0D5DD"
                        borderRadius="8px"
                        color="#1D2939"
                        direction="row"
                        disabledColor="#F2F4F7"
                        display="flex"
                        flexDirection="row"
                        focusColor="#F2F4F7"
                        fontSize="14px"
                        gap="5px"
                        icon="webcam"
                        iconPosition="leading"
                        justifyContent="center"
                        label="Start Recording"
                        size="sm"
                        onClick={startRecording}
                      />

                      {/* <Button
                        alignItems="center"
                        background="white"
                        hoverColor="#f9fafb"
                        border="1px solid"
                        borderColor="#D0D5DD"
                        borderRadius="8px"
                        color="#1D2939"
                        direction="row"
                        disabledColor="#F2F4F7"
                        display="flex"
                        flexDirection="row"
                        focusColor="#F2F4F7"
                        fontSize="14px"
                        gap="5px"
                        icon="webcam"
                        iconPosition="leading"
                        justifyContent="center"
                        label="Start Camera"
                        size="sm"
                        onClick={startCamera}
                      /> */}
                    </div>
                  )}
                </div>
              )}
              {stepTwo && (
                <>
                  <div className="mt-4 flex gap-2 flex-wrap ">
                    <div>
                      <Button
                        alignItems="center"
                        background="white"
                        hoverColor="#f9fafb"
                        border="1px solid"
                        borderColor="#D0D5DD"
                        borderRadius="8px"
                        color="#1D2939"
                        direction="row"
                        disabledColor="#F2F4F7"
                        display="flex"
                        flexDirection="row"
                        focusColor="#F2F4F7"
                        fontSize="14px"
                        gap="5px"
                        icon="webcam"
                        iconPosition="leading"
                        justifyContent="center"
                        label="Retake a video"
                        size="sm"
                        onClick={retakeVideo}
                      />
                    </div>
                    <div>
                      <Button
                        alignItems="center"
                        background="#7F56D9"
                        hoverColor="#7F56D9"
                        border="1px solid"
                        borderColor="#7F56D9"
                        borderRadius="8px"
                        color="white"
                        direction="row"
                        disabledColor="#F2F4F7"
                        display="flex"
                        flexDirection="row"
                        focusColor="#F2F4F7"
                        fontSize="14px"
                        gap="5px"
                        icon=""
                        iconPosition="leading"
                        justifyContent="center"
                        label="Use this clip"
                        size="custom"
                        paddingBottom={"10px"}
                        paddingLeft={"18px"}
                        paddingRight={"18px"}
                        paddingTop={"10px"}
                        onClick={useVideo}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default RecordModel;
