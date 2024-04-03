import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import FilterOptions from '../components/FilterOptions';
import Pagination from '../components/Pagination';
import { getAllProducts } from '../api/products';

function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    category: '',
    company: '',
    rating: 0,
    priceRange: [],
    availability: ''
  });

  useEffect(() => {
    // Fetch all products from backend API
    getAllProducts().then((data) => {
      setProducts(data);
      setFilteredProducts(data); // Initially set filtered products same as all products
    });
  }, []);

  // Function to handle filtering
  const handleFilterChange = (newFilterOptions) => {
    setFilterOptions(newFilterOptions);
    // Filter products based on new filter options
    const filtered = products.filter((product) => {
      // Implement your filtering logic here
      // Example: Check if product category matches filter category, etc.
    });
    setFilteredProducts(filtered);
  };

  // Function to handle pagination
  const handlePageChange = (pageNumber) => {
    // Implement pagination logic here
  };

  return (
    <div>
      <FilterOptions onFilterChange={handleFilterChange} />
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <Pagination onPageChange={handlePageChange} />
    </div>
  );
}

export default AllProductsPage;
