import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import Translate from '../translate';



function Head({ title, changeLang, lang }) {
  
  const cn = bem('Head');

  return (
    <div className={cn()}>
      <h1 className={cn('h1')}>{title}</h1>
      <Translate  changeLang={changeLang} lang={lang}/>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
