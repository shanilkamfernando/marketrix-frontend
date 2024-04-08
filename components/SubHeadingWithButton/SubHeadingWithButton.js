import { Button } from "@creativehub/marketrix-ui";
import React from "react";

function SubHeadingWithButton() {
  return (
    <div className="flex justify-between items-center">
      <div className="mtx-subtitle1 !font-semibold">Upcoming pitches</div>
      <div>
        <Button
          alignItems="center"
          background="#D0D5DD"
          border="1px solid"
          borderColor="#D0D5DD"
          color="#344054"
          direction="row"
          disabledColor="#E9D7FE"
          display="flex"
          gap="10px"
          flexDirection="row"
          focusColor="#F4EBFF"
          hoverColor="#F3F4F6"
          icon="bars"
          iconPosition="leading"
          justifyContent="center"
          label="Filter"
          paddingBottom={10}
          paddingLeft={16}
          paddingRight={16}
          paddingTop={10}
          size="lg"
        />
      </div>
    </div>
  );
}

export default SubHeadingWithButton;
