import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
      </div>
      <div className='Item-price'>{new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumSignificantDigits: 10 }).format(
    props.item.price)}</div>
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
    price: PropTypes.number,
  }).isRequired,
  toButtonAction: PropTypes.func,
  buttonText: PropTypes.string
};

export default React.memo(Item);
