import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteTodoList } from '../../store/actions/todo-actions';

const TodoLists = ({ itemId, title, isCompleted }) => {
  
  // find parent existing path
  const urlHistory = useHistory();

  // redux store
  const deleteSelectedTodo = useDispatch();
  const reduxStore = useSelector(state => state.todosList);
  const { isLoding } = reduxStore;

  // react states
  const [isDeleted, setIsDeleted] = useState(false);

  // action functions
  useEffect(() => {
    if (isLoding === false) {
      setIsDeleted(false);
    }
  }, [reduxStore, isLoding]);

  const deleteItem = () => {
    let ok = window.confirm('Are your sure you want to delete the item');
    if (ok) {
      setIsDeleted(true);
      deleteSelectedTodo(DeleteTodoList(itemId));
    }
  }

  return (
    <Fragment>
      <Row className='mx-0 mt-3 align-items-center single-todo-item'>
        {
          isDeleted ? <Image src='/images/loading.gif' className='todo-loding d-block mx-auto' fluid />
            : <Fragment>
              <div className='px-0'>
                <span className='todo-id'>{itemId}</span>
              </div>
              <Col>
                <h5><Link to={`${urlHistory.location.pathname}/${itemId}`} className='read-more'>{title}</Link></h5>
              </Col>
              <div className='row mx-0 ml-auto action-box pr-3 justify-content-end align-items-center'>
                <Link to={`${urlHistory.location.pathname}/${itemId}`} className='read-more'><span>+</span></Link>
                <span className='mx-2'>|</span>
                <Image alt='action' className='action-icon d-inline-block' src='/images/delete.png' onClick={deleteItem} fluid />
              </div>
            </Fragment>
        }

      </Row>
    </Fragment>
  );
}

export default TodoLists;