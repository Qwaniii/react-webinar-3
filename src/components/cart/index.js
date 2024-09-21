import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Head from '../head';
import List from '../list';
import CartView from '../cart-view';
import cartItem from '../cart-item';

function Cart({ modal, cart, total, count, onClose, buttonAction, onFormatNum }) {

  const cn = bem('Cart');

  return (
    <div className={cn()} onClick={onClose}>
      <div className={cn('center')} onClick={(e) =>  e.stopPropagation()}>
        <Head 
          title={modal.title}  
          button={modal.button} 
          onClose={onClose}/>
        <div className={cn('empty')}></div>
        <List
          list={cart}
          newItem={cartItem}
          buttonAction={buttonAction}
          buttonText={modal.buttonText}
          onFormatNum={onFormatNum}
        />
        <div className={cn('last')}>
          <CartView 
            total={total} 
            count = {count} 
            basket={modal.basket} 
            onFormatNum={onFormatNum}/>
        </div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  modal: PropTypes.shape({
    title: PropTypes.string,
    button: PropTypes.string,
    buttonText: PropTypes.string,
    basket: PropTypes.bool,
  }), 
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    })
  ), 
  total: PropTypes.number, 
  count: PropTypes.number, 
  onClose: PropTypes.func, 
  buttonAction: PropTypes.func, 
  onFormatNum: PropTypes.func,
};

export default React.memo(Cart);
