import { useNavigate } from 'react-router-dom';

const useOnSubmit = () => {
  const navigate = useNavigate();

  const onSubmit = async (e, email, password) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://www.pre-onboarding-selection-task.shop/auth/${e.target.name}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, password: password }),
        }
      );

      if (e.target.name === 'signin' && response.status === 200) {
        const json = await response.json();
        await localStorage.setItem('JWT', json.access_token);
        alert('로그인 성공!');
        navigate('/todo');
      } else if (e.target.name === 'signup' && response.status === 201) {
        alert('회원가입 성공했습니다!');
        navigate('/signin');
      } else {
        alert('아이디 또는 비밀번호가 존재합니다!');
      }
    } catch (error) {
      console.error('로그인 실패 : ' + error);
    }
  };

  return { onSubmit };
};

export default useOnSubmit;
