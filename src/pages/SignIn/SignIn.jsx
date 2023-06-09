import styles from './SignIn.module.scss';
import Nav from './../../components/Nav/Nav';
import { homeNavData } from './../../data/navData';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SignIn = () => {
  const navigation = useNavigate();

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
      const response = await fetch(
        'https://www.pre-onboarding-selection-task.shop/auth/signin',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, password: password }),
        }
      );
      const json = await response.json();
      alert('로그인 성공!');
      if (response.status === 201) {
        await localStorage.setItem('JWT', json.access_token);
        navigation('/todo');
      }
    } catch (error) {
      console.error('로그인 실패 : ' + error);
    }
  };

  return (
    <div className={styles.signInContainer}>
      <form onSubmit={onSubmit}>
        <span>로그인</span>
        <div className={styles.emailBox}>
          <label htmlFor="email">Email</label>
          <input
            onChange={onChangeEmail}
            value={email}
            id="email"
            type="email"
            data-testid="email-input"
          />
        </div>
        <div className={styles.passwordBox}>
          <label htmlFor="password">Password</label>
          <input
            onChange={onChangePassword}
            value={password}
            id="password"
            type="password"
            minLength={8}
            data-testid="password-input"
          />
        </div>
        <button disabled={!(isEmail & isPassword)} data-testid="signin-button">
          LOGIN
        </button>
      </form>
      <Nav navData={homeNavData} />
    </div>
  );
};

export default SignIn;
