import React, { useState } from 'react';

function FilterOptions({ onFilterChange }) {
  const [filterOptions, setFilterOptions] = useState({
    category: '',
    company: '',
    rating: 0,
    priceRange: [],
    availability: ''
  });

  const handleFilterChange = (e) => {
    // Update filter options state
    const { name, value } = e.target;
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value
    }));
    // Pass updated filter options to parent component
    onFilterChange(filterOptions);
  };

  return (
    <div>
      {/* Implement filter options UI */}
    </div>
  );
}

export default FilterOptions;
