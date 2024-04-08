import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Card, Modal } from "@creativehub/marketrix-ui";
import { MdOutlineMail } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { TbPlugConnectedX } from "react-icons/tb";
import { PiPlugsConnectedFill } from "react-icons/pi";

function ConnectionSuccessAlert({
  onClose,
  buttonFunction,
  buttoneText,
  mainMsg,
  subMsg,
}) {
  const [modalShow, setModalShow] = useState("");
  const checkConnection = () => {
    buttonFunction(); 
  };

  useEffect(() => {
    setTimeout(() => { 
      //onClose()
    }, 5000);
  }, []);
  
  useEffect(() => {
    //   Get the path without the domain
    const pathWithoutDomain = window.location.pathname;
    console.log(
      "pathWithoutDomain_______________________________",
      pathWithoutDomain
    );
    if (pathWithoutDomain === "/Dashboard/NewOverview") {
      setModalShow(false);
    } else {
      setModalShow(true);
    }
  }, []);


 

  return (
    <div>
      {modalShow && (
        <>
          <Modal
            background="#28a745"
            borderRadius="8px"
            border="1px solid #28a745"
            borderColor="#28a745"
            boxShadow="0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 12px 16px -4px rgba(16, 24, 40, 0.10)"
            height="100%"
            onClose={onClose} // Close the modal on request
            show
            transition="2.5s ease-out"
            visibility="visible"
            width="100%"
          >
            <Card
              alignItems="center"
              background="#28a745"
              border="1px solid #28a745"
              borderRadius="8px"
              flexDirection="row"
              hoverColor="#28a745"
              boxShadow=" 0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 12px 16px -4px rgba(16, 24, 40, 0.10)"
              justifyContent="flex-start"
              paddingBottom={10}
              paddingLeft={10}
              paddingRight={10}
              paddingTop={10}
            >
              <div className="flex !font-bold mtx-body2 gap-3  justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div className=" p-2 bg-[#218838] text-white rounded-[10px]">
                    <PiPlugsConnectedFill  size={24} />
                  </div>

                  <div className="flex flex-col text-black text-[14px]">
                    <div className="!font-bold leading-6">{mainMsg}</div>
                    <div className="!font-light">{subMsg}</div>
                  </div>
                </div>
                <div className=" flex gap-3 items-center">
                  {/* <div>
                    <Button
                      alignItems="center"
                      background="white"
                      border="1px solid"
                      borderColor="white"
                      borderRadius="8px"
                      color="#6941C6"
                      direction="row"
                      disabledColor="#E9D7FE"
                      display="flex"
                      flexDirection="row"
                      focusColor="#F4EBFF"
                      fontWeight="500"
                      fontSize="14px"
                      gap="8px"
                      hoverColor="#F9FAFB"
                      justifyContent="center"
                      label={buttoneText}
                      size="sm"
                      onClick={checkConnection}
                    />
                  </div> */}

                  <div>
                    <AiOutlineClose
                      className="text-black cursor-pointer"
                      size={18}
                      onClick={onClose}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </Modal>{" "}
        </>
      )}
    </div>
  );
}

export default ConnectionSuccessAlert;
