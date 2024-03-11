import styles from '../Login/Login.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { Headling } from '../../components/Headling/Headling';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { register, userActions } from '../../store/user.slice';
import { RootState } from '../../store/store';

export type RegisterForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
};

export function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, registerErrMsg } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (jwt) navigate('/');
  }, [jwt, navigate]);

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearRegisterErr());
    const target = e.target as typeof e.target & RegisterForm;
    const { email, password, name } = target;
    await sendRegister(email.value, password.value, name.value);
  };

  const sendRegister = async (
    email: string,
    password: string,
    name: string
  ) => {
    dispatch(register({ email, password, name }));
  };

  return (
    <div className={styles['login']}>
      <Headling>Регистрация</Headling>
      {registerErrMsg && (
        <div className={styles['error']}>{registerErrMsg}</div>
      )}
      <form className={styles['form']} onSubmit={submitForm}>
        <div className={`${styles['field']}`}>
          <label htmlFor='email' className={styles['form-label']}>
            <span>Ваш email</span>
          </label>
          <Input id='email' placeholder='Email' name='email' />
        </div>

        <div className={`${styles['field']}`}>
          <label htmlFor='password' className={styles['form-label']}>
            <span>Ваш пароль</span>
          </label>
          <Input
            id='password'
            type='password'
            name='password'
            placeholder='Пароль'
          />
        </div>

        <div className={`${styles['field']}`}>
          <label htmlFor='name' className={styles['form-label']}>
            <span>Ваше имя</span>
          </label>
          <Input id='name' placeholder='Имя' name='name' />
        </div>

        <Button appearence={'big'}>Зарегистрироваться</Button>
      </form>
      <div className={styles['links']}>
        <div>Есть акканут?</div>
        <Link to='/auth/login'>Войти</Link>
      </div>
    </div>
  );
}
