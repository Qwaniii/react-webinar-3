import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ add }) {
  return (
    <div className="Controls">
      <button onClick={() => onAdd()}>{add}</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default memo(Controls);
