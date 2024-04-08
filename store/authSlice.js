import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

import { clearStateSession, saveState, saveStateSession } from "./localStorage";
import { loadState } from "./localStorage";
import { clearState } from "./localStorage";

// Initial state
const initialState = {
  token: loadState("access_token"),
  email: loadState("logged_in_email"),
  first_name: loadState("first_name"),
  image_url: loadState("image_url"),
  profile_data: loadState("profile_data"),
  website_domain: loadState("website_domain"),
  app_id: loadState("app_id"),
  app_secret: loadState("app_secret"),
  tenantName: loadState("tenantName"),
  admin: false,
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the authentication
    setAuthState(state, action) {
      //console.log(action.payload)
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.first_name = action.payload.firstname;
      state.image_url = action.payload.image_url;
    //  state.website_domain = action.payload.website_domain;
      state.app_id = action.payload.app_id;
      state.app_secret = action.payload.app_secret;

      state.profile_data = Object.assign(
        {},
        {
          email: action.payload.email,
          first_name: action.payload.firstname,
          last_name: action.payload.lastname,
          logo_url: action.payload.logo_url,
          image_url: action.payload.image_url,
          role: action.payload.role,
        }
      );

      let profile_data = {
        email: action.payload.email,
        first_name: action.payload.firstname,
        last_name: action.payload.lastname,
        logo_url: action.payload.logo_url,
        image_url: action.payload.image_url,
        role: action.payload.role,

        // "role": action.payload.role ? action.payload.role : 'client',
      };
      saveState("access_token", state.token);
      saveState("logged_in_email", state.email);
      saveState("first_name", state.first_name);
      saveState("image_url", state.image_url);
     // saveState("website_domain", state.website_domain);
      saveState("app_id", state.app_id);
      saveState("app_secret", state.app_secret);
      saveState("profile_data", profile_data);

      if (action.payload.tenantName) {
        state.tenantName = action.payload.tenantName;
        saveState("tenantName", state.tenantName);
      }

      if (action.payload.website_domain) {
        state.website_domain = action.payload.website_domain;
        saveState("website_domain", state.website_domain);
      }


      clearStateSession("liveTraffic"); // clear live traffic data
    },

    setDomain(state, action) {
      console.log("action.payload.website_domain", action.payload);
      state.website_domain = action.payload.website_domain;
      console.log("state.website_domain", state.website_domain);
      saveState("website_domain", state.website_domain);
    },

    setTenantName(state, action) {
      state.tenantName = action.payload.name;
      console.log("state.tenantName", state.tenantName);
      saveState("tenantName", state.tenantName);
    },

    setUserStatus(state, action) {
      //   console.log("action", action)
      state.admin = action.payload;
      saveStateSession("admin", state.admin);
    },

    setProfile(state, action) {
      console.log("ACTION", action.payload);
      state.email = action.payload.email;
      state.first_name = action.payload.firstname;
      state.image_url = action.payload.image_url;

      state.profile_data = Object.assign(
        {},
        {
          email: action.payload.email,
          first_name: action.payload.firstname,
          last_name: action.payload.lastname,
          image_url: action.payload.image_url,
          role: action.payload.role,
        }
      );
      saveState("logged_in_email", state.email);
      saveState("first_name", state.first_name);
      saveState("image_url", state.image_url);
      saveState("profile_data", state.profile_data);
      console.log(state, action);
    },

    setConnectionStatus(state, action) {
      console.log("_____________setConnectionStatus action.payload", action.payload);
      state.connectionStatus = action.payload;
      console.log("__________state.connectionStatus", state.connectionStatus);
      saveState("connection_status", state.connectionStatus);
    },
    setNewUser(state, action) {
      state.newUser = action.payload;
      saveState("new_user", state.newUser);
      // state.connectionStatus = false;
      // saveState("connection_status", state.connectionStatus);
    },
    setProductTourStatus(state, action) {
      state.productTourStatus = action.payload;
      saveState("product_tour_status", state.productTourStatus);
    },
    // setStatus(state, action) {
    //     console.log("action.payload", action.payload)
    //     state.status = action.payload.status;
    //     state.role = action.payload.role;

    // },

    removeAuthState(state) {
      state.token = "";
      state.email = "";
      state.first_name = "";
      clearState("first_name");
      clearState("access_token");
      clearState("logged_in_email");
      clearState("profile_data");
      clearState("image_url");
      clearState("website_domain");
      clearState("app_id");
      clearState("app_secret");
      clearState("tenantName");
      clearState("access_token");
      clearState("new_user");
      clearState("connection_status");
      clearStateSession("counts");
      clearStateSession("liveTraffic");
      clearStateSession("googleLoginTriggered")      
      
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    //   extraReducers: {
    //     [HYDRATE]: (state, action) => {
    //       return {
    //         ...state,
    //         ...action.payload.auth,
    //       };
    //     },
    //   },
  },
});

const {
  setAuthState,
  setNewUser,
  setProductTourStatus,
  setDomain,
  setTenantName,
  removeAuthState,
  setUserStatus,
  setProfile,
  setConnectionStatus
} = authSlice.actions;

const selectAuthState = (state) => state.auth;
module.exports = {
  authSlice,
  setAuthState,
  setNewUser,
  setProductTourStatus,
  setConnectionStatus,
  setDomain,
  setTenantName,
  removeAuthState,
  setUserStatus,
  setProfile,
  selectAuthState,
};

export { setAuthState, setTenantName };
 