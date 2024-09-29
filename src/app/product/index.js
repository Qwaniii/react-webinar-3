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
import Error from '../error';
import MainMenu from '../../components/main-menu';

function Product() {

  const { productId } = useParams();
  const store = useStore();

  const select = useSelector(state => ({
    product: state.product.goods,
    loading: state.product.loading,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.lang.language,
    dict: state.lang.dict
  }));

  useEffect(() => {
    store.actions.product.getProduct(productId, select.lang);
    return () => store.actions.product.initialState()
  }, [productId, select.lang]);



  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id, product) => (store.actions.basket.addToBasket(_id, product), store.actions.lang.productTranslate(_id)) [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    
    allPage: useCallback(()=> pages(select.page, select.maxPage)),

    changePage: useCallback((page) => store.actions.catalog.changePage(page)),

    changeLang: useCallback((code) => store.actions.lang.changeLang(code))

  };

  if(!select.product) {
    return <Error/>
  }


  return (
    <PageLayout>
      <Head 
        title={select?.product?.title}  
        changeLang={callbacks.changeLang}
      />
      <MainMenu 
        menu={select.dict.main}
      />
      <BasketTool 
        onOpen={callbacks.openModalBasket} 
        amount={select.amount} sum={select.sum} 
        dict={select.dict}
        lang={select.lang}
      />
      <ProductPage 
        onBasket={callbacks.addToBasket}
        product={select?.product} 
        loading={select.loading}
        dict={select.dict}
      />
    </PageLayout>
  );
}

export default memo(Product);
