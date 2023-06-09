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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailMsg, setEmailMsg] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');

  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const onChangeEmail = (e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const currentEmail = e.target.value;

    setEmail(currentEmail);

    if (!emailRegex.test(currentEmail) || currentEmail.length === 0) {
      setIsEmail(false);
      setEmailMsg('이메일 형식이 틀렸습니다! 다시 확인해주세요.');
    } else {
      setEmailMsg('올바른 이메일 형식입니다.');
      setIsEmail(true);
    }
  };

  const onChangePassword = (e) => {
    const passwordRegex = /.{8,}/;
    const currentPassword = e.target.value;

    setPassword(currentPassword);

    if (!passwordRegex.test(currentPassword) || currentPassword.length === 0) {
      setIsPassword(false);
      setPasswordMsg('8자리 이상 입력해주세요!');
    } else {
      setPasswordMsg('안전한 비밀번호입니다.');
      setIsPassword(true);
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
            className={styles.input}
            onChange={onChangeEmail}
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
            className={styles.input}
            onChange={onChangePassword}
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
