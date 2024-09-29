import { memo } from 'react';
import './style.css';
import { Link } from 'react-router-dom';

function ErrorPage({ main }) {

  return (
    <div className="ErrorPage">
        <Link to={`/`} className="ErrorPage-button">{main}</Link>
    </div>
  );
}

ErrorPage.propTypes = {
};


export default memo(ErrorPage);
