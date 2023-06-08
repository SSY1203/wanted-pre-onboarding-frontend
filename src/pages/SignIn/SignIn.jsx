import styles from './SignIn.module.scss';
import Nav from './../../components/Nav/Nav';
import { homeNavData } from './../../data/navData';

const SignIn = () => {
  return (
    <div className={styles.signInContainer}>
      <form action="submit">
        <span>로그인</span>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" />
        </div>
      </form>
      <Nav navData={homeNavData} />
    </div>
  );
};

export default SignIn;
