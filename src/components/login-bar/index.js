import { memo, useCallback, useEffect, useMemo } from 'react';
import './style.css';
import { Link, useLocation } from 'react-router-dom';
import Spinner from '../spinner';

/**
 * Контейнер со всеми фильтрами каталога
 */
function LoginBar({ nameUser="", button, logout }) {

  const location = useLocation()
  
  if(nameUser) {
  return (
    <div className='LoginBar'>
        <Link to= '/profile' state = {{pathname: location.pathname}}>{nameUser}</Link>
        <button onClick={logout}>{button.exit}</button>
    </div>
    )
  }
  

  return (
      <div className='LoginBar'>
        <Link to= '/login' state = {{pathname: location.pathname}}>{nameUser}
        <button>{button.enter}</button></Link>
      </div>  
    )
  ;
}

export default memo(LoginBar);
