import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Product from './Product.js';
import { addProduct, editProduct, deleteProduct, moveProduct } from '../Store/actions/productActions.js';

const Category = ({ category }) => {
  const [newProductName, setNewProductName] = useState('');
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingProductName, setEditingProductName] = useState('');
  const dispatch = useDispatch();

  const handleAddProduct = () => {
    if (newProductName.trim() === '') return;
    const newProduct = {
      id: Date.now(), // Generate a unique ID for the new product
      name: newProductName,
    };
    dispatch(addProduct(category.id, newProduct));
    setNewProductName(''); // Reset input field
  };

  const handleEditProduct = (product) => {
    setEditingProductId(product.id);
    setEditingProductName(product.name);
  };

  const handleSaveEditProduct = () => {
    if (editingProductId) {
      dispatch(editProduct(category.id, editingProductId, { id: editingProductId, name: editingProductName }));
      setEditingProductId(null);
      setEditingProductName(''); // Reset input field
    }
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(category.id, productId));
  };

  const handleDragStart = (event, productId) => {
    event.dataTransfer.setData('productId', productId);
    event.dataTransfer.setData('sourceCategoryId', category.id);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const productId = event.dataTransfer.getData('productId');
    const sourceCategoryId = parseInt(event.dataTransfer.getData('sourceCategoryId'), 10);

    if (sourceCategoryId !== category.id) {
      dispatch(moveProduct(sourceCategoryId, category.id, parseInt(productId, 10)));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Necessary to allow dropping
  };

  return (
    <div
      className="category p-4 bg-white shadow-md rounded-lg mb-6"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h2 className="text-xl font-semibold text-gray-700 mb-4">{category.name}</h2>
      <div className="products space-y-3">
        {category.products.map((product) => (
          <Product
            key={product.id}
            product={product}
            categoryId={category.id}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onDragStart={(e) => handleDragStart(e, product.id)}
          />
        ))}
      </div>
      <div className="add-product mt-4 flex space-x-2">
        <input
          type="text"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          placeholder="New Product Name"
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleAddProduct}
          className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition-colors"
        >
          Add Product
        </button>
      </div>
      {editingProductId && (
        <div className="edit-product mt-4">
          <input
            type="text"
            name={newProductName}
            value={editingProductName}
            onChange={(e) => setEditingProductName(e.target.value)}
            placeholder="Edit Product Name"
            className="p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleSaveEditProduct}
            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Category;
