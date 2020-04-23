
const initialState = {
  ProductData: [],
  filtered: [],
  singleProduct: {},
  isAdded: false,
};

const productReducer = (state = initialState, action) => {
  // destructuring of type and payload
  const { type, payload } = action;

  switch (type) {
    case 'FETCH_PRODUCTS_LIST':
      return {
        ...state,
        ProductData: payload,
        filtered: payload
      }
    case 'SINGLE_PRODUCTS_LIST':
      return {
        ...state,
        singleProduct: payload
      }
    case 'ADD_NEW_PRODUCT':
      return {
        ...state,
        ProductData: [payload, ...state.ProductData],
        filtered: [payload, ...state.ProductData],
        isAdded: true
      }
    case 'UPDATE_PRODUCTS':
      // update the store for search filter
      const getFiltered = state.ProductData.filter(item => {
        return item.title.toLowerCase().indexOf(payload.toLowerCase()) !== -1;
      });
      // checking if the value of getFiltered is empty
      if (getFiltered.length < 1) {
        return {
          ...state,
          filtered: [{ id: Math.random(), not_found: 'Search not found...' }],
          isAdded: false
        };
      }
      // updating the store if getFiltered value is not empty
      return {
        ...state,
        filtered: getFiltered,
        isAdded: false
      };
    default:
      return state;
  }
}

export default productReducer;