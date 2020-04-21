import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Products from '../products/products';
import { useSelector } from 'react-redux';


const Home = () => {

  // using the filterd state for search product
  const  { filtered } = useSelector(state => state.products);

  return (
    <div>
      <Container>
        <Row>
          {
            filtered && filtered.map(v => {
              return <Col md={v.not_found ? null : 6} key={v.id} lg={v.not_found ? null : 4}>
                <Products
                  linkId={v.id}
                  imgSrc={v.src}
                  title={v.title}
                  discription={v.discription}
                  not_found={v.not_found}
                  price={v.price}
                />
              </Col>
            })
          }
        </Row>
      </Container>
    </div>
  );
}

export default Home;