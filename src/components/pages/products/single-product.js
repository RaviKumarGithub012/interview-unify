import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Image, Breadcrumb } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { AddToCart } from '../../store/actions/searchAction';
import { SingleProductsLIst } from '../../store/actions/product-actions';


const SingleProducts = () => {
  
  // route id
  const { id } = useParams();

  // redux store
  const reduxStore = useSelector(state => state.products);
  const { singleProduct } = reduxStore;
  const updateCart = useDispatch();
  
  // react hooks
  const [cartValue, setcartValue] = useState(1);
  const [isDisable, setIsDisable] = useState(false);
  const [price, setPrice] = useState(0);


  // action functions
  useEffect(() => {
    setPrice(Math.round(Math.random() * 10000));
  }, []);


  useEffect(() => {
    // set the state for single product
    updateCart(SingleProductsLIst(id));
  }, [id, singleProduct]);


  const addCartValue = () => {
    if (cartValue < 2) {
      setcartValue(cartValue + 1);
      // add the new array and move to reducer for cart page
      const cartProduct = Object.assign({}, singleProduct);      
      updateCart(AddToCart(cartProduct));
    } else {
      // check if cart is already added
      alert('Already added to Cart');
      setIsDisable(true);
    }
  }

  return (
    <section className='single-product pb-5 pt-3'>
      <Container>
        <Breadcrumb>
          <li className="breadcrumb-item">
            <Link to='/'><Image src='/images/home.png' alt='home' fluid className='home-item' /></Link>
          </li>
          <Breadcrumb.Item active>{singleProduct ? singleProduct.title : 'Loding...'}</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col lg={4}>
            <div className="single-p-img text-center">
              {
                singleProduct ? <Image src='/images/Xiaomi Mi 9.png' alt='product' fluid /> : 'Lodding...'
              }
            </div>
          </Col>
          <Col lg={8}>
            {
              singleProduct ?
                <div className='mt-3 mt-lg-0'>
                  <h1>{singleProduct ? singleProduct.title : 'Loding...'}</h1>
                  <p className='mt-3 mt-md-4'>{singleProduct.body}</p>
                  <Row className='mx-0 align-items-center'>
                    <Button onClick={addCartValue} disabled={isDisable} className='cart-btn ml-3'>Add To Cart </Button>
                    <p className='my-0 ml-2'><span>Rs.<strong>{price}.00</strong></span> | Rating <Image src='/images/rating.png' className='rating_img' fluid alt='rating' /></p>
                  </Row>
                </div> : 'Lodding...'
            }
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default SingleProducts;