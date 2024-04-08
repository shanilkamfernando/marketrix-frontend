import APIKit, { handleResponse } from "../config";
import { LOGGED_IN_USER } from "../constants/endPoints";
import router from "next/router";

class LoggedInUser {
  get = async () => {
    return await APIKit.get(LOGGED_IN_USER.GET_USER)
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

  validate_admin_token = async () => {
    return await APIKit.get(LOGGED_IN_USER.VALIDATE_ADMIN_TOKEN)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        if (error?.response) {
        //   router.push("/");
          return error?.response?.data;
        } else {
          console.log("ERROR2");
          return error;
        }
      });
  };

  validate_client_token = async () => {
    return await APIKit.get(LOGGED_IN_USER.VALIDATE_CLIENT_TOKEN)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        if (error?.response) {
          router.push("/");
          return error?.response?.data;
        } else {
          return error;
        }
      });
  };
}

const LoggedInUserApi = new LoggedInUser();
Object.freeze(LoggedInUserApi);
export default LoggedInUserApi;
