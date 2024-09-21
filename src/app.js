import React, { useCallback, useState } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Item from './components/item';
import CartView from './components/cart-view';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  let cart = store.getState().cart;
  let total = store.getState().total;
  let uniqCount = store.getState().uniqCount;

  const [modal, setModal] = useState({
    title: "Корзина",
    state: false,
    button: "Закрыть",
    buttonText: "Удалить",
    basket: true
  })
  const [page, setPage] = useState({
    title: "Магазин",
    buttonText: "Добавить",
  })


  const callbacks = {
    onAddToCart: useCallback(
      code => {
        store.addToCart(code);
      },
      [store],
    ),

    onDelete: useCallback(
      code => {
        store.toDelete(code);
      },
      [store],
    ),

    onModal: useCallback(
      () => {
        setModal((prevState) => ({...prevState, state: !modal.state}))
      }
    ),
    onFormatNum: useCallback(
      (number) => {
        return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumSignificantDigits: 10 }).format(
          number)
      }
    ),

    // onAddItem: useCallback(() => {
    //   store.addItem();
    // }, [store]),
  };

  return (
    <>
      <PageLayout>
        <Head 
          title={page.title} />
        <CartView 
          total={total} 
          cart={cart} 
          count = {uniqCount} 
          onModal={callbacks.onModal} 
          onFormatNum={callbacks.onFormatNum}/>
        <List
          list={list}
          newItem={Item}
          buttonAction={callbacks.onAddToCart}
          buttonText={page.buttonText}
        />
      </PageLayout>
      {modal.state && <Cart 
                        onClose={callbacks.onModal}
                        modal={modal}
                        cart={cart}
                        total={total} 
                        count = {uniqCount}
                        buttonAction={callbacks.onDelete}
                        onFormatNum={callbacks.onFormatNum}
      />}
    </>
  );
}

export default App;
