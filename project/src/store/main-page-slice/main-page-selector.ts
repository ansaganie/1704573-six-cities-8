
import { Cities } from '../../types/cities';
import { RootState } from '../store';

const getCurrentTab = (state: RootState): Cities | null => state.mainPage.currentTab;

export {
  getCurrentTab
};
