import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Checkbox,
  DropDownRight,
  Avatar,
  Dropdown,
  Input,
  InputPlain,
} from "@creativehub/marketrix-ui";
import ScreenInputField from "@/components/ScreenInputField/ScreenInputField";

// interface DelayProps {
//   onClose: () => void;
//   addMember: any;
//   roles: any[];
// }

function AddMember({ onClose, addMember, roles }) {
  const [selectedRole, setSelectedRole] = useState();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const addTeamMember = () => {
    const newUser = {
      email: email,
      firstname: firstName,
      lastname: lastName,
      role: selectedRole,
      password: password,
    };
    console.log("newUser", newUser);
    addMember(newUser);
  };

  const copyCredentials = () => {
    navigator.clipboard.writeText(email);
  };

  useEffect(() => {
    if (selectedRole == undefined) {
      setSelectedRole(roles[0].id);
    }
  }, [email]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Modal
        background="#fff"
        borderRadius="8px"
        boxShadow="0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 12px 16px -4px rgba(16, 24, 40, 0.10)"
        height=""
        onClose={onClose} // Close the modal on request
        show
        transition="2.5s ease-out"
        visibility="visible"
        width="100%"
      >
        <div className="w-full p-4 relative">
          {" "}
          {/* Added relative positioning */}
          <div className="absolute top-0 right-0 m-2">
            <Button
              border="none"
              borderRadius="8px"
              fontSize="12px"
              gap="8px"
              icon="close"
              size="sm"
              onClick={onClose}
              // Positioned in top-right corner
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="font-bold mtx-h6 mt-2 mb-2 justify-between">
              Add New Member
            </div>

            <div className="border-b-2"></div>

            <div className="flex items-center  w-full mt-4 gap-4 ">
              <InputPlain
                alignItems="center"
                alignment="left"
                background="#FFFFFF"
                border="1px solid #EBECF0"
                borderRadius="8px"
                boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                color="#101828"
                display="flex"
                errorMessageStyle={{
                  color: "red",
                }}
                flexDirection="row"
                height="44px"
                padding="16px 16px"
                placeholder="First Name"
                type="text"
                // value={"Olivia"}
                width="100%"
                onChange={(value) => {
                  setFirstName(value);
                }}
                value={firstName}
              />

              <InputPlain
                alignItems="center"
                alignment="left"
                background="#FFFFFF"
                border="1px solid #EBECF0"
                borderRadius="8px"
                boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                color="#000000"
                disabledBackgroundColor="#EBECF0"
                display="flex"
                errorMessageStyle={{
                  color: "red",
                }}
                flexDirection="row"
                height="44px"
                padding="16px 16px"
                placeholder="Last Name"
                type="text"
                width="100%"
                // value={"Rhye"}
                onChange={(value) => {
                  setLastName(value);
                }}
                value={lastName}
              />
            </div>

            <div className="flex items-center  w-full pr-4 mt-4 gap-4 ">
              <div className=" w-[80%] flex">
                <div className="relative flex">
                  <Input
                    outline={"none"}
                    alignItems="center"
                    alignment="left"
                    background="#FFFFFF"
                    border="1px solid #EBECF0"
                    borderRadius="8px"
                    boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                    color="#667085"
                    disabledBackgroundColor="#EBECF0"
                    display="flex"
                    flexDirection="row"
                    height="44px"
                    // value={"olivia@untitledui.com"}
                    padding=""
                    placeholder="olivia@untitledui.com"
                    type="email"
                    width="525px"
                    onChange={(value) => {
                      setEmail(value);
                    }}
                    value={email}
                  />
                  <div className="absolute left-[350px] top-0 p-1 ">
                    <Dropdown
                      outline={"none"}
                      padding={0}
                      borderRadius="8px"
                      color="black"
                      height="35px"
                      optionStyles={{
                        borderRadius: "10px",
                        width: "30px",
                      }}
                      options={roles}
                      labelKey="name"
                      valueKey="id"
                      width="120px"
                      onSelect={(e) => {
                        setSelectedRole(e.target.value);
                      }}
                      selectedValue={selectedRole}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center  w-full mt-4   ">
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
                placeholder="Enter your Password"
                type="password"
                width="525px"
                alignSelf={undefined}
                onChange={(value) => setPassword(value)}
                value={password}
              />

              {/* <InputPlain
                alignItems="center"
                alignment="left"
                background="#FFFFFF"
                border="1px solid #EBECF0"
                borderRadius="8px"
                boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                color="#101828"
                display="flex"
                errorMessageStyle={{
                  color: "red",
                }}
                flexDirection="row"
                height="44px"
                padding="16px 16px"
                placeholder="First Name"
                type="text"
                // value={"Olivia"}
                width="525px"
                onChange={(value) => {
                  setFirstName(value);
                }}
                value={firstName}
              /> */}
            </div>
            {/* <div className="flex justify-end p-2 mt-4">
              <div className="w-[20%]">
                <Button
                  background="#7F56D9"
                  hoverColor="#6941C6"
                  border="1px solid"
                  borderColor="#7F56D9"
                  borderRadius="8px"
                  color="white"
                  display={"flex"}
                  justifyContent="center"
                  alignItems="center"
                  fontSize="14px"
                  fontWeight="500"
                  label="Create"
                  lineHeight="normal"
                  paddingBottom={10}
                  paddingTop={10}
                  paddingLeft={5}
                  paddingRight={5}
                  width={"100%"}
                  onClick={addTeamMember}
                />
              </div>
            </div> */}

            <div className="flex items-center  w-full mt-4 gap-4 pr-4 ">
              <Button
                alignItems="center"
                background="white"
                border="1px solid"
                borderColor="#D0D5DD"
                color="#667085"
                gap="10px"
                direction="row"
                disabledColor="#E9D7FE"
                display="flex"
                fontSize="14px"
                fontWeight="500"
                flexDirection="row"
                focusColor="#F4EBFF"
                hoverColor="#F3F4F6"
                icon="copy"
                iconMargin={12}
                iconPosition="leading"
                justifyContent="center"
                label="Copy Credentials"
                size="sm"
                width={"100%"}
                onClick={copyCredentials}
              />

              <Button
                background="#7F56D9"
                hoverColor="#6941C6"
                borderColor="#7F56D9"
                borderRadius="8px"
                color="white"
                alignItems="center"
                border="1px solid"
                gap="10px"
                direction="row"
                disabledColor="#E9D7FE"
                display="flex"
                fontSize="14px"
                fontWeight="500"
                flexDirection="row"
                focusColor="#F4EBFF"
                icon="rocket"
                iconMargin={12}
                iconPosition="leading"
                iconColor={"#F6FEF9"}
                justifyContent="center"
                label="Send Invitation"
                size="sm"
                width={"100%"}
                onClick={addTeamMember}
              />

              {/* <Button
                background="#7F56D9"
                hoverColor="#6941C6"
                border="1px solid"
                borderColor="#7F56D9"
                borderRadius="8px"
                color="white"
                display={"flex"}
                justifyContent="center"
                alignItems="center"
                fontSize="14px"
                fontWeight="500"
                label="Send Invitation"
                lineHeight="normal"
                paddingBottom={10}
                paddingTop={10}
                paddingLeft={5}
                paddingRight={5}
                width={"100%"}
                onClick={addTeamMember}
              /> */}
            </div>
            {/* <div className="flex items-center w-full pr-4 mt-4 gap-4 justify-between">
              <div className="flex items-center justify-start gap-4 ">
                <Avatar
                  border="none"
                  borderRadius="50%"
                  height="40px"
                  image="https://xsgames.co/randomusers/avatar.php?g=female"
                  width="40px"
                />
                <div className="text-[#344054] mtx-subtitle1 !font-semibold">
                  <div>Olivia</div>
                  <div className="text-[#667085] mtx-body2">
                    Olivia@gmail.com
                  </div>
                </div>
              </div>

              <div>
                <Dropdown
                  border="none"
                  borderRadius="8px"
                  color="black"
                  outline="none"
                  height="44px"
                  labelKey="label"
                  onSelect={() => { }}
                  optionStyles={{
                    borderRadius: '10px',
                    color: 'black',
                    width: '30px'
                  }}
                  options={[
                    {
                      label: 'admin',
                      value: ''
                    },
                    {
                      label: 'member',
                      value: ''
                    }
                  ]}
                  padding={'8px'}
                  placeholder="select an option"

                  valueKey="value"
                  width="100%"
                />
              </div>
            </div> */}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AddMember;
