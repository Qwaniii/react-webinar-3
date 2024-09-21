import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Удаление товара из корзины
   */
  toDelete(code) {

    const inCart = this.state.cart.find(item => item.code === code) 

    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
      total: this.state.total - (inCart.price * inCart.count),
      uniqCount: this.state.uniqCount - 1,
    });
  }

  /**
   * Добавление в корзину
   * @param code
   */
  addToCart(code) {
          // Проверяем , есть ли продукт в корзине
    const inCart = this.state.cart.find(item => item.code === code) 
    const inList = this.state.list.find(item => item.code === code) 

    inCart ?
    this.setState({
      ...this.state,
      cart: this.state.cart.map(item => item.code === code ? {...item, count: item.count + 1} : {...item}),
      total: this.state.total + inList.price
      })
    :
    this.setState({
      ...this.state,
      cart: [...this.state.cart, ...this.state.list.filter(item => {
        item.count = 1
        return item.code === code
      })],
      total: this.state.total + inList.price,
      uniqCount: this.state.uniqCount + 1
    })
  }
  /**
   * Выделение записи по коду
   * @param code
   */
  // selectItem(code) {
  //   this.setState({
  //     ...this.state,
  //     list: this.state.list.map(item => {
  //       if (item.code === code) {
  //         // Смена выделения и подсчёт
  //         return {
  //           ...item,
  //           selected: !item.selected,
  //           count: item.selected ? item.count : item.count + 1 || 1,
  //         };
  //       }
  //       // Сброс выделения если выделена
  //       return item.selected ? { ...item, selected: false } : item;
  //     }),
  //   });
  // }


}

export default Store;
