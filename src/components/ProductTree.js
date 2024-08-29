import React from 'react';
import { useSelector } from 'react-redux';
import Category from './Category.js';

const ProductTree = () => {
  // Ensure the state path matches your Redux state structure
  const categories = useSelector((state) => state.products.categories);

  return (
    <div className="product-tree p-4 bg-gray-50 min-h-screen">
      {categories.length > 0 ? (
        categories.map((category) => (
          <Category key={category.id} category={category} />
        ))
      ) : (
        <p className="text-center text-gray-500">No categories available</p>
      )}
    </div>
  );
};

export default ProductTree;
