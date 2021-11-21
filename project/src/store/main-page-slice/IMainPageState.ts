import { Cities, SortingType } from './types';

interface IMainPageState {
  currentTab: Cities | null;
  currentSort: SortingType | null,
}

export default IMainPageState;
