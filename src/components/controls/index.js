import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({text, onAction = () => {}, basket=false}) {

  return (
    <div className="Controls">
      {!basket && 
      <div  className='Controls_button'>
        <button onClick={() => onAction()}>{text}</button>
      </div>}
    </div>
  );
}

Controls.propTypes = {
  text: PropTypes.array,
  onAction: PropTypes.func,
  basket: PropTypes.bool
};


export default React.memo(Controls);
