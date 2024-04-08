//import { SignInScreenInputField } from "@/interfaces/signInScreenInputField";
import { Input } from "@creativehub/marketrix-ui";
import React from "react";


function ScreenInputField({ InputFieldName, InputFeildType, InputFieldPlaceholder, onChangeInput, value }) {
  return (
    <div>
      <div className="pb-3">
        <div className="pb-2 text-[#344054] !font-medium">{InputFieldName}</div>
        <div className="">
          <Input
            alignItems="center"
            alignment="left"
            background="#FFFFFF"
            border="1px solid #D0D5DD"
            borderRadius="8px"
            boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
            color="#989898"
            disabledBackgroundColor="#EBECF0"
            display="flex"
            flexDirection="row"
            height=""
            padding="10px 8px"
            placeholder={InputFieldPlaceholder}
            type={InputFeildType}
            width="100%"
            alignSelf={undefined}
            onChange={onChangeInput}
            value={value}
          />
        </div>
      </div>
    </div>
  );
}

export default ScreenInputField;
