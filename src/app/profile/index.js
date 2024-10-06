import { memo, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import LoginBar from '../../components/login-bar';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import ProfileForm from '../../components/profile-form';
import ProfileExist from '../../containers/profile-exist';

function Profile() {
  
  const store = useStore();
  
  const select = useSelector(state => ({
    user: state.login.nameData,
    email: state.profile.nameData.email,
    profile: state.profile.profile,
    auth: state.profile.done,
  }))


  const { t } = useTranslate();

  const callbacks = {
    logout: useCallback(() => store.actions.login.logOut(), [store])

  };

  return (
    <PageLayout>
      <LoginBar nameUser={select.user?.name} 
                button={t('login')}
                logout={callbacks.logout}
      />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <ProfileExist>
        {select.profile && <ProfileForm  profile={select.profile}
                      email={select.email}
                      auth={select.auth}
                      text={t('profile')}
        />}
      </ProfileExist>
    </PageLayout>
  );
}



export default memo(Profile);
