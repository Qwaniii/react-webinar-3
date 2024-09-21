import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List({ list, newItem: NewItem, buttonAction = () => {}, buttonText = "", onFormatNum  }) {
  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          <NewItem 
            item={item} 
            toButtonAction={buttonAction} 
            buttonText={buttonText} 
            onFormatNum={onFormatNum}/>
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  newItem: PropTypes.elementType,
  buttonAction: PropTypes.func,
  onFormatNum: PropTypes.func,
  buttonText: PropTypes.string,
};

export default React.memo(List);
