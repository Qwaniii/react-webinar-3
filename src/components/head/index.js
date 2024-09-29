import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import useSelector from '../../store/use-selector';



function Head({ title, changeLang, lang }) {
  
  const cn = bem('Head');

  return (
    <div className={cn()}>
      <h1 className={cn('h1')}>{title}</h1>
      <div  className={cn('lang')}>
        <span className={cn("lang", lang === "ru" && 'active' )} onClick={() => changeLang("ru")}>RU</span>
        <span className={cn("lang", lang === "en" && 'active' )} onClick={() => changeLang("en")}>EN</span>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
