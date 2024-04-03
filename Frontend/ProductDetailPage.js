import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api/products';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details by ID from backend API
    getProductById(id).then((data) => {
      setProduct(data);
    });
  }, [id]);

  return (
    <div>
      {/* Display detailed product information */}
      {product && (
        <div>
          <h2>{product.name}</h2>
          <p>Company: {product.company}</p>
          <p>Category: {product.category}</p>
          <p>Price: {product.price}</p>
          <p>Rating: {product.rating}</p>
          <p>Discount: {product.discount}</p>
          <p>Availability: {product.availability}</p>
          {/* Display other product details */}
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;
