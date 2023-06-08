import styles from './SignUp.module.scss';
import Nav from './../../components/Nav/Nav';
import { homeNavData } from './../../data/navData';

const SignUp = () => {
  return (
    <div className={styles.signInContainer}>
      <Nav navData={homeNavData} />
    </div>
  );
};

export default SignUp;
