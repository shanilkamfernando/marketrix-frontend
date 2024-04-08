"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@creativehub/marketrix-ui";
import SignInScreenHeader from "@/components/Headers/SignInScreenHeader/SignInScreenHeader";
import LogoWithTitle from "@/components/LogoWithTitle/LogoWithTitle.js";
import ScreenInputField from "@/components/ScreenInputField/ScreenInputField.js";
import Link from "next/link";
//import Joyride, { STATUS } from "react-joyride";
import AdminAuthApi from "../api/admin/auth";
import { useDispatch } from "react-redux";
import { setAuthState, setNewUser,setProductTourStatus } from "@/store/authSlice";
import Router from "next/router";
import { AuthContext } from "@/auth/authContext";
import { loadingTriggered } from "@/store/actionSlice";
import SwitchLoginScreen from "@/components/SwitchLoginScreen/SwitchLoginScreen";
import { API_URL_GLOBAL_SET } from "../api/env";
import {  saveStateSession } from "@/store/localStorage";

const baseURL = API_URL_GLOBAL_SET.API_END_POINT;

function AdminSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //  const [googleLoginTriggered, setGoogleLoginTriggered] = useState(false);
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);

  const { isLoggedIn, setIsLoggedIn, tenantExist, setTenantExist } =
    authContext;
  const [autoGoogleLoginTriggered, setAutoGoogleLoginTriggered] =
    useState(false);

  const googleLogin = () => {
    window.open(baseURL + "/auth/google", "_self");
    //    setGoogleLoginTriggered(true);
    saveStateSession("googleLoginTriggered", true);
  };
 

  const autoGoogleLogin = (user) => {
    setAutoGoogleLoginTriggered(true);
    saveStateSession("googleLoginTriggered", false);
    dispatch(loadingTriggered(true));

    const req = {
      user: user,
    };

    AdminAuthApi.googleLogin(req)

      .then((response) => {
        var resData = response?.data;
        console.log("resData>>>>>>>>>>>>>>>>", resData);

        // console.log(
        //   "EEEEEEEEEEEEEEEEEEexisting_user resData>>>>>>>>>>>>>>>>",
        //   resData.existing_user
        // );

        if (resData) {
          if (resData.existing_user) {
            setIsLoggedIn(true);
            dispatch(setAuthState(resData));
            dispatch(setNewUser(false));
            dispatch(setProductTourStatus(false)); 
            dispatch(loadingTriggered(false));

            if (resData.tenantId) {
              setTenantExist(true);
              Router.push("/Dashboard/MLivePages/LiveTraffic");
            } else {
              Router.push("/SignUp/AdminRegistrationOnboardingStep01");
            }
          } else {
            dispatch(setAuthState(resData));
            dispatch(loadingTriggered(false));
            dispatch(setNewUser(true));
            dispatch(setProductTourStatus(true)); 
            Router.push("/SignUp/AdminRegistrationOnboardingStep01");
          }
        } else {
          dispatch(loadingTriggered(false));
          alert(response?.message);
        }
      })
      .catch((err) => {
        dispatch(loadingTriggered(false));
        alert(err);
        console.log(err);
      });

    // fetch(baseURL + "/auth/login/success", {
    //   method: "POST",
    //   credentials: "include",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Credentials": true,
    //   },
    //   body: JSON.stringify({ user }),
    // })
    //   .then((response) => {
    //     console.log("/auth/login/success RES_______________________", response);
    //     if (response.status === 200) return response.json();
    //     throw new Error("authentication has been failed!");
    //   })
    //   .then((response) => {
    //     var resData = response?.data?.data;
    //     console.log("resData>>>>>>>>>>>>>>>>", resData);

    //     console.log(
    //       "EEEEEEEEEEEEEEEEEEexisting_user resData>>>>>>>>>>>>>>>>",
    //       resData.existing_user
    //     );

    //     if (resData) {
    //       if (resData.existing_user) {
    //         setIsLoggedIn(true);
    //         dispatch(setAuthState(resData));
    //         dispatch(setNewUser(false));
    //         dispatch(loadingTriggered(false));

    //         if (resData.tenantId) {
    //           setTenantExist(true);
    //           Router.push("/Dashboard/MLivePages/LiveTraffic");
    //         } else {
    //           Router.push("/SignUp/AdminRegistrationOnboardingStep01");
    //         }
    //       } else {
    //         dispatch(setAuthState(resData));
    //         dispatch(loadingTriggered(false));
    //         dispatch(setNewUser(true));
    //         Router.push("/SignUp/AdminRegistrationOnboardingStep01");
    //       }
    //     } else {
    //       //  setLoadingStatus(false)
    //       dispatch(loadingTriggered(false));
    //       alert(response?.message);
    //     }
    //     //          setUser(resObject.user);
    //   })
    //   .catch((err) => {
    //     dispatch(loadingTriggered(false));
    //     alert(err);
    //     console.log(err);
    //   });
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const userDataEncoded = urlSearchParams.get("user");
    if (userDataEncoded) {
      // Decode and parse the user data
      const userInfo = JSON.parse(decodeURIComponent(userDataEncoded));

      console.log("userInfo________", userInfo); // Logs the user object
      autoGoogleLogin(userInfo);
    }
  }, []);

  const handleLogin = () => {
    dispatch(loadingTriggered(true));
    console.log("LOGIN", email, password);

    const req = {
      email: email,
      password: password,
    };

    AdminAuthApi.login(req).then((response) => {
      console.log("RESPONSE", response);

      if (response?.data) {
        setIsLoggedIn(true);
        dispatch(setAuthState(response.data));
        dispatch(setNewUser(false));
        dispatch(setProductTourStatus(false)); 
        dispatch(loadingTriggered(false));

        if (response.data.tenantId) {
          setTenantExist(true);
          Router.push("/Dashboard/MLivePages/LiveTraffic");
        } else {
          Router.push("/SignUp/AdminRegistrationOnboardingStep01");
        }

        // Router.push("/Dashboard/NewOverview")
      } else {
        //  setLoadingStatus(false)
        dispatch(loadingTriggered(false));
        alert(response?.message);
      }
    });
  };

  useEffect(() => {
    console.log("SignIn isLoggedIn", isLoggedIn);
    console.log("SignIn tenantExist", tenantExist);

    if (isLoggedIn && tenantExist) {
      dispatch(setNewUser(false));
      dispatch(setProductTourStatus(false)); 
      Router.push("/Dashboard/MLivePages/LiveTraffic");
    }
    if (isLoggedIn && !tenantExist) {
      dispatch(setNewUser(false));
      dispatch(setProductTourStatus(false)); 
      Router.push("/SignUp/AdminRegistrationOnboardingStep01");
    }
  }, [isLoggedIn, tenantExist]);
  //testing purpose


  useEffect(() => {
    if (!authContext) {
      return null; // Or show some loading/error message when the context is not available yet.
    }
  }, [authContext]);

  const [first, setfirst] = useState(null);
  useEffect(() => {
    setfirst(true);
  }, []);
  
  return (
    <div className=" h-screen">


      <div className="">
        <div>
          <SignInScreenHeader text="" textButton="" buttonLink="" />
        </div>
        <div className=" flex justify-center h-[90vh] items-center mt-[25px]">
          <div className=" xl:w-[30%] lg:w-[40%] w-[50%] ">
            <div className="flex justify-center ">
              <LogoWithTitle
                mainTitle="Welcome Back to Marketrix"
                subPara1="Sign in to Access Your Advanced"
                subPara2="Conversational Selling Suite"
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
                  InputFieldName="Password"
                  InputFeildType="password"
                  InputFieldPlaceholder="Enter your Password"
                  onChangeInput={(value) => setPassword(value)}
                  value={password}
                />

                <div className="py-5">
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
                    label="Sign In"
                    size="sm"
                    width="100%"
                    onClick={handleLogin}
                  />
                </div>
                <div
                  className="!underline underline-offset-4  decoration-[#667085]"
                >
                  <Link href="/SignIn/ForgotPassword" target="_self">
                    <Button
                      alignItems="center"
                      background="transparent"
                      border="1px solid"
                      borderColor="transparent"
                      borderRadius="8px"
                      color="#667085"
                      direction="row"
                      disabledColor="transparent"
                      display="flex"
                      flexDirection="row"
                      focusColor="transparent"
                      fontSize="14px"
                      gap="8px"
                      fontWeight={"500px"}
                      hoverColor="transparent"
                      justifyContent="flex-start"
                      label="Forgot Password?"
                      size="custom"
                      width="100%"
                    />
                  </Link>
                </div>
                <div className="flex justify-center pb-5">OR</div>

                <div className="pb-2 ">
                  {/* <button onClick={() => signIn('google')}>sign in with gooogle</button> */}

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
                    size="md"
                    width="100%"
                    // onClick={() => signIn("google")}
                    onClick={googleLogin}
                  />
                </div>

                <div>
                  <SwitchLoginScreen
                    stepId={""}
                    text="Don’t have an account ?"
                    textButton="Create Account"
                    buttonLink="/SignUp/AdminRegistration"
                  />
                </div>

                {/* <button
                  onClick={() =>
                    (window.location.href = "http://localhost:3001/auth/google")
                  }
                >
                  Login with Google Local 3001
                </button>
                <br />
                <button
                  onClick={() =>
                    (window.location.href = "http://localhost:8080/auth/google")
                  }
                >
                  Login with Google Local 8080
                </button>
                <br />
                <button
                  onClick={() =>
                    (window.location.href =
                      "https://api-dev.creative-hub.co/auth/google")
                  }
                >
                  Login with Google Dev
                </button>
                <br />
                <button
                  onClick={() =>
                    (window.location.href =
                      "https://api-v2.marketrix.io/auth/google")
                  }
                >
                  Login with Google Prod
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSignIn;
