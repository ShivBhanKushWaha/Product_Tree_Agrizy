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
        const updatedSubcategories = category.subcategories.filter(
          (subcategory) => subcategory.id !== subcategoryId
        );
        return { ...category, subcategories: updatedSubcategories };
      }
      return category;
    });
    setData({ ...data, categories: updatedCategories });
  };

  const handleMoveProduct = (categoryId, subcategoryId, productId, targetSubcategoryId) => {
    const updatedCategories = data.categories.map((category) => {
      if (category.id === categoryId) {
        const productToMove = category.subcategories
          .find((subcategory) => subcategory.id === subcategoryId)
          .products.find((product) => product.id === productId);

        const updatedSubcategories = category.subcategories.map((subcategory) => {
          if (subcategory.id === subcategoryId) {
            return {
              ...subcategory,
              products: subcategory.products.filter((product) => product.id !== productId),
            };
          } else if (subcategory.id === targetSubcategoryId) {
            return {
              ...subcategory,
              products: [...subcategory.products, productToMove],
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


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Categories and Products</h1>
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
          onMoveProduct={handleMoveProduct}
        />
      ))}

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Add New Category</h2>
        <div className="mb-2 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="border rounded px-2 py-1 mb-2 sm:mb-0 outline-none"
            placeholder="Category name"
          />
          <input
            type="text"
            value={newSubcategoryName}
            onChange={(e) => setNewSubcategoryName(e.target.value)}
            className="border rounded px-2 py-1 mb-2 sm:mb-0 outline-none"
            placeholder="Subcategory name"
          />
          <input
            type="text"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            className="border rounded px-2 py-1 outline-none"
            placeholder="Product name"
          />
        </div>
        <button
          onClick={handleAddCategory}
          className="bg-blue-500 text-white rounded px-2 py-1"
        >
          Add Category
        </button>
      </div>
    </div>
  );
};

export default App;

