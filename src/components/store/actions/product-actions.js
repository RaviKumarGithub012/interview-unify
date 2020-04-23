
// fetch all the product lists
export const FetchProductsLIst = () => {
  return (dispatch) => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(getRes => dispatch({ type: 'FETCH_PRODUCTS_LIST', payload: getRes }))
      .catch(err => console.error(err));
  }
}

// fetch single product lists
export const SingleProductsLIst = id => {
  return (dispatch) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => res.json())
      .then(getRes => dispatch({ type: 'SINGLE_PRODUCTS_LIST', payload: getRes }))
      .catch(err => console.error(err));
  }
}


// create a new product action
export const CreateNewProduct = data => {
  const { title, message, userId } = data;
  return (dispatch) => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        body: message,
        userId: userId
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => dispatch({ type: 'ADD_NEW_PRODUCT', payload: json }))
      .catch(err => console.error(err));
  }
}