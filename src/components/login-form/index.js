import { memo, useCallback, useEffect, useMemo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';
import Spinner from '../spinner';

/**
 * Контейнер со всеми фильтрами каталога
 */
function LoginForm({ setUserData, userData, onSubmit, error, auth }) {

    const cn = bem('LoginForm');

    const callbacks = {
        login: (e) => setUserData({...userData, login: e.target.value}),
        password: (e) => setUserData({...userData, password: e.target.value}),
        submit: (e) => (e.preventDefault(), onSubmit(userData), e.target.reset()),
      };

  return (
    <Spinner active={auth}>
        <div className={cn('')}>
            <h2>Вход</h2>
        <form className={cn('form')} onSubmit={callbacks.submit}>
            <div className={cn('input')}>
                <label htmlFor="email">Логин</label>
                <input type="text" id="email" defaultValue="" onChange={callbacks.login} required/>
            </div>
            <div className={cn('input')}>
                <label htmlFor="password">Пароль</label>
                <input type="password" minLength={6} id="password" defaultValue="" required onChange={callbacks.password}/>
            </div>
            <input type="submit" value="Войти" className={cn('button')}></input>
            {error.message && <div className={cn('error')}>{error.message}<div>{error.type}</div></div>}
        </form>
        </div>
    </Spinner>
  );
}

export default memo(LoginForm);
