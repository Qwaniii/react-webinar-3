import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CartInner({ total, count , basket, onFormatNum}) {

    const cn = bem('CartInner')

  return (
    <div className={cn()}>
      <div className={cn({bold: basket && 'bold', text: 'text'})}>{!basket ? `В корзине:` : count > 0 ? `Итого` : ""}</div>
      <div className='CartInner_cart'>
                {count > 0 ? 
                !basket ? (`${count} ${plural(count, {
                  one: 'товар',
                  few: 'товара',
                  many: 'товаров',
                  })} / ${onFormatNum(total)}`) 
                  : `${onFormatNum(total)}` 
                : !basket ? `пусто` : `В корзине нет товаров`}
      </div>
    </div>
  );
}

CartInner.propTypes = {
    total: PropTypes.number,
    count: PropTypes.number,
    onFormatNum: PropTypes.func,
    basket: PropTypes.bool
};


export default React.memo(CartInner);