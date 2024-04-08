import APIKit, { handleResponse } from "../config";
import { RE_CAPTCHA } from "../constants/endPoints";
import router from "next/router";

class ReCaptcha {
  verify = async (reqData) => {
    return await APIKit.post(RE_CAPTCHA.VERIFY,reqData)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        if (error?.response) {
          return error?.response?.data;
        } else {
          return error;
        }
      });
  };
 
}

const ReCaptchaApi = new ReCaptcha();
Object.freeze(ReCaptchaApi);
export default ReCaptchaApi;
