import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Sign.module.scss';
import Nav from '../../components/Nav/Nav';
import { homeNavData } from '../../data/navData';

import useOnChange from '../../utils/useOnChange';
import useOnSubmit from '../../utils/useOnSubmit';

import classNames from 'classnames';

const SignIn = () => {
  const navigate = useNavigate();

  const {
    onChangeInput,
    email,
    password,
    isEmail,
    isPassword,
    emailMsg,
    passwordMsg,
  } = useOnChange();
  const { onSubmit } = useOnSubmit();

  useEffect(() => {
    const currentUser = localStorage.getItem('JWT');
    if (currentUser) navigate('/todo');
  }, []);

  return (
    <div className={styles.signContainer}>
      <form
        name="signin"
        className={styles.formBox}
        onSubmit={(e) => onSubmit(e, email, password)}
      >
        <span className={styles.formTitle}>로그인</span>
        <div className={styles.inputBox}>
          <label className={styles.inputLabel} htmlFor="email">
            Email
          </label>
          <input
            name="email"
            className={styles.input}
            onChange={onChangeInput}
            value={email}
            id="email"
            type="email"
            data-testid="email-input"
          />
          {email.length > 0 && (
            <span
              className={classNames(
                styles.inputComment,
                isEmail && styles.correctComment
              )}
            >
              {emailMsg}
            </span>
          )}
          <label className={styles.inputLabel} htmlFor="password">
            Password
          </label>
          <input
            name="password"
            className={styles.input}
            onChange={onChangeInput}
            value={password}
            id="password"
            type="password"
            minLength={8}
            data-testid="password-input"
          />
          {password.length > 0 && (
            <span
              className={classNames(
                styles.inputComment,
                isPassword && styles.correctComment
              )}
            >
              {passwordMsg}
            </span>
          )}
        </div>
        <button
          className={classNames(
            styles.formButton,
            !(isEmail & isPassword) && styles.diabledButton
          )}
          disabled={!(isEmail & isPassword)}
          data-testid="signin-button"
        >
          LOGIN
        </button>
      </form>
      <Nav navData={homeNavData} />
    </div>
  );
};

export default SignIn;
