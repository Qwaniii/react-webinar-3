import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import PaginatePage from '../paginate-page';

function Paginate({pages, changePage}) {
console.log(pages)
  return (
    <div className="Paginate">
        {pages.map((page, i) => (
            <PaginatePage page={page} key={i} changePage={changePage}/>
        ))}
    </div>
  );
}

// Paginate.propTypes = {
  
// };

export default memo(Paginate);
