import React, { useMemo } from 'react';
import styles from './sign-in-form.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../hooks/redux';
import combineClasses from '../../utils/combine-class';
import { LoginState } from '../../types/login-state';
import { login } from '../../store/app-slice/app-thunk';
import { AppRoute } from '../../constants';
import ILoginForm from '../../models/ILoginForm';

const MIN_PASSWORD_VALUE = 2;
const PASSWORD_PATTERN = /^.*(?=.{2,})(?=.*\d)(?=.*[a-zA-Z]).*$/i;
const INVALID_EMAIL = 'Invalid email address';
const EMAIL_REQUIRED = 'No email provided';
const PASSWORD_REQUIRED = 'No password provided';
const SHORT_PASSWORD = 'Password is too short - should be 8 chars minimum';
const PASSWORD_MATCH = 'Password should contain minimum one Latin letter and one number';

const initialValues: ILoginForm = {
  email: '',
  password: '',
};

function SignInForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();

  const validation = useMemo(() => Yup.object({
    email: Yup.string()
      .email(INVALID_EMAIL)
      .required(EMAIL_REQUIRED),
    password: Yup.string()
      .required(PASSWORD_REQUIRED)
      .min(MIN_PASSWORD_VALUE, SHORT_PASSWORD)
      .matches(PASSWORD_PATTERN, PASSWORD_MATCH),
  }), []);

  const formSubmitHandler = (values: ILoginForm) => {
    const from = (location.state as LoginState)?.from || AppRoute.Main;

    dispatch(login(values))
      .then(() => {
        history.replace(from);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={formSubmitHandler}
      validationSchema={validation}
    >
      {
        ({ errors, isSubmitting }: FormikProps<ILoginForm>) => (
          <Form
            className="login__form form"
          >
            <div
              className="login__input-wrapper form__input-wrapper"
            >
              <label className="visually-hidden">E-mail</label>
              <div className={styles.error}>
                <ErrorMessage name="email" className={styles.error}/>
              </div>
              <Field
                placeholder="Email"
                className={combineClasses({
                  'login__input form__input': true,
                  [styles.errorBorder]: !!errors.email,
                })}
                type="email"
                name="email"
                required
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <div className={styles.error}>
                <ErrorMessage name="password"/>
              </div>
              <Field
                className={combineClasses({
                  'login__input form__input': true,
                  [styles.errorBorder]: !!errors.password,
                })}
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <button
              className="login__submit form__submit button"
              type="submit"
              disabled={isSubmitting}
            >
              Sign in
            </button>
          </Form>
        )
      }
    </Formik>
  );
}

export default SignInForm;
