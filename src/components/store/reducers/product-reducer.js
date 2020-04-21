import ProductData from '../../../product-data';

const initialState = {
  ProductData,
  filtered: ProductData,
  cart: [],
  // add another object cartItem for get the number of cart item added
  cartItem: 0
};

const productReducer = (state = initialState, action) => {
  // destructuring of type and payload
  const { type, payload } = action;

  switch (type) {
    case 'UPDATE_PRODUCTS':
      // update the store for search filter
      const getFiltered = state.ProductData.filter(item => {
        return item.title.toLowerCase().indexOf(payload.toLowerCase()) !== -1;
      });
      // checking if the value of getFiltered is empty
      if (getFiltered == '') {
        return {
          ...state,
          filtered: [{ id: Math.random(), not_found: 'Search not found...' }]
        };
      }
      // updating the store if getFiltered value is not empty
      return {
        ...state,
        filtered: getFiltered
      };

    case 'ADD_TO_CART':
      return {
        ...state,
        // adding the new value in cart array
        cart: state.cart.concat(payload)
      }
    case 'DELETE_PRODUCT':
      const { porductId, itemNumber } = payload;
      return {
        ...state,
        // update the cart if the cart item is deleted
        cart: state.cart.filter(p => p.id !== porductId),
        cartItem: state.cartItem - itemNumber
      }
    case 'INCREASE_CART':
      // increasing the total cart value
      return {
        ...state,
        cartItem: state.cartItem + payload
      }
    case 'DECREASE_CART':
      // decreasing the total cart value
      return {
        ...state,
        cartItem: state.cartItem - payload
      }
    default:
      return state;
  }
}

export default productReducer;