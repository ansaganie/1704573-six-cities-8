import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ILocation from '../../models/ILocation';
import { SlicesNamespace } from '../types';
import IMainPageState from './types';
import { Cities, CityLocation, SortType } from './constants';
import { OfferId } from '../../models/IOffer';

const initialState: IMainPageState = {
  currentTab: null,
  currentSort: null,
  locationInFocus: CityLocation[Cities.Paris],
  offerInFocusId: '',
};

const mainPageSlice = createSlice({
  name: SlicesNamespace.MainPage,
  initialState,
  reducers: {
    setCurrentTab: (state, action: PayloadAction<Cities>) => {
      state.currentTab = action.payload;
    },
    setCurrentSort: (state, action: PayloadAction<SortType>) => {
      state.currentSort = action.payload;
    },
    setLocationInFocus: (state, action: PayloadAction<ILocation>) => {
      state.locationInFocus = action.payload;
    },
    setOfferInFocusId: (state, action: PayloadAction<OfferId>) => {
      state.offerInFocusId = action.payload;
    },
  },
});

const mainPageReducer = mainPageSlice.reducer;

export const {
  setCurrentTab,
  setCurrentSort,
  setLocationInFocus,
  setOfferInFocusId,
} = mainPageSlice.actions;

export type AppActions = typeof mainPageSlice.actions;

export default mainPageReducer;
