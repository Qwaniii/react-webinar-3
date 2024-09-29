import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function MainMenu({menu}) {

  const cn = bem('MainMenu');
  return (
    <div className={cn()}>
      <Link to={`/`} className={cn('left')}>{menu}</Link>
    </div>
  );
}

export default memo(MainMenu);
