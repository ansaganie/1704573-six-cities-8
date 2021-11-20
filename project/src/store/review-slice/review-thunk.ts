import { AxiosError } from 'axios';
import { AsyncAction } from '../store';
import IReview from '../../models/IReview';
import IReviewForm from '../../models/IReviewForm';
import { OfferId } from '../../models/IOffer';
import { BackendRoute } from '../../constants';
import { adaptReview, adaptReviews } from '../../services/adapter';
import appToast from '../../utils/app-toast';
import {
  addReview,
  setReviews,
  setReviewsLoading,
  setSubmittingReview
} from './review-slice';

const REVIEWS_FETCH_FAIL = 'Could get reviews, please try again later';
const REVIEW_POST_FAIL = 'Could post your review, please try again later';
const REVIEW_POST_SUCCESS = 'Thank you for your review';

const fetchReviews = (offerId: OfferId): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setReviewsLoading(true));

    try {
      const { data } = await api.get<IReview[]>(
        BackendRoute.getReviewsLink(offerId),
      );

      dispatch(setReviews({
        offerId,
        reviews: adaptReviews(data),
      }));
    } catch (error) {
      appToast.info(REVIEWS_FETCH_FAIL);
      appToast.error((error as AxiosError).message);
    } finally {
      dispatch(setReviewsLoading(false));
    }
  };

const postReview = (offerId: OfferId, reviewForm: IReviewForm): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setSubmittingReview(true));

    try {
      const { data } = await api.post<IReview>(
        BackendRoute.getReviewsLink(offerId), reviewForm,
      );

      dispatch(addReview({
        offerId,
        review: adaptReview(data),
      }));
      appToast.success(REVIEW_POST_SUCCESS);
    } catch (error) {
      appToast.info(REVIEW_POST_FAIL);
      appToast.error((error as AxiosError).message);
    } finally {
      dispatch(setSubmittingReview(false));
    }
  };

export {
  fetchReviews,
  postReview
};
