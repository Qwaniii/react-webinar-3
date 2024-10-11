import { memo, useCallback, useState } from 'react';
import useTranslate from '../../hooks/use-translate';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/spinner';
import Comments from '../../components/comments';
import AddComment from '../../components/add-comment';
import useSelectorState from '../../hooks/use-selector';
import shallowequal from 'shallowequal';
import commentsActions from '../../store-redux/comments/actions';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import { useLocation, useNavigate } from 'react-router-dom';





function CommentsList({ id }) {

  const [commentId, setCommentId] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const navigate = useNavigate()
  const location = useLocation()

  const selectState = useSelectorState(state => ({
    token: state.session.token,
    exist: state.session.exists
  }))



  const select = useSelector(
    state => ({
      data: state.comments.data,
      count: state.comments.count,
      waiting: state.comments.waiting,
    }),
    shallowequal,
  ); 
  const dispatch = useDispatch()

  const callbacks = {
    // Добавление в корзину
    // addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    addComment: (id, body)  => {
      dispatch(commentsActions.send(id, selectState.token, body))
      setCommentId(null);
      setShowForm(true);
    },

    cancel: () => {
      setCommentId(null);
      setShowForm(true);
    },

    open: id => {
      setCommentId(id);
      setShowForm(false);
    },


    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),

    // treeOfComments: listToTree([{_id: id, parent: null}, ...select.data])

    treeOfComments: treeToList(listToTree([{_id: id, parent: null}, ...select.data])[0].children, (item, level) => ({...item, gap: (level)*30}))

  };


  // console.log(treeToList(listToTree([{_id: id, parent: null}, ...select.data])[0].children, (item, level) => ({...item, gap: (level + 1)*30})))


  // const { t } = useTranslate();

  return (
    <>
      <Spinner active={select.waiting}>
        {select.data && <Comments data={callbacks.treeOfComments} 
                                  send={callbacks.addComment} 
                                  count={select.count} 
                                  waiting={select.waiting} 
                                  session={selectState.exist}
                                  commentId={commentId}
                                  commentOpen={callbacks.open}
                                  commentCancel={callbacks.cancel}
                                  showForm={showForm}
                                  onSignIn={callbacks.onSignIn}
                                  id={id}/>
                                  }
      </Spinner>
    </>
  );
}

export default memo(CommentsList);
