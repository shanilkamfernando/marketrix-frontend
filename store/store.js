const { configureStore, createAction } = require("@reduxjs/toolkit");
const { authSlice } = require("./authSlice");
const { meetingSlice } = require("./meetingSlice");
const { customerSlice } = require("./customerSlice");
const { createWrapper } = require("next-redux-wrapper");
const { actionSlice } = require("./actionSlice");

const actions = require("./actions");
const { avatarSlice } = require("./avatarSlice");

const rootReducer = {
  auth: authSlice.reducer,
  meeting: meetingSlice.reducer,
  customer: customerSlice.reducer,
  actionTrigger: actionSlice.reducer,
  avatar: avatarSlice.reducer,
};

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

const AppStore = makeStore();
const AppState = AppStore.getState();
const AppDispatch = AppStore.dispatch;

const AppThunk = (thunkAction) => thunkAction;

const wrapper = createWrapper(makeStore);

module.exports = { wrapper, actions, createAction, AppStore, AppState, AppDispatch, AppThunk };
