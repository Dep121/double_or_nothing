import React, { useState } from 'react';
import s from './index.module.scss';

function Pagination({header, list, itemsPerPage}) {
  const [pageNumber, setPageNumber] = useState(1);
  const totalPages = list.length%itemsPerPage === 0 ? Math.floor(list.length/itemsPerPage) : Math.ceil(list.length/itemsPerPage);

  const firstItemIndex = (pageNumber-1)*itemsPerPage;
  const lastIndex = firstItemIndex + itemsPerPage > list.length ? list.length : firstItemIndex + itemsPerPage;

  function pageClick(i) {
    setPageNumber(i);
  }

  const pageNumbersList = [...new Array(totalPages)];
  const previousPage = pageNumber - 1 < 1 ? false : pageNumber - 1;
  const nextPage = pageNumber + 1 > totalPages ? false : pageNumber + 1;

  return <div className={s.pagination}>
    {header}
    {
      list.slice(firstItemIndex, lastIndex).map((item, i)=><div key={i}>{item}</div>)
    }
    <div className={s.pageNumbers}>
      <div onClick={()=>pageClick(pageNumber - 1)} style={{display: `${pageNumber === 1 ? 'none' : ''}`}} className={`${s.pageNumberBox}`}>
        {'<'}
      </div>

      <div>{`${firstItemIndex + 1} - ${lastIndex} of ${list.length}`}</div>
      
      <div onClick={()=>pageClick(pageNumber + 1)} style={{display: `${pageNumber === totalPages ? 'none' : ''}`}} className={`${s.pageNumberBox}`}>
        {'>'}
      </div>
    </div>
  </div>
}

export default Pagination;
