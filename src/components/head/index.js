import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title, button="", onClose=()=>{} }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      <div className='Head_button'>
        {button && <button onClick={onClose}>{button}</button>}
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
