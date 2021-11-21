import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cities } from '../../types/cities';
import IMainPageState from './IMainPageState';

const initialState: IMainPageState = {
  currentTab: null,
};

const mainPageSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentTab: (state, action: PayloadAction<Cities>) => {
      state.currentTab = action.payload;
    },
  },
});

const mainPageReducer = mainPageSlice.reducer;

export const {
  setCurrentTab,
} = mainPageSlice.actions;

export type AppActions = typeof mainPageSlice.actions;

export default mainPageReducer;
