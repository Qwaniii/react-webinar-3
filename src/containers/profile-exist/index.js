import { Children, memo, useCallback, useEffect, useMemo } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Menu from '../../components/menu';
import BasketTool from '../../components/basket-tool';
import SideLayout from '../../components/side-layout';
import { useNavigate } from 'react-router-dom';

/**
 * Контейнер с компонентами навигации
 */
function ProfileExist({children}) {
  const store = useStore();
  const navigate = useNavigate()

  const select = useSelector(state => ({
    token: state.login.token
  }))

  useEffect(() => {
    if(!select.token)  {
        navigate('/login')
    } else store.actions.profile.getUserInfo(select.token)
    
  }, [select.token])

  return (
    <div>
      {children}
    </div>
  );
}

export default memo(ProfileExist);
