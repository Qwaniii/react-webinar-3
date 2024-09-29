import { memo, useCallback } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function PaginatePage({page, changePage, currentPage}) {

    const cn = bem('PaginatePage')

    const callbacks = {
            change: useCallback((page) => page !== "..." ? changePage(page) : ""),
    }

  return (
    <div className={cn("", page === currentPage ? "current" : page === "..." ? "dot" : "")} onClick={() => callbacks.change(page)}>
       {page}
    </div>
  );
}

// Paginate.propTypes = {
  
// };

export default memo(PaginatePage);
