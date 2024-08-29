import React, { useState } from 'react';
import Category from './components/Category';
import { initialData } from './data/dummyData.js';
const App = () => {

  const [data, setData] = useState(initialData);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [newProductName, setNewProductName] = useState('');

  const handleAddProduct = (categoryId, subcategoryId, newProduct) => {
    const updatedCategories = data.categories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          subcategories: category.subcategories.map((subcategory) => {
            if (subcategory.id === subcategoryId) {
              return {
                ...subcategory,
                products: [...subcategory.products, newProduct],
              };
            }
            return subcategory;
          }),
        };
      }
      return category;
    });
    setData({ ...data, categories: updatedCategories });
  };


  const handleDeleteProduct = (categoryId, subcategoryId, productId) => {
    const updatedCategories = data.categories.map((category) => {
      if (category.id === categoryId) {
        const updatedSubcategories = category.subcategories.map((subcategory) => {
          if (subcategory.id === subcategoryId) {
            return {
              ...subcategory,
              products: subcategory.products.filter((product) => product.id !== productId),
            };
          }
          return subcategory;
        });
        return {
          ...category,
          subcategories: updatedSubcategories,
        };
      }
      return category;
    });
    setData({ ...data, categories: updatedCategories });
  };

  const handleEditProduct = (categoryId, subcategoryId, updatedProduct) => {
    const updatedCategories = data.categories.map((category) => {
      if (category.id === categoryId) {
        const updatedSubcategories = category.subcategories.map((subcategory) => {
          if (subcategory.id === subcategoryId) {
            const updatedProducts = subcategory.products.map((product) =>
              product.id === updatedProduct.id ? updatedProduct : product
            );
            return {
              ...subcategory,
              products: updatedProducts,
            };
          }
          return subcategory;
        });
        return {
          ...category,
          subcategories: updatedSubcategories,
        };
      }
      return category;
    });
    setData({ ...data, categories: updatedCategories });
  };

  const handleAddSubcategoryWithProduct = (categoryId, newSubcategory, newProduct) => {
    const updatedCategories = data.categories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          subcategories: [
            ...category.subcategories,
            { ...newSubcategory, products: [newProduct] },
          ],
        };
      }
      return category;
    });
    setData({ ...data, categories: updatedCategories });
  };

  const handleEditCategory = (updatedCategory) => {
    const updatedCategories = data.categories.map((category) =>
      category.id === updatedCategory.id ? updatedCategory : category
    );
    setData({ ...data, categories: updatedCategories });
  };

  const handleDeleteCategory = (categoryId) => {
    const updatedCategories = data.categories.filter((category) => category.id !== categoryId);
    setData({ ...data, categories: updatedCategories });
  };

  const handleAddCategory = () => {
    const newCategory = {
      id: Date.now(),
      name: newCategoryName,
      subcategories: [
        {
          id: Date.now() + 1,
          name: newSubcategoryName,
          products: [{ id: Date.now() + 2, name: newProductName }],
        },
      ],
    };
    setData({ ...data, categories: [...data.categories, newCategory] });
    setNewCategoryName('');
    setNewSubcategoryName('');
    setNewProductName('');
  };

  const handleDeleteSubcategory = (categoryId, subcategoryId) => {
    const updatedCategories = data.categories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          subcategories: category.subcategories.filter(
            (subcategory) => subcategory.id !== subcategoryId
          ),
        };
      }
      return category;
    });
    setData({ ...data, categories: updatedCategories });
  };

  return (
    <div className="container mx-auto">
      {data.categories.map((category) => (
        <Category
          key={category.id}
          category={category}
          onAddProduct={handleAddProduct}
          onDeleteProduct={handleDeleteProduct}
          onEditProduct={handleEditProduct}
          onAddSubcategoryWithProduct={handleAddSubcategoryWithProduct}
          onEditCategory={handleEditCategory}
          onDeleteCategory={handleDeleteCategory}
          onDeleteSubcategory={handleDeleteSubcategory}
        />
      ))}
      <div className="bg-blue-300 shadow-md rounded-lg p-4 mb-6 flex items-center flex-col sm:items-start sm:justify-start">
        <h3 className="text-xl font-semibold mb-4 text-center sm:text-left">Add New Category</h3>
        <div className='flex flex-col sm:flex-row gap-3'>
          <div className="flex-grow mb-2">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="border rounded px-3 py-2 w-full outline-none"
              placeholder="Category name"
            />
          </div>
          <div className="flex-grow mb-2">
            <input
              type="text"
              value={newSubcategoryName}
              onChange={(e) => setNewSubcategoryName(e.target.value)}
              className="border rounded px-3 py-2 w-full outline-none"
              placeholder="Subcategory name"
            />
          </div>
          <div className="flex-grow mb-2">
            <input
              type="text"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              className="border rounded px-3 py-2 w-full outline-none"
              placeholder="Product name"
            />
          </div>
        </div>
        <button
          onClick={handleAddCategory}
          className="bg-blue-500 text-white rounded px-3 py-2 flex-shrink-0 outline-none"
        >
          Add Category & Product
        </button>
      </div>
    </div>
  );
};

export default App;
