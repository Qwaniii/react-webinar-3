import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Controls({ cart , onModal, basket}) {
  return (
    <div className="Controls">
      <div className='Controls_empty'></div>
      <div className='Controls_text'>{!basket ? `В корзине:` : `Итого`}</div>
      <div className='Controls_cart'>
                {cart.length > 0 ? 
                !basket ? (`${cart.length} ${plural(cart.length, {
                  one: 'товар',
                  few: 'товара',
                  many: 'товаров',
                  })} / ${cart.reduce((sum, current) => sum + current.price * current.count, 0)} ₽`) 
                  : `${cart.reduce((sum, current) => sum + current.price * current.count, 0)} ₽` 
                : !basket ? `пусто` : `нет товаров`}
      </div>
      <div  className='Controls_button'>
        {onModal && <button onClick={() => onModal()}>Перейти</button>}
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
