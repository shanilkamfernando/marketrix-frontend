import { React, useState } from "react";
import { Button } from "@creativehub/marketrix-ui";

function TwoButtonIcon({gridViewChange }) {
  const [selectedButton, setSelectedButton] = useState("List");
  const triggerListView = () => {
    gridViewChange(false);
    setSelectedButton("List");
  };

  const triggerGridView = () => {
    gridViewChange(true);
    setSelectedButton("Grid");
  };
  return (
    <div className="w-[100%] p-[1rem]">
      <div className="flex  justify-end items-center">
        <div>
          <Button
            alignItems="center"
            background={selectedButton === "Grid" ? "#E4E7EC" : "#FCFCFD"}
            border="1px solid"
            borderColor="#D0D5DD"
            borderRadius="8px 0px 0px 8px "
            color="#667085"
            focusColor="#F4EBFF"
            fontSize="16px"
            fontWeight="900"
            gap="8px"
            hoverColor="#F3F4F6"
            icon="grid"
            iconPosition="leading"
            iconSize={"18px"}
            justifyContent="center"
            label=""
            paddingBottom={8}
            paddingLeft={8}
            paddingRight={8}
            paddingTop={8}
            size="custom"
            onClick={triggerGridView}
          />
        </div>
        <div>
          <Button
            alignItems="center"
            background={selectedButton === "List" ? "#E4E7EC" : "#FCFCFD"}
            border="1px solid"
            borderColor="#D0D5DD"
            borderRadius="0px 8px 8px 0px "
            color="#667085"
            focusColor="#F4EBFF"
            fontSize="16px"
            fontWeight="900"
            gap="8px"
            hoverColor="#F3F4F6"
            icon="list"
            iconPosition="leading"
            iconSize={"18px"}
            justifyContent="center"
            label=""
            paddingBottom={8}
            paddingLeft={8}
            paddingRight={8}
            paddingTop={8}
            size="custom"
            onClick={triggerListView}
          />
        </div>
      </div>
    </div>
  );
}

export default TwoButtonIcon;
