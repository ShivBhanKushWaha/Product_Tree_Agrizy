// src/Store/actions/categoryActions.js

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const EDIT_CATEGORY = 'EDIT_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';

export const addCategory = (category) => ({
  type: ADD_CATEGORY,
  payload: category,
});

export const editCategory = (category) => ({
  type: EDIT_CATEGORY,
  payload: category,
});

export const deleteCategory = (categoryId) => ({
  type: DELETE_CATEGORY,
  payload: categoryId,
});
