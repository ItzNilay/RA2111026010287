import React from 'react';

function ProductCard({ product }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>Company: {product.company}</p>
      <p>Price: {product.price}</p>
      {/* Display other product details */}
    </div>
  );
}

export default ProductCard;
