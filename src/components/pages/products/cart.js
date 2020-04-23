import React, { Fragment } from 'react';
import { Container, Breadcrumb, Image, Row, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SingleCart from './single-cart';

const Cart = () => {

  // redux store
  const reduxStore = useSelector(state => state.cart);
  const cartProduct = reduxStore.cart;


  return (
    <section>
      <Container>
        <Breadcrumb className='pt mt-3'>
          <li className="breadcrumb-item">
            <Link to='/'>
              <Image src='/images/home.png' alt='home' fluid className='home-item' />
            </Link>
          </li>
          <Breadcrumb.Item active>Cart</Breadcrumb.Item>
        </Breadcrumb>
        <h1>Cart</h1>
        {
          cartProduct.length > 0 ?
            <Fragment>
              <Row>
                <Col>
                  {
                    cartProduct && cartProduct.map(item => {
                      return <SingleCart
                        key={item.id}
                        itemImg={item.src}
                        itemHeading={item.title}
                        itemPrice={100}
                        productId={item.id}
                        unite={5}
                      />
                    })
                  }
                </Col>
              </Row>
              <Row className='mt-3 mx-0 justify-content-between'>
                <Link to='/' className='btn btn-primary theme-btn'>Continue Shoping</Link>
                <Button className='theme-btn'>Checkout</Button>
              </Row>
            </Fragment>
            : 'Your Cart is empty.'
        }
      </Container>
    </section>
  );
}

export default Cart;
