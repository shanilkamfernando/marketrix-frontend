import { Button } from "@creativehub/marketrix-ui";
import React, { useState } from "react";
// import { SubHeadingProps } from "@/interfaces/SubHeadingTabs";

function SubHeadingTabs({ Tab1, Tab2, Tab3 }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const fontColor = isHovered ? "#6941C6" : "#667085";
  return (
    <div className="flex justify-between items-center">
      <div className="mb-4 ">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="myTab"
          data-tabs-toggle="#myTabContent"
          role="tablist"
        >
          <li className="mr-2" role="presentation">
            <Button
              alignItems="center"
              background="#F9F5FF"
              border="1px solid"
              borderColor="#F9F5FF"
              color="#6941C6"
              direction="row"
              disabledColor="#E9D7FE"
              display="flex"
              flexDirection="row"
              focusColor="#F4EBFF"
              hoverColor="#F9F5FF"
              justifyContent="center"
              label={Tab1}
              size="sm"
            />
          </li>

          <li className="mr-2" role="presentation">
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Button
                alignItems="center"
                color={fontColor}
                direction="row"
                display="flex"
                flexDirection="row"
                justifyContent="center"
                label={Tab2}
                size="sm"
                hoverColor="#F9F5FF"
              />
            </div>
          </li>
          <li className="mr-2" role="presentation">
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Button
                alignItems="center"
                color={fontColor}
                direction="row"
                display="flex"
                flexDirection="row"
                justifyContent="center"
                label={Tab3}
                size="sm"
                hoverColor="#F9F5FF"
              />
            </div>
          </li>
        </ul>
      </div>

      <div>
        <Button
          alignItems="center"
          background=" #FFFFFF"
          border="1px solid"
          borderColor=" #FFFFFF"
          color="#344054"
          direction="row"
          disabledColor="#E9D7FE"
          display="flex"
          flexDirection="row"
          focusColor="#F4EBFF"
          hoverColor="#F3F4F6"
          icon="bars"
          iconPosition="leading"
          justifyContent="center"
          label="Filter"
          gap="10px"
          paddingBottom={10}
          paddingLeft={16}
          paddingRight={16}
          paddingTop={10}
          size="sm"
        />
      </div>
    </div>
  );
}

export default SubHeadingTabs;
