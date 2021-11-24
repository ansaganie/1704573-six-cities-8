import { Field, Form, Formik, FormikProps } from 'formik';
import React, { useCallback } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { OfferId } from '../../models/IOffer';
import IReviewForm from '../../models/IReviewForm';
import { postReview } from '../../store/review-slice/review-thunk';

const starValues = [ 5, 4, 3, 2, 1 ];

const initialValues = {
  rating: 0,
  comment: '',
};

type ReviewFormProps = {
  offerId: OfferId,
}

function ReviewForm({ offerId }: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const formSubmitHandler = useCallback((values: IReviewForm) => {
    dispatch(postReview(offerId, values));
  }, [dispatch, offerId]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={formSubmitHandler}
    >
      {({ isValid, isSubmitting }: FormikProps<IReviewForm>) => (
        <Form className="reviews__form form">
          <label className="reviews__label form__label" htmlFor="comment">Your review</label>
          <div className="reviews__rating-form form__rating">
            {starValues.map((value) => (
              <>
                <Field
                  type="radio"
                  className="form__rating-input visually-hidden"
                  name="rating"
                  value={value}
                  id={`${value}-stars`}
                  disabled={isSubmitting}
                />
                <label
                  htmlFor={`${value}-stars`}
                  className="reviews__rating-label form__rating-label"
                  title="perfect"
                >
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"/>
                  </svg>
                </label>
              </>
            ))}
          </div>
          <Field
            as="textarea"
            className="reviews__textarea form__textarea"
            id="comment"
            name="comment"
            placeholder="Tell how was your stay, what you like and what can be improved"
            disabled={isSubmitting}
          />
          <div className="reviews__button-wrapper">
            <p className="reviews__help">
              To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
            </p>
            <button
              className="reviews__submit form__submit button"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ReviewForm;
