import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../Store/actions/categoryActions.js'; // Update path as needed
import { addProduct } from '../Store/actions/productActions.js'; // Update path as needed

const ProductForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [productName, setProductName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const dispatch = useDispatch();

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim() === '') return;

    const newCategory = {
      id: Date.now(), // Generate a unique ID for the new category
      name: categoryName,
      products: [] // Initialize with an empty products array
    };

    dispatch(addCategory(newCategory));
    setCategoryName(''); // Reset input field
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (productName.trim() === '' || selectedCategoryId === null) return;

    const newProduct = {
      id: Date.now(), // Generate a unique ID for the new product
      name: productName
    };

    dispatch(addProduct({ categoryId: selectedCategoryId, product: newProduct }));
    setProductName(''); // Reset input field
  };

  return (
    <div className="p-4">
      <form onSubmit={handleCategorySubmit} className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Add Category</h2>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category Name"
          className="p-2 border border-gray-300 rounded mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add Category
        </button>
      </form>

      <form onSubmit={handleProductSubmit}>
        <h2 className="text-xl font-semibold mb-2">Add Product</h2>
        <select
          value={selectedCategoryId || ''}
          onChange={(e) => setSelectedCategoryId(parseInt(e.target.value))}
          className="p-2 border border-gray-300 rounded mb-2"
        >
          <option value="" disabled>Select Category</option>
          {/* This should ideally be fetched from the Redux state */}
          {/* Replace the below example categories with real ones */}
          <option value={1}>Electronics</option>
          <option value={2}>Clothing</option>
        </select>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product Name"
          className="p-2 border border-gray-300 rounded mb-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition-colors"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
