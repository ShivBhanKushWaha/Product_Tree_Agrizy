import { combineReducers } from 'redux';
import productReducer from './productReducer.js';
import categoryReducer from './categoryReducer';

const rootReducer = combineReducers({
  products: productReducer,
  categories: categoryReducer,
});

export default rootReducer;
