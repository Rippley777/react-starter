import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: 'dark',
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setCustomTheme: (state, action) => {
      state.theme = action.payload.theme;
    },
  },
});

export const { toggleTheme, setCustomTheme } = themeSlice.actions;
export default themeSlice.reducer;
