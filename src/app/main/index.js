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
import { dict } from '../../../src/dict'

function Main() {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.paginate(10, 0);
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    maxPage: state.catalog.maxPage,
    page: state.catalog.page,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.lang.language,
    dict: state.lang.dict
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    
    allPage: useCallback(()=> pages(select.page, select.maxPage)),

    changePage: useCallback((page) => store.actions.catalog.changePage(page)),

    changeLang: useCallback((code) => store.actions.lang.changeLang(code))

  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };




  return (
    <PageLayout>
      <Head title={select.dict.title} changeLang={callbacks.changeLang}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Paginate pages={callbacks.allPage()} changePage={callbacks.changePage}/>
    </PageLayout>
  );
}

export default memo(Main);
