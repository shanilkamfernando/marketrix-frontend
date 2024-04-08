 
import { Button, Card, Avatar, Modal } from "@creativehub/marketrix-ui";
import React, { useState, useEffect, useRef } from "react";

function CompanyCard({ salesPitchName, salesTagName, onViewButtonClick }) {
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
                    <span className="bottom-0 left-7 absolute">
                      <Avatar
                        border="2px solid white"
                        borderRadius="12px"
                        height="12px"
                        image="https://picsum.photos/100/100?random=2"
                        width="16px"
                      />
                    </span>
                  </div>
                  <div className="text-[#344054] mtx-subtitle1 !font-semibold">
                    {salesPitchName}
                    <div className="flex gap-2 text-[#667085] mtx-body2">
                      {salesTagName}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-start justify-items-start mr-8">
                {isHovered && (
                  <div className="!font-semibold mtx-body2 text-[#F9F5FF]">
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
                      size="sm"
                      gap="8px"
                      paddingBottom={12}
                      paddingTop={12}
                      paddingLeft={12}
                      paddingRight={12}
                      onClick={openModal}
                      borderRadius="8px"
                    />
                  </div>
                )}

                <div>
                  <div className="fixed">
                    <div className="flex items-end">
                      <>
                        {isModalOpen && ( // Conditionally render the modal
                          <Modal
                            background="#FFFFF"
                            border="1px solid #ccc"
                            boxShadow="-2rem 2rem 2rem rgba(0, 0, 0, 0.2)"
                            height=""
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
                              label="View"
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
                                label="Drop Menu Item 5"
                                width="100%"
                                height="100%"
                                size="sm"
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
                            />
                          </Modal>
                        )}
                      </>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CompanyCard;
