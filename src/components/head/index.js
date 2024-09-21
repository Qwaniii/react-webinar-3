import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Controls from '../controls';

function Head({ title, button="", onClose=()=>{} }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      <div className='Head_button'>
        {button && <Controls text="Закрыть" onAction={onClose}/>}
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  button: PropTypes.string,
  onClose: PropTypes.func
};

export default React.memo(Head);
