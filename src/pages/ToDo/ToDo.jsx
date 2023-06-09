import { useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import { toDoNavData } from '../../data/navData';
import { useEffect, useState } from 'react';
import styles from './ToDo.module.scss';

const ToDo = () => {
  const navigate = useNavigate();

  const today = new Date();
  const year = String(new Date().getFullYear());
  const month = String(new Date().getMonth()).padStart(2, '0');
  const day = String(new Date().getDate()).padStart(2, '0');

  const [toDo, setToDo] = useState('');

  useEffect(() => {
    const currentUser = localStorage.getItem('JWT');
    if (!currentUser) navigate('/');
  }, []);

  const onChangeToDo = (e) => {
    setToDo(e.target.value);
  };

  const onCreateToDo = () => {};
  const onGetToDos = () => {};
  const onUpdateToDo = () => {};
  const onDeleteToDo = () => {};

  return (
    <div className={styles.toDoContainer}>
      <h2 className={styles.toDoDate}>
        {year}년 {month}월 {day}일
      </h2>
      <div className={styles.toDoInput}>
        <input
          onChange={onChangeToDo}
          value={toDo}
          className={styles.input}
          type="text"
        />
        <button className={styles.addButton}>ADD</button>
      </div>
      <Nav navData={toDoNavData} />
    </div>
  );
};

export default ToDo;
