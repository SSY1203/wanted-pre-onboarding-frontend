import { useEffect } from 'react';
import Nav from '../../components/Nav/Nav';
import { homeNavData } from '../../data/navData';
import styles from './Home.module.scss';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem('JWT');
    if (currentUser) navigate('/todo');
  }, []);
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeTitle}>
        <span className={styles.homeSubTitle}>
          WANTED
          <br />
          PRE-ONBOARDING
        </span>
        <h1 className={styles.homeMainTitle}>
          FRONTEND
          <br />
          INTERNSHIP
        </h1>
      </div>
      <span className={styles.name}>신선영</span>
      <Nav navData={homeNavData} />
    </div>
  );
};

export default Home;
