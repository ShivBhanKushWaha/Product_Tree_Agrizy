import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons';

const Product = ({ product, categoryId, subcategoryId, onDeleteProduct, onEditProduct }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProductName, setEditedProductName] = useState(product.name);

  const handleEdit = () => {
    onEditProduct(categoryId, subcategoryId, { ...product, name: editedProductName });
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between mb-2 bg-red-300 rounded px-4 py-2">
      {isEditing ? (
        <input
          type="text"
          value={editedProductName}
          onChange={(e) => setEditedProductName(e.target.value)}
          className="border rounded flex-grow px-2 py-1 mr-2 outline-none"
        />
      ) : (
        <span className='text-base mr-2 text-white'>{product.name}</span>
      )}
      <div className="flex items-center justify-center flex-row gap-2">
        {isEditing ? (
          <button
            onClick={handleEdit}
          >
            <FontAwesomeIcon icon={faSave} color='black' />
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
          >
            <FontAwesomeIcon icon={faEdit} color='black' />
          </button>
        )}
        <button
          onClick={() => onDeleteProduct(categoryId, subcategoryId, product.id)}
        >
          <FontAwesomeIcon icon={faTrashAlt} color='black' />
        </button>
      </div>
    </div>
  );
};

export default Product;
