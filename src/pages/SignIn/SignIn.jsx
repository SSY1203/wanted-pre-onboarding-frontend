import styles from './SignIn.module.scss';
import Nav from './../../components/Nav/Nav';
import { homeNavData } from './../../data/navData';

const SignIn = () => {
  return (
    <div className={styles.signInContainer}>
      <form action="submit">
        <span>로그인</span>
        <div className={styles.emailBox}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" data-testid="email-input" />
        </div>
        <div className={styles.passwordBox}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            minLength={8}
            data-testid="password-input"
          />
        </div>
        <button data-testid="signin-button">LOGIN</button>
      </form>
      <Nav navData={homeNavData} />
    </div>
  );
};

export default SignIn;
