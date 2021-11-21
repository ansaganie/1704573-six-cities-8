
import { Cities, SortingType } from './types';
import { RootState } from '../store';

const getCurrentTab = (state: RootState): Cities | null => state.mainPage.currentTab;
const getCurrentSort = (state: RootState): SortingType | null => state.mainPage.currentSort;

export {
  getCurrentTab,
  getCurrentSort
};
