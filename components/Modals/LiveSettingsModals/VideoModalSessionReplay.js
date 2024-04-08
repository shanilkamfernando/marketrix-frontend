import React from "react";
import { Modal, Button } from "@creativehub/marketrix-ui";
import {
  getFormattedDate,
  getFormattedDateOnly,
  getFormattedTimeHM,
} from "@/helpers/helpers";

function VideoModalSessionReplay({ onClose, videoLink, selectedSession }) {
  return (
    <div className="w-full">
      <Modal
        background="#fff"
        borderRadius="8px"
        boxShadow="0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 12px 16px -4px rgba(16, 24, 40, 0.10)"
        height="580px"
        onClose={onClose} // Close the modal on request
        show
        transition="2.5s ease-out"
        visibility="visible"
        width="950px"
      >
        <div className="py-2 px-[1.5rem] flex justify-between items-center">
          <div>
            Session Replay | {getFormattedDateOnly(selectedSession.createdAt)} |{" "}
            {getFormattedTimeHM(selectedSession.createdAt)}
          </div>

          <div>
            {" "}
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
        {/* <div className="border-b-2 border-gray-300"></div> */}
        <div className="py-2 w-[100%]  flex justify-center items-center">
          <video
            src={videoLink}
            autoPlay
            playsinline
            className="rounded-lg p-0  w-[900px] h-[520px]"
            type="video/mp4"
          />

          {/* <iframe
            src={
              videoLink
            }
            // frameborder="0"
            allow="autoplay"
            className="rounded-lg p-0  w-[900px] h-[520px]"
          />  */}
        </div>
      </Modal>
    </div>
  );
}

export default VideoModalSessionReplay;
