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
import ProfileForm from '../../components/profile-form';

function Profile(props) {
  
  const store = useStore();
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  
  const select = useSelector(state => ({
    profile: state.login.profile,
    email: state.login.nameData.email,
    auth: state.login.auth.profile,
  }))

  useEffect(() => {
    if(!token)  {
      navigate('/login')
    } else store.actions.login.getUserInfo(token)
    
  }, [token])

  const { t } = useTranslate();

  const callbacks = {
    logout: useCallback(() => store.actions.login.logOut(), [store])

  };

  return (
    <PageLayout>
      <LoginBar name={select.profile.name} 
                button={t('login')}
                logout={callbacks.logout}
      />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <ProfileForm  profile={select.profile}
                    email={select.email}
                    auth={select.auth}
                    text={t('profile')}
      />
    </PageLayout>
  );
}



export default memo(Profile);
