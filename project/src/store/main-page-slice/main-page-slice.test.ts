import { deepClone, INITIAL_STATE, unknownAction } from '../../setupTests';
import IMainPageState from './types';
import { Cities, SortType } from './constants';
import { getFakeLocation } from '../../utils/fake-data';
import appReducer, {
  setCurrentTab,
  setCurrentSort,
  setLocationInFocus,
  setOfferInFocusId
} from './main-page-slice';

const mainPageState: IMainPageState = deepClone(INITIAL_STATE.mainPage);

describe('Reducer: Main Page', () => {
  it('should return initial state', () => {
    const expected = { ...mainPageState };
    expect(appReducer(mainPageState, unknownAction())).toEqual(expected);
  });

  it('should set current tab', () => {
    const expected = { ...mainPageState };
    expected.currentTab = Cities.Amsterdam;

    expect(appReducer(mainPageState, setCurrentTab(Cities.Amsterdam))).toEqual(expected);
  });

  it('should set current sort', () => {
    const expected = { ...mainPageState };
    expected.currentSort = SortType.PriceHighestFirst;

    expect(appReducer(mainPageState, setCurrentSort(SortType.PriceHighestFirst))).toEqual(expected);
  });

  it('should set location in focus', () => {
    const location = getFakeLocation();
    const expected = { ...mainPageState };
    expected.locationInFocus = location;

    expect(appReducer(mainPageState, setLocationInFocus(location))).toEqual(expected);
  });

  it('should set offer in focus\'s ID', () => {
    const offerId = 'offerId23435335';
    const expected = { ...mainPageState };
    expected.offerInFocusId = offerId;

    expect(appReducer(mainPageState, setOfferInFocusId(offerId))).toEqual(expected);
  });
});
