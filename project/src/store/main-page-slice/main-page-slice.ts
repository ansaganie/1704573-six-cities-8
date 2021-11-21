import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SlicesNamespace } from '../types';
import IMainPageState from './IMainPageState';
import { Cities, SortingType } from './types';

const initialState: IMainPageState = {
  currentTab: null,
  currentSort: null,
};

const mainPageSlice = createSlice({
  name: SlicesNamespace.MainPage,
  initialState,
  reducers: {
    setCurrentTab: (state, action: PayloadAction<Cities>) => {
      state.currentTab = action.payload;
    },
    setCurrentSort: (state, action: PayloadAction<SortingType>) => {
      state.currentSort = action.payload;
    },
  },
});

const mainPageReducer = mainPageSlice.reducer;

export const {
  setCurrentTab,
  setCurrentSort,
} = mainPageSlice.actions;

export type AppActions = typeof mainPageSlice.actions;

export default mainPageReducer;
