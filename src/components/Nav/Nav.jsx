import { useNavigate } from 'react-router-dom';
import styles from './Nav.module.scss';
import { navContext } from '../../context/isActive';
import { useContext } from 'react';

const Nav = ({ navData }) => {
  const navigation = useNavigate();

  const { isActive, setIsActive } = useContext(navContext);

  const onUpdateNav = async (path) => {
    const state = await path.slice(1, undefined);
    state === 'signin'
      ? setIsActive('signin')
      : state === 'signup'
      ? setIsActive('signup')
      : setIsActive('');
    await localStorage.setItem('nav', isActive);

    navigation(path);
  };

  return (
    <nav className={styles.navContainer}>
      {navData.map((item, idx) => (
        <button
          className={`${styles.navButton} ${
            item.path === `/${isActive}` ? styles.isActive : ''
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
