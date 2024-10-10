import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import treeToList from '../../utils/tree-to-list';
import './style.css';
import AddComment from '../add-comment';

function InnerComment({ name, date, text, body, gap, id, send, waiting, session, curId, commentOpen, commentCancel } ) {
  const cn = bem('InnerComment');


  const createDate = new Date(date) 
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
    month: "long",
    day: "numeric",
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
      {/* <div className={cn('prop', { size: 'big' })}>
        <div className={cn('label')}>Цена:</div>
        <div className={cn('value')}>{numberFormat(article.price)} ₽</div>
      </div> */}
      <button type="button" className={cn('button')} onClick={() => commentOpen(id)}>Ответить</button>
    </div>
  );
}



export default memo(InnerComment);
