import { memo } from 'react';
import './style.css';
import PaginatePage from '../paginate-page';

function Paginate({pages, changePage, currentPage}) {
  return (
    <div className="Paginate">
        {pages.map((page, i) => (
            <PaginatePage page={page} key={i} changePage={changePage} currentPage={currentPage}/>
        ))}
    </div>
  );
}

// Paginate.propTypes = {
  
// };

export default memo(Paginate);
