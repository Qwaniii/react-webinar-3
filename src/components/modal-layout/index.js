import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ModalLayout({ children, onClose }) {
  const cn = bem('ModalLayout');

  return (
    <div className={cn()} onClick={onClose}>
      <div className={cn('center')} onClick={(e) =>  e.stopPropagation()}>{children}</div>
    </div>
  );
}

ModalLayout.propTypes = {
  children: PropTypes.node,
};

export default React.memo(ModalLayout);
