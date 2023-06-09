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
  const [toDoList, setToDoList] = useState([]);

  const [editToDo, setEditToDo] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const [currentToDo, setCurrentToDo] = useState('');

  const access_token = localStorage.getItem('JWT');

  useEffect(() => {
    const currentUser = localStorage.getItem('JWT');
    if (!currentUser) navigate('/');

    onGetToDos();
  }, []);

  const onChangeToDo = (e) => {
    setToDo(e.target.value);
  };

  const onCreateToDo = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://www.pre-onboarding-selection-task.shop/todos',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ todo: toDo }),
        }
      );

      const newToDo = await response.json();

      if (response.status === 201) {
        onGetToDos();
        setToDoList((toDoList) => toDoList.push(newToDo));
        setToDo('');
      }
    } catch (error) {
      console.error('To Do 생성 실패 : ' + error);
    }
  };

  const onGetToDos = async () => {
    try {
      const response = await fetch(
        'https://www.pre-onboarding-selection-task.shop/todos',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const newToDoList = await response.json();

      if (response.status === 200) {
        setToDoList(newToDoList);
      }
    } catch (error) {
      console.error('To Do List 불러오기 실패 : ' + error);
    }
  };

  const onToggleToDo = (id, todo) => {
    setCurrentToDo(id);
    toDoList.forEach((item) => {
      if (id === item.id) {
        setEditToDo(todo);
      }
    });
    setIsEdit((state) => !state);
  };

  const onUpdateToDos = async (id, todo, state) => {
    setIsEdit(false);
    try {
      const response = await fetch(
        `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            todo: isEdit ? editToDo : todo,
            isCompleted: !state,
          }),
        }
      );
      const newToDo = await response.json();
      const newToDoList = toDoList.map((item) => ({
        ...item,
        todo: item.id === id ? (isEdit ? editToDo : todo) : item.todo,
        isCompleted: item.id === id ? !state : item.isCompleted,
      }));

      if (response.status === 200) {
        setToDoList(newToDoList);
        onGetToDos();
      }
    } catch (error) {
      console.error('업데이트 실패 : ' + error);
    }
  };

  const onDeleteToDo = async (id) => {
    try {
      const response = await fetch(
        `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.status === 204) {
        onGetToDos();
      }
    } catch (error) {
      console.error('To Do 삭제 실패 : ' + error);
    }
  };

  return (
    <div className={styles.toDoContainer}>
      <h2 className={styles.toDoDate}>
        {year}년 {month}월 {day}일
      </h2>
      <div className={styles.toDoInput}>
        <input
          data-testid="new-todo-input"
          onChange={onChangeToDo}
          value={toDo}
          className={styles.input}
          type="text"
        />
        <button
          onClick={onCreateToDo}
          className={styles.addButton}
          data-testid="new-todo-add-button"
        >
          ADD
        </button>
      </div>
      <ul className={styles.toDoListBox}>
        {Array.from(toDoList).map((todo, idx) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() =>
                  onUpdateToDos(todo.id, todo.todo, todo.isCompleted)
                }
              />
              {isEdit && todo.id === currentToDo ? (
                <>
                  <input
                    data-testid="modify-input"
                    type="text"
                    value={editToDo}
                    onChange={(e) => setEditToDo(e.target.value)}
                  />
                </>
              ) : (
                <span>{todo.todo}</span>
              )}
            </label>
            {isEdit && todo.id === currentToDo ? (
              <>
                <button
                  onClick={() =>
                    onUpdateToDos(todo.id, todo.todo, todo.isCompleted)
                  }
                  data-testid="submit-button"
                >
                  제출
                </button>
                <button
                  onClick={() => onToggleToDo(todo.id, todo.todo)}
                  data-testid="cancel-button"
                >
                  취소
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onToggleToDo(todo.id, todo.todo)}
                  data-testid="modify-button"
                >
                  수정
                </button>
                <button
                  onClick={() => onDeleteToDo(todo.id)}
                  data-testid="delete-button"
                >
                  삭제
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <Nav navData={toDoNavData} />
    </div>
  );
};

export default ToDo;
