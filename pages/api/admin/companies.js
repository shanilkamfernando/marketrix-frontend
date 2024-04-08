const APIKit = require("../config").default;
const { APIKitFormData, handleResponse } = require("../config");
const { COMPANY } = require("../constants/endPoints");

class Company {
    create_company = async (companyData) => {
        console.log('COMPANY', companyData);

        return await APIKit.post(COMPANY.CREATE_COMPANY, companyData)
            .then(handleResponse)
            .then(data => {
                return data;
            })
            .catch(error => {
                console.log("client data", error);
                if (error?.response) {
                    return error?.response?.data;
                }
                else {
                    return error;
                }
            });
    }

    upload_company_logo = async (body) => {
        console.log('upload_company_logo', body);

        return await APIKitFormData.post(COMPANY.UPLOAD_COMPANY_LOGO, body)
            .then(handleResponse)
            .then(data => {
                return data;
            })
            .catch(error => {
                console.log("client data", error);
                if (error?.response) {
                    return error?.response?.data;
                }
                else {
                    return error;
                }
            });
    }

    get_company = async () => {
        return await APIKit.get(COMPANY.GET_ALL)
            .then(handleResponse)
            .then(data => {
                return data;
            })
            .catch(error => {
                if (error?.response) {
                    return error?.response?.data;
                }
                else {
                    return error;
                }
            });
    }

    get_company_by_id = async (id) => {
        return await APIKit.get(COMPANY.GET_BY_ID + `${id}`)
            .then(handleResponse)
            .then(data => {
                return data;
            })
            .catch(error => {
                return error?.response?.data;
            });
    }

    update_company = async (companyData, id) => {
        return await APIKit.post(COMPANY.UPDATE_COMPANY + `${id}`, companyData)
            .then(handleResponse)
            .then(data => {
                return data;
            })
            .catch(error => {
                if (error?.response) {
                    return error?.response?.data;
                }
                else {
                    return error;
                }
            });
    }

    delete_company = async (company_id) => {
        return await APIKit.delete(COMPANY.DELETE_COMPANY + `${company_id}`)
            .then(handleResponse)
            .then(data => {
                return data;
            })
            .catch(error => {
                return error?.response?.data;
            });
    }
}

const CompanyApi = new Company();
Object.freeze(CompanyApi);
module.exports = CompanyApi;
