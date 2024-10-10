export default {

  loadComments: id => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Товар загружен успешно
        dispatch({ type: 'comments/load-success', payload: { data: res.data.result } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  send: (id, token, innerBody) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/start-new-comment' });
      try {
        const res = await services.api.request({
          url: `api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type)`,
          method: "POST",
          headers: {'X-Token': token},
          body: JSON.stringify(innerBody)
        });
        dispatch({ type: 'comments/new-comment', payload: res.data.result})
      } catch (e) {
        //Ошибка загрузки
        console.log(e)
        dispatch({ type: 'comments/error-comment' });

      }
    };
  }

};
