import { createSlice } from '@reduxjs/toolkit';

const initialStateLocal = localStorage.getItem('signedUpUsers');

// signedUpUsers: [],
//   loginInfo: {
//       isSignIn: false,
//   },
const initialState = initialStateLocal
  ? JSON.parse(initialStateLocal)
  : {
      loginInfo: {
        isSignIn: false,
        username: '',
        emailOrPhone: '',
      password: '',
      address: "",
      },
      signedUpUsers: [],
    };

const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    newSignUp: (state, { payload }) => {
      state.signedUpUsers = payload;
      state.loginInfo.isSignIn = true;
    },
    setLoginData: (state, { payload }) => {
      state.loginInfo = { ...payload };
      state.loginInfo.isSignIn = true;
    },
    signOut: (state) => {
      const guestData = {
        username: '',
        emailOrPhone: '',
        password: '',
      };
      state.loginInfo = guestData;
      state.loginInfo.isSignIn = false;
    },
    updateUserData: (state, { payload }) => {
      Object.assign(state.loginInfo, payload.updatedUserData);
    },
  },
});

export const { newSignUp, setLoginData, signOut, updateUserData } =
  userSlice.actions;
export default userSlice.reducer;
