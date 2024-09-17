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

  const [modal, setModal] = useState(false)

  const callbacks = {
    onAddToCart: useCallback(
      code => {
        store.addToCart(code);
      },
      [store],
    ),

    onModal: useCallback(
      () => setModal(!modal)
      // code => {
      //   store.selectItem(code);
      // },
      // [store],
    ),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls cart={cart} onModal={callbacks.onModal} />
        <List
          list={list}
          onAddToCart={callbacks.onAddToCart}
          onSelectItem={callbacks.onSelectItem}
        />
      </PageLayout>
      {modal && <ModalLayout>
        <Head title="Корзина"  button="Закрыть" onClose={callbacks.onModal}/>
        <Controls cart={cart} onModal={callbacks.onModal} />
        <List
          list={cart}
          onAddToCart={callbacks.onAddToCart}
          onSelectItem={callbacks.onSelectItem}
        />
      </ModalLayout>}
    </>
  );
}

export default App;
