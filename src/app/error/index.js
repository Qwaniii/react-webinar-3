import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { pages } from '../../utils';
import { Link, useParams } from 'react-router-dom';
import ProductPage from '../../components/product-page';
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
      <ErrorPage/>
    </PageLayout>
  );
}

export default memo(Error);
