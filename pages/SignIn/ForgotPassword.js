import React, { useState } from "react";
import { Button, Input } from "@creativehub/marketrix-ui";
import SignInScreenHeader from "@/components/Headers/SignInScreenHeader/SignInScreenHeader";
import LogoWithTitle from "@/components/LogoWithTitle/LogoWithTitle";
import ScreenInputField from "@/components/ScreenInputField/ScreenInputField";
import Link from "next/link";
import AdminAuthApi from "../api/admin/auth";
import { useRouter } from "next/router";

function ForgotPassword() {
  const [email, setEmail] = useState("")

  const router = useRouter();

  const sentEmail = () => {
    console.log(email)
    const req = { email }
    AdminAuthApi.forgotPassword(req).then((res) => {
      if (res.status) {
        router.push("/SignIn/ForgotPasswordSendInstruction")
      }
    })

  }
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
                mainTitle="Forgot Password?"
                subPara1="Please provide the email address associated with your account, and we will send you detailed instructions on how to reset your password."
                subPara2="we will never send your password via email." 
              />
            </div>
            <div className="flex justify-start px-7 py-5 ">
              <div className=" w-full  ">
                <ScreenInputField
                  InputFieldName="Email Address"
                  InputFeildType="email"
                  InputFieldPlaceholder="Enter your Email"
                  onChangeInput={(value ) => setEmail(value)}
                  value={email}
                />

                <div className="pt-5">
                  {/* <Link href="/ForgotPassword/ForgotPasswordSendInstruction" target="_self"> */}
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
                    label="Send reset link"
                    size="sm"
                    width="100%"
                    onClick={() => sentEmail()}

                  />
                  {/* </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
