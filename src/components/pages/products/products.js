import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'react-bootstrap';


const Products = ({ imgSrc, title, discription, linkId, not_found, price }) => {
  return (
    <Fragment>
      {not_found ?
        <div className="container text-center py-5 text-capitalize">{not_found}</div>
        : <Link to={'/product/' + linkId} className='product-dtl mt-3 d-inline-block'>
          <Card>
            <div className="card-img-box text-center">
              <Card.Img variant="top" src={imgSrc} />
            </div>
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <p className='mb-1 d-inline-block mr-1'>Rs <strong>{price}.00</strong></p>
              <Image src='/images/rating.png' className='rating_img' fluid alt='rating' />
              <Card.Text>{discription}</Card.Text>
            </Card.Body>
          </Card>
        </Link>}
    </Fragment>
  );
}

export default Products;