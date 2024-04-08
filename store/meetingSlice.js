import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

import { saveStateSession } from "./localStorage";
import { loadStateSession } from "./localStorage";
import { clearStateSession } from "./localStorage";

// Initial state
const initialState = {
  meeting_joined: loadStateSession("meeting_joined"),
  meeting_participants: [],
  meeting_participants2: "",

  meeting_id: loadStateSession("meeting_id"),
  meeting_id_user: loadStateSession("meeting_id_user"),
};

// Actual Slice
export const meetingSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMeetState(state, action) {
      state.meeting_joined = action.payload;
      saveStateSession("meeting_joined", state.meeting_joined);
    },
    setMeetingRoom(state, action) {
      state.meeting_id = action.payload;
      saveStateSession("meeting_id", state.meeting_id);
    },
    setMeetingIdUser(state, action) {
      state.meeting_id_user = action.payload;
      saveStateSession("meeting_id_user", state.meeting_id_user);
    },

    removeMeetState(state) {
      state.meeting_joined = false;
      clearStateSession("meeting_joined");
    },

    setMeetingParticipants(state, action) {
      //  console.log("PARTICIPANTS STORE", action.payload)
      state.meeting_participants = action.payload;
      state.meeting_participants2 = action.payload;
    },
  },
});

const {
  setMeetState,
  removeMeetState,
  setMeetingParticipants,
  setMeetingRoom,
  setMeetingIdUser,
} = meetingSlice.actions;

const selectMeetState = (state) => state.meeting;

module.exports = {
  meetingSlice,
  setMeetState,
  removeMeetState,
  setMeetingParticipants,
  setMeetingRoom,
  setMeetingIdUser,
  selectMeetState,
};
