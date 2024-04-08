import APIKit, { APIKitFormData,handleResponse } from "../config";
import {USER_ROLE } from "../constants/endPoints"
 
class UserRoles {
  
    get_roles  = async () => {
        return await APIKit.get(USER_ROLE.GET_ALL,)
            .then(handleResponse)
            .then(data => {
                // console.log("GET_ALL--------", data)
                return data;

            })
            .catch(error => {
                console.log("GET_ALL----------", error)
                return error?.response?.data;
            })
    }

}

const UserRolesApi = new UserRoles;
Object.freeze(UserRolesApi);
export default UserRolesApi; 