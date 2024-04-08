const { createSlice } = require("@reduxjs/toolkit");

// Type for our state
const initialState = {
  updateIncomingTableTriggered: false,
  updateLiveTrafficTriggered: false,
  updateActiveUsersTriggered: false,
  mliveEnabled: false,
  checkConnectionTrigger: false,
  apiCallTriggered: false,
  loadingTriggered: false,
  liveConnectTriggered: false,
};

// Actual Slice
const actionSlice = createSlice({
  name: "actionSlice",
  initialState,
  reducers: {
    updateIncoming(state, action) {
      state.updateIncomingTableTriggered = action.payload;
    },
    toggleMliveStatus(state, action) {
      state.mliveEnabled = action.payload;
    },
    updateLiveTraffic(state, action) {
      state.updateLiveTrafficTriggered = action.payload;
    },
    updateActiveUsers(state, action) {
      state.updateActiveUsersTriggered = action.payload;
    },
    checkConnection(state, action) {
      state.checkConnectionTrigger = action.payload;
    },
    apiCallTriggered(state, action) {
      state.apiCallTriggered = action.payload;
    },
    loadingTriggered(state, action) {
      console.log("LOADING TRIGGERED", action.payload);
      state.loadingTriggered = action.payload;
    },
    liveConnectTriggered(state, action) {
      console.log("LIVE CONNECT TRIGGERED", action.payload);
      state.liveConnectTriggered = action.payload;
    },
  },
});

const {
  updateIncoming,
  toggleMliveStatus,
  updateLiveTraffic,
  updateActiveUsers,
  checkConnection,
  apiCallTriggered,
  loadingTriggered,
  liveConnectTriggered,
} = actionSlice.actions;

const selectActionTrigger = (state) => state.actionTrigger;

module.exports = {
  actionSlice,
  updateIncoming,
  toggleMliveStatus,
  updateLiveTraffic,
  updateActiveUsers,
  checkConnection,
  apiCallTriggered,
  loadingTriggered,
  liveConnectTriggered,
  selectActionTrigger,
};
