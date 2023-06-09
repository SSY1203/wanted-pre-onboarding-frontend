import { useNavigate, useParams, useResolvedPath } from 'react-router-dom';
import styles from './Nav.module.scss';
import { navContext } from '../../context/isActive';
import { useContext, useEffect } from 'react';

const Nav = ({ navData }) => {
  const navigation = useNavigate();
  const lastState = useResolvedPath();

  const { isActive, setIsActive } = useContext(navContext);

  useEffect(() => {
    localStorage.setItem('nav', JSON.stringify(lastState.pathname));
    onUpdateNav(lastState.pathname);
  }, [lastState]);

  const onUpdateNav = (path) => {
    setIsActive(path);
    navigation(path);
  };

  return (
    <nav className={styles.navContainer}>
      {navData.map((item, idx) => (
        <button
          className={`${styles.navButton} ${
            item.path === `${isActive}` ? styles.isActive : ''
          }`}
          key={idx}
          onClick={() => onUpdateNav(item.path)}
        >
          {item.text}
        </button>
      ))}
    </nav>
  );
};

export default Nav;
