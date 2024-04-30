import { createSlice } from '@reduxjs/toolkit';
import { omit } from '../../utils/obj-helpers';
const initialState = {
  userData: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      console.log('setUserData payload', action.payload);

      const userData = {
        email: action.payload.email,
      };
      state.userData = userData;
    },
    setUserProfileData: (state, action) => {
      //   console.log('action.payload', action.payload);
      const payload = omit(action.payload, 'email');
      const userProfileData = {
        ...state.userData,
        name: payload.name,
        // profilePicture: action.payload.profilePicture,
      };
      state.userData = userProfileData;
    },
  },
});

export const { setUserData, setUserProfileData } = userSlice.actions;
export default userSlice.reducer;
