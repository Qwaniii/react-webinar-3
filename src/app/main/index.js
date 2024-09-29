import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Paginate from '../../components/paginate';
import { pages, translate } from '../../utils';
import Loading from '../../components/loading';
import MainMenu from '../../components/main-menu';

function Main() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    loading: state.catalog.loading,
    maxPage: state.catalog.maxPage,
    page: state.catalog.page,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.lang.language,
    dict: state.lang.dict,
  }));

  useEffect(() => {
    store.actions.catalog.paginate(select.lang);
  }, [select.lang]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => (store.actions.basket.addToBasket(_id), store.actions.lang.productTranslate(_id))),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    
    allPage: useCallback(()=> pages(select.page, select.maxPage)),

    changePage: useCallback((page) => store.actions.catalog.changePage(page, select.lang)),

    changeLang: useCallback((code) => store.actions.lang.changeLang(code))

  };

  const renders = {
    item: useCallback(
      item => {
        return <Item 
                  item={item} 
                  link={`/products`} 
                  onAdd={callbacks.addToBasket} 
                  dict={select.dict}
              />;
      },
      [callbacks.addToBasket],
    ),
  };




  return (
    <PageLayout>
      <Head title={select.dict.title} 
            changeLang={callbacks.changeLang} 
            lang={select.lang}
      />
      <MainMenu menu={select.dict.main}/>
      <BasketTool 
            onOpen={callbacks.openModalBasket} 
            amount={select.amount} 
            sum={select.sum}
            dict={select.dict}
            lang={select.lang}
      />
      {select.loading ? 
      <List 
            list={select.list} 
            renderItem={renders.item}
      /> 
      : <Loading loading={select.dict.loading}/>}
      <Paginate 
            pages={callbacks.allPage()} 
            currentPage={select.page}
            changePage={callbacks.changePage}
      />
    </PageLayout>
  );
}

export default memo(Main);
