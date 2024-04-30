import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  chatId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setUserChatData: (state, action) => {
      console.log('action.payload', action.payload);
      // const chatData = {
      //   chatId: action.payload.userId,
      // };
      state.chatId = action.payload.userId;
    },
  },
});

export const { setUserChatData } = chatSlice.actions;
export default chatSlice.reducer;
