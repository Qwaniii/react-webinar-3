import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';

function ProductPage({onBasket, product, loading, dict}) {
  const cn = bem('ProductPage');

  const callbacks = {
    onAdd: e => onBasket(product._id, product),
  };

  if(!loading) return <div className={cn("", loading && "loading")}>{dict.loading}</div>

  return (
    <div className={cn()}>
    <div className={cn('title')}>{product?.description}</div>
    <div className={cn('title')}>{dict.madeIn}: <span className={cn('title', 'bold')}>{product?.madeIn.title} ({product?.madeIn.code})</span></div>
    <div className={cn('title')}>{dict.category}: <span className={cn('title', 'bold')}>{product?.category.title}</span></div>
    <div className={cn('title')}>{dict.edition}: <span className={cn('title', 'bold')}>{product?.edition}</span></div>
    <div className={cn('price')}>{dict.price}: {numberFormat(product?.price)}  ₽</div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onAdd}>{dict.add}</button>
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
