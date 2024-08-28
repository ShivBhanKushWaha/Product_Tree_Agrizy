import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [
    {
      id: 1,
      name: 'Electronics',
      products: [
        { id: 1, name: 'Laptop' },
        { id: 2, name: 'Phone' },
        { id: 3, name: 'Tablet' },
        { id: 4, name: 'Smartwatch' },
        { id: 5, name: 'Headphones' },
      ],
    },
    {
      id: 2,
      name: 'Clothing',
      products: [
        { id: 1, name: 'Shirt' },
        { id: 2, name: 'Jeans' },
        { id: 3, name: 'Jacket' },
        { id: 4, name: 'Sweater' },
        { id: 5, name: 'Dress' },
      ],
    },
    {
      id: 3,
      name: 'Home Appliances',
      products: [
        { id: 1, name: 'Refrigerator' },
        { id: 2, name: 'Washing Machine' },
        { id: 3, name: 'Microwave Oven' },
        { id: 4, name: 'Air Conditioner' },
        { id: 5, name: 'Vacuum Cleaner' },
      ],
    },
    {
      id: 4,
      name: 'Books',
      products: [
        { id: 1, name: 'Fiction Novel' },
        { id: 2, name: 'Non-fiction Novel' },
        { id: 3, name: 'Biography' },
        { id: 4, name: 'Science Fiction' },
        { id: 5, name: 'Self-help' },
      ],
    },
  ],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { categoryId, product } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.products.push(product);
      }
    },
    editProduct: (state, action) => {
      const { categoryId, productId, updatedProduct } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        const productIndex = category.products.findIndex(prod => prod.id === productId);
        if (productIndex !== -1) {
          category.products[productIndex] = updatedProduct;
        }
      }
    },
    deleteProduct: (state, action) => {
      const { categoryId, productId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.products = category.products.filter(prod => prod.id !== productId);
      }
    },
    moveProduct: (state, action) => {
      const { sourceCategoryId, targetCategoryId, productId } = action.payload;
      const sourceCategory = state.categories.find(cat => cat.id === sourceCategoryId);
      const targetCategory = state.categories.find(cat => cat.id === targetCategoryId);

      if (sourceCategory && targetCategory) {
        const productToMove = sourceCategory.products.find(prod => prod.id === productId);
        if (productToMove) {
          sourceCategory.products = sourceCategory.products.filter(prod => prod.id !== productId);
          targetCategory.products.push(productToMove);
        }
      }
    },
  },
});

export const { addProduct, editProduct, deleteProduct, moveProduct } = productSlice.actions;
export default productSlice.reducer;
