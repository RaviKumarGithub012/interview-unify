
// fetch all todo lists
export const FetchTodos = () => {
  return (dispatch) => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(json => dispatch({ type: 'FETCH_TODOS', payload: json }))
      .catch(err => console.error(err));
  }
}

// fetch single todo list
export const FetchSingleTodos = id => {
  return (dispatch) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => res.json())
      .then(json => dispatch({ type: 'FETCH_SINGLE_TODOS', payload: json }))
      .catch(err => console.error(err));
  }
}

// add todo list
export const AddtodoList = data => {
  return (dispatch) => {
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({
        title: data
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(res => res.json())
      .then(json => dispatch({ type: 'ADD_TODO_LIST', payload: json }))
      .catch(err => console.error(err));
  }
}

// update todo list item
export const UpdateTodoList = (id, updatedlist) => {
  return (dispatch) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: updatedlist
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(res => res.json())
      .then(json => dispatch({ type: 'UPDATED_TODO_LIST', payload: json }))
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }
}

// deleting selected todo list
export const DeleteTodoList = id => {
  return (dispatch) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE'
    }).then(res => res.json())
      .then(() => dispatch({ type: 'DELETED_TODO_LIST', payload: id }))
      .catch(err => console.error(err));
  }
}