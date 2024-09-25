import { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';
import useSelector from '../../store/use-selector';

function ProductPage({onBasket, product, loading}) {
  const cn = bem('ProductPage');

  const select = useSelector(state => ({
    dict: state.lang.dict,
  }));

  const callbacks = {
    onAdd: e => onBasket(product._id, product),
  };

  if(!loading) return <div className={cn("", loading && "loading")}>Загрузка</div>

  return (
    <div className={cn()}>
    <div className={cn('title')}>{product?.description}</div>
    <div className={cn('title')}>{select.dict.madeIn}: <span className={cn('title', 'bold')}>{product?.madeIn.title} ({product?.madeIn.code})</span></div>
    <div className={cn('title')}>{select.dict.category}: <span className={cn('title', 'bold')}>{product?.category.title}</span></div>
    <div className={cn('title')}>{select.dict.edition}: <span className={cn('title', 'bold')}>{product?.edition}</span></div>
    <div className={cn('price')}>{select.dict.price}: {numberFormat(product?.price)}  ₽</div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onAdd}>{select.dict.add}</button>
      </div>
    </div>
  );
}

ProductPage.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

ProductPage.defaultProps = {
  onAdd: () => {},
};

export default memo(ProductPage);
