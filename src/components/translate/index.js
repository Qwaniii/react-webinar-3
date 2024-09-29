import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';



function Translate({ changeLang, lang }) {
  
  const cn = bem('Translate');

  return (
    <div className={cn()}>
        <span className={cn("", lang === "ru" && 'active' )} onClick={() => changeLang("ru")}>RU</span>
        <span className={cn("", lang === "en" && 'active' )} onClick={() => changeLang("en")}>EN</span>
    </div>
  );
}

export default memo(Translate);
