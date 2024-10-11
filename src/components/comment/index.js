import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Comment(props) {
  const { name, date, text, commentOpen, gap, item } = props;
  const cn = bem('Comment');

  const createDate = new Date(date) 
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  // const comment = () => {
  //   item.children.length ? 
  //   commentOpen(item.children[item.children.length - 1]._id)
  //   : commentOpen(item._id)
  // }


  return (
    <div className={cn()} style={{marginLeft: `${gap}px`}}>
      <div className={cn('head')} >
        <div className={cn('name')}>
          {name}
        </div>
        <div className={cn('date')}>{createDate.toLocaleString('ru-RU', options)}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('text')}>{text}</div>
      </div>
      <button type="button" className={cn('button')} onClick={() => commentOpen(item._id)}>Ответить</button>
    </div>
  );
}



export default memo(Comment);
