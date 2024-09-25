import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import useSelector from '../../store/use-selector';

function PaginatePage({page, changePage}) {

    const cn = bem('PaginatePage')

    const select = useSelector(state => ({
        currentPage: state.catalog.page,
      }));

    const callbacks = {
            change: useCallback((page) => page !== "..." ? changePage(page) : ""),
    }

  return (
    <div className={cn("", page === select.currentPage ? "current" : "")} onClick={() => callbacks.change(page)}>
       {page}
    </div>
  );
}

// Paginate.propTypes = {
  
// };

export default memo(PaginatePage);
