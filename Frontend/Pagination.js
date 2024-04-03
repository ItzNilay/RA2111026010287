import React from 'react';

function Pagination({ onPageChange }) {
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div>
      {/* Implement pagination UI */}
    </div>
  );
}

export default Pagination;
