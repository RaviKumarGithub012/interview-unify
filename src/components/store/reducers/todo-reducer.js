
const initialState = {
  todoList: [],
  singleTodo: {},
  isLoding: true
}

const todoReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'FETCH_TODOS':
      return {
        ...state,
        isLoding: false,
        todoList: payload
      }
    case 'FETCH_SINGLE_TODOS':
      return {
        ...state,
        singleTodo: payload,
      }
    case 'ADD_TODO_LIST':
      return {
        ...state,
        todoList: [payload, ...state.todoList]
      }
    case 'UPDATED_TODO_LIST':
      return {
        ...state,
        singleTodo: payload,
        isLoding: false
      }
    case 'DELETED_TODO_LIST':
    return {
      ...state,
      isLoding: false,
      todoList: state.todoList.filter(item => item.id !== payload)
    }
    default:
      return state;
  }
}

export default todoReducer;