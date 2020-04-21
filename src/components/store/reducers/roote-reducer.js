import { combineReducers } from 'redux';
import productReducer from '../reducers/product-reducer';

// import all the reducers and combining 

const rootReducers = combineReducers({
  products: productReducer,
});

export default rootReducers;