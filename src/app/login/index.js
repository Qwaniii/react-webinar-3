import { memo, useCallback, useEffect, useState } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import LoginBar from '../../components/login-bar';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import LoginForm from '../../components/login-form';
import { useNavigate } from 'react-router-dom';

function Login(props) {
  
  const store = useStore();
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  
  const select = useSelector(state => ({
    user: state.login.profile.name,
    auth: state.login.auth.login,
    error: state.login.error
  }))

  useEffect(() => {
    if(select.auth || token)  {
      navigate('/')
    }
  }, [select.auth, token])

  const [userData, setUserData] = useState({login: "", password: ""})

  const { t } = useTranslate();



  const callbacks = {
    // Сортировка
    login: useCallback(data => store.actions.login.logIn(data), [store]),


  };

  return (
    <PageLayout>
      <LoginBar name={select.user} 
                button={t('login')}
      />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <LoginForm  setUserData={setUserData} 
                  userData={userData} 
                  onSubmit={callbacks.login}
                  error={select.error}
                  auth={select.auth}
      />
    </PageLayout>
  );
}



export default memo(Login);
