const APIKit = require("../config").default;
const { handleResponse } = require("../config");
const { ADMIN_AUTH } = require("../constants/endPoints");

class AdminAuth {
  login = async (req) => {
    return await APIKit.post(ADMIN_AUTH.LOGIN, req)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        if (error && error.response) {
          return error.response.data;
        } else {
          return error;
        }
      });
  };

  googleLogin = async (req) => {
    return await APIKit.post(ADMIN_AUTH.GOOGLE_LOGIN, req)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        if (error && error.response) {
          return error.response.data;
        } else {
          return error;
        }
      });
  };

  forgotPassword = async (req) => {
    return await APIKit.post(ADMIN_AUTH.FORGOT_PASSWORD, req)
      .then(handleResponse)
      .then((data) => {
        alert(data.message);
        return data;
      })
      .catch((error) => {
        if (error && error.response) {
          alert(error.response.data.message);
          return error.response.data;
        } else {
          return error;
        }
      });
  };

  resetPassword = async (req) => {
    return await APIKit.post(ADMIN_AUTH.RESET_PASSWORD, req)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        if (error && error.response) {
          alert(error.response.data.message);
          return error.response.data;
        } else {
          return error;
        }
      });
  };
}

const AdminAuthApi = new AdminAuth();
Object.freeze(AdminAuthApi);
module.exports = AdminAuthApi;
