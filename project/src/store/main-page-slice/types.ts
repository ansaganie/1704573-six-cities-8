import ILocation from '../../models/ILocation';
import { OfferId } from '../../models/IOffer';
import { Cities, SortType } from './constants';

interface IMainPageState {
  currentTab: Cities | null;
  currentSort: SortType | null;
  locationInFocus: ILocation;
  offerInFocusId: OfferId;
}

export default IMainPageState;
