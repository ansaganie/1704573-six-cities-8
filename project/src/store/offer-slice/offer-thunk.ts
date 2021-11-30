import { AxiosError } from 'axios';
import IOffer, { OfferId } from '../../models/IOffer';
import { AsyncAction } from '../store';
import { BackendRoute, HttpCode } from '../../constants';
import { adaptOffer, adaptOffers } from '../../services/adapter';
import appToast from '../../utils/app-toast';
import { setServerNotWorking, updateFavoriteOffers } from '../app-slice/app-slice';
import {
  addOffer,
  addOffers,
  setDisabledBookmarkId,
  setNearbyOffers,
  setNearbyOffersLoading,
  setNotFoundOfferId,
  setOfferLoading,
  setOffers,
  setOffersLoading
} from './offer-slice';

const OFFERS_FETCH_FAILS = 'Could get offers, please try again later';
const IS_FAVORITE_CHANGE_FAILS = 'Could not update "favorite" status';

const fetchOffers = (): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setOffersLoading(true));

    try {
      const { data } = await api.get<IOffer[]>(BackendRoute.Offers);

      dispatch(setOffers(adaptOffers(data)));
    } catch (error) {
      appToast.info(OFFERS_FETCH_FAILS);
      appToast.error((error as AxiosError).message);
      dispatch(setServerNotWorking());
    } finally {
      dispatch(setOffersLoading(false));
    }
  };

const fetchOffer = (offerId: OfferId): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setOfferLoading(true));

    try {
      const { data } = await api.get<IOffer>(BackendRoute.getOfferLink(offerId));

      dispatch(addOffer(adaptOffer(data)));
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === HttpCode.NotFound) {
        dispatch(setNotFoundOfferId(offerId));
      }
      appToast.error(axiosError.message);
    } finally {
      dispatch(setOfferLoading(false));
    }
  };

const changeIsFavorite = (offerId: OfferId, status: boolean): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setDisabledBookmarkId(offerId));

    try {
      const { data } = await api.post<IOffer>(
        BackendRoute.getFavoriteToggleLink(offerId, status),
      );

      const adapted = adaptOffer(data);

      dispatch(updateFavoriteOffers({
        offerId: adapted.id,
        status: adapted.isFavorite,
      }));
    } catch (error) {
      appToast.info(IS_FAVORITE_CHANGE_FAILS);
      appToast.error((error as AxiosError).message);
    } finally {
      dispatch(setDisabledBookmarkId(''));
    }
  };

const fetchNearbyOffers =  (offerId: OfferId): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setNearbyOffersLoading(true));

    try {
      const { data } = await api.get<IOffer[]>(
        BackendRoute.getNearbyOffersLink(offerId),
      );

      dispatch(addOffers(adaptOffers(data)));
      dispatch(setNearbyOffers({
        offerId,
        offers: adaptOffers(data),
      }));
    } catch (error) {
      appToast.error((error as AxiosError).message);
    } finally {
      dispatch(setNearbyOffersLoading(false));
    }
  };

export {
  fetchOffers,
  fetchOffer,
  changeIsFavorite,
  fetchNearbyOffers
};
