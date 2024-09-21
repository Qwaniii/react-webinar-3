import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import CartInner from '../cart-inner';
import Controls from '../controls';

function CartView({ total, count, onModal, basket, onFormatNum}) {

  return (
    <div className="CartView">
      <CartInner total={total} count={count} basket={basket} onFormatNum={onFormatNum}/>
      <Controls onAction={onModal} text="Перейти" basket={basket}/>
    </div>
  );
}

CartView.propTypes = {
    total: PropTypes.number,
    count: PropTypes.number,
    onFormatNum: PropTypes.func,
    basket: PropTypes.bool,
    onModal: PropTypes.func
};


export default React.memo(CartView);
