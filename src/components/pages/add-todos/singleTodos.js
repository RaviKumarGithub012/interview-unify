import React, { useEffect, useRef, useState, Fragment } from 'react';
import { Row, Col, Image, Container, Form, InputGroup, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FetchSingleTodos } from '../../store/actions/todo-actions';
import { UpdateTodoList } from '../../store/actions/todo-actions';



const SingleTodos = () => {

  // route id
  const { id } = useParams();

  // redux store
  const singleTodoList = useDispatch();
  const reduxStore = useSelector(state => state.todosList);
  const { singleTodo } = reduxStore;
  const { isLoding } = reduxStore;

  // react hooks
  const titleInput = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const [isAdded, setIsAdded] = useState(true);
  const [title, setTitle] = useState('');


  // action functions
  useEffect(() => {
    if (isLoding === false) {
      setIsAdded(true);
      setIsEdit(false);
    }
  }, [reduxStore, isLoding]);

  useEffect(() => {
    singleTodoList(FetchSingleTodos(id));
  }, [id]);


  const SwitchToEdit = () => {
    setIsEdit(true);
    setTimeout(() => { titleInput.current.focus(); });
  }

  const addNewList = e => {
    e.preventDefault();
    if (title == '') {
      setIsEdit(false);
      setTitle(singleTodo.title);
    } else {
      setIsAdded(false);
      singleTodoList(UpdateTodoList(id, title));
    }
  }



  return (
    <div className='single-todo mt-5 row mx-0 align-items-center'>
      <Container>
        {
          isEdit ?
            <Form className='add-todo-form' onSubmit={addNewList}>
              <Form.Group controlId="formBasicEmail">
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <Form.Label className='btn m-0 theme-btn btn-primary d-block text-center'></Form.Label>
                  </InputGroup.Prepend>
                  <Form.Control type="text" onChange={e => setTitle(e.target.value)} defaultValue={singleTodo.title} ref={titleInput} disabled={isAdded === false ? true : false} />
                  <InputGroup.Append>
                    <Button variant="primary" type="submit" className='theme-btn addTodos' disabled={isAdded === false ? true : false}>
                      {
                        isAdded ? <span>Update</span> : <Image src='/images/loading.gif' className='todo-loding' fluid />
                      }
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>
            </Form>
            :
            <Fragment>
              <h5 className='text-center text-capitalize'>{singleTodo.title ? singleTodo.title : 'Loding...'}</h5>
              <Row>
                <Col className='text-right'>
                  <span className='text-capitalize'><strong>user ID:</strong> {singleTodo.id}</span>
                </Col>
                <Col className='action-box pl-0'>
                  <Image alt='action' className='action-icon d-inline-block mr-2 ml-auto' src='/images/edit.png' fluid onClick={SwitchToEdit} />
                </Col>
              </Row>
            </Fragment>
        }
      </Container>
    </div>
  )
}

export default SingleTodos;