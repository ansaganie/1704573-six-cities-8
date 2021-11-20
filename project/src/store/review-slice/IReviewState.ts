import { OfferId } from '../../models/IOffer';
import IReview from '../../models/IReview';

interface IReviewState {
  reviews: { [key: OfferId]: IReview[] }
  reviewsLoading: boolean;
  submittingReview: boolean;
}

export default IReviewState;