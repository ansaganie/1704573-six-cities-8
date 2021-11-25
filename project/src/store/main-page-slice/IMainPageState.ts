import ILocation from '../../models/ILocation';
import { OfferId } from '../../models/IOffer';
import { Cities, SortingType } from './constants';

interface IMainPageState {
  currentTab: Cities | null;
  currentSort: SortingType | null;
  locationInFocus: ILocation;
  offerInFocusId: OfferId;
}

export default IMainPageState;
