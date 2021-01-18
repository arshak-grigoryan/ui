import { createSlice } from '@reduxjs/toolkit';

export const signinSlice = createSlice({
  name: 'signin',
  initialState: {
    isLoggedIn: false,
    token: '',
    curUser: null,
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.curUser = action.payload.data;
    },
    setChangeCurUser: (state, action) => {
      state.curUser = action.payload;
    },
    setIsLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.token = null;
    },
    addPushSubscription: (state, action) => {
      state.curUser.push_subscriptions.push(action.payload);
    },
  },
});

export const {
  setIsLoggedIn,
  setIsLoggedOut,
  setChangeCurUser,
  addPushSubscription,
} = signinSlice.actions;

export default signinSlice.reducer;
