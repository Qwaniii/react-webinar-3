import { memo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function AddComment({ send, id, waiting, session, answer, commentCancel, gap, onSignIn, myRef}) {
  const cn = bem('AddComment');

  const [text, setText] = useState("")

  const callbacks = {
    onChange: (e) => setText(e.target.value),
    addComment: ()  => {
      const body = {
        "text": text,
        "parent": {"_id":  id, "_type": answer ? "comment" : "article"}
      }
      send(id, body)
      if(!waiting) {
        setText("")
      }
    }
  };


  // let gap =  item ? item.children[item.children.length - 1].gap : item.gap
  // console.log(item)

  return (
    <div className={cn()} style={{marginLeft: answer ? `${gap}px` : ``, paddingTop: answer ? '30px' : ''}}>
      {session ? 
      <>
        <div className={cn('head')}>{answer ? `Новый ответ` : `Новый комментарий`}</div>
        <textarea className={cn('textarea')} type="text" placeholder={'Текст'} value={text} onChange={callbacks.onChange}></textarea>
        <div className={cn('footer')}>
          <button className={cn('button')} disabled={text.length && !/^\s*$/.test(text) ? '' : "disabled"} onClick={callbacks.addComment}>Отправить</button>
          {answer &&  <button className={cn('button')} onClick={() => commentCancel()}>Отмена</button>}
        </div>
      </>
      :
      <div className={cn('auth')}>
        <div className={cn('link')} onClick={() => onSignIn()}>Войдите</div><span>, чтобы иметь возможность комментировать. </span>
        {answer &&  <div className={cn('cancel')} onClick={() => commentCancel()}>Отмена</div>}
      </div>
      }
    </div>
  );
}


export default memo(AddComment);
