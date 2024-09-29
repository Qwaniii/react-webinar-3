import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function Basket() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    dict: state.lang.dict,
    lang: state.lang.language,
    product: state.lang.product,
    load: state.lang.langLoading,

  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    // Перевод названия
    getTitle: (id) => store.actions.lang.getProductTitle(id, select.lang)

  };

  const renders = {
    itemBasket: useCallback(
      item => {
        return <ItemBasket 
                  item={item} 
                  link={`/products`} 
                  onRemove={callbacks.removeFromBasket} 
                  onClose={callbacks.closeModal}
                  getTitle={callbacks.getTitle}
                  dict={select.dict}
                  lang={select.lang}
                  load={select.load}

                />;
      },
      [callbacks.removeFromBasket, select.load],
    ),
  };

  return (
    <ModalLayout 
        dict={select.dict} 
        onClose={callbacks.closeModal}>
          <List 
            list={select.list} 
            renderItem={renders.itemBasket} 
          />
          <BasketTotal 
            sum={select.sum} total={select.dict.total}/>
    </ModalLayout>
  );
}

export default memo(Basket);
