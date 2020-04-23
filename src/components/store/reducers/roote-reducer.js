import { combineReducers } from 'redux';
import productReducer from '../reducers/product-reducer';
import cartReducer from '../reducers/cart-reducer';
import todoReducer from '../reducers/todo-reducer';

// import all the reducers and combining 

const rootReducers = combineReducers({
  products: productReducer,
  cart: cartReducer,
  todosList: todoReducer
});

export default rootReducers;