import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import useSelector from '../../store/use-selector';
import { Link } from 'react-router-dom';

function ErrorPage() {
  const select = useSelector(state => ({
    dict: state.lang.dict,
  }));
  return (
    <div className="ErrorPage">
        <Link to={`/`} className="ErrorPage-button">{select.dict.main}</Link>
    </div>
  );
}

ErrorPage.propTypes = {
};


export default memo(ErrorPage);
