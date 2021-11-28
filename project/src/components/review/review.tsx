import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { OfferId } from '../../models/IOffer';
import { getAuthorized } from '../../store/app-slice/app-selector';
import { getReviewByOfferId, getReviewsLoading } from '../../store/review-slice/review-selector';
import { fetchReviews } from '../../store/review-slice/review-thunk';
import ReviewForm from '../review-form/review-form';
import ReviewList from '../review-list/review-list';
import Spinner from '../spinner/spinner';

type ReviewProps = {
  offerId: OfferId,
}

function Review({ offerId }: ReviewProps): JSX.Element {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => getReviewByOfferId(state, offerId));
  const loading = useAppSelector(getReviewsLoading);
  const authorized = useAppSelector(getAuthorized);

  useEffect(() => {
    if (reviews.length === 0) {
      dispatch(fetchReviews(offerId));
    }
  }, [ dispatch, offerId, reviews ]);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      {loading ? <Spinner/> : <ReviewList reviews={reviews}/>}
      {authorized && <ReviewForm offerId={offerId}/>}
    </section>
  );
}

export default Review;
