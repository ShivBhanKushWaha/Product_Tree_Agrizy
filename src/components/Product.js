// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons';

// const Product = ({ product, categoryId, subcategoryId, onDeleteProduct, onEditProduct, setActiveCard }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedProductName, setEditedProductName] = useState(product.name);

//   const handleEdit = () => {
//     if (!editedProductName.trim()) {
//       alert("Product name cannot be empty.");
//       return;
//     }
//     onEditProduct(categoryId, subcategoryId, { ...product, name: editedProductName });
//     setIsEditing(false);
//   };

//   const handleDragStart = (event) => {
//     event.dataTransfer.setData('productId', product.id);
//     event.dataTransfer.setData('categoryId', categoryId);
//     event.dataTransfer.setData('subcategoryId', subcategoryId);
//     setActiveCard(product);
//   };

//   return (
//     <div
//       className="flex items-center justify-between mb-2 bg-gray-200 rounded px-4 py-2"
//       draggable
//       onDragStart={handleDragStart}
//       onDragEnd={() => setActiveCard(null)}
//     >
//       {isEditing ? (
//         <input
//           type="text"
//           value={editedProductName}
//           onChange={(e) => setEditedProductName(e.target.value)}
//           className="border rounded flex-grow px-2 py-1 mr-2 outline-none"
//           aria-label="Edit product name"
//         />
//       ) : (
//         <span className="text-base mr-2">{product.name}</span>
//       )}
//       <div className="flex items-center justify-center flex-row gap-2">
//         {isEditing ? (
//           <button
//             onClick={handleEdit}
//             aria-label="Save product changes"
//           >
//             <FontAwesomeIcon icon={faSave} color="green" />
//           </button>
//         ) : (
//           <button
//             onClick={() => setIsEditing(true)}
//             aria-label="Edit product"
//           >
//             <FontAwesomeIcon icon={faEdit} color="blue" />
//           </button>
//         )}
//         <button
//           onClick={() => onDeleteProduct(categoryId, subcategoryId, product.id)}
//           aria-label="Delete product"
//         >
//           <FontAwesomeIcon icon={faTrashAlt} color="red" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Product;
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons';

const Product = ({ product, categoryId, subcategoryId, onDeleteProduct, onEditProduct }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProductName, setEditedProductName] = useState(product.name);

  const handleEdit = () => {
    if (!editedProductName.trim()) {
      alert("Product name cannot be empty.");
      return;
    }
    onEditProduct(categoryId, subcategoryId, { ...product, name: editedProductName });
    setIsEditing(false);
  };

  const handleDragStart = (event) => {
    event.dataTransfer.setData('productId', product.id);
    event.dataTransfer.setData('categoryId', categoryId);
    event.dataTransfer.setData('subcategoryId', subcategoryId);
  };

  return (
    <div
      className="flex items-center justify-between mb-2 bg-gray-200 rounded px-4 py-2"
      draggable
      onDragStart={handleDragStart}
    >
      {isEditing ? (
        <input
          type="text"
          value={editedProductName}
          onChange={(e) => setEditedProductName(e.target.value)}
          className="border rounded flex-grow px-2 py-1 mr-2 outline-none"
          aria-label="Edit product name"
        />
      ) : (
        <span className="text-base mr-2">{product.name}</span>
      )}
      <div className="flex items-center justify-center flex-row gap-2">
        {isEditing ? (
          <button
            onClick={handleEdit}
            aria-label="Save product changes"
          >
            <FontAwesomeIcon icon={faSave} color="green" />
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            aria-label="Edit product"
          >
            <FontAwesomeIcon icon={faEdit} color="blue" />
          </button>
        )}
        <button
          onClick={() => onDeleteProduct(categoryId, subcategoryId, product.id)}
          aria-label="Delete product"
        >
          <FontAwesomeIcon icon={faTrashAlt} color="red" />
        </button>
      </div>
    </div>
  );
};

export default Product;

