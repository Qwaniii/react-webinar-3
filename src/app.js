import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ModalLayout from './components/modal-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  let cart = store.getState().cart

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

    // onAddItem: useCallback(() => {
    //   store.addItem();
    // }, [store]),
  };

  return (
    <>
      <PageLayout>
        <Head title={page.title} />
        <Controls cart={cart} onModal={callbacks.onModal} />
        <List
          list={list}
          buttonAction={callbacks.onAddToCart}
          buttonText={page.buttonText}
        />
      </PageLayout>
      {modal.state && <ModalLayout onClose={callbacks.onModal}>
        <Head title={modal.title}  button={modal.button} onClose={callbacks.onModal}/>
        <List
          list={cart}
          buttonAction={callbacks.onDelete}
          buttonText={modal.buttonText}
        />
        <Controls cart={cart} basket={modal.basket}/>
      </ModalLayout>}
    </>
  );
}

export default App;
