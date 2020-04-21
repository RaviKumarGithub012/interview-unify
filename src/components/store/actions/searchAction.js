// search filter product action
export const searchAction = products => {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_PRODUCTS', payload: products });
  }
}
// action for add to cart items
export const AddToCart = Item => {
  return (dispatch) => {
    dispatch({ type: 'ADD_TO_CART', payload: Item });
  }
}

// delete the product from cart or from cart page
export const DeleteProduct = (porductId, itemNumber) => {
  return (dispatch) => {
    // pass two objects productId for id of product and itemNumber for quantity value
    dispatch({ type: 'DELETE_PRODUCT', payload: { porductId, itemNumber } });
  }
}

// increase the value of cart if the quantity is increases
export const IncreseCart = () => {
  return (dispatch) => {
    dispatch({ type: 'INCREASE_CART', payload: 1 });
  }
}

// decrese the value of cart if the quantity is decreases
export const DecreaseCart = () => {
  return (dispatch) => {
    dispatch({ type: 'DECREASE_CART', payload: 1 });
  }
}