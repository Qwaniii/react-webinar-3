import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import treeToList from '../../utils/tree-to-list';

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

  let children = treeToList(item.children)

  const comment = () => {
    item.children.length ? 
    commentOpen(children[children.length - 1]._id, gap, name)
    : commentOpen(item._id, gap, name)
  }


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
      <button type="button" className={cn('button')} onClick={() => comment()}>Ответить</button>
    </div>
  );
}



export default memo(Comment);
