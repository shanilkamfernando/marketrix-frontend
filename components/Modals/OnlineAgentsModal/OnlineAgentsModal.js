import React, { useState } from "react";
import {
  Modal,
  Button,
  Progress,
  Badge,
  AvatarIntials,
  Avatar,
} from "@creativehub/marketrix-ui";
import Router from "next/router";
// interface OnlineAgentsModalProps {
//   onClose: () => void;
//   activeUsers: any;
// }

function OnlineAgentsModal({ onClose, activeUsers }) {
  return (
    <div className="w-full">
      <Modal
        background="#ffffff"
        borderRadius="8px"
        boxShadow="0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 12px 16px -4px rgba(16, 24, 40, 0.10)"
        height="100%"
        onClose={onClose} // Close the modal on request
        show
        transition="2.5s ease-out"
        visibility="visible"
        width="100%"
      >
        <div className="flex items-start text flex-col w-full h-50% bg-[#ffffff]  rounded-lg shadow text-[#344054]">
          <div className="w-full">
            <div className="text-[#344054] mtx-label !font-medium  gap-4 p-2">
              ACTIVE AGENTS
            </div>
            {activeUsers?.map((user, index) => (
              <div
                key={index}
                className="flex gap-3 items-center cursor-pointer rounded-b-lg  hover:bg-[#E4E7EC]  p-2 "
              >
                {user.imageUrl != null && user.imageUrl != "" ? (
                  <>
                    <Avatar
                      border="none"
                      borderRadius="50%"
                      height="30px"
                      image={user.imageUrl}
                      width="30px"
                    />{" "}
                  </>
                ) : (
                  <>
                    <AvatarIntials
                      background="#F9F5FF"
                      borderRadius="100%"
                      color="#7F56D9"
                      fontSize="14px"
                      height="30px"
                      name={user.userName}
                      width=" 30px"
                    />
                  </>
                )}

                <div>{user.userName}</div>
                <div>{user.email}</div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default OnlineAgentsModal;
