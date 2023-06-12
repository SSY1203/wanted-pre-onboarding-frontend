import styles from './Sign.module.scss';
import Nav from '../../components/Nav/Nav';
import { homeNavData } from '../../data/navData';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem('JWT');
    if (currentUser) navigate('/todo');
  }, []);

  const [inputState, setInputState] = useState({ email: '', password: '' });
  const { email, password } = inputState;

  const [inputMsg, setInputMsg] = useState({ emailMsg: '', passwordMsg: '' });
  const { emailMsg, passwordMsg } = inputMsg;

  const [isValidation, setIsValidation] = useState({
    isEmail: false,
    isPassword: false,
  });
  const { isEmail, isPassword } = isValidation;

  const onChangeInput = (e) => {
    const name = e.target.name;
    const currentValue = e.target.value;
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const passwordRegex = /.{8,}/;

    if (name === 'email') {
      setInputState({ ...inputState, email: currentValue });
      if (!emailRegex.test(currentValue) || currentValue.length === 0) {
        setIsValidation({ ...isValidation, isEmail: false });
        setInputMsg({
          ...inputMsg,
          emailMsg: '이메일 형식이 틀렸습니다! 다시 확인해주세요.',
        });
      } else {
        setInputMsg({ ...inputMsg, emailMsg: '올바른 이메일 형식입니다.' });
        setIsValidation({ ...isValidation, isEmail: true });
      }
    } else {
      setInputState({ ...inputState, password: currentValue });

      if (!passwordRegex.test(currentValue) || currentValue.length === 0) {
        setIsValidation({ ...isValidation, isPassword: false });
        setInputMsg({ ...inputMsg, passwordMsg: '8자리 이상 입력해주세요!' });
      } else {
        setInputMsg({ ...inputMsg, passwordMsg: '안전한 비밀번호입니다.' });
        setIsValidation({ ...isValidation, isPassword: true });
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(
        'https://www.pre-onboarding-selection-task.shop/auth/signup',
        {
          method: 'POST',
          mode: 'cors',
          cache: 'reload',
          credentials: 'omit',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, password: password }),
        }
      ).then((res) => {
        if (res.status === 201) {
          alert('회원가입 성공했습니다!');
          navigate('/signin');
        }
        alert('아이디 또는 비밀번호가 존재합니다!');
      });
    } catch (error) {
      console.error('회원가입 실패 : ' + error);
    }
  };

  return (
    <div className={styles.signContainer}>
      <form className={styles.formBox} onSubmit={onSubmit}>
        <span className={styles.formTitle}>회원가입</span>
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
          data-testid="signup-button"
        >
          SIGN UP
        </button>
      </form>
      <Nav navData={homeNavData} />
    </div>
  );
};

export default SignUp;
