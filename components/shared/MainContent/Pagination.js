import React, { useState, useEffect } from 'react';

const Pagination = () => {
  // State
  const [activePage, updatePage] = useState(1);
  const [pages, setPages] = useState([1, 2, 3, 4, 5, 6]);

  return (
    <div className="pagination">
      <div className="prev-btn" onClick={() => updatePage(activePage - 1)}>
        {'<'}
      </div>
      <ul className="number-list">
        {pages
          ? pages.map((page, index) => (
              <li
                className={
                  index + 1 === activePage
                    ? 'number-item active'
                    : 'number-item'
                }
                onClick={() => updatePage(index + 1)}
              >
                {page}
              </li>
            ))
          : null}
      </ul>
      <div className="next-btn" onClick={() => updatePage(activePage + 1)}>
        {'>'}
      </div>

      <style jsx>{`
        .pagination {
          margin-top: 35px;
          font-weight: 500;
        }
        .pagination ul.number-list li {
          list-style: none;
          display: inline-block;
          margin: 0 15px;
          padding: 5px 12px;
          cursor: pointer;
        }

        li.number-item.active {
          background-color: #182c61;
          color: #ffffff;
          border-radius: 50%;
          transition: color 200ms ease-in-out;
        }

        li.number-item:hover {
          color: #b39a5d;
        }

        .prev-btn,
        .next-btn {
          cursor: pointer;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default Pagination;
