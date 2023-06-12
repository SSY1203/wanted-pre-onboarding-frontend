import { useState } from 'react';

const useOnChange = () => {
  const [inputState, setInputState] = useState({ email: '', password: '' });
  const { email, password } = inputState;

  const [inputMsg, setInputMsg] = useState({ emailMsg: '', passwordMsg: '' });
  const { emailMsg, passwordMsg } = inputMsg;

  const [isValidation, setIsValidation] = useState({
    isEmail: false,
    isPassword: false,
  });
  const { isEmail, isPassword } = isValidation;

  const onChangeInput = (e) => {
    const name = e.target.name;
    const currentValue = e.target.value;
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const passwordRegex = /.{8,}/;

    if (name === 'email') {
      setInputState({ ...inputState, email: currentValue });
      if (!emailRegex.test(currentValue) || currentValue.length === 0) {
        setIsValidation({ ...isValidation, isEmail: false });
        setInputMsg({
          ...inputMsg,
          emailMsg: '이메일 형식이 틀렸습니다! 다시 확인해주세요.',
        });
      } else {
        setInputMsg({ ...inputMsg, emailMsg: '올바른 이메일 형식입니다.' });
        setIsValidation({ ...isValidation, isEmail: true });
      }
    } else {
      setInputState({ ...inputState, password: currentValue });

      if (!passwordRegex.test(currentValue) || currentValue.length === 0) {
        setIsValidation({ ...isValidation, isPassword: false });
        setInputMsg({ ...inputMsg, passwordMsg: '8자리 이상 입력해주세요!' });
      } else {
        setInputMsg({ ...inputMsg, passwordMsg: '안전한 비밀번호입니다.' });
        setIsValidation({ ...isValidation, isPassword: true });
      }
    }
  };

  return {
    onChangeInput,
    email,
    password,
    isEmail,
    isPassword,
    emailMsg,
    passwordMsg,
  };
};

export default useOnChange;
