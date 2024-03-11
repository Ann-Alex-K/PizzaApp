import styles from './Login.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { Headling } from '../../components/Headling/Headling';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { login, userActions } from '../../store/user.slice';
import { RootState } from '../../store/store';

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, loginErrMsg } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (jwt) navigate('/');
  }, [jwt, navigate]);

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginErr());
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email, password }));
  };

  return (
    <div className={styles['login']}>
      <Headling>Вход</Headling>
      {loginErrMsg && <div className={styles['error']}>{loginErrMsg}</div>}
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

        <Button appearence={'big'}>Вход</Button>
      </form>
      <div className={styles['links']}>
        <div>Нет акканута?</div>
        <Link to='/auth/register'>Зарегистрироваться</Link>
      </div>
    </div>
  );
}
