import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Image, Breadcrumb } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { AddToCart } from '../../store/actions/searchAction';


const SingleProducts = () => {

  const reduxStore = useSelector(state => state.products);

  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [cartValue, setcartValue] = useState(1);

  // for disabling the cart button
  const [isDisable, setIsDisable] = useState(false);

  const updateCart = useDispatch();

  useEffect(() => {
    // set the state for single product
    setProduct(reduxStore.ProductData[id - 1]);
  }, [id, reduxStore]);


  const addCartValue = () => {
    if (cartValue < 2) {
      // add the cart value
      setcartValue(cartValue + 1);
      // get the new array and move to reducer for cart page
      const addCartItem = reduxStore.ProductData.map(item => { return item; });
      // updating the store add new item in cart array
      updateCart(AddToCart(addCartItem[id - 1]));
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
          <Breadcrumb.Item active>{product.title}</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col lg={4}>
            <div className="single-p-img text-center">
              {
                product ? <Image src={product.src} alt='product' fluid /> : 'Lodding...'
              }
            </div>
          </Col>
          <Col lg={8}>
            {
              product ?
                <div className='mt-3 mt-lg-0'>
                  <h1>{product.title}</h1>
                  <p className='mt-3 mt-md-4'>{product.discription}</p>
                  <Row className='mx-0 align-items-center'>
                    <Button onClick={addCartValue} disabled={isDisable} className='cart-btn ml-3'>Add To Cart </Button>
                    <p className='my-0 ml-2'><span>Rs.<strong>{product.price}.00</strong></span> | Rating <Image src='/images/rating.png' className='rating_img' fluid alt='rating' /></p>
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