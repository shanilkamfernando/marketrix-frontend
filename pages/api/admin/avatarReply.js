const APIKit = require("../config").default;
const { APIKitFormData, handleResponse } = require("../config");
const { AVATAR_OPENAI } = require("../constants/endPoints");

class AvatarReply {
  get_reply = async (message) => {
    console.log("AVATAR_OPENAI", message);

    return await APIKit.post(AVATAR_OPENAI.GET_REPLY, message)
      .then(handleResponse)
      .then((data) => {
        console.log("AVATAR_OPENAI", data);
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

  get_text_reply = async (data) => {
    console.log("AVATAR_OPENAI", data);

    return await APIKit.post(AVATAR_OPENAI.GET_TEXT_REPLY, data)
      .then(handleResponse)
      .then((data) => {
        console.log("AVATAR_OPENAI", data);
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

  get_loop_reply = async (data) => {
   // console.log("AVATAR_OPENAI", data);

    return await APIKit.post(AVATAR_OPENAI.GET_LOOP_REPLY, data)
      .then(handleResponse)
      .then((data) => {
        // console.log("AVATAR_OPENAI", data);
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
  get_loop_reply_continue = async (data) => {
   // console.log("AVATAR_OPENAI", data);

    return await APIKit.post(AVATAR_OPENAI.GET_LOOP_REPLY_CONTINUE, data)
      .then(handleResponse)
      .then((data) => {
        // console.log("AVATAR_OPENAI", data);
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
}

const AvatarReplyApi = new AvatarReply();
Object.freeze(AvatarReplyApi);
module.exports = AvatarReplyApi;
