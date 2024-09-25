import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';
import { Link } from 'react-router-dom';
import useSelector from '../../store/use-selector';

function BasketTool({ sum, amount, onOpen }) {
  const select = useSelector(state => ({
    dict: state.lang.dict,
    lang: state.lang.language,
  }));

  const item = {
    ru: {
      one: 'товар',
      few: 'товара',
      many: 'товаров',
    },
    en: {
      one: 'item',
      other: 'items',
    }
  }

  const option = {
    ru: "ru-RU",
    en: "en-En"
  }

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Link to={`/`} className={cn('right')}>{select.dict.main}</Link>
      <div className={cn('main')}><span className={cn('label')}>{select.dict.inBasket}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, item[select.lang], option[select.lang])} / ${numberFormat(sum)} ₽`
          : `${select.dict.empty}`}
      </span>
      <button onClick={onOpen}>{select.dict.goTo}</button></div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
