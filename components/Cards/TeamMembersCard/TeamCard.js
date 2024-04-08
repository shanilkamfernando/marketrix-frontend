import { TeamCardProps } from "@/interfaces/TeamCard";
import { Button, Card, Avatar, Modal } from "@creativehub/marketrix-ui";
import React, { useState, useEffect, useRef } from "react";

function TeamCard({ name, email, role, onViewButtonClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const cardRef = useRef(null);

  useEffect(() => {
    // Close the modal when user clicks outside the card
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleViewButtonClick = () => {
    onViewButtonClick(); // Invoke the onViewButtonClick prop passed from the Companies component
    closeModal(); // Close the modal after handling the button click
  };

  return (
    <div ref={cardRef}>
      <div>
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Card
            alignItems="center"
            background="#FFFFFF"
            border="1px solid #E4E7EC"
            borderColor="transparent"
            borderRadius="8px"
            display="flex"
            flexDirection="row"
            height="88px"
            hoverColor="#F3F4F6"
            justifyContent="space-between"
            left=""
            paddingBottom={20}
            paddingLeft={20}
            paddingRight={20}
            paddingTop={20}
            width=""
            top=""
            gap="16px"
          >
            <div className="flex justify-between w-full items-center">
              <div className="">
                <div className="mtx-subtitle2 text-[#F9F5FF] !leading-loose"></div>
                <div className="flex gap-4">
                  <div className="relative">
                    <Avatar
                      border="none"
                      borderRadius="50%"
                      height="40px"
                      image="https://picsum.photos/300/300?random=1"
                      width="40px"
                    />
                    <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-white-800 rounded-full"></span>
                  </div>
                  <div className="text-[#344054] mtx-subtitle1 !font-semibold">
                    {name}
                    <div className="flex gap-2 text-[#667085] mtx-body2">
                      {email}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-3 items-center">
                <div className=" text-[#667085] mtx-body2 mr-8 relative">
                  {role}
                </div>

                <div className="flex flex-row gap-4 items-center justify-center ">
                  <div className="relative">
                    {isHovered && (
                      <Button
                        alignItems="center"
                        border="1px solid"
                        borderColor={"grey"}
                        background=" FFFFFF"
                        color="#344054"
                        direction="row"
                        display="flex"
                        flexDirection="row"
                        icon="more-Dots"
                        justifyContent="center"
                        label=""
                        fontSize={"12px"}
                        onClick={openModal}
                        borderRadius="8px"
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end justify-stretch z-10 ">
                  {isModalOpen && ( // Conditionally render the modal
                    <div className="fixed">
                      <Modal
                        background="#FFFFF"
                        border="1px solid #ccc"
                        boxShadow="2rem 2rem 2rem rgba(0, 0, 0, 0.1)"
                        height="50%"
                        onClose={closeModal} // Close the modal on request
                        show
                        transition="2.5s ease-out"
                        visibility="visible"
                        width="100%"
                      >
                        <Button
                          alignItems="center"
                          background="#FFF"
                          borderRadius="0px"
                          color="#595f4f"
                          direction="row"
                          disabledColor="#E9D7FE"
                          display="flex"
                          flexDirection="row"
                          fontSize="12px"
                          gap="8px"
                          hoverColor="#F3F4F6"
                          icon="user"
                          justifyContent="center"
                          label="Pin this member"
                          width="100%"
                          height="100%"
                          size="md"
                          onClick={handleViewButtonClick}
                        />
                        <div className=" border-b-2  border-#E4E7EC-100">
                          <Button
                            alignItems="center"
                            background="#FFF"
                            borderRadius="0px"
                            color="#595f4f"
                            direction="row"
                            disabledColor="#E9D7FE"
                            display="flex"
                            flexDirection="row"
                            fontSize="12px"
                            hoverColor="#F3F4F6"
                            justifyContent="flex start"
                            label="Change role"
                            width="100%"
                            height="100%"
                            size="sm"
                          />
                        </div>
                        <Button
                          alignItems="center"
                          background="#FFF"
                          color="#595f4f"
                          direction="row"
                          disabledColor="#E9D7FE"
                          display="flex"
                          flexDirection="row"
                          fontSize="12px"
                          gap="12px"
                          hoverColor="#F3F4F6"
                          icon="Delete"
                          justifyContent="center"
                          label="Delete"
                          size="sm"
                          borderRadius="0px"
                          width="100%"
                          height="100%"
                        />

                        <Button
                          alignItems="center"
                          background="#FFF"
                          color="#595f4f"
                          direction="row"
                          disabledColor="#E9D7FE"
                          display="flex"
                          flexDirection="row"
                          fontSize="12px"
                          gap="12px"
                          hoverColor="#F3F4F6"
                          justifyContent="center"
                          label="Drop menu item 4"
                          size="sm"
                          borderRadius="0px"
                          width="100%"
                          height="100%"
                        />

                        <div className=" border-b-2  border-#E4E7EC-100">
                          <Button
                            alignItems="center"
                            background="#FFF"
                            color="#595f4f"
                            direction="row"
                            disabledColor="#E9D7FE"
                            display="flex"
                            flexDirection="row"
                            fontSize="12px"
                            gap="12px"
                            hoverColor="#F3F4F6"
                            justifyContent="center"
                            label="Drop menu item 5"
                            size="sm"
                            borderRadius="0px"
                            width="100%"
                            height="100%"
                          />
                        </div>
                        <Button
                          alignItems="center"
                          background="#FFF"
                          border=""
                          color="#595f4f"
                          direction="row"
                          disabledColor="#E9D7FE"
                          display="flex"
                          flexDirection="row"
                          focusColor="#F4EBFF"
                          fontSize="12px"
                          gap="12px"
                          hoverColor="#F3F4F6"
                          icon="plus"
                          justifyContent="center"
                          label="Create new issue"
                          size="sm"
                          borderRadius="0px"
                          width="100%"
                          height="100%"
                        />
                      </Modal>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default TeamCard;
