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
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.state.count + 1, title: 'Новая запись' }],
      count: this.state.count + 1
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        item.selected 
        ? item.selected = !item.selected 
        : item.code === code 
        ? item.selected = !item.selected
        : item.selected


        // if (item.code === code) {
        //   item.selected ? item.selected = false : item.selected = true
        //   console.log(item.selected)
        // }
        return item;
      }),
    });
  }

  countItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if(item.code === code) {
        if (item.selected) {
          item.count ? item.count += 1 : item.count = 1
        }}
        return item;
      }),
    });
  }
}

export default Store;
