import { useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import { toDoNavData } from '../../data/navData';
import { useEffect } from 'react';
import styles from './LogOut.module.scss';

const LogOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem('JWT');
    if (!currentUser) navigate('/');
  }, []);

  const handleLogOut = (e) => {
    localStorage.clear();
  };

  return (
    <div className={styles.logOutContainer}>
      <form className={styles.logOutForm} onSubmit={handleLogOut}>
        <span className={styles.text}>감사합니다😀</span>
        <button className={styles.logOutButton}>LOG OUT</button>
      </form>
      <Nav navData={toDoNavData} />
    </div>
  );
};

export default LogOut;
