
import { Cities, SortingType } from './constants';
import { RootState } from '../store';
import ILocation from '../../models/ILocation';
import { OfferId } from '../../models/IOffer';

const getCurrentTab = (state: RootState): Cities | null => state.mainPage.currentTab;
const getCurrentSort = (state: RootState): SortingType | null => state.mainPage.currentSort;
const getLocationInFocus = (state: RootState): ILocation => state.mainPage.locationInFocus;
const getOfferInFocusId = (state: RootState): OfferId => state.mainPage.offerInFocusId;

export {
  getCurrentTab,
  getCurrentSort,
  getLocationInFocus,
  getOfferInFocusId
};
