import { memo, useCallback, useEffect, useMemo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';
import Spinner from '../spinner';

/**
 * Контейнер со всеми фильтрами каталога
 */
function ProfileForm(props) {

    const cn = bem('ProfileForm');

  return (
    <Spinner active={!props.auth}>
        <div className={cn('')}>
            <h2>Профиль</h2>
            <div className={cn('text')}>
                <div>Имя:</div>
                <div  className={cn('value')}>{props.profile.name}</div>
            </div>
            <div className={cn('text')}>
                <div>Телефон:</div>
                <div  className={cn('value')}>{props.profile.phone}</div>
            </div>
            <div className={cn('text')}>
                <div>email:</div>
                <div  className={cn('value')}>{props.email}</div>
            </div>
        </div>
    </Spinner>
  );
}

export default memo(ProfileForm);
