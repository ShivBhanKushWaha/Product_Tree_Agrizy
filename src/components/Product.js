import React from 'react';

const Product = ({ product, categoryId, onEdit, onDelete, onDragStart }) => {
  const handleDragStart = (event) => {
    onDragStart(event, product.id);
  };

  return (
    <div
      className="product p-3 bg-gray-100 rounded flex justify-between items-center shadow-sm hover:shadow-md transition-shadow duration-200"
      draggable
      onDragStart={handleDragStart}
    >
      <span className="text-gray-700">{product.name || 'Unnamed Product'}</span>
      <div className="space-x-2">
        <button
          onClick={() => onEdit(product)}
          className="text-blue-500 hover:text-blue-700 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Product;
