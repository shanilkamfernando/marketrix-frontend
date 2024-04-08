import React from "react";
import { Button, Input } from "@creativehub/marketrix-ui";
import SignInScreenHeader from "@/components/Headers/SignInScreenHeader/SignInScreenHeader";
import LogoWithTitle from "@/components/LogoWithTitle/LogoWithTitle";
import ScreenInputField from "@/components/ScreenInputField/ScreenInputField";
import Link from "next/link";
import { loadingTriggered } from "@/store/actionSlice";
import { useDispatch } from "react-redux";
import { saveStateSession } from "@/store/localStorage";
import { API_URL_GLOBAL_SET } from "../api/env";
const baseURL = API_URL_GLOBAL_SET.API_END_POINT;

function ForgotPasswordSendInstruction() {
  const googleLogin = () => {
    window.open(baseURL + "/auth/google", "_self"); 
    saveStateSession("googleLoginTriggered", true);
  };

  return (
    <div className=" h-screen">
      <div className="">
        <div>
          {" "}
          <SignInScreenHeader
            text="Don’t have an account?"
            textButton="Register"
            buttonLink="/SignUp/AdminRegistration"
          />
        </div>
        <div className=" flex justify-center">
          <div className=" xl:w-[30%] lg:w-[40%] w-[50%] ">
            <div className="flex justify-center ">
              <LogoWithTitle
                mainTitle="Forgot Password?"
                subPara1="Check your inbox for the link to"
                subPara2="reset your password."

              />
            </div>
            <div className="flex justify-start px-7 py-5 ">
              <div className=" w-full  ">
                <div className="pb-5 ">
                  {/* <Link href={"https://mail.google.com/"} target="_blank"> */}
                    <Button
                      alignItems="center"
                      background="#ffffff"
                      border="1px solid"
                      borderColor="#D0D5DD"
                      borderRadius="8px"
                      color="#344054"
                      direction="column"
                      disabledColor="transparent"
                      display="flex"
                      flexDirection="row"
                      focusColor="transparent"
                      fontSize="16px"
                      fontWeight="500"
                      gap="8px"
                      height="44px"
                      hoverColor="#F3F4F6"
                      icon="Google"
                      iconPosition="leading"
                      justifyContent="center"
                      label="Sign in with Google"
                      size="sm"
                      width="100%"
                      onClick={googleLogin}
                    />
                  {/* </Link> */}
                </div>

                <div className="text-justify text-[#667085] py-5">
                  You can also{" "}
                  <Link href={"https://mail.google.com/"} target="_blank">
                    <span className="underline underline-offset-4">
                      continue with email
                    </span>
                  </Link>{" "}
                  or with google{" "}
                </div>

                <div className="py-5">
                  <p className="text-left text-[#667085]">
                    When you register, you are consenting to our{" "}
                    <Link
                      href={"https://www.youtube.com/watch?v=-YRZfkZ5F5A"}
                      target="_blank"
                    >
                      <span className="text-[#1D2939] underline underline-offset-4">
                        {" "}
                        Terms of Service
                      </span>
                    </Link>{" "}
                    and{" "}
                    <Link
                      href={"https://www.youtube.com/watch?v=-YRZfkZ5F5A"}
                      target="_blank"
                    >
                      <span className="text-[#1D2939] underline underline-offset-4">
                        Privacy Policy
                      </span>
                    </Link>
                    . If you require assistance, please do not hesitate to{" "}
                    <Link
                      href={"https://www.youtube.com/watch?v=-YRZfkZ5F5A"}
                      target="_blank"
                    >
                      <span className="text-[#1D2939] underline underline-offset-4">
                        contact us.
                      </span>
                    </Link>
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

export default ForgotPasswordSendInstruction;
