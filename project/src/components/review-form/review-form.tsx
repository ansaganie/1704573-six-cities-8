import React, { useCallback, useMemo, Fragment } from 'react';
import { Field, Form, Formik, FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../hooks/redux';
import { OfferId } from '../../models/IOffer';
import IReviewForm from '../../models/IReviewForm';
import { postReview } from '../../store/review-slice/review-thunk';

const starValues = [ 5, 4, 3, 2, 1 ];

const initialValues = {
  rating: 1,
  comment: '',
};

type ReviewFormProps = {
  offerId: OfferId,
}

function ReviewForm({ offerId }: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const validation = useMemo(() => Yup.object({
    rating: Yup.number()
      .required()
      .min(1)
      .max(5),
    comment: Yup.string()
      .required()
      .min(50)
      .max(300),
  }), []);

  const formSubmitHandler = useCallback(async (values: IReviewForm, formikHelpers: FormikHelpers<IReviewForm>) => {
    await dispatch(postReview(offerId, values));
    formikHelpers.resetForm();
  }, [dispatch, offerId]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={formSubmitHandler}
      validationSchema={validation}
    >
      {({ isValid, isSubmitting, handleChange }: FormikProps<IReviewForm>) => (
        <Form className="reviews__form form">
          <label className="reviews__label form__label" htmlFor="comment">Your review</label>
          <div className="reviews__rating-form form__rating">
            {starValues.map((value) => (
              <Fragment key={value}>
                <input
                  type="radio"
                  className="form__rating-input visually-hidden"
                  name="rating"
                  onChange={handleChange}
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
              </Fragment>
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
