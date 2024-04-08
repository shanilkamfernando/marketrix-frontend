import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

import { clearStateSession, saveState, saveStateSession } from "./localStorage";
import { loadState } from "./localStorage";
import { clearState } from "./localStorage";

// Initial state
const initialState = {
  avatarName: loadState("avatarName"),
  avatarDesc: loadState("avatarDesc"),
  preDefinedAvatar: loadState("preDefinedAvatar"),
};

// Actual Slice
export const avatarSlice = createSlice({
  name: "avatar",
  initialState,
  reducers: {
    setAvatarNameAndDesc(state, action) {
      console.log("action.payload", action.payload);
      state.avatarName = action.payload.avatarName;
      state.avatarDesc = action.payload.avatarDescription;
      saveState("avatarName", state.avatarName);
      saveState("avatarDesc", state.avatarDesc);
    },

    setSelectedPredefinedAvatar(state, action) {
      state.preDefinedAvatar = action.payload;
      saveState("preDefinedAvatar", state.preDefinedAvatar);
    },

    setAvatarId(state, action) {
      state.avatarId = action.payload;
      saveState("avatarId", state.avatarId);
    },

    removeAvatarState(state) {
      state.avatarName = null;
      state.avatarDesc = null;
      state.preDefinedAvatar = null;
      clearState("avatarName");
      clearState("avatarDesc");
      clearState("preDefinedAvatar");
    },
  },
});

const { setAvatarNameAndDesc, setSelectedPredefinedAvatar, setAvatarId, removeAvatarState } = avatarSlice.actions;

const selectAvatarState = (state) => state.avatar;

module.exports = {
  avatarSlice,
  setAvatarNameAndDesc,
  setAvatarId,
  removeAvatarState,
  selectAvatarState,
  setSelectedPredefinedAvatar,
};
