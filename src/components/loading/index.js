import { memo } from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import useSelector from '../../store/use-selector';
import { dict } from '../../dict';

function Loading() {

  const select = useSelector(state => ({
    dict: state.lang.dict
  }));
  return (
    <>
      <div className="Loading">
        {select.dict.loading}
      </div>
    </>
  );
}


Loading.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  renderItem: PropTypes.func,
};

Loading.defaultProps = {
  renderItem: item => {},
};

export default memo(Loading);
