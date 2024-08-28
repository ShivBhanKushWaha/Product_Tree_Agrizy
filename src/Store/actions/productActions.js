// src/Store/actions/productActions.js

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const MOVE_PRODUCT = 'MOVE_PRODUCT';

export const addProduct = (categoryId, product) => ({
  type: ADD_PRODUCT,
  payload: { categoryId, product },
});

export const editProduct = (categoryId, productId, updatedProduct) => ({
  type: EDIT_PRODUCT,
  payload: { categoryId, productId, updatedProduct },
});

export const deleteProduct = (categoryId, productId) => ({
  type: DELETE_PRODUCT,
  payload: { categoryId, productId },
});

export const moveProduct = (sourceCategoryId, targetCategoryId, productId) => ({
  type: MOVE_PRODUCT,
  payload: { sourceCategoryId, targetCategoryId, productId },
});
