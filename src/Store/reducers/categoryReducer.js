import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Clothing' },
  // Add more initial categories if needed
];

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.push(action.payload);
    },
    editCategory: (state, action) => {
      const { id, name } = action.payload;
      const category = state.find(cat => cat.id === id);
      if (category) {
        category.name = name;
      }
    },
    deleteCategory: (state, action) => {
      const id = action.payload;
      return state.filter(category => category.id !== id);
    },
  },
});

export const { addCategory, editCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;
