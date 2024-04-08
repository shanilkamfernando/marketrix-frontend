import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import ReCaptchaApi from "@/pages/api/reCaptcha/reCaptcha";

const SITE_KEY = "6LdNoW8pAAAAACe-eF68uQvr74td0vSutGHtYc39"; 

function ReCaptcha({ setIsverified , isVerified }) {
  const recaptcha = useRef(null);

  const verifyCaptcha = async (token) => {

    if(token){
       const req = {
      captchaToken: token,
    };
    await ReCaptchaApi.verify(req).then((response) => {
      console.log("ReCaptchaApi.verify response________", response);
      if (response?.data?.success === true) {
        console.log("ReCaptchaApi.verify success response________");
        setIsverified(true);
      } else {
        console.log("ReCaptchaApi.verify fail response________");
        setIsverified(false);
      }
    });
    }else{
      setIsverified(false);
    }
   
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="p-5">
        <ReCAPTCHA
          size="normal"
          sitekey={SITE_KEY}
          onChange={verifyCaptcha}
          ref={recaptcha}
        />
      </div>
    </div>
  );
}

export default ReCaptcha;
