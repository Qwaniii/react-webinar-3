import { memo, useCallback, useEffect, useMemo } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import Spinner from '../spinner';

/**
 * Контейнер со всеми фильтрами каталога
 */
function LoginBar({ name, button, logout }) {
  
  if(name) {
  return (
    <div className='LoginBar'>
        <Link to={'/profile'}>{name}</Link>
        <button onClick={logout}>{button.exit}</button>
    </div>
    )
  }
  

  return (
      <div className='LoginBar'>
        <Link to={'/login'}><button>{button.enter}</button></Link>
      </div>  
    )
  ;
}

export default memo(LoginBar);
