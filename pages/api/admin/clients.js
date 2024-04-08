const APIKit = require("../config").default;
const { APIKitFormData, handleResponse } = require("../config");
const { CLIENT } = require("../constants/endPoints");
const CompanyApi = require("./companies").default;

class Client {
  create_client = async (data) => {
    let companyId = data.client_company_id;
    console.log("create_client", data);
    if (companyId == 0) {
      console.log("create_client =", data);
      const companyData = {
        name: data.company,
      };

      let createCompany = await CompanyApi.create_company(companyData);
      companyId = createCompany.data.id;
    }

    if (companyId != 0) {
      console.log("create_client >", data);
      const clientData = {
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        contact_no: data.contact_no,
        password: data.password,
        client_company_id: companyId,
      };

      return await APIKit.post(CLIENT.CLIENT_CREATE, clientData)
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
    }
  };

  upload_client_logo = async (body) => {
    console.log("upload_client_logo", body);

    return await APIKitFormData.post(CLIENT.UPLOAD_CLIENT_LOGO, body)
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

  get_client = async () => {
    return await APIKit.get(CLIENT.GET_ALL)
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

  get_client_by_id = async (id) => {
    return await APIKit.get(CLIENT.GET_BY_ID + `${id}`)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error?.response?.data;
      });
  };

  update_client = async (clientData, id) => {
    return await APIKit.post(CLIENT.CLIENT_UPDATE + `${id}`, clientData)
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

  delete_client = async (client_id) => {
    return await APIKit.delete(CLIENT.DELETE_CLIENT + `${client_id}`)
      .then(handleResponse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error?.response?.data;
      });
  };
}

const ClientApi = new Client();
Object.freeze(ClientApi);
module.exports = ClientApi;
