import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Controls({ cart , onModal }) {
  return (
    <div className="Controls">
      <div className='Controls_empty'></div>
      <div className='Controls_text'>В корзине:</div>
      <div className='Controls_cart'>
                {/* {cart.length > 0 ? 
                `${cart.length} ${plural(cart.length, {
                  one: 'товар',
                  few: 'товара',
                  many: 'товаров',
                  })} / ${cart.reduce((sum, current) => sum + current.price, 0)} ₽` 
                : `пусто`} */}
      </div>
      <div  className='Controls_button'>
        <button onClick={() => onModal()}>Перейти</button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Controls);
