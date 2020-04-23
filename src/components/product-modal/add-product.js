import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Modal, Button, Form, Image } from 'react-bootstrap';
import { CreateNewProduct } from '../store/actions/product-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const AddProduct = ({ show, handleHide }) => {

  // redux store 
  const addNewProductToList = useDispatch();
  const { isAdded } = useSelector(state => state.products);

  // react hooks
  const titleInput = useRef();
  const routeHistory = useHistory();
  const [modalShow, setmodalShow] = useState(show);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [ifAdded, setIfadded] = useState(false);
  const [isDisable, setIsDisable] = useState(false);


  // action functions
  useEffect(() => {
    setmodalShow(show);
    if (show)
      setTimeout(() => {
        titleInput.current.focus();
      });
  }, [show]);

  const handleClose = valuecheck => {
    if (isDisable === false || valuecheck === false || valuecheck === true || valuecheck !== undefined) {
      handleHide();
      setMessage(''); setTitle(''); setUserId(''); setIfadded(false);
    } else {
      alert('Please wait product is not added yet...');
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    addNewProductToList(CreateNewProduct({ title, message, userId }));
    setIsDisable(true);
  }

  useEffect(() => {
    if (isAdded) {
      setIfadded(true);
      setTimeout(() => { setIsDisable(false); handleClose(false); }, 2500);
      setTimeout(() => {
        routeHistory.push('/');
      }, 3000);
    }
  }, [isAdded])

  return (
    <Fragment>
      <Modal show={modalShow} onHide={handleClose} size="lg" className='add-product-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Add Your New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            ifAdded ? <p className='text-success'>Your Product is added successfully :)</p>
              :
              <Fragment>
                {
                  isDisable ? <div>
                    <Image alt='loading' src='/images/loading.gif' fluid className='d-block mx-auto' />
                    <p className='text-center'>Please wait task is in proccess.</p>
                  </div> :
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="formBasictitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter Product Title" ref={titleInput} onChange={e => setTitle(e.target.value)} required />
                      </Form.Group>

                      <Form.Group controlId="formBasicUserId">
                        <Form.Label>User Id</Form.Label>
                        <Form.Control type="number" placeholder="Enter User Id" onChange={e => setUserId(e.target.value)} required />
                      </Form.Group>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Enter Product Discription</Form.Label>
                        <Form.Control as="textarea" rows="3" onChange={e => setMessage(e.target.value)} required />
                      </Form.Group>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" className='theme-btn' type="submit" disabled={isDisable}>Add Product to List</Button>
                      </Modal.Footer>
                    </Form>
                }
              </Fragment>
          }
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default AddProduct;