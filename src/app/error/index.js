import { memo, useCallback } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ErrorPage from '../../components/error-page';

function Error() {

  const store = useStore();

  const select = useSelector(state => ({
    dict: state.lang.dict
  }));




  const callbacks = {

    changeLang: useCallback((code) => store.actions.lang.changeLang(code), [store])

  };


  return (
    <PageLayout>
      <Head title={select.dict.error}  changeLang={callbacks.changeLang}/>
      <ErrorPage main={select.dict.main}/>
    </PageLayout>
  );
}

export default memo(Error);
