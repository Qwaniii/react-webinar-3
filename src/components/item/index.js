import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Item(props) {
  // Счётчик выделений
  // const [count, setCount] = useState(0);


  const callbacks = {
    // onClick: () => {
    //   props.onSelect(props.item.code);
    //   if (!props.item.selected) {
    //     setCount(count + 1);
    //   }
    // },
    toAction: () => {
          props.toButtonAction(props.item.code);
      }
    };

  return (
    <div
      // className={'Item' + (props.item.selected ? ' Item_selected' : '')}
      className={'Item'}
    >
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">
        {props.item.title}{' '}
        {/* {count
          ? ` | Выделяли ${count} ${plural(count, {
              one: 'раз',
              few: 'раза',
              many: 'раз',
            })}`
          : ''} */}
      </div>
      <div className='Item-price'>{props.item.price}<span>{`₽`}</span></div>
      {props.item.count && <div className='Item-count'>{props.item.count}{` шт`}</div>}
      <div className="Item-actions">
        <button onClick={callbacks.toAction}>{props.buttonText}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  toCart: PropTypes.func,
  onSelect: PropTypes.func,
};

Item.defaultProps = {
  toCart: () => {},
  onSelect: () => {},
};

export default React.memo(Item);
