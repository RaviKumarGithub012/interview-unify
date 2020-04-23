import React, { useState, useEffect } from 'react';
import { Row, Image, InputGroup, Col } from 'react-bootstrap';
import { DeleteProduct } from '../../store/actions/cart-actions';
import { IncreseCart } from '../../store/actions/cart-actions';
import { DecreaseCart } from '../../store/actions/cart-actions';
import { useDispatch } from 'react-redux';

const SingleCart = ({ itemHeading, itemPrice, productId, unite }) => {

// redux store
  const ProductAction = useDispatch();

  // react hooks
  const [pUnite, setPunite] = useState(false);
  const [unitValue, setUniteValue] = useState(1);
  const [newPrice, setNewPrice] = useState(0);

  // action functions
  useEffect(() => {
    setNewPrice(Math.round(Math.random() * 10000));
  }, [itemPrice]);

  const RemoveProduct = () => {
    // pass the action for removing the clicked product
    ProductAction(DeleteProduct(productId, unitValue - 1));
  }

  const IncreseValue = () => {
    if (unitValue >= unite) {
      alert(`Qantity is not avilable more 5.`);
      setPunite(true);
      setTimeout(() => { setPunite(false) }, 2000);
      return false;
    } else {
      setUniteValue(unitValue + 1);
      setNewPrice(itemPrice * (unitValue + 1));
      // pass the action for increasing the quantity of value
      ProductAction(IncreseCart());
    }
  }

  const DecreaseValue = () => {
    if (unitValue <= 1) {
      alert(`qantity must be more than 0.`);
      setPunite(true);
      setTimeout(() => { setPunite(false) }, 2000);
      return false;
    } else {
      setUniteValue(unitValue - 1);
      setNewPrice(newPrice - itemPrice);
      // pass the action for decreasing the quantity of value
      ProductAction(DecreaseCart());
    }
  }

  return (
    <div className='single-cart'>
      <Row className='mx-0 justify-content-between align-items-center'>
        <Col lg={6} className='px-0'>
          <Image src='/images/Xiaomi Mi 9.png' className='single-cart-img' alt='cart' fluid />
          <div className="item-dtl mr-auto ml-3 d-inline-block">
            <h3>{itemHeading}</h3>
            <Image src='/images/rating.png' className='rating_img d-block' fluid alt='rating' />
          </div>
        </Col>
        <Col className='px-0'>
          <p className="item-price mb-0 mr-auto">Rs. <strong>{newPrice}.00</strong></p>
        </Col>
        <Col className='px-0'>
          <InputGroup className="product-control mx-auto">
            <InputGroup.Prepend>
              <InputGroup.Text onClick={DecreaseValue}>
                <span>-</span>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <div className={"form-control" + (pUnite ? ' border-danger text-danger' : ' ')}>{unitValue}</div>
            <InputGroup.Append>
              <InputGroup.Text onClick={IncreseValue}>
                <span>+</span>
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Col>
        <Col xs={1} className='px-0 text-right'>
          <Image onClick={RemoveProduct} src='/images/delete.png' fluid alt='delete' className='delete-img' />
        </Col>
      </Row>
    </div>
  );
}

export default SingleCart;