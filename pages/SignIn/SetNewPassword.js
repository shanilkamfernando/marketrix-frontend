import React, { useEffect } from "react";
import { Button, Input } from "@creativehub/marketrix-ui";
import SignInScreenHeader from "@/components/Headers/SignInScreenHeader/SignInScreenHeader";
import LogoWithTitle from "@/components/LogoWithTitle/LogoWithTitle";
import ScreenInputField from "@/components/ScreenInputField/ScreenInputField";
import AdminAuthApi from "../api/admin/auth";
import { useRouter } from "next/router";
import { loadingTriggered } from "@/store/actionSlice";

import { useDispatch } from "react-redux";
function SetNewPassword() {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [token, setToken] = React.useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const SetNewPassword = () => {
    const req = { password, confirm_password: confirmPassword, token };
    dispatch(loadingTriggered(true));
    AdminAuthApi.resetPassword(req).then((res) => {
      if (res.status) {
        dispatch(loadingTriggered(false));
        router.push("/");
      }
    });
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");
    if (token) {
      setToken(token);
    }
  }, []);
  return (
    <div className=" h-screen">
      <div className="">
        <div>
          {" "}
          <SignInScreenHeader
            text="Already a user?"
            textButton="Sign in "
            buttonLink="/SignIn/AdminSignIn"
          />
        </div>
        <div className=" flex justify-center">
          <div className=" xl:w-[30%] lg:w-[40%] w-[50%] ">
            <div className="flex justify-center !text-center">
              <LogoWithTitle
                mainTitle="Sign In" 
                subPara1="Check your inbox for the link to"
                subPara2="reset your password."

              />
            </div>
            <div className="flex justify-start px-7 py-5 ">
              <div className=" w-full  ">
                <ScreenInputField
                  InputFieldName="New password"
                  InputFeildType="password"
                  InputFieldPlaceholder="Enter your password"
                  onChangeInput={(value) => setPassword(value)}
                  value={password}
                />

                <ScreenInputField
                  InputFieldName="Confirm password"
                  InputFeildType="password"
                  InputFieldPlaceholder="Enter your Confirm password"
                  onChangeInput={(value) => setConfirmPassword(value)}
                  value={confirmPassword}
                />

                <div className="pt-5">
                  <Button
                    alignItems="center"
                    background="#7F56D9"
                    border="1px solid"
                    borderColor="#6941C6"
                    borderRadius="8px"
                    color="white"
                    height="44px"
                    direction="row"
                    disabledColor="#E9D7FE"
                    display="flex"
                    flexDirection="column"
                    focusColor="transparent"
                    fontSize="16px"
                    gap="8px"
                    hoverColor="#6941C6"
                    justifyContent="center"
                    label="Set Password"
                    size="sm"
                    width="100%"
                    onClick={() => SetNewPassword()}
                  />
                </div>

                <div className="py-5">
                  <p className="text-justify text-[#667085] mtx-subtitle2">
                    When you register, you are consenting to our{" "}
                    <span className="text-[#1D2939] underline underline-offset-4">
                      {" "}
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="text-[#1D2939] underline underline-offset-4">
                      Privacy Policy
                    </span>
                    . If you require assistance, please do not hesitate to{" "}
                    <span className="text-[#1D2939] underline underline-offset-4">
                      contact us.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetNewPassword;
