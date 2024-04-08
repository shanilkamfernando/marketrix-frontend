const APIKit = require("../config").default;
const { handleResponse, APIKitFormData } = require("../config");
const { TENANT } = require("../constants/endPoints");

class Tenant {
  create_tenant = async (reqData) => {
    console.log("userData", reqData);
    return await APIKit.post(TENANT.CREATE, reqData)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error?.response?.data;
      });
  };

  update_tenant = async (reqData) => {
    console.log("userData", reqData);
    return await APIKit.post(TENANT.UPDATE, reqData)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error?.response?.data;
      });
  };

  snippetCode = async () => {
    return await APIKit.get(TENANT.SNIPPET_CODE)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error?.response?.data;
      });
  };
  get_tenant = async () => {
    return await APIKit.get(TENANT.GET_TENANT)
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

  upload_tenant_logo = async (body) => {
    return await APIKitFormData.post(TENANT.UPLOAD_TENANT_LOGO, body)
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
}

const TenantApi = new Tenant();
Object.freeze(TenantApi);
module.exports = TenantApi;
