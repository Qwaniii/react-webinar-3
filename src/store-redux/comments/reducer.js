// Начальное состояние
export const initialState = {
  data: [],
  count: 0,
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, data: [], waiting: true };

    case 'comments/load-success':
      return { ...state, data: action.payload.data.items, count: action.payload.data.count, waiting: false };

    case 'comments/load-error':
      return { ...state, data: [], waiting: false }; 


      case 'comments/start-new-comment':
        return {...state, waiting: true}

    case 'comments/new-comment':
      return {...state, data: [... state.data, action.payload], count: state.count + 1, waiting: false}
      
    case 'comments/error-comment':
      return {...state, waiting: false}

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
