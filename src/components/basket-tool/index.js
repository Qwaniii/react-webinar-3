import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';

function BasketTool({ sum, amount, onOpen, dict, lang }) {

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
      <div className={cn('main')}><span className={cn('label')}>{dict.inBasket}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, item[lang], option[lang])} / ${numberFormat(sum)} ₽`
          : `${dict.empty}`}
      </span>
      <button onClick={onOpen}>{dict.goTo}</button></div>
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
