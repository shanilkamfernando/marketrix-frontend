import React, { useEffect, useState } from "react";
import { Button, Input } from "@creativehub/marketrix-ui";
import SignInScreenHeader from "@/components/Headers/SignInScreenHeader/SignInScreenHeader";
import LogoWithTitle from "@/components/LogoWithTitle/LogoWithTitle";
import ScreenInputField from "@/components/ScreenInputField/ScreenInputField";
import TermsandConditionIntro from "@/components/TermsandConditionIntro/TermsandConditionIntro";
import User from "@/pages/api/admin/users";
import { useDispatch } from "react-redux";
import { setAuthState, setNewUser ,setProductTourStatus} from "../../store/authSlice";
import Router from "next/router";
import { loadingTriggered } from "@/store/actionSlice";
import SwitchLoginScreen from "@/components/SwitchLoginScreen/SwitchLoginScreen";
import ReCaptcha from "@/components/ReCaptcha/ReCaptcha";
import { API_URL_GLOBAL_SET } from "../api/env";
import { loadStateSession, saveStateSession } from "@/store/localStorage";

const baseURL = API_URL_GLOBAL_SET.API_END_POINT;

const isConfirmPasswordMatched = (password, confirmPassword) => {
  if (password === confirmPassword) {
    return true;
  } else {
    return false;
  }
};

const disableButton = (email, password, confirmPassword) => {
  if (email != "" && password != "" && confirmPassword != "") {
    return true;
  } else {
    return false;
  }
};

function AdminRegistration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVerified, setIsverified] = useState(false);
  const dispatch = useDispatch();

  const googleRegister = () => {
    window.open(baseURL + "/auth/google", "_self");
    //    setGoogleLoginTriggered(true);
    saveStateSession("googleLoginTriggered", true);
  };

  const handleCreateAccount = () => {
    console.log("CREATE ACCOUNT", email, password, confirmPassword);

    if (isConfirmPasswordMatched(password, confirmPassword)) {
      const req = {
        email: email,
        password: password,
      };

      dispatch(loadingTriggered(true));
      console.log("REQ", req);
      User.sign_up(req).then((response) => {
        console.log("RESPONSE___________________", response);

        if (response?.status) {
          dispatch(setAuthState(response.data));
          dispatch(loadingTriggered(false));
          dispatch(setNewUser(true));
          dispatch(setProductTourStatus(true)); 
          Router.push("/SignUp/AdminRegistrationOnboardingStep01");
        } else {
          alert(response?.message);
          dispatch(loadingTriggered(false));
        }
      });
    } else {
      alert("Password and Confirm Password not matched");
      dispatch(loadingTriggered(false));
    }
  };

  return (
    <div className="h-screen">
      <div className="">
        <SignInScreenHeader text="" textButton="" buttonLink="" />
        <div className=" flex justify-center h-[90vh] 2xl:items-center items-start -mt-4">
          <div className=" xl:w-[30%] lg:w-[40%] w-[50%] ">
            <div className="flex justify-center ">
              <LogoWithTitle
                mainTitle="Join Marketrix Today"
                subPara1="Create Your Account and Empower"
                subPara2="Your Sale with AI"
              />
            </div>
            <div className="flex justify-start px-7 py-5 ">
              <div className=" w-full  ">
                <ScreenInputField
                  InputFieldName="Email"
                  InputFeildType="email"
                  InputFieldPlaceholder="Enter your Email"
                  onChangeInput={(value) => setEmail(value)}
                  value={email}
                />
                <ScreenInputField
                  InputFieldName="Password*"
                  InputFeildType="password"
                  InputFieldPlaceholder="Enter your Password"
                  onChangeInput={(value) => setPassword(value)}
                  value={password}
                />
                <ScreenInputField
                  InputFieldName="Confirm Password"
                  InputFeildType="password"
                  InputFieldPlaceholder="Enter your Password"
                  onChangeInput={(value) => setConfirmPassword(value)}
                  value={confirmPassword}
                />
                <ReCaptcha
                  setIsverified={setIsverified}
                  isVerified={isVerified}
                />

                <div className="py-5 ">
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
                    label="Create account"
                    size="sm"
                    width="100%"
                    onClick={handleCreateAccount}
                    disabled={!isVerified}
                  />
                </div>

                <div className="flex justify-center pb-5">OR</div>

                <div className="pb-5 ">
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
                    label="Continue with Google"
                    size="sm"
                    width="100%"
                    onClick={googleRegister}
                  />
                </div>

                <SwitchLoginScreen
                  text="Already a user ?"
                  textButton="Sign in"
                  buttonLink="/SignIn/AdminSignIn"
                />

                <TermsandConditionIntro />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRegistration;
