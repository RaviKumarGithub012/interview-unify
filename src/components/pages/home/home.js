import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Products from '../products/products';
import { useSelector, useDispatch } from 'react-redux';
import { FetchProductsLIst } from '../../store/actions/product-actions';


const Home = () => {

  // using the filterd state for search product
  const reduxStore = useSelector(state => state.products);
  const { filtered } = reduxStore;
  const moveProductList = useDispatch();

  // action funtions
  useEffect(() => {
    moveProductList(FetchProductsLIst());
  }, [reduxStore.ProductsData]);

  return (
    <div>
      <Container>
        <Row>
          {
            filtered ? filtered.map(v => {
              return <Col md={v.not_found ? null : 6} key={v.id} lg={v.not_found ? null : 4}>
                <Products
                  linkId={v.id}
                  title={v.title}
                  discription={v.body}
                  not_found={v.not_found}
                  price={v.price}
                />
              </Col>
            })
              : 'Loding...'
          }
        </Row>
      </Container>
    </div>
  );
}

export default Home;