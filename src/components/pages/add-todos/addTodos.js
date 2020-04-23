import React, { useEffect, useState, useRef, Fragment } from 'react';
import { Container, Form, Button, InputGroup, Image } from 'react-bootstrap';
import TodoLists from './todoList';
import { useSelector, useDispatch } from 'react-redux';
import { FetchTodos } from '../../store/actions/todo-actions';
import { AddtodoList } from '../../store/actions/todo-actions';

const AddTodos = () => {

  const ActionTodoLists = useDispatch();
  const reduxStore = useSelector(state => state.todosList);
  const { todoList } = reduxStore;
  const { isLoding } = reduxStore;

  const [title, setTitle] = useState('');
  const [isAdded, setIsAdded] = useState(true);

  const titleInput = useRef();

  useEffect(() => {
    ActionTodoLists(FetchTodos());
  }, []);

  useEffect(() => {
    if (isLoding === false) {
      setIsAdded(true);
      setTitle('');
    }
  }, [reduxStore]);

  const addNewList = e => {
    e.preventDefault();
    if (title !== '') {
      ActionTodoLists(AddtodoList(title));
      setIsAdded(false);
    } else {
      alert('Todo is not added.');
      titleInput.current.focus();
    }
  }

  return (
    <div className='add-todos mt-5'>
      <Container className='px-md-5'>
        <Form className='add-todo-form' onSubmit={addNewList} disabled={isAdded === false ? true : false}>
          <Form.Group controlId="formBasicEmail">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <Form.Label className='btn m-0 theme-btn btn-primary d-block text-center'></Form.Label>
              </InputGroup.Prepend>
              <Form.Control type="text" disabled={isAdded === false ? true : false} value={title} placeholder="Add todos..." ref={titleInput} onChange={e => setTitle(e.target.value)} />
              <InputGroup.Append>
                <Button variant="primary" type="submit" className='theme-btn addTodos' disabled={isAdded === false ? true : false}>
                  {
                    isAdded ? <span>Add Todo</span> : <Image src='/images/loading.gif' className='todo-loding' fluid />
                  }
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Form>
        <div className='todo-item-list'>
          {
            isLoding ? 'Loding...' : <Fragment>
              {
                todoList && todoList.map(item => {
                  return <TodoLists
                    key={item.id}
                    itemId={item.id}
                    title={item.title}
                    isCompleted={item.completed}
                  />
                })
              }
            </Fragment>
          }
        </div>
      </Container>
    </div>
  );
}

export default AddTodos;