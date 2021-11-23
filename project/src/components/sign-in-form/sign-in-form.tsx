import React, { useMemo } from 'react';
import styles from './sign-in-form.module.css';
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { LoginState } from '../../types/login-state';
import ILoginForm from '../../models/ILoginForm';
import { login } from '../../store/app-slice/app-thunk';

const initialValues: ILoginForm = {
  email: '',
  password: '',
};

function SignInForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const validation = useMemo(() => Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('No email provided'),
    password: Yup.string()
      .required('No password provided')
      .min(2, 'Password is too short - should be 8 chars minimum')
      .matches(/^.*(?=.{2,})(?=.*\d)(?=.*[a-zA-Z]).*$/i, 'Password should contain minimum one Latin letter and one number.'),
  }), []);

  const formSubmitHandler = (values: ILoginForm) => {
    dispatch(login(values))
      .then(() => {
        history.replace((history.location.state as LoginState).from);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={formSubmitHandler}
      validationSchema={validation}
    >
      {
        ({ errors, isSubmitting}: FormikProps<ILoginForm>) => (
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
                className={classNames({
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
                className={classNames({
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
