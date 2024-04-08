const APIKit = require("../config").default;
const { APIKitFormData, handleResponse } = require("../config");
const { AVATAR } = require("../constants/endPoints");

class Avatar {
  get_all_demo_avatars = async () => {
    return await APIKit.post(AVATAR.GET_ALL_DEMO_AVATARS)
      .then(handleResponse)
      .then((data) => {
        console.log("DEMO AVATARS", data);
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
  create_avatar = async (data) => {
    return await APIKit.post(AVATAR.CREATE, data)
      .then(handleResponse)
      .then((data) => {
        console.log("CREATE AVATAR", data);
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

  create_avatar_form_data = async (data) => {
    return await APIKitFormData.post(AVATAR.CREATE_FORM_DATA, data)
      .then(handleResponse)
      .then((data) => {
        console.log("CREATE AVATAR", data);
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

  get_avatar = async (id) => {
    return await APIKit.get(AVATAR.GET_AVATAR + `${id}`)
      .then(handleResponse)
      .then((data) => {
        console.log("GET AVATAR", data);
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
  update_avatar = async (id, data) => {
    console.log("UPDATE AVATAR", id, data);
    return await APIKit.post(AVATAR.UPDATE + `${id}`, data)
      .then(handleResponse)
      .then((data) => {
        console.log("UPDATE AVATAR", data);
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

  get_all_avatars = async () => {
    return await APIKit.get(AVATAR.GET_ALL_AVATARS)
      .then(handleResponse)
      .then((data) => {
        console.log("GET ALL AVATARS", data);
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
  delete_avatar = async (id) => {
    return await APIKit.delete(AVATAR.DELETE_AVATAR + `${id}`)
      .then(handleResponse)
      .then((data) => {
        console.log("DELETE AVATAR", data);
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

const AvatarApi = new Avatar();
Object.freeze(AvatarApi);
module.exports = AvatarApi;
