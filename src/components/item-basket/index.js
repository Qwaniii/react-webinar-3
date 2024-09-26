import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const store = useStore();

  const select = useSelector(state => ({
    dict: state.lang.dict,
    lang: state.lang.language,
    product: state.lang.product,
  }));

  const callbacks = {
    
    onRemove: e => props.onRemove(props.item._id),
    onClose: e => props.onClose(),
    title: () => store.actions.lang.getProductTitle(props.item._id, select.lang)

  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link to={`/products/${props.item._id}`} onClick={callbacks.onClose} className={cn('title')}>{callbacks.title()}</Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {select.dict.piece}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{select.dict.delete}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
};

export default memo(ItemBasket);
