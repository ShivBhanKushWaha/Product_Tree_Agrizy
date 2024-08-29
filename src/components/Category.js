// import React, { useState } from 'react';
// import Subcategory from './SubCategory';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons';
// const Category = ({
//   category,
//   onDeleteProduct,
//   onEditProduct,
//   onAddSubcategoryWithProduct,
//   onEditCategory,
//   onDeleteCategory,
//   onDeleteSubcategory,
//   onAddProduct,
//   setActiveCard
// }) => {
//   const [categories, setCategories] = useState([
//     // Your categories with subcategories and products
//   ]);
//   const [newSubcategoryName, setNewSubcategoryName] = useState('');
//   const [newProductName, setNewProductName] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedCategoryName, setEditedCategoryName] = useState(category.name);

//   const handleAddSubcategoryWithProduct = () => {
//     if (!newSubcategoryName || !newProductName) {
//       alert("Both subcategory and product names are required.");
//       return;
//     }
//     const newSubcategory = { id: Date.now(), name: newSubcategoryName };
//     const newProduct = { id: Date.now() + 1, name: newProductName };
//     onAddSubcategoryWithProduct(category.id, newSubcategory, newProduct);
//     setNewSubcategoryName('');
//     setNewProductName('');
//   };


//   const handleEditCategory = () => {
//     const updatedCategory = { ...category, name: editedCategoryName };
//     onEditCategory(updatedCategory);
//     setIsEditing(false);
//   };

//   const handleDeleteSubcategory = (subcategoryId) => {
//     onDeleteSubcategory(category.id, subcategoryId);
//   };

//   const handleMoveProduct = (productId, targetCategoryId, targetSubcategoryId) => {
//     // Find the source category and subcategory
//     let sourceCategory, sourceSubcategory;
//     const updatedCategories = categories.map(category => {
//       if (category.subcategories.some(subcategory => subcategory.products.some(product => product.id === productId))) {
//         sourceCategory = category;
//         sourceSubcategory = category.subcategories.find(subcategory => subcategory.products.some(product => product.id === productId));
//       }
//       return category;
//     });

//     // Find the product
//     const product = sourceSubcategory.products.find(product => product.id === productId);

//     // Remove the product from the source subcategory
//     sourceSubcategory.products = sourceSubcategory.products.filter(product => product.id !== productId);

//     // Add the product to the target subcategory
//     const targetCategory = updatedCategories.find(category => category.id === targetCategoryId);
//     const targetSubcategory = targetCategory.subcategories.find(subcategory => subcategory.id === targetSubcategoryId);
//     targetSubcategory.products.push(product);

//     // Update the state
//     setCategories(updatedCategories);
//   };

//   return (
//     <div className="bg-gray-600 shadow-md rounded-lg px-2 py-3 mb-6">
//       <div className="flex justify-between items-center">
//         {isEditing ? (
//           <input
//             type="text"
//             value={editedCategoryName}
//             onChange={(e) => setEditedCategoryName(e.target.value)}
//             className="border rounded px-2 py-1 outline-none mb-1"
//           />
//         ) : (
//           <h2 className="text-2xl text-white font-bold mb-4">{category.name}</h2>
//         )}
//         <div className='flex flex-row gap-2'>
//           {isEditing ? (
//             <button
//               onClick={handleEditCategory}
//             >
//               <FontAwesomeIcon icon={faSave} color='white' />
//             </button>
//           ) : (
//             <button
//               onClick={() => setIsEditing(true)}
//               aria-label="Edit category"
//             >
//               <FontAwesomeIcon icon={faEdit} color='blue' />
//             </button>

//           )}
//           <button
//             onClick={() => onDeleteCategory(category.id)}
//           >
//             <FontAwesomeIcon icon={faTrashAlt} color='white' />
//           </button>
//         </div>
//       </div>
//       {category.subcategories.map((subcategory) => (
//         <div key={subcategory.id} className="bg-gray-50 px-2 py-1 mb-4 rounded">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-bold mb-2">{subcategory.name}</h3>
//             <button
//               onClick={() => handleDeleteSubcategory(subcategory.id)}
//             >
//               <FontAwesomeIcon icon={faTrashAlt} color='black' />
//             </button>
//           </div>
//           <Subcategory
//             onAddProduct={onAddProduct}
//             subcategory={subcategory}
//             categoryId={category.id}
//             onDeleteProduct={onDeleteProduct}
//             onEditProduct={onEditProduct}
//             setActiveCard={setActiveCard}
//             onMoveProduct={handleMoveProduct}
//           />
//         </div>
//       ))}
//       <div className="mt-4 flex flex-col items-center justify-center sm:items-start sm:justify-start">
//         <h4 className="text-lg font-semibold mb-2 text-white text-center sm:text-left">Add New Subcategory and Product</h4>
//         <div className="mb-2 flex sm:flex-row flex-col gap-2">
//           <input
//             type="text"
//             value={newSubcategoryName}
//             onChange={(e) => setNewSubcategoryName(e.target.value)}
//             className="border rounded px-2 py-1 mb-2 outline-none"
//             placeholder="Subcategory name"
//           />
//           <input
//             type="text"
//             value={newProductName}
//             onChange={(e) => setNewProductName(e.target.value)}
//             className="border rounded px-2 py-1  mb-2 outline-none"
//             placeholder="Product name"
//           />

//         </div>
//         <button
//           onClick={handleAddSubcategoryWithProduct}
//           className="bg-blue-500 text-white rounded px-2 py-1 "
//         >
//           Add Subcategory
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Category;

import React, { useState } from 'react';
import Subcategory from './SubCategory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons';

const Category = ({
  category,
  onDeleteProduct,
  onEditProduct,
  onAddSubcategoryWithProduct,
  onEditCategory,
  onDeleteCategory,
  onDeleteSubcategory,
  onAddProduct,
  onMoveProduct, // Add this prop
}) => {
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [newProductName, setNewProductName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedCategoryName, setEditedCategoryName] = useState(category.name);

  const handleAddSubcategoryWithProduct = () => {
    if (!newSubcategoryName || !newProductName) {
      alert('Both subcategory and product names are required.');
      return;
    }
    const newSubcategory = { id: Date.now(), name: newSubcategoryName };
    const newProduct = { id: Date.now() + 1, name: newProductName };
    onAddSubcategoryWithProduct(category.id, newSubcategory, newProduct);
    setNewSubcategoryName('');
    setNewProductName('');
  };

  const handleEditCategory = () => {
    const updatedCategory = { ...category, name: editedCategoryName };
    onEditCategory(updatedCategory);
    setIsEditing(false);
  };

  const handleDeleteSubcategory = (subcategoryId) => {
    onDeleteSubcategory(category.id, subcategoryId);
  };

  return (
    <div className="bg-gray-600 shadow-md rounded-lg px-2 py-3 mb-6">
      <div className="flex justify-between items-center">
        {isEditing ? (
          <input
            type="text"
            value={editedCategoryName}
            onChange={(e) => setEditedCategoryName(e.target.value)}
            className="border rounded px-2 py-1 outline-none mb-1"
          />
        ) : (
          <h2 className="text-2xl text-white font-bold mb-4">{category.name}</h2>
        )}
        <div className="flex flex-row gap-2">
          {isEditing ? (
            <button onClick={handleEditCategory}>
              <FontAwesomeIcon icon={faSave} color="white" />
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} aria-label="Edit category">
              <FontAwesomeIcon icon={faEdit} color="blue" />
            </button>
          )}
          <button onClick={() => onDeleteCategory(category.id)}>
            <FontAwesomeIcon icon={faTrashAlt} color="white" />
          </button>
        </div>
      </div>
      {category.subcategories.map((subcategory) => (
        <div key={subcategory.id} className="bg-gray-50 px-2 py-1 mb-4 rounded">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold mb-2">{subcategory.name}</h3>
            <button onClick={() => handleDeleteSubcategory(subcategory.id)}>
              <FontAwesomeIcon icon={faTrashAlt} color="black" />
            </button>
          </div>
          <Subcategory
            subcategory={subcategory}
            categoryId={category.id}
            onAddProduct={onAddProduct}
            onDeleteProduct={onDeleteProduct}
            onEditProduct={onEditProduct}
            onMoveProduct={onMoveProduct} // Pass the prop
          />
        </div>
      ))}
      <div className="mt-4 flex flex-col items-center justify-center sm:items-start sm:justify-start">
        <h4 className="text-lg font-semibold mb-2 text-white text-center sm:text-left">
          Add New Subcategory and Product
        </h4>
        <div className="mb-2 flex sm:flex-row flex-col gap-2">
          <input
            type="text"
            value={newSubcategoryName}
            onChange={(e) => setNewSubcategoryName(e.target.value)}
            className="border rounded px-2 py-1 mb-2 outline-none"
            placeholder="Subcategory name"
          />
          <input
            type="text"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            className="border rounded px-2 py-1  mb-2 outline-none"
            placeholder="Product name"
          />
        </div>
        <button onClick={handleAddSubcategoryWithProduct} className="bg-blue-500 text-white rounded px-2 py-1">
          Add Subcategory
        </button>
      </div>
    </div>
  );
};

export default Category;

