const APIKit = require("../config").default;
const { handleResponse, APIKitFormData } = require("../config");
const { USER } = require("../constants/endPoints");

var accessToken = "YOUR_ACCESS_TOKEN_HERE";

class User {
  create_user = async (userData) => {
    console.log("userData", userData);
    return await APIKit.post(USER.USER_CREATE, userData)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error?.response?.data;
      });
  };

  sign_up = async (userData) => {
    return await APIKit.post(USER.USER_SIGN_UP, userData)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error?.response?.data;
      });
  };

  add_tenant = async (userData) => {
    return await APIKit.post(USER.ADD_TENANT, userData)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error?.response?.data;
      });
  };

  add_users = async (userData) => {
    console.log("userData", userData);
    return await APIKit.post(USER.ADD_USERS, userData)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error?.response?.data;
      });
  };

  upload_user_logo = async (body) => {
    return await APIKitFormData.post(USER.UPLOAD_USER_LOGO, body)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log("client data", error);
        if (error?.response) {
          return error?.response?.data;
        } else {
          return error;
        }
      });
  };

  upload_user_video = async (body) => {
    console.log("upload_user_video__________", body); 
    return await APIKitFormData.post(USER.UPLOAD_USER_VIDEO, body)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log("upload_user_video user data", error);
        if (error?.response) {
          return error?.response?.data;
        } else {
          return error;
        }
      });
  };

  upload_user_video_test = async (body) => {
    console.log("upload_user_video__________", body); 

    return await APIKitFormData.post(USER.UPLOAD_USER_VIDEO_TEST, body)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log("upload_user_video user data", error);
        if (error?.response) {
          return error?.response?.data;
        } else {
          return error;
        }
      });
  };

  get_all_user_videos = async () => {
    return await APIKit.get(USER.GET_ALL_USER_VIDEOS)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log("GET_ALL_USER_VIDEOS----------", error);
        return error?.response?.data;
      });
  };
  get_user = async () => {
    return await APIKit.get(USER.GET_ALL)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log("GET_ALL----------", error);
        return error?.response?.data;
      });
  };

  get_user_by_id = async (id) => {
    return await APIKit.get(USER.GET_BY_ID + `${id}`)
      .then(handleResponse)
      .then((data) => {
        console.log("GET_ALL-Sucess", data);
        return data;
      })
      .catch((error) => {
        return error?.response?.data;
      });
  };

  update_user = async (userData, id) => {
    console.log("idd update user ------- :", id);
    return await APIKit.post(USER.USER_UPDATE + `${id}`, userData)
      .then(handleResponse)
      .then((data) => {
        console.log("update_client--------", data);
        return data;
      })
      .catch((error) => {
        return error?.response?.data;
      });
  };

  delete_user = async (user_id) => {
    return await APIKit.delete(USER.DELETE_USER + `${user_id}`)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error?.response?.data;
      });
  };
}

const UserApi = new User();
Object.freeze(UserApi);
module.exports = UserApi;
