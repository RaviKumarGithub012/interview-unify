
const initialState = {
  cart: [],
  // add another object cartItem for get the number of cart item added
  cartItem: 0
};

const cartReducer = (state = initialState, action) => {
  // destructuring of type and payload
  const { type, payload } = action;
  switch (type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        // adding the new value in cart array
        cart: [payload, ...state.cart]
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

export default cartReducer;